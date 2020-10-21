import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCalendarBasicExampleComponent } from './basic/basic.component';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { LibPackerModule } from 'ngx-tethys/date-picker/lib/lib-packer.module';

const COMPONENTS = [ThyCalendarBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, LibPackerModule, ThyCalendarModule],
    exports: [...COMPONENTS]
})
export class ThyCalendarExamplesModule {}
