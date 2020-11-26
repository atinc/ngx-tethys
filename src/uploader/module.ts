import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThyFileSelectComponent } from './file-select.component';
import { ThyFileDropComponent } from './file-drop.component';
import { ThyUploaderService } from './uploader.service';
import { ThyDirectiveModule } from 'ngx-tethys/directive';

@NgModule({
    declarations: [ThyFileSelectComponent, ThyFileDropComponent],
    imports: [CommonModule, HttpClientModule, ThyDirectiveModule],
    entryComponents: [ThyFileDropComponent],
    providers: [ThyUploaderService],
    exports: [ThyFileSelectComponent, ThyFileDropComponent]
})
export class ThyUploaderModule {}
