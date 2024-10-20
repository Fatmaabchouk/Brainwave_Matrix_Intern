import mongoose from "mongoose";

//made the code organised

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // fixed the typo require -> required
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },// set the min value to 0 to avoid -ve 
        image: { type: String, required: true },
        category: { type: String, required: true }
    },
    { timestamps: true } // automatically keeps track of when items are created or updated
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
