import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { warnDeprecation } from 'ngx-tethys/util';

type IconNavTypes = 'primary' | 'secondary' | 'individual' | '';

/**
 * @private
 */
@Component({
    selector: 'thy-icon-nav',
    templateUrl: './icon-nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyIconNav implements OnInit {
    private changeDetectorRef = inject(ChangeDetectorRef);

    private initialized = false;

    private hostRenderer = useHostRenderer();

    type: IconNavTypes;

    @HostBinding(`class.thy-icon-nav`) isIconNav = true;

    @Input() set thyType(type: IconNavTypes) {
        this.type = type;
        this.updateClasses();
        this.changeDetectorRef.markForCheck();
    }

    private updateClasses(bypassInitialized?: boolean) {
        if (!bypassInitialized && !this.initialized) {
            return;
        }
        this.hostRenderer.updateClass(this.type ? [`thy-icon-nav-${this.type}`] : []);
    }

    constructor() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation('thy-icon-nav has been deprecated, please use thyAction and thy-space components instead of it');
        }
    }

    ngOnInit(): void {
        this.initialized = true;
        this.updateClasses(true);
    }
}
