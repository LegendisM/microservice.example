import { StorageFileBucket, StorageFileDriverType } from "../interface/storage-file.interface";

export const STORAGE_FILE_DRIVERS_CONFIG: Record<StorageFileDriverType, { buckets: Record<StorageFileBucket, { publicUrl: string }> }> = {
    local: {
        buckets: {
            primary_bucket: {
                publicUrl: '/'
            },
            secondary_bucket: {
                publicUrl: '/'
            }
        }
    },
    s3: {
        buckets: {
            primary_bucket: {
                publicUrl: 'https://my-local-s3.s3.ir-tbz-sh1.arvanstorage.ir'
            },
            secondary_bucket: {
                publicUrl: '/'
            }
        }
    }
}