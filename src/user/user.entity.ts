import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;  // ?가 붙었으므로, 기본값은 아님.

  @Column({ unique: true})  //email -> 유니크값 설정.
  email: string;

  @Column({ nullable: true})
  password: string;

  @Column()
  username: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
  createdDt: Date = new Date();

  @Column({ nullable: true})
  providerId: string;
}