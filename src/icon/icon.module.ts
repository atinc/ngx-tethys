import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIcon } from './icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [ThyIcon, CommonModule, FormsModule, HttpClientModule],
    exports: [ThyIcon]
})
export class ThyIconModule {}
