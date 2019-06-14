import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input } from '@angular/core';

import { UpdateHostClassService } from '../shared';
import { ThyIconRegistry } from './icon-registry';

@Component({
    selector: 'thy-icon',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [UpdateHostClassService]
})
export class ThyIconComponent implements OnInit {
    _iconName: string;

    @Input('thyIconName')
    set iconName(value: string) {
        this._iconName = value;
    }
    get iconName() {
        return this._iconName;
    }

    @Input('thyIconSet') iconSet: string;

    constructor(
        private updateHostClassService: UpdateHostClassService,
        elementRef: ElementRef,
        private iconRegistry: ThyIconRegistry
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    updateClasses() {
        if (this.iconName) {
            const fontSetClass = this.iconSet
                ? this.iconRegistry.getFontSetClassByAlias(this.iconSet)
                : this.iconRegistry.getDefaultFontSetClass();
            this.updateHostClassService.updateClass([fontSetClass, `${fontSetClass}-${this.iconName}`]);
        }
    }

    ngOnInit() {
        this.updateClasses();
    }
}
