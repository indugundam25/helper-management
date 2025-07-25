import { Request, Response } from 'express';
import Helper from '../models/helper.model';

export class HelperController {
  static async createHelper(req: Request, res: Response) {
    try {
      const helperData = JSON.parse(req.body.helperData);
      helperData.photoUrl = req.body.photoUrl;
      helperData.photoPublicId = req.body.photoPublicId;
      helperData.documents = req.body.documents;

      const helper = await Helper.create(helperData); // Helper is the mongoose model
      res.status(201).json({ helper });  //helper is the data object which contain helper data
      console.log('Incoming helper data:', req.body);
    } catch (err) {
      console.error('Error creating helper:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getHelpers(req: Request, res: Response) {
    try {
      const { filter = {}, sort = {}, search = '', page = 1 }: any = req.query;
      let mongoFilter = { ...filter };

      if (search) {
        mongoFilter = {
          ...mongoFilter,
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } },
            { organization: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const skip = (Number(page) - 1);
      const helpers = await Helper.find(mongoFilter)
        .sort(sort)
        .skip(skip);
      const total = await Helper.countDocuments(mongoFilter);
      res.json({ helpers, total });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }

  static async getHelperById(req: Request, res: Response) {
    try {
      const helper = await Helper.findById(req.params['id']);
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json(helper);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }

  static async updateHelper(req: Request, res: Response) {
    try {
      const helper = await Helper.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json(helper);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: message });
    }
  }

  static async deleteHelper(req: Request, res: Response) {
    try {
      const helper = await Helper.findByIdAndDelete(req.params['id']);
      if (!helper) return res.status(404).json({ error: 'Helper not found' });
      res.json({ message: 'Helper deleted' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }
}
