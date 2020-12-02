import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteTriggerDirective } from './autocomplete.trigger.directive';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyAutocompleteComponent } from './autocomplete.component';
import { ThyLabelModule } from 'ngx-tethys/label';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyAutocompleteContainerComponent } from './overlay/autocomplete-container.component';
import { THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER } from './overlay/autocomplete.config';
import { ThyOptionModule } from 'ngx-tethys/shared';
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
        ThySharedModule,
        ThyIconModule,
        ThyEmptyModule,
        ThyOptionModule
    ],
    declarations: [ThyAutocompleteTriggerDirective, ThyAutocompleteComponent, ThyAutocompleteContainerComponent],
    entryComponents: [ThyAutocompleteContainerComponent],
    exports: [ThyAutocompleteTriggerDirective, ThyAutocompleteComponent, ThyAutocompleteContainerComponent, ThyOptionModule],
    providers: [THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER]
})
export class ThyAutocompleteModule {}
