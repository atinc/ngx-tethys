import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIconComponent } from './icon.component';

@NgModule({
    declarations: [ThyIconComponent],
    imports: [CommonModule, FormsModule],
    exports: [ThyIconComponent]
})
export class ThyIconModule {}
