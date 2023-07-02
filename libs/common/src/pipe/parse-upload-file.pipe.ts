import { ArgumentMetadata, FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, PipeTransform } from "@nestjs/common";
import { AVAILABLE_UPLOAD_FILE_MIMES, MAX_UPLOAD_FILE_SIZE } from "../constant/upload.constant";

@Injectable()
export class ParseUploadFilePipe implements PipeTransform {
    constructor(
        private required: boolean = true,
        private mimes: string[] = AVAILABLE_UPLOAD_FILE_MIMES,
        private maxSize: number = MAX_UPLOAD_FILE_SIZE
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        return await new ParseFilePipe({
            fileIsRequired: this.required,
            validators: [
                new FileTypeValidator({ fileType: `.(${this.mimes.join('|')})` }),
                new MaxFileSizeValidator({ maxSize: this.maxSize })
            ]
        }).transform(value);

    }
}