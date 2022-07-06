import {
  classToPlain,
  Exclude,
  Expose,
  instanceToPlain,
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
  @Exclude()
  @ObjectIdColumn()
  _id?: ObjectId | string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose()
  @Index({ unique: true })
  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  get name() {
    return this.firstName + this.lastName;
  }

  @Expose()
  get id() {
    return this._id.toString();
  }

  constructor(partial: Partial<User>) {
    if (partial) {
      Object.assign(
        this,
        plainToClass(User, partial, { excludeExtraneousValues: true }),
      );
    }
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
