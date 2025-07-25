import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import { getDataUri } from '../utils/dataUri';


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
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: 'helpers/documents',
                    resource_type: 'auto',
                    public_id: file.originalname
                });
                const previewUrl = cloudinary.url(result.public_id, {
                    resource_type: 'raw',
                    type: 'upload',
                    flags: 'attachment:false',
                    secure: true,
                });
                uploadedDocs.push({
                    type: file.mimetype,
                    fileName: file.originalname,
                    url: previewUrl,
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


