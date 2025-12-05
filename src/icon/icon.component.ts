import { take } from 'rxjs/operators';
import { useHostRenderer } from '@tethys/cdk/dom';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
    ViewEncapsulation,
    numberAttribute,
    inject,
    input,
    effect
} from '@angular/core';

import { getWhetherPrintErrorWhenIconNotFound } from './config';
import { ThyIconRegistry } from './icon-registry';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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
    host: {
        class: 'thy-icon',
        '[class.thy-icon-legging]': 'thyIconLegging()'
    }
})
export class ThyIcon {
    private render = inject(Renderer2);
    private elementRef = inject(ElementRef);
    private iconRegistry = inject(ThyIconRegistry);

    /**
     * 图标的类型
     * @type outline | fill | twotone
     */
    readonly thyIconType = input<'outline' | 'fill' | 'twotone'>('outline');

    readonly thyTwotoneColor = input<string>();

    /**
     * 图标的名字
     */
    readonly thyIconName = input.required<string>();

    /**
     * 图标的旋转角度
     * @default 0
     */
    readonly thyIconRotate = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly thyIconSet = input<string>();

    /**
     * 图标打底色，镂空的图标，会透过颜色来
     */
    readonly thyIconLegging = input(false, { transform: coerceBooleanProperty });

    readonly thyIconLinearGradient = input(false, { transform: coerceBooleanProperty });

    private hostRenderer = useHostRenderer();

    constructor() {
        effect(() => {
            this.updateClasses();
        });
        effect(() => {
            this.setStyleRotate();
        });
    }

    private updateClasses() {
        const [namespace, iconName] = this.iconRegistry.splitIconName(this.thyIconName());
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
                const fontSetClass = this.thyIconSet()
                    ? this.iconRegistry.getFontSetClassByAlias(this.thyIconSet())
                    : this.iconRegistry.getDefaultFontSetClass();
                this.hostRenderer.updateClass([fontSetClass, `${fontSetClass}-${this.thyIconName()}`]);
            }
        }
    }

    private setStyleRotate() {
        if (this.thyIconRotate() !== undefined) {
            // 基于 effect 无法保证在 setSvgElement 之前执行，所以这里增加判断
            const svg = this.elementRef.nativeElement.querySelector('svg');
            if (!svg) {
                return;
            }
            this.render.setStyle(svg, 'transform', `rotate(${this.thyIconRotate()}deg)`);
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

        if (this.thyIconType() === 'twotone') {
            const allPaths = svg.querySelectorAll('path');
            if (allPaths.length > 1) {
                allPaths.forEach((child, index: number) => {
                    if (child.getAttribute('id').includes('secondary-color')) {
                        child.setAttribute('fill', this.thyTwotoneColor());
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
        if (this.thyIconLinearGradient()) {
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
        if (this.thyIconType() && ['fill', 'twotone'].indexOf(this.thyIconType()) >= 0) {
            const suffix = iconSuffixMap[this.thyIconType() as keyof typeof iconSuffixMap];
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
                n.style.fill = n.style.fill.replace('url("', `url("${  location.pathname}`);
            }
            if (n.style.cssText.includes('clip-path')) {
                n.style.clipPath = n.style.clipPath.replace('url("', `url("${  location.pathname}`);
            }
        });
    }

    private clearTitleElement(svg: SVGElement) {
        const titleElement = svg.querySelector('title');
        titleElement && titleElement.remove();
    }
}
