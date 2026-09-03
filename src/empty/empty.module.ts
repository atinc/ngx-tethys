import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyEmpty } from './empty.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyEmpty],
    exports: [ThyEmpty]
})
export class ThyEmptyModule {}
