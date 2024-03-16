import mongoose from "mongoose";

const CollectionSchema = mongoose.Schema(
    {
        storename:{
            type: String,
            required: true,
            unique: false
        },
        productname:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: false,
            default: "https://www.freepik.com/free-photos-vectors/cartoon-store"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Collection", CollectionSchema);