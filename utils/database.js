import mongoose from "mongoose";

let isConnected = false; //track connections status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already Connected!!");
    return;
  }

  try {
    mongoose.connect(
      "mongodb+srv://MahmoudAliTech:zIes4QF5jE77KFHs@cluster0.5bscvde.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "Share_Prompts",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = true;
    console.log("MongoDB Connected!!");
  } catch (error) {
    console.error(error);
  }
};
