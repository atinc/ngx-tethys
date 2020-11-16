import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCalendarBasicExampleComponent } from './basic/basic.component';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { LibPackerModule } from 'ngx-tethys/date-picker/lib/lib-packer.module';
import { FormsModule } from '@angular/forms';
import { ThyBadgeModule } from 'ngx-tethys/badge';

const COMPONENTS = [ThyCalendarBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, LibPackerModule, ThyCalendarModule, ThyBadgeModule],
    exports: [...COMPONENTS]
})
export class ThyCalendarExamplesModule {}
