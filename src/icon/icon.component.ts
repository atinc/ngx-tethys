import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ElementRef,
    Input,
    HostBinding,
    Renderer2,
    SimpleChanges,
    OnChanges
} from '@angular/core';

import { UpdateHostClassService } from '../shared';
import { ThyIconRegistry } from './icon-registry';
import { take, tap } from 'rxjs/operators';
import { Subject, noop, BehaviorSubject } from 'rxjs';
import { coerceArray, inputValueToBoolean } from '../util/helpers';

const iconSuffixMap = {
    fill: 'fill',
    twotone: 'tt'
};

@Component({
    selector: 'thy-icon',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [UpdateHostClassService]
})
export class ThyIconComponent implements OnInit, OnChanges {
    @HostBinding('class.thy-icon') className = true;

    private isInitialized = false;

    @Input('thyIconType') iconType: 'outline' | 'fill' | 'twotone' = 'outline';

    @Input('thyTwotoneColor') iconTwotoneColor: string;

    @Input('thyIconName') iconName: string;

    @Input('thyIconRotate') iconRotate: number;

    @Input('thyIconSet') iconSet: string;

    @Input('thyIconLegging') iconLegging: boolean;

    @Input('thyIconLinearGradient') iconLinearGradient: boolean;

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private render: Renderer2,
        private elementRef: ElementRef,
        private iconRegistry: ThyIconRegistry
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this.updateClasses();
        this.isInitialized = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isInitialized) {
            if (changes['iconName'] || changes['iconSet'] || changes['iconTwotoneColor'] || changes['iconType']) {
                this.updateClasses();
            } else if (changes['iconRotate']) {
                this.setStyleRotate();
            }
        }
        if (changes['iconLegging']) {
            if (inputValueToBoolean(this.iconLegging)) {
                this.updateHostClassService.addClass('thy-icon-legging');
            } else {
                this.updateHostClassService.removeClass('thy-icon-legging');
            }
        }
    }

    private updateClasses() {
        const [namespace, iconName] = this.iconRegistry.splitIconName(this.iconName);
        if (iconName) {
            if (this.iconRegistry.iconMode === 'svg') {
                this.iconRegistry
                    .getSvgIcon(this.buildIconNameByType(iconName), namespace)
                    .pipe(take(1))
                    .subscribe(
                        svg => this.setSvgElement(svg),
                        (error: Error) => console.error(`Error retrieving icon: ${error.message}`)
                    );
                this.updateHostClassService.updateClass([
                    `thy-icon${namespace ? `-${namespace}` : ``}-${this.buildIconNameByType(iconName)}`
                ]);
            } else {
                const fontSetClass = this.iconSet
                    ? this.iconRegistry.getFontSetClassByAlias(this.iconSet)
                    : this.iconRegistry.getDefaultFontSetClass();
                this.updateHostClassService.updateClass([fontSetClass, `${fontSetClass}-${this.iconName}`]);
            }
        }
    }

    private setStyleRotate() {
        if (this.iconRotate !== undefined) {
            this.render.setStyle(
                this.elementRef.nativeElement.querySelector('svg'),
                'transform',
                `rotate(${this.iconRotate}deg)`
            );
        }
    }

    //#region svg element

    private setSvgElement(svg: SVGElement) {
        this.clearSvgElement();

        // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
        // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
        // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
        const styleTags = svg.querySelectorAll('style') as NodeListOf<HTMLStyleElement>;

        for (let i = 0; i < styleTags.length; i++) {
            styleTags[i].textContent += ' ';
        }

        if (this.iconType === 'twotone') {
            const allPaths = svg.querySelectorAll('path');
            if (allPaths.length > 1) {
                allPaths.forEach((child, index: number) => {
                    if (child.getAttribute('id').includes('secondary-color')) {
                        child.setAttribute('fill', this.iconTwotoneColor);
                    }
                });
            }
        }

        // Note: we do this fix here, rather than the icon registry, because the
        // references have to point to the URL at the time that the icon was created.
        // if (this._location) {
        //     const path = this._location.getPathname();
        //     this._previousPath = path;
        //     this._cacheChildrenWithExternalReferences(svg);
        //     this._prependPathToReferences(path);
        // }
        if (this.iconLinearGradient) {
            this.redirectLinearGradientUrl(svg);
            this.clearTitleElement(svg);
        }

        this.elementRef.nativeElement.appendChild(svg);
        this.setStyleRotate();
    }

    private clearSvgElement() {
        const layoutElement: HTMLElement = this.elementRef.nativeElement;
        let childCount = layoutElement.childNodes.length;

        // if (this._elementsWithExternalReferences) {
        //     this._elementsWithExternalReferences.clear();
        // }

        // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
        // we can't use innerHTML, because IE will throw if the element has a data binding.
        while (childCount--) {
            const child = layoutElement.childNodes[childCount];

            // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
            // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
            if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
                layoutElement.removeChild(child);
            }
        }
    }

    //#endregion

    private buildIconNameByType(iconName: string) {
        if (this.iconType && ['fill', 'twotone'].indexOf(this.iconType) >= 0) {
            const suffix = iconSuffixMap[this.iconType];
            return iconName.includes(`-${suffix}`) ? iconName : `${iconName}-${suffix}`;
        } else {
            return iconName;
        }
    }

    /**
     * Support Safari SVG LinearGradient.
     *
     *
     * @param svg
     */
    private redirectLinearGradientUrl(svg: SVGElement) {
        const styleElements = svg.querySelectorAll('[style]');
        styleElements.forEach((n: any) => {
            console.log(n.style.cssText);
            if (n.style.cssText.includes('url')) {
                n.style.fill = n.style.fill.replace('url("', 'url("' + location.pathname);
            }
            if (n.style.cssText.includes('clip-path')) {
                n.style.clipPath = n.style.clipPath.replace('url("', 'url("' + location.pathname);
            }
        });
    }

    private clearTitleElement(svg: SVGElement) {
        svg.querySelector('title').remove();
    }
}
