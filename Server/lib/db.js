import mongoose from 'mongoose';
import 'dotenv/config';


async function connectDB() {
  await mongoose.connect(`${process.env.DBURL}`).then(() => {
        console.log("MongoDB connected");
      }).catch(err => {
        console.error("MongoDB connection error:", err);
      });
}

export default connectDB;