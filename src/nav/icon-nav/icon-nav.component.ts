import { Component, OnInit, HostBinding, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { warnDeprecation } from 'ngx-tethys/util';

type IconNavTypes = 'primary' | 'secondary' | 'individual' | '';
@Component({
    selector: 'thy-icon-nav',
    templateUrl: './icon-nav.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyIconNavComponent implements OnInit {
    private initialized = false;
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
        this.updateHostClassService.updateClass(this.type ? [`thy-icon-nav-${this.type}`] : []);
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef<HTMLElement>
    ) {
        this.updateHostClassService.initializeElement(elementRef);
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation('thy-icon-nav has been deprecated, please use thyAction and thy-space components instead of it');
        }
    }

    ngOnInit(): void {
        this.initialized = true;
        this.updateClasses(true);
    }
}
