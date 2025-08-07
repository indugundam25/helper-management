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
    } catch (err) {
      console.error('Error creating helper:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getHelpers(req: Request, res: Response) {
    try {
      const helpers = await Helper.find()
      res.json({ helpers });
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
      const helperData = req.body.helperData ? JSON.parse(req.body.helperData) : { ...req.body };
      if (req.body.photoUrl) {
        helperData.photoUrl = req.body.photoUrl;
        helperData.photoPublicId = req.body.photoPublicId;
      }

      if (req.body.documents) {
        helperData.documents = req.body.documents;
      }

      const helper = await Helper.findByIdAndUpdate(req.params['id'], helperData, { new: true });
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
