import { NgModule } from '@angular/core';
import { DemoAutocompleteBasicComponent } from './basic/basic.component';
import { SharedModule } from '../../shared.module';
import { DemoAutocompleteSectionComponent } from './autocomplete-section.component';

const Components = [DemoAutocompleteSectionComponent, DemoAutocompleteBasicComponent];

@NgModule({
    imports: [SharedModule],
    declarations: [...Components],
    entryComponents: [...Components]
})
export class DemoAutocompleteModule {}
