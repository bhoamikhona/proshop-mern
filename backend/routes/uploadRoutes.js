import path from "path";
import { Router } from "express";
import multer, { diskStorage } from "multer";

const router = Router();

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({ storage });

router.post("/", upload.single("image"), function (req, res) {
  res.send({
    message: "Image Uploaded!",
    image: `/${req.file.path}`,
  });
});

export default router;
