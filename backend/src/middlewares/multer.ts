import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import { getDataUri } from '../utils/dataUri';


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept multiple fields: photo and documents (optional)
export const uploadHelperFields = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
]);


export const cloudinaryUploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as { [key: string]: Express.Multer.File[] };

        // Upload photo
        if (files?.photo?.length) {
            const file = files.photo[0];
            const fileUri = getDataUri(file);
            const result = await cloudinary.uploader.upload(fileUri, { folder: 'helpers' });
            req.body.photoUrl = result.secure_url;
            req.body.photoPublicId = result.public_id;
        }

        // Upload documents
        if (files?.documents?.length) {
            const uploadedDocs = [];
            for (const file of files.documents) {
                const fileUri = getDataUri(file);
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: 'helpers/documents',
                    resource_type: 'raw',
                    public_id: file.originalname.replace(/\.[^/.]+$/, '')
                });
                uploadedDocs.push({
                    type: file.mimetype,
                    fileName: file.originalname,
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
            req.body.documents = uploadedDocs;
            console.log(uploadedDocs);
        }

        next();
    } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        return res.status(500).json({ error: 'Media upload failed' });
    }
};