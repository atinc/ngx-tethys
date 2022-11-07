import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputCountComponent } from './input-count.component';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyFormModule } from 'ngx-tethys/form';

@NgModule({
    imports: [CommonModule, FormsModule, ThySharedModule, ThyIconModule, ThyInputModule, ThyFormModule],
    declarations: [ThyInputCountComponent],
    exports: [ThyInputCountComponent]
})
export class ThyInputCountModule {}
