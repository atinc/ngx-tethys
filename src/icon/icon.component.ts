import { useHostRenderer } from '@tethys/cdk/dom';
import { take } from 'rxjs/operators';

import {
    Component,
    ElementRef,
    Renderer2,
    SecurityContext,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    input,
    numberAttribute
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { coerceBooleanProperty, isImagePathSource } from 'ngx-tethys/util';
import { getWhetherPrintErrorWhenIconNotFound } from './config';
import { ThyIconRegistry } from './icon-registry';

const iconSuffixMap = {
    fill: 'fill',
    twotone: 'tt'
};

const SVG_NAME_SPACE = 'http://www.w3.org/2000/svg';

const XLINK_NAME_SPACE = 'http://www.w3.org/1999/xlink';

const SVG_EL_ATTRS: Record<string, string> = {
    viewBox: '0 0 24 24',
    fit: '',
    width: '1em',
    height: '1em',
    preserveAspectRatio: 'xMidYMid meet',
    focusable: 'false'
};

const IMAGE_EL_ATTRS: Record<string, string> = {
    x: '0',
    y: '0',
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMidYMid meet'
};

function setElementAttributes(render: Renderer2, element: Element, attributes: Record<string, string>): void {
    for (const [name, value] of Object.entries(attributes)) {
        render.setAttribute(element, name, value);
    }
}

/**
 * 图标组件
 * @name thy-icon,[thy-icon]
 * @order 10
 */
@Component({
    selector: 'thy-icon, [thy-icon]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-icon',
        '[class.thy-icon-legging]': 'legging()'
    }
})
export class ThyIcon {
    private render = inject(Renderer2);
    private elementRef = inject(ElementRef);
    private iconRegistry = inject(ThyIconRegistry);
    private sanitizer = inject(DomSanitizer);

    /**
     * 图标的外观
     * @type outline | fill | twotone
     * @default outline
     */
    readonly thyAppearance = input<'outline' | 'fill' | 'twotone'>();

    /**
     * 图标的类型（已废弃，将在 v23 彻底删除），请使用 thyAppearance
     * @deprecated please use thyAppearance, will be removed in v23
     * @type outline | fill | twotone
     */
    readonly thyIconType = input<'outline' | 'fill' | 'twotone'>();

    readonly thyTwotoneColor = input<string>();

    /**
     * 图标的名字
     * @description 与已废弃的 `thyIconName` 二选一，至少提供一个，否则不会渲染图标
     */
    readonly thyName = input<string>();

    /**
     * 图标的名字（已废弃，将在 v23 彻底删除），请使用 thyName
     * @deprecated please use thyName, will be removed in v23
     */
    readonly thyIconName = input<string>();

    /**
     * 图标的旋转角度
     * @default 0
     */
    readonly thyRotate = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 图标的旋转角度（已废弃，将在 v23 彻底删除），请使用 thyRotate
     * @deprecated please use thyRotate, will be removed in v23
     * @default 0
     */
    readonly thyIconRotate = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly thySet = input<string>();

    /**
     * 图标集（已废弃，将在 v23 彻底删除），请使用 thySet
     * @deprecated please use thySet, will be removed in v23
     */
    readonly thyIconSet = input<string>();

    /**
     * 图标打底色，镂空的图标，会透过颜色来
     */
    readonly thyLegging = input<boolean | undefined, unknown>(undefined, {
        transform: (value: unknown) => (value === undefined ? undefined : coerceBooleanProperty(value))
    });

    /**
     * 图标打底色（已废弃，将在 v23 彻底删除），镂空的图标，会透过颜色来，请使用 thyLegging
     * @deprecated please use thyLegging, will be removed in v23
     */
    readonly thyIconLegging = input(false, { transform: coerceBooleanProperty });

    readonly thyLinearGradient = input<boolean | undefined, unknown>(undefined, {
        transform: (value: unknown) => (value === undefined ? undefined : coerceBooleanProperty(value))
    });

