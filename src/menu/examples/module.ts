import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyMenuModule } from 'ngx-tethys/menu';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyMenuDividerExampleComponent } from './divider/divider.component';
import { ThyMenuGroupExampleComponent } from './group/group.component';
import { ThyMenuItemExampleComponent } from './item/item.component';

const COMPONENTS = [ThyMenuGroupExampleComponent, ThyMenuItemExampleComponent, ThyMenuDividerExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyMenuModule, ThyIconModule, ThyActionMenuModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyMenuExamplesModule {}
