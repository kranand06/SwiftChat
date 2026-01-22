import jwt from "jsonwebtoken";
import User from "../lib/schema.js";

//Middleware to protect hte route
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        req.user = user;
        next(); 
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ success: false, message: "Not authorized" });
    }
};

export default protect;