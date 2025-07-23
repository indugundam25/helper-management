import DatauriParser from 'datauri/parser';
import path from 'path';

const parser = new DatauriParser();

export const getDataUri = (file: Express.Multer.File): string => {
    return parser.format(path.extname(file.originalname), file.buffer).content!;
};





