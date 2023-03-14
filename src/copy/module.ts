import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCopyDirective } from './copy.directive';
import { ThyNotifyModule } from 'ngx-tethys/notify';

@NgModule({
    imports: [CommonModule, ThyNotifyModule, ThyCopyDirective],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
