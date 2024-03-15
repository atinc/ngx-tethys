import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySwitch } from './switch.component';

@NgModule({
    imports: [CommonModule, ThySwitch],
    exports: [ThySwitch]
})
export class ThySwitchModule {}
