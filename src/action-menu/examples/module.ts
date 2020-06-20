import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyActionMenuBasicExampleComponent } from './basic/basic.component';
import { ThyActionMenuGroupExampleComponent } from './group/group.component';
import { ThyActionMenuItemTypeExampleComponent } from './item-type/item-type.component';
import { ThyActionMenuDirectionExampleComponent } from './direction/direction.component';

const COMPONENTS = [
    ThyActionMenuBasicExampleComponent,
    ThyActionMenuGroupExampleComponent,
    ThyActionMenuItemTypeExampleComponent,
    ThyActionMenuDirectionExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyActionMenuExamplesModule {}
