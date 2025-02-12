import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIcon } from './icon.component';

@NgModule({
    declarations: [],
    exports: [ThyIcon],
    imports: [ThyIcon, CommonModule, FormsModule],
    providers: []
})
export class ThyIconModule {}
