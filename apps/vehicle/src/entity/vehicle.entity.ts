import { UserEntity } from "apps/user/src/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity({
    name: 'vehicle'
})
export class VehicleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    model: string;

    @Column()
    isHeavy: boolean;

    @Column()
    plate: string;

    @Column()
    color: string;

    @Column()
    vin: string;

    @Column()
    distance: number;

    @Column()
    year: Date;

    @ManyToOne(() => UserEntity, (user) => user.vehicles)
    user: UserEntity;

    @RelationId((vehicleEntity: VehicleEntity) => vehicleEntity.user)
    userId: string;
}