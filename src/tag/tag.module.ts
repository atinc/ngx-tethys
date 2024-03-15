import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTag } from './tag.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTags } from './tags.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTag, ThyTags],
    exports: [ThyTag, ThyTags]
})
export class ThyTagModule {}
