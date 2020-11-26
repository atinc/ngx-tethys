import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteTriggerDirective } from './autocomplete.trigger.directive';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyAutocompleteComponent } from './autocomplete.component';
import { ThyLabelModule } from 'ngx-tethys/label';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyAutocompleteContainerComponent } from './overlay/autocomplete-container.component';
import { THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER } from './overlay/autocomplete.config';
import { ThyOptionModule } from 'ngx-tethys/core';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyLabelModule,
        OverlayModule,
        PortalModule,
        ThyLoadingModule,
        ThyDirectiveModule,
        ThyIconModule,
        ThyEmptyModule,
        ThyOptionModule
    ],
    declarations: [ThyAutocompleteTriggerDirective, ThyAutocompleteComponent, ThyAutocompleteContainerComponent],
    entryComponents: [ThyAutocompleteContainerComponent],
    exports: [ThyAutocompleteTriggerDirective, ThyAutocompleteComponent, ThyAutocompleteContainerComponent],
    providers: [THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER]
})
export class ThyAutocompleteModule {}
