import { ThyNotifyModule } from 'ngx-tethys/notify';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyCopyDirective } from './copy.directive';

@NgModule({
    imports: [CommonModule, ThyNotifyModule, ThyCopyDirective],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
