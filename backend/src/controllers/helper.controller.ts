import { Request, Response } from 'express';
import { HelperService } from '../services/helper.service';
// import DatauriParser from 'datauri/parser';
import path from 'path';
import cloudinary from '../config/cloudinary';

// const getDataUri = (file: Express.Multer.File) => {
//   return parser.format(path.extname(file.originalname), file.buffer).content;
// };

export class HelperController {
  static async createHelper(req: Request, res: Response) {
    try {
      const { body } = req;

      // Upload photo if provided
      // if (req.file) {
      //   const fileUri = getDataUri(req.file);
      //   const uploadResult = await cloudinary.uploader.upload(fileUri as string, {
      //     folder: 'helpers'
      //   });
      //   body.photo = uploadResult.secure_url;
      // }

      const helper = await HelperService.createHelper(body);
      res.status(201).json({ helper });
    } catch (err) {
      console.error('Error creating helper:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getHelpers(req: Request, res: Response) {
    try {
      const result = await HelperService.getHelpers(req.query);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }

  static async getHelperById(req: Request, res: Response) {
    try {
      const helper = await HelperService.getHelperById(req.params['id']);
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json(helper);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }

  static async updateHelper(req: Request, res: Response) {
    try {
      const helper = await HelperService.updateHelper(req.params['id'], req.body);
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json(helper);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: message });
    }
  }

  static async deleteHelper(req: Request, res: Response) {
    try {
      const helper = await HelperService.deleteHelper(req.params['id']);
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json({ message: 'Helper deleted' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }
} 