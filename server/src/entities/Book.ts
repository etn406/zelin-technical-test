import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  isbn?: string;

  @Column()
  title?: string;

  @Column({ default: false })
  deleted: boolean = false;
}
