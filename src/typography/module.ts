import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTextComponent } from './text/text.component';
import { ThyTextColorDirective } from './text-color.directive';
import { ThyBackgroundColorDirective } from './bg-color.directive';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTextComponent, ThyTextColorDirective, ThyBackgroundColorDirective],
    exports: [ThyTextComponent, ThyTextColorDirective, ThyBackgroundColorDirective],
    providers: []
})
export class ThyTypographyModule {}
