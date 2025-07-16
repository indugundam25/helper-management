import { Request, Response } from 'express';
import { HelperService } from '../services/helper.service';

export class HelperController {
  static async createHelper(req: Request, res: Response) {
    try {
      const helper = await HelperService.createHelper(req.body);
      res.status(201).json(helper);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: message });
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