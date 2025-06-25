import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; // Attach user data to request
    next(); // Continue to the protected route
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden: Invalid or expired token',
      error: error.message,
    });
  }
};

export const  adminMiddleware = async(req,res,next)=>{
  if(!req.user || req.user.role !=='admin') return res.status(404).json({message:'Forbidden'})
}
