import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThyFileSelectComponent } from './file-select.component';
import { ThyFileDropComponent } from './file-drop.component';
import { ThyUploaderService } from './uploader.service';
import { THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER } from './uploader.config';
// import { ThyDirectiveModule } from 'ngx-tethys/directive';

@NgModule({
    declarations: [ThyFileSelectComponent, ThyFileDropComponent],
    imports: [CommonModule, HttpClientModule],
    entryComponents: [ThyFileDropComponent],
    providers: [ThyUploaderService, THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER],
    exports: [ThyFileSelectComponent, ThyFileDropComponent]
})
export class ThyUploaderModule {}
