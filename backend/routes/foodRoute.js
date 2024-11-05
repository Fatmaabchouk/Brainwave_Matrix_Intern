import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path"; // Importation du module path

const foodRouter = express.Router();

// Moteur de stockage d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assurez-vous que le dossier 'uploads' existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Générer un nom unique pour chaque fichier
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Types de fichiers autorisés
    const mimetype = filetypes.test(file.mimetype); // Vérification du type de fichier
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Vérification de l'extension
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Erreur : le téléchargement de fichiers ne prend en charge que les types de fichiers suivants - " + filetypes); // Rejeter le fichier si les conditions ne sont pas remplies
  }
}).single('image');

// Gérer le téléchargement d'images
foodRouter.post("/add", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: "Erreur de Multer" });
    } else if (err) {
      return res.status(500).json({ success: false, message: "Erreur inconnue" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Aucun fichier téléchargé" });
    }
    next(); // Continuer vers addFood si tout va bien
  });
}, addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove", removeFood);

export { foodRouter };
