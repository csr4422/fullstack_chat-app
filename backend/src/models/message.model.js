import mongoose from "mongoose";

//Message Route creation
const messageSchema=new mongoose.Schema(
    {
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},
    {timestamps:ture},
);

const Message=mongoose.model("Message",messageSchema);

export default Message;