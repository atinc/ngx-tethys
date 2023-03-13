import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyBackTopComponent } from './back-top.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyBackTopComponent],
    exports: [ThyBackTopComponent]
})
export class ThyBackTopModule {}
