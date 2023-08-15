import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyOptionModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThyAutocompleteComponent } from './autocomplete.component';
import { ThyAutocompleteTriggerDirective } from './autocomplete.trigger.directive';
import { ThyAutocompleteContainerComponent } from './overlay/autocomplete-container.component';
import { THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER } from './overlay/autocomplete.config';
import { ThyAutocompleteService } from './overlay/autocomplete.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        OverlayModule,
        PortalModule,
        ThyLoadingModule,
        ThySharedModule,
        ThyIconModule,
        ThyEmptyModule,
        ThyOptionModule,
        ThyAutocompleteTriggerDirective,
        ThyAutocompleteComponent,
        ThyAutocompleteContainerComponent
    ],
    exports: [ThyAutocompleteTriggerDirective, ThyAutocompleteComponent, ThyAutocompleteContainerComponent, ThyOptionModule],
    providers: [THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER, ThyAutocompleteService]
})
export class ThyAutocompleteModule {}
