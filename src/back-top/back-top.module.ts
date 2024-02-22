import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyBackTop } from './back-top.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyBackTop],
    exports: [ThyBackTop]
})
export class ThyBackTopModule {}
