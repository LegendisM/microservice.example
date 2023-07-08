import { UserEntity } from "apps/user/src/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity({
    name: 'company_member'
})
export class CompanyMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    priority: number;

    @OneToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;

    @RelationId((companyMember: CompanyMemberEntity) => companyMember.user)
    userId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.members, { onDelete: 'CASCADE' })
    company: CompanyEntity;

    @RelationId((companyMember: CompanyMemberEntity) => companyMember.company)
    companyId: string;
}