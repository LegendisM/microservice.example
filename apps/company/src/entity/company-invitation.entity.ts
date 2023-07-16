import _ from "lodash";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CompanyEntity } from "./company.entity";
import { addHours } from "date-fns";
import { COMPANY_INVITATION_EXPIRE_TIME } from "../constant/company.constant";

@Entity({
    name: 'company_invitation'
})
export class CompanyInvitationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    expire: Date;

    @Column({ default: false })
    use: boolean;

    @OneToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE', nullable: true })
    usedBy: UserEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.invitations)
    company: CompanyEntity;

    @RelationId((companyInvitation: CompanyInvitationEntity) => companyInvitation.company)
    companyId: string;

    @BeforeInsert()
    onBeforeInsert() {
        this.code = _.uniqueId();
        this.expire = addHours(new Date(), COMPANY_INVITATION_EXPIRE_TIME);
    }
}