import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAlert } from './alert.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAlertActionItemDirective } from './alert.directive';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyAlert, ThyAlertActionItemDirective],
    exports: [ThyAlert, ThyAlertActionItemDirective]
})
export class ThyAlertModule {}
