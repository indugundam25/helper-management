import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import { getDataUri } from '../utils/dataUri';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadSingleImage = upload.single('image');

export const cloudinaryUploadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next();
    }

    try {
        const fileUri = getDataUri(req.file);
        console.log(fileUri);
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: 'helpers',
        });
        console.log(result.secure_url);
        req.body = JSON.parse(req.body.helperData);
        req.body.photoUrl = result.secure_url;
        req.body.photoPublicId = result.public_id;

        next();
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return res.status(500).json({ error: 'Image upload failed' });
    }
};
