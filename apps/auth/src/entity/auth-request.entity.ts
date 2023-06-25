import _ from "lodash";
import { addMinutes } from "date-fns";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AUTH_REQUEST_EXPIRE_TIME, AUTH_REQUEST_RANDOM_LENGTH, AUTH_REQUEST_RANDOM_MAX, AUTH_REQUEST_RANDOM_MIN } from "../constant/auth.constant";

@Entity({
    name: 'auth_request'
})
export class AuthRequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'string',
        length: AUTH_REQUEST_RANDOM_LENGTH,
        default: () => _.random(AUTH_REQUEST_RANDOM_MIN, AUTH_REQUEST_RANDOM_MAX, false).toString()
    })
    code: string;

    @Column()
    phone: string;

    @Column({
        type: 'datetime',
        default: () => addMinutes(new Date(), AUTH_REQUEST_EXPIRE_TIME)
    })
    expire: Date;

    @Column({ default: false })
    send: boolean;

    @Column({ default: false })
    use: boolean;
}