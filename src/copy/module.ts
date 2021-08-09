import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCopyDirective } from './copy.directive';
import { ThyNotifyModule } from '../notify/notify.module';

@NgModule({
    declarations: [ThyCopyDirective],
    imports: [CommonModule, ThyNotifyModule],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
