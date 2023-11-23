import mongoose from "mongoose";

export const connectDatabase = () => {
    let DB_URI = "";
    if(process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
    if(process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI)
    .then((conn) => {
        console.log(`MongoDB Database Connected With Host: ${conn?.connection?.host}`);
    })
    .catch((err) => {
        console.log(`error in database ${err}`);
    })
}