import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from '../icon';
import { ThyInputNumberComponent } from './input-number.component';

@NgModule({
    declarations: [ThyInputNumberComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyInputNumberComponent]
})
export class ThyInputNumberModule {}
