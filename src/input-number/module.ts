import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputNumberComponent } from './input-number.component';
import { ThyInputModule } from 'ngx-tethys/input';

@NgModule({
    imports: [CommonModule, FormsModule, ThySharedModule, ThyIconModule, ThyInputModule],
    declarations: [ThyInputNumberComponent],
    exports: [ThyInputNumberComponent]
})
export class ThyInputNumberModule {}
