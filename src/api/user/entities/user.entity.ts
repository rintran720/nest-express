import {
  Exclude,
  Expose,
  plainToClass,
  plainToClassFromExist,
  plainToInstance,
} from 'class-transformer';
import { randomUUID } from 'crypto';
import type { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn, Unique } from 'typeorm';

@Unique(['email'])
@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id?: ObjectId | string;

  @Column()
  name: string;

  @Expose()
  @Index({ unique: true })
  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  @Column()
  get abc() {
    return this.name + this.password;
  }

  constructor(partial: Partial<User>) {
    if (partial) {
      Object.assign(
        this,
        plainToClass(User, partial, { excludeExtraneousValues: true }),
      );

      this._id = this._id || randomUUID();
    }
  }
}
