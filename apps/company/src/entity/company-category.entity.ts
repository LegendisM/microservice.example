import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'company_category'
})
export class CompanyCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
}