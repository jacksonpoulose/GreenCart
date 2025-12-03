import e from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";

//place order COD : /api/orders/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId || !items || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //calculate amount
    // let amount = await items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   return (await acc) + product.price * item.quantity;
    // }, 0);


       let amount = 0;
    for (let item of items) {
        const product = await Product.findById(item.product);
        productData.push({name:product.name,
            price:product.offerPrice,
            quantity:item.quantity,
        })
        
        amount += product.price * item.quantity;
    }

    // add tax 2%
    amount = Math.floor(amount + amount * 0.02);

    await Order.create({ userId, items, amount, address, paymentType: "COD" });
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//place order Stripe : /api/orders/stripe

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;
    if (!userId || !items || !address) {
      return res.status(400).json({ message: "invalid data" });
    }

    let productData = [];
    //calculate amount
    // let amount = await items.reduce(async (acc, item) => {
    //     const product = await Product.findById(item.product);
    //     productData.push({name:product.name,
    //         price:product.offerPrice,
    //         quantity:item.quantity,
    //     })
    //     return await acc + product.price * item.quantity;
    //    },0 );

    let amount = 0;
    for (let item of items) {
        const product = await Product.findById(item.product);
        productData.push({name:product.name,
            price:product.offerPrice,
            quantity:item.quantity,
        })
        
        amount += product.price * item.quantity;
    }

    // add tax 2%
    amount = Math.floor(amount + amount * 0.02);

    const order = await Order.create({ userId, items, amount, address, paymentType: "Online" });

    //stripe gateway initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        
        unit_amount: Math.round(Number(item.price) * 1.02 * 100),

      },
      quantity: item.quantity,
    }));
   
    

    //create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId,
      },
    });

    return res.status(201).json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//stripe webhooks 
export const stripeWebhooks = async (req, res) => {
//stripe gateway initialize
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const sig = req.headers['stripe-signature'];
let event;

try {

    event = stripeInstance.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    )
}catch(error){
res.status(400).send({message:`Webhook Error:${error.message}`});
}

//handle the event

switch(event.type){
    case "payment_intent.succeeded":{
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        });
        const {orderId,userId} = session.data[0].metadata;

        //mark payment as paid

        await Order.findByIdAndUpdate(orderId,{
            isPaid:true,
            paidAt:Date.now(),
        });
        //clear cart

        await User.findByIdAndUpdate(userId,{cartItems:{}});
        break;
    }

    case "payment_intent.payment_failed":{
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        });
        const {orderId} = session.data[0].metadata;

        //delete order

        await Order.findByIdAndDelete(orderId);
        break;
    }


    default:
        console.log(`Unhandled event type ${event.type}`);
        break
}
res.json({received:true});

}


//get orders by userId /api/orders/user

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ message: "User detail is required" });
    }
    const orders = await Order.find({
      userId: userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get all orders /api/orders/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
