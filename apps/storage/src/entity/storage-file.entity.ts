import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StorageFileDriverType, StorageFileBucket, StorageFileType } from "../interface/storage-file.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { STORAGE_FILE_DRIVERS_CONFIG } from "../constant/storage.constnat";

@Entity({
    name: 'storage_file'
})
export class StorageFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: StorageFileType
    })
    type: StorageFileType;

    @Column({
        type: 'enum',
        enum: StorageFileDriverType,
        default: StorageFileDriverType.S3
    })
    driver: StorageFileDriverType;

    @Column({
        type: 'enum',
        enum: StorageFileBucket,
        default: StorageFileBucket.PRIMARY_BUCKET
    })
    bucket: StorageFileBucket;

    @Column()
    key: string;

    public get path(): string {
        return `${STORAGE_FILE_DRIVERS_CONFIG[this.driver]['buckets'][this.bucket].publicUrl}/${this.key}`;
    }

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.files, { onDelete: 'CASCADE', nullable: true })
    user: UserEntity;
}
