import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyActionMenuBasicExampleComponent } from './basic/basic.component';
import { ThyActionMenuDirectionExampleComponent } from './direction/direction.component';
import { ThyActionMenuGroupExampleComponent } from './group/group.component';
import { ThyActionMenuItemTypeExampleComponent } from './item-type/item-type.component';
import { ThySelectModule } from 'ngx-tethys/select';

const COMPONENTS = [
    ThyActionMenuBasicExampleComponent,
    ThyActionMenuGroupExampleComponent,
    ThyActionMenuItemTypeExampleComponent,
    ThyActionMenuDirectionExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyActionMenuModule, ThyIconModule, ThyButtonModule, ThyFormModule, ThySelectModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyActionMenuExamplesModule {}
