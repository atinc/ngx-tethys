import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from '../icon';
import { ThyBackTopComponent } from './back-top.component';

@NgModule({
    declarations: [ThyBackTopComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyBackTopComponent]
})
export class ThyBackTopModule {}
