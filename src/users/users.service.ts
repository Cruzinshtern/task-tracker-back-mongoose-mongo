import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async create(createCatDto: any): Promise<User> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }
  
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
