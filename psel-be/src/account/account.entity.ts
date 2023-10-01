import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cpf: number;

  @Column({ nullable: true })
  cnpj: number;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
