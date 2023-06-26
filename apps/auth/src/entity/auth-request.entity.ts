import _ from "lodash";
import { addMinutes } from "date-fns";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AUTH_REQUEST_EXPIRE_TIME, AUTH_REQUEST_RANDOM_LENGTH, AUTH_REQUEST_RANDOM_MAX, AUTH_REQUEST_RANDOM_MIN } from "../constant/auth.constant";

@Entity({
    name: 'auth_request'
})
export class AuthRequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: AUTH_REQUEST_RANDOM_LENGTH
    })
    code: string;

    @Column()
    phone: string;

    @Column()
    expire: Date;

    @Column({ default: false })
    send: boolean;

    @Column({ default: false })
    use: boolean;

    @BeforeInsert()
    onBeforeInsert() {
        this.code = _.random(AUTH_REQUEST_RANDOM_MIN, AUTH_REQUEST_RANDOM_MAX, false).toString();
        this.expire = addMinutes(new Date(), AUTH_REQUEST_EXPIRE_TIME);
    }
}