import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAlertComponent } from './alert.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAlertActionItemDirective } from './alert.directive';

@NgModule({
    declarations: [ThyAlertComponent, ThyAlertActionItemDirective],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyAlertComponent, ThyAlertActionItemDirective]
})
export class ThyAlertModule {}
