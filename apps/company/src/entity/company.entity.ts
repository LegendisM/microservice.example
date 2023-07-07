import { UserEntity } from "apps/user/src/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CompanyCategoryEntity } from "./company-category.entity";
import { CompanyInvitationEntity } from "./company-invitation.entity";

@Entity({
    name: 'company'
})
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: false })
    enabled: boolean;

    @OneToOne(() => UserEntity, (user) => user.id, { onDelete: "SET NULL" })
    @JoinColumn()
    owner: UserEntity;

    @RelationId((companyEntity: CompanyEntity) => companyEntity.owner)
    ownerId: string;

    @OneToMany(() => UserEntity, (user) => user.company)
    members: UserEntity[]; // TODO: create companyMember entity instead of using user directrly

    @OneToMany(() => CompanyInvitationEntity, (companyInviation) => companyInviation.company)
    invitations: CompanyInvitationEntity[];

    @ManyToMany(() => CompanyCategoryEntity)
    @JoinTable()
    categories: CompanyCategoryEntity[];
}