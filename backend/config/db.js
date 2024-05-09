import mongoose from "mongoose";
// mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      `Database connected successfully: ${connection.connection.host}`
    );
  } catch (error) {
    consolelog(error);
  }
};

export default connectDB;
