import { UserEntity } from "apps/user/src/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyCategoryEntity } from "./company-category.entity";
import { CompanyInvitationEntity } from "./company-invite.entity";

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

    @OneToMany(() => UserEntity, (user) => user.company)
    members: UserEntity[];

    @OneToMany(() => CompanyInvitationEntity, (companyInviation) => companyInviation.company)
    invitations: CompanyInvitationEntity[];

    @ManyToMany(() => CompanyCategoryEntity)
    @JoinTable()
    categories: CompanyCategoryEntity[];
}