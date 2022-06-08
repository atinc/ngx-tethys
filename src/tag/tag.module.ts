import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTagComponent } from './tag.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyTagComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyTagComponent]
})
export class ThyTagModule {}
