import { ThyAbstractOverlayContainer, ThyPortalOutlet } from 'ngx-tethys/core';

import { PortalModule } from '@angular/cdk/portal';

import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';

import { ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

/**
 * @private
 */
@Component({
    selector: 'thy-autocomplete-container',
    templateUrl: './autocomplete-container.component.html',
    host: {
        class: 'thy-autocomplete-container',
        tabindex: '-1',
        '[attr.role]': `'autocomplete'`
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThyAutocompleteContainer extends ThyAbstractOverlayContainer {
    private elementRef = inject(ElementRef);
    config = inject(ThyAutocompleteConfig);

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet!: ThyPortalOutlet;

    beforeAttachPortal(): void {}

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(autocompleteAbstractOverlayOptions, changeDetectorRef);
        this.animationHost = this.elementRef.nativeElement;
    }
}
