import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySwitchComponent } from './switch.component';

@NgModule({
    imports: [CommonModule, ThySwitchComponent],
    exports: [ThySwitchComponent]
})
export class ThySwitchModule {}
