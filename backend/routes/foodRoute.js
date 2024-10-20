import express from "express";
import { addFood , listFood , removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assurez-vous que ce dossier existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Générer un nom unique pour chaque fichier
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
      const mimetype = filetypes.test(file.mimetype);//checking file type
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());//checking the extension
      if (mimetype && extname) {
          return cb(null, true);
      }
      cb("Error: File upload only supports the following filetypes - " + filetypes);//if the req dosnt meet then reject the file
  }
}).single('image');
// Gérer un fichier image

foodRouter.post("/add", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: "Multer Error" });
    } else if (err) {
      return res.status(500).json({ success: false, message: "Unknown Error" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    next(); // Continue vers addFood si tout va bien
  });
}, addFood);
foodRouter.get("/list",listFood)


foodRouter.post("/remove" , removeFood);

export { foodRouter };
