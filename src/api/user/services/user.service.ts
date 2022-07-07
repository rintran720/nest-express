import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto) {
    try {
      const user = await this.userRepo.create(registerDto);
      return this.userRepo.save(user);
    } catch (err) {
      throw new Error("Can't create new user"); // throw error when can't run userRepo.create
    }
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findOneByQuery(query: object) {
    return this.userRepo.findOne({ where: query });
  }
}