    /**
     * 是否支持 Safari SVG LinearGradient（已废弃，将在 v23 彻底删除），请使用 thyLinearGradient
     * @deprecated please use thyLinearGradient, will be removed in v23
     */
    readonly thyIconLinearGradient = input(false, { transform: coerceBooleanProperty });

    readonly appearance = computed(() => this.thyAppearance() || this.thyIconType() || 'outline');

    readonly name = computed(() => this.thyName() ?? this.thyIconName());

    readonly rotate = computed(() => this.thyRotate() ?? this.thyIconRotate());

    readonly set = computed(() => this.thySet() ?? this.thyIconSet());

    readonly legging = computed(() => this.thyLegging() ?? this.thyIconLegging());

    readonly linearGradient = computed(() => this.thyLinearGradient() ?? this.thyIconLinearGradient());

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
        const rawName = this.name();
        if (!rawName) {
            return;
        }
        if (isImagePathSource(rawName)) {
            this.setImageElement(rawName.trim());
            return;
        }

        const [namespace, iconName] = this.iconRegistry.splitIconName(rawName);
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
                const fontSetClass = this.set()
                    ? this.iconRegistry.getFontSetClassByAlias(this.set()!)
                    : this.iconRegistry.getDefaultFontSetClass();
                this.hostRenderer.updateClass([fontSetClass, `${fontSetClass}-${this.name()}`]);
            }
        }
    }

    private setStyleRotate() {
        if (this.rotate() !== undefined) {
            // 基于 effect 无法保证在 setSvgElement 之前执行，所以这里增加判断
            const svg = this.elementRef.nativeElement.querySelector('svg');
            if (!svg) {
                return;
            }
            this.render.setStyle(svg, 'transform', `rotate(${this.rotate()}deg)`);
        }
    }

    private setImageElement(src: string) {
        this.clearSvgElement();

        const trusted = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        const safeUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, trusted);
        if (!safeUrl) {
            return;
        }

        const doc = this.elementRef.nativeElement.ownerDocument;
        const svg = doc.createElementNS(SVG_NAME_SPACE, 'svg');
        setElementAttributes(this.render, svg, SVG_EL_ATTRS);

        const imageEl = doc.createElementNS(SVG_NAME_SPACE, 'image');
        setElementAttributes(this.render, imageEl, { ...IMAGE_EL_ATTRS, href: safeUrl });
        imageEl.setAttributeNS(XLINK_NAME_SPACE, 'xlink:href', safeUrl);

        this.render.appendChild(svg, imageEl);
        this.render.appendChild(this.elementRef.nativeElement, svg);
        this.setStyleRotate();
    }

    //#region svg element

    private setSvgElement(svg: SVGElement) {
        this.clearSvgElement();

        // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
        // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
        // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
        const styleTags = svg.querySelectorAll('style') as NodeListOf<HTMLStyleElement>;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < styleTags.length; i++) {
            styleTags[i].textContent += ' ';
        }

        if (this.appearance() === 'twotone') {
            const allPaths = svg.querySelectorAll('path');
            if (allPaths.length > 1) {
                allPaths.forEach((child, index: number) => {
                    if (child.getAttribute('id')!.includes('secondary-color')) {
                        child.setAttribute('fill', this.thyTwotoneColor()!);
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
        if (this.linearGradient()) {
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

            // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
            if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
                layoutElement.removeChild(child);
            }
        }
    }

    //#endregion

    private buildIconNameByType(iconName: string) {
        const appearance = this.appearance();
        if (['fill', 'twotone'].indexOf(appearance) >= 0) {
            const suffix = iconSuffixMap[appearance as keyof typeof iconSuffixMap];
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
                n.style.fill = n.style.fill.replace('url("', `url("${location.pathname}`);
            }
            if (n.style.cssText.includes('clip-path')) {
                n.style.clipPath = n.style.clipPath.replace('url("', `url("${location.pathname}`);
            }
        });
    }

    private clearTitleElement(svg: SVGElement) {
        const titleElement = svg.querySelector('title');
        titleElement && titleElement.remove();
    }
}
