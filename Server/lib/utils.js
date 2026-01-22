//Function to generate tokens for authentication
import jwt from "jsonwebtoken";

export const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET);
};

export default generateToken;