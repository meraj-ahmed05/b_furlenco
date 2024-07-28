import mongoose from "mongoose";


const connectDB = async () => {
    // Use new db connection

    try{

        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
    } catch (err){
        // console.log(`Errror in db: ${err}`);
        return null
    }

  };
  
export default connectDB;
