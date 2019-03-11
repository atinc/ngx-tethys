import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyEditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
import { ThyDirectiveModule } from '../directive';
import { ThyUploaderModule } from '../uploader';
import { ThyEditorLinkModuleService, ThyDefaultEditorLinkModuleService } from './editor-linkmodule.service';
@NgModule({
    imports: [CommonModule, FormsModule, ThyDirectiveModule, ThyUploaderModule],
    declarations: [ThyEditorComponent],
    exports: [ThyEditorComponent],
    providers: [
        {
            provide: ThyEditorLinkModuleService,
            useClass: ThyDefaultEditorLinkModuleService
        }
    ]
})
export class ThyEditorModule {}
