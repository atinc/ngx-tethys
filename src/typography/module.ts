import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTextComponent } from './text/text.component';

@NgModule({
    declarations: [ThyTextComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyTextComponent],
    providers: []
})
export class ThyTypographyModule {}
