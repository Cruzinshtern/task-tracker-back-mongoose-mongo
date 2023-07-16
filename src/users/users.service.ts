import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, QueryWithHelpers } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private _userModel: Model<UserDocument>) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this._userModel({ ...createUserDto, password: hashedPassword });
    return newUser.save();
  }
  
  async findAll(): Promise<User[]> {
    return this._userModel.find().exec();
  }
  
  getUserByEmail(email: string): QueryWithHelpers<UserDocument, any> {
    try {
      return this._userModel.findOne({ email });
    } catch (err) {
      return err;
    }
  }
}
