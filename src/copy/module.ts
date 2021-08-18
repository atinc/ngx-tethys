import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCopyDirective } from './copy.directive';
import { ThyNotifyModule } from 'ngx-tethys/notify';

@NgModule({
    declarations: [ThyCopyDirective],
    imports: [CommonModule, ThyNotifyModule],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
