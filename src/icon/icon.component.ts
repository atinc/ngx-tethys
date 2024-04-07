import { take } from 'rxjs/operators';
import { useHostRenderer } from '@tethys/cdk/dom';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';

import { getWhetherPrintErrorWhenIconNotFound } from './config';
import { ThyIconRegistry } from './icon-registry';

const iconSuffixMap = {
    fill: 'fill',
    twotone: 'tt'
};

/**
 * 图标组件
 * @name thy-icon,[thy-icon]
 * @order 10
 */
@Component({
    selector: 'thy-icon, [thy-icon]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    host: {
        class: 'thy-icon'
    }
})
export class ThyIcon implements OnInit, OnChanges {
    private initialized = false;

    /**
     * 图标的类型
     * @type outline | fill | twotone
     */
    @Input('thyIconType') iconType: 'outline' | 'fill' | 'twotone' = 'outline';

    @Input('thyTwotoneColor') iconTwotoneColor: string;

    /**
     * 图标的名字
     */
    @Input('thyIconName') iconName: string;

    /**
     * 图标的旋转角度
     * @default 0
     */
    @Input({ alias: 'thyIconRotate', transform: numberAttribute }) iconRotate: number;

    @Input('thyIconSet') iconSet: string;

    /**
     * 图标打底色，镂空的图标，会透过颜色来
     * @default false
     */
    @HostBinding(`class.thy-icon-legging`)
    @Input({ alias: 'thyIconLegging', transform: booleanAttribute })
    iconLegging: boolean;

    @Input({ alias: 'thyIconLinearGradient', transform: booleanAttribute })
    iconLinearGradient: boolean;

    private hostRenderer = useHostRenderer();

    constructor(private render: Renderer2, private elementRef: ElementRef, private iconRegistry: ThyIconRegistry) {}

    ngOnInit() {
        this.updateClasses();
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.initialized) {
            if (
                changes['iconName'] ||
                changes['iconSet'] ||
                changes['iconTwotoneColor'] ||
                changes['iconType'] ||
                changes['iconLinearGradient']
            ) {
                this.updateClasses();
            } else if (changes['iconRotate']) {
                this.setStyleRotate();
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
                        svg => {
                            this.setSvgElement(svg);
                        },
                        (error: Error) => {
                            if (getWhetherPrintErrorWhenIconNotFound()) {
                                console.error(`Error retrieving icon: ${error.message}`);
                            }
                        }
                    );
                this.hostRenderer.updateClass([`thy-icon${namespace ? `-${namespace}` : ``}-${this.buildIconNameByType(iconName)}`]);
            } else {
                const fontSetClass = this.iconSet
                    ? this.iconRegistry.getFontSetClassByAlias(this.iconSet)
                    : this.iconRegistry.getDefaultFontSetClass();
                this.hostRenderer.updateClass([fontSetClass, `${fontSetClass}-${this.iconName}`]);
            }
        }
    }

    private setStyleRotate() {
        if (this.iconRotate !== undefined) {
            this.render.setStyle(this.elementRef.nativeElement.querySelector('svg'), 'transform', `rotate(${this.iconRotate}deg)`);
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
            this.setBaseUrl(svg);
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
     * @param svg
     */
    private setBaseUrl(svg: SVGElement) {
        const styleElements = svg.querySelectorAll('style');
        styleElements.forEach((n: HTMLElement) => {
            if (n.style.cssText.includes('url')) {
                n.style.fill = n.style.fill.replace('url("', 'url("' + location.pathname);
            }
            if (n.style.cssText.includes('clip-path')) {
                n.style.clipPath = n.style.clipPath.replace('url("', 'url("' + location.pathname);
            }
        });
    }

    private clearTitleElement(svg: SVGElement) {
        const titleElement = svg.querySelector('title');
        titleElement && titleElement.remove();
    }
}
