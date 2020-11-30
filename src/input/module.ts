import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputComponent } from './input.component';
import { ThyInputGroupComponent } from './input-group.component';
import { ThyInputSearchComponent } from './input-search.component';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, FormsModule, ThySharedModule, ThyIconModule],
    declarations: [ThyInputDirective, ThyInputComponent, ThyInputGroupComponent, ThyInputSearchComponent],
    exports: [ThyInputDirective, ThyInputComponent, ThyInputGroupComponent, ThyInputSearchComponent]
})
export class ThyInputModule {}
