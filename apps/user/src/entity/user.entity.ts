import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";

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

    @OneToMany(() => VehicleEntity, (vehicle) => vehicle.user)
    vehicles: VehicleEntity[];
}