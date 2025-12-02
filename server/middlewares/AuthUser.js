import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};
