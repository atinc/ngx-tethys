import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyFileDropDirective } from './file-drop.directive';
import { ThyFileSelect } from './file-select.component';
import { THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER } from './upload.config';
import { ThyUploadService } from './upload.service';

// import { ThyDirectiveModule } from 'ngx-tethys/directive';

@NgModule({
    exports: [ThyFileSelect, ThyFileDropDirective],
    imports: [CommonModule, ThyFileSelect, ThyFileDropDirective],
    providers: [ThyUploadService, THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER]
})
export class ThyUploadModule {}
