import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyMenuGroupExampleComponent } from './group/group.component';
import { ThyMenuItemExampleComponent } from './item/item.component';
import { ThyMenuDividerExampleComponent } from './divider/divider.component';

const COMPONENTS = [ThyMenuGroupExampleComponent, ThyMenuItemExampleComponent, ThyMenuDividerExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyMenuExamplesModule {}
