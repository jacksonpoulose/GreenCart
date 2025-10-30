import React, { use } from 'react'
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';


const BestSeller = () => {
  const {products} = useAppContext()
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>BestSeller</p>
        <div className='grid md:grid-cols-5 grid-cols-2 gap-4 mt-6'>
          {products.filter((product)=>product.inStock).slice(0,5).map((p,index)=>
          <ProductCard key={index} product={p}/>
        )}
        
        </div>
        </div>
  )
}

export default BestSeller