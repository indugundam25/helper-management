import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import { getDataUri } from '../utils/dataUri';
import path from 'path';


const storage = multer.memoryStorage(); //creating a storage engine
const upload = multer({ storage }); //creating multer instance

export const uploadHelperFields = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
]);
//photo and documents are two fields in req.files

export const cloudinaryUploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as { [key: string]: Express.Multer.File[] };

        if (files?.photo?.length) {
            const file = files.photo[0];
            const fileUri = getDataUri(file);
            const result = await cloudinary.uploader.upload(fileUri, { folder: 'helpers' });
            req.body.photoUrl = result.secure_url;
            req.body.photoPublicId = result.public_id;
        }

        if (files?.documents?.length) {
            const uploadedDocs = [];
            for (const file of files.documents) {
                const fileUri = getDataUri(file);
                const filenameWithoutExt = path.parse(file.originalname).name;
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: 'helpers/documents',
                    resource_type: 'auto',
                    // public_id: file.originalname,
                    public_id: filenameWithoutExt,
                });

                uploadedDocs.push({
                    type: file.mimetype,
                    fileName: file.originalname,
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }

            req.body.documents = uploadedDocs;
        }
        next();
    } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        return res.status(500).json({ error: 'Media upload failed' });
    }
};


