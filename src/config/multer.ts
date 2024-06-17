import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const mimeType = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!mimeType.includes(file.mimetype)) {
      return callback(null, false);
    }
    callback(null, true);
  },
});

const uploadFile = (req: Request, res: Response, next: NextFunction) => upload.single('image')(req, res, next);

export { uploadFile };
