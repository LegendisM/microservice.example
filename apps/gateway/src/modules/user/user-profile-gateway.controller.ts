import { Auth, CurrentUser } from "@app/authentication";
import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, Controller, Delete, Inject, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IGatewayResponse } from "../../common/interface/gateway.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { UpdateUserDto } from "apps/user/src/dto/update-user.dto";
import { USER_MESSAGE_PATTERNS } from "apps/user/src/constant/user-patterns.constant";
import { firstValueFrom } from "rxjs";
import { STORAGE_MESSAGE_PATTERNS } from "apps/storage/src/constant/storage-patterns.constant";
import { StorageFileEntity } from "apps/storage/src/entity/storage-file.entity";
import { CreateStorageFileDto } from "apps/storage/src/dto/create-storage-file.dto";
import { StorageFileBucket, StorageFileDriverType, StorageFileType } from "apps/storage/src/interface/storage-file.interface";
import { ParseUploadFilePipe } from "@app/common/pipe/parse-upload-file.pipe";

@Controller({
    path: '/profiles',
    version: '1'
})
@Auth()
export class UserProfileGatewayController {
    constructor(
        @Inject(RabbitServiceName.USER) private userService: ClientProxy,
        @Inject(RabbitServiceName.STORAGE) private storageService: ClientProxy
    ) { }

    @Put('/')
    async updateProfile(
        @Body() updateDto: UpdateUserDto,
        @CurrentUser('id') userId: string,
    ): Promise<IGatewayResponse> {
        const { state, data } = await firstValueFrom(
            this.userService.send<IServiceResponse<UserEntity>, { updateDto: UpdateUserDto, userId: string }>(
                USER_MESSAGE_PATTERNS.UPDATE,
                {
                    updateDto: updateDto,
                    userId: userId
                }
            )
        );
        return { state, data };
    }

    @Put('/avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadProfileAvatar(
        @CurrentUser() user: UserEntity,
        @UploadedFile(new ParseUploadFilePipe()) avatar: Express.Multer.File
    ): Promise<IGatewayResponse> {
        const { state: storageState, data: storageData } = await firstValueFrom(
            this.storageService.send<IServiceResponse<StorageFileEntity>, { createDto: CreateStorageFileDto, user: UserEntity }>(
                STORAGE_MESSAGE_PATTERNS.CREATE,
                {
                    createDto: {
                        type: StorageFileType.USER_AVATAR,
                        bucket: StorageFileBucket.PRIMARY_BUCKET,
                        driver: StorageFileDriverType.S3,
                        file: avatar,
                        title: '#USER-Avatar'
                    },
                    user: user
                }
            )
        );
        if (storageState) {
            const { state: updateState } = await firstValueFrom(
                this.userService.send<IServiceResponse<UpdateUserDto>, { updateDto: UpdateUserDto, userId: string }>(
                    USER_MESSAGE_PATTERNS.UPDATE,
                    {
                        updateDto: {
                            avatar: storageData
                        },
                        userId: user.id
                    }
                )
            );
            return { state: updateState, data: null }
        } else {
            return { state: false, data: null }
        }
    }

    @Delete('/avatar')
    async removeProfileAvatar(
        @CurrentUser('id') userId: string
    ): Promise<IGatewayResponse> {
        const { state } = await firstValueFrom(
            this.userService.send<IServiceResponse<UserEntity>, { updateDto: UpdateUserDto, userId: string }>(
                USER_MESSAGE_PATTERNS.UPDATE,
                {
                    updateDto: {
                        avatar: null
                    },
                    userId: userId
                }
            )
        );
        return { state, data: null };
    }
}