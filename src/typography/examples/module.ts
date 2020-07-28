import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTypographyBackgroundExampleComponent } from './background/background.component';
import { ThyTypographyBootstrapExampleComponent } from './bootstrap/bootstrap.component';
import { ThyTypographyColorExampleComponent } from './color/color.component';
import { ThyTypographyEditableExampleComponent } from './editable/editable.component';
import { ThyTypographyFontSizeExampleComponent } from './font-size/font-size.component';
import { ThyTypographyIconTextExampleComponent } from './icon-text/icon-text.component';
import { ThyTypographyTitleExampleComponent } from './title/title.component';

const COMPONENTS = [
    ThyTypographyTitleExampleComponent,
    ThyTypographyFontSizeExampleComponent,
    ThyTypographyColorExampleComponent,
    ThyTypographyIconTextExampleComponent,
    ThyTypographyEditableExampleComponent,
    ThyTypographyBootstrapExampleComponent,
    ThyTypographyBackgroundExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyTypographyExamplesModule {}
