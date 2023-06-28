import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    phone: string;

    @Column({
        type: 'simple-array',
        default: [Role.USER],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    roles: Role[];

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    nationalcode: string;

    @Column({ nullable: true })
    birthday: Date;

    @OneToMany(() => VehicleEntity, (vehicle) => vehicle.user)
    vehicles: VehicleEntity[];
}