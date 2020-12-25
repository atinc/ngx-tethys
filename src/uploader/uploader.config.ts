import { InjectionToken } from '@angular/core';
import { ThyNotifyService } from '../notify';

export interface ThyUploaderConfig {
    sizeThreshold?: number;
    onUploadError?: (event: { type: string; data: { files: FileList; nativeEvent: Event; acceptMaxSize: number } }) => {};
}

export const THY_UPLOADER_DEFAULT_OPTIONS = new InjectionToken<ThyUploaderConfig>('thy-uploader-default-options');

export const THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_UPLOADER_DEFAULT_OPTIONS,
    useFactory: (notifyService: ThyNotifyService) => {
        return {
            sizeThreshold: 200,
            onUploadError: (event: { type: string; data: { files: FileList; nativeEvent: Event; acceptMaxSize: number } }) => {
                if (event.type === 'SiZE_LIMIT_EXCEEDS') {
                    notifyService.warning('提示', `不支持上传${event.data.acceptMaxSize}M以上附件。`);
                }
            }
        };
    },
    deps: [ThyNotifyService]
};
