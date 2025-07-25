import DatauriParser from 'datauri/parser';
import path from 'path';

const parser = new DatauriParser();

export const getDataUri = (file: Express.Multer.File): string => {
    return parser.format(path.extname(file.originalname), file.buffer).content!;
};
//we need this file because we are saving the files to memory not disk. so we have to convert the file data to base64





