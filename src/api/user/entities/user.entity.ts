import type { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;
}
