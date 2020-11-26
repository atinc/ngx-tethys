import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyPropertyOperationComponent } from './property-operation.component';
import { ThyPropertyOperationGroupComponent } from './group/property-operation-group.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent],
    imports: [CommonModule, ThyButtonModule, ThyIconModule],
    exports: [ThyPropertyOperationComponent, ThyPropertyOperationGroupComponent]
})
export class ThyPropertyOperationModule {}
