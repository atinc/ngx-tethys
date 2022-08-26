import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTextComponent } from './text/text.component';
import { ThyTextColorDirective } from './text-color.directive';

@NgModule({
    declarations: [ThyTextComponent, ThyTextColorDirective],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyTextComponent, ThyTextColorDirective],
    providers: []
})
export class ThyTypographyModule {}
