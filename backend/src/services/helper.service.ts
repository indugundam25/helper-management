import Helper, { IHelper } from '../models/helper.model';
import { FilterQuery, UpdateQuery } from 'mongoose';

export class HelperService {
  static async createHelper(data: Partial<IHelper>) {
    return Helper.create(data);
  }

  static async getHelpers(query: any) {
    const { filter = {}, sort = {}, search = '', page = 1, limit = 10 } = query;
    let mongoFilter: FilterQuery<IHelper> = { ...filter };
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
    const skip = (page - 1) * limit;
    const helpers = await Helper.find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await Helper.countDocuments(mongoFilter);
    return { helpers, total };
  }

  static async getHelperById(id: string) {
    return Helper.findById(id);
  }

  static async updateHelper(id: string, data: UpdateQuery<IHelper>) {
    return Helper.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteHelper(id: string) {
    return Helper.findByIdAndDelete(id);
  }
} 