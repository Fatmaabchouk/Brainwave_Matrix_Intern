import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item 
const addFood = async (req, res) => {
    console.log(req.file); // Pour vérifier le fichier téléchargé

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// all food list 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Suppression du fichier image
        const imagePath = `uploads/${food.image.split('/').pop()}`; // Extraire le nom de fichier réel
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier:', err);
                return res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'image" });
            }
        });

        // Suppression de l'élément de la base de données
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addFood, listFood, removeFood };
