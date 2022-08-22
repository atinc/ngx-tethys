import { ImportNameChangeBase } from '../../../class';

const IMPORT_NAME_CHANGE_RELATION = {
    ThyRasterModule: 'ThyGridModule',
    ThyUploaderModule: 'ThyUploadModule',
    ThyUploaderService: 'ThyUploadService',
    ThyUploaderConfig: 'ThyUploadConfig',
    THY_UPLOADER_DEFAULT_OPTIONS: 'THY_UPLOAD_DEFAULT_OPTIONS',
    THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER: 'THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER'
};

export class ImportNameChangeMigrationByNg13 extends ImportNameChangeBase {
    readonly relation = IMPORT_NAME_CHANGE_RELATION;
}
