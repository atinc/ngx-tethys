import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLabelComponent } from './label.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyLabelComponent],
    exports: [ThyLabelComponent]
})
export class ThyLabelModule {}
