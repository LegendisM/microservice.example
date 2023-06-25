import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phone: string;

    @Column()
    username: string;

    @Column({
        type: 'simple-array',
        default: [Role.USER],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    role: Role[];

    @Column()
    email: string;

    @Column()
    nationalcode: string;

    @Column()
    birthday: Date;
}