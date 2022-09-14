import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTagComponent } from './tag.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTagsComponent } from './tags.component';

@NgModule({
    declarations: [ThyTagComponent, ThyTagsComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyTagComponent, ThyTagsComponent]
})
export class ThyTagModule {}
