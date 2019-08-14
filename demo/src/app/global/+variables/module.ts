import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoVariablesSectionComponent } from './variables.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [DemoVariablesSectionComponent],
    imports: [SharedModule],
    exports: [],
    providers: []
})
export class DemoVariablesModule {}
