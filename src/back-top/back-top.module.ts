import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from '../icon';
import { ThyBackTopComponent } from './back-top.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [ThyBackTopComponent],
    imports: [CommonModule, ThyIconModule, BrowserAnimationsModule],
    exports: [ThyBackTopComponent]
})
export class ThyBackTopModule {}
