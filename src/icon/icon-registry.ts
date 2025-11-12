import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, share, tap } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, SecurityContext, inject, DOCUMENT } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { isString } from 'ngx-tethys/util';

class SvgIconConfig {
    url: SafeResourceUrl | null;
    svgElement: SVGElement | null;

    constructor(data: SafeResourceUrl | SVGElement) {
        // Note that we can't use `instanceof SVGElement` here,
        // because it'll break during server-side rendering.
        if (data && !!(data as any).nodeName) {
            this.svgElement = data as SVGElement;
        } else {
            this.url = data as SafeResourceUrl;
        }
    }
}

export type IconMode = 'font' | 'svg';

export type SvgResourceUrl = SafeResourceUrl | string;

export type SvgHtml = SafeHtml | string;

/**
 * @order 20
 */
@Injectable({
    providedIn: 'root'
})
export class ThyIconRegistry {
    private sanitizer = inject(DomSanitizer);
    private httpClient = inject(HttpClient, { optional: false });
    private document = inject(DOCUMENT);

    private defaultFontSetClass = 'wt-icon';
    private internalIconMode: IconMode = 'svg';
    private svgIconConfigs = new Map<string, SvgIconConfig>();
    private svgIconSetConfigs = new Map<string, SvgIconConfig[]>();
    private inProgressUrlFetches = new Map<string, Observable<string>>();

    public get iconMode() {
        return this.internalIconMode;
    }

    private getIconNameNotFoundError(iconName: string): Error {
        return Error(`Unable to find icon with the name "${iconName}"`);
    }

    private getIconFailedToSanitizeLiteralError(literal: SvgHtml): Error {
        return Error(
            `The literal provided to ThyIconRegistry was not trusted as safe HTML by ` +
                `Angular's DomSanitizer. Attempted literal was "${literal}".`
        );
    }

    private internalAddSvgIconSet(namespace: string, config: SvgIconConfig): this {
        const configNamespace = this.svgIconSetConfigs.get(namespace);

        if (configNamespace) {
            configNamespace.push(config);
        } else {
            this.svgIconSetConfigs.set(namespace, [config]);
        }

        return this;
    }

    private cloneSvg(svg: SVGElement): SVGElement {
        return svg.cloneNode(true) as SVGElement;
    }

    private fetchUrl(safeUrl: SafeResourceUrl | null): Observable<string> {
        if (safeUrl == null) {
            throw Error(`Cannot fetch icon from URL "${safeUrl}".`);
        }

        const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);

        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !url) {
            throw new Error(
                `The URL provided to ThyIconRegistry was not trusted as a resource URL ` +
                    `via Angular's DomSanitizer. Attempted URL was "${url}".`
            );
        }

        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        const inProgressFetch = this.inProgressUrlFetches.get(url);

        if (inProgressFetch) {
            return inProgressFetch;
        } else {
            // TODO(jelbourn): for some reason, the `finalize` operator "loses" the generic type on the
            // Observable. Figure out why and fix it.
            const req = this.httpClient.get(url, { responseType: 'text' }).pipe(
                finalize(() => this.inProgressUrlFetches.delete(url)),
                share()
            );

            this.inProgressUrlFetches.set(url, req);
            return req;
        }
    }

    private toSvgElement(element: Element): SVGElement {
        const svg = this.svgElementFromString('<svg></svg>');

        for (let i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType === this.document.ELEMENT_NODE) {
                svg.appendChild(element.childNodes[i].cloneNode(true));
            }
        }

        return svg;
    }

    private extractSvgIconFromIconSet(iconSet: SVGElement, iconName: string): SVGElement | null {
        // Use the `id="iconName"` syntax in order to escape special
        // characters in the ID (versus using the #iconName syntax).
        const iconSource = iconSet.querySelector(`[id="${iconName}"]`);

        if (!iconSource) {
            return null;
        }

        // Clone the element and remove the ID to prevent multiple elements from being added
        // to the page with the same ID.
        const iconElement = iconSource.cloneNode(true) as Element;
        iconElement.removeAttribute('id');

        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconElement.nodeName.toLowerCase() === 'svg') {
            return this.setSvgAttributes(iconElement as SVGElement);
        }

        // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
        // that the same could be achieved by referring to it via <use href="#id">, however the <use>
        // tag is problematic on Firefox, because it needs to include the current page path.
        if (iconElement.nodeName.toLowerCase() === 'symbol') {
            return this.setSvgAttributes(this.toSvgElement(iconElement));
        }

        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        const svg = this.svgElementFromString('<svg></svg>');
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconElement);

        return this.setSvgAttributes(svg);
    }

    private extractIconWithNameFromIconSetConfigs(iconName: string, iconSetConfigs: SvgIconConfig[]): SVGElement | null {
        // Iterate backwards, so icon sets added later have precedence.
        for (let i = iconSetConfigs.length - 1; i >= 0; i--) {
            const config = iconSetConfigs[i];
            if (config.svgElement) {
                const foundIcon = this.extractSvgIconFromIconSet(config.svgElement, iconName);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    }

    private svgElementFromString(str: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = str;
        const svg = div.querySelector('svg') as SVGElement;

        if (!svg) {
            throw Error('<svg> tag not found');
        }

        return svg;
    }

    private setSvgAttributes(svg: SVGElement): SVGElement {
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '1em');
        svg.setAttribute('width', '1em');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
        return svg;
    }

    private createSvgElementForSingleIcon(responseText: string): SVGElement {
        const svg = this.svgElementFromString(responseText);
        this.setSvgAttributes(svg);
        return svg;
    }

    private loadSvgIconFromConfig(config: SvgIconConfig): Observable<SVGElement> {
        return this.fetchUrl(config.url).pipe(map(svgText => this.createSvgElementForSingleIcon(svgText)));
    }

    private loadSvgIconSetFromConfig(config: SvgIconConfig): Observable<SVGElement> {
        // If the SVG for this icon set has already been parsed, do nothing.
        if (config.svgElement) {
            return of(config.svgElement);
        }

        return this.fetchUrl(config.url).pipe(
            map(svgText => {
                // It is possible that the icon set was parsed and cached by an earlier request, so parsing
                // only needs to occur if the cache is yet unset.
                if (!config.svgElement) {
                    config.svgElement = this.svgElementFromString(svgText);
                }

                return config.svgElement;
            })
        );
    }

    private getSvgFromConfig(config: SvgIconConfig): Observable<SVGElement> {
        if (config.svgElement) {
            // We already have the SVG element for this icon, return a copy.
            return of(this.cloneSvg(config.svgElement));
        } else {
            // Fetch the icon from the config's URL, cache it, and return a copy.
            return this.loadSvgIconFromConfig(config).pipe(
                tap(svg => (config.svgElement = svg)),
                map(svg => this.cloneSvg(svg))
            );
        }
    }

    private getSvgFromIconSetConfigs(name: string, iconSetConfigs: SvgIconConfig[]): Observable<SVGElement> {
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        const namedIcon = this.extractIconWithNameFromIconSetConfigs(name, iconSetConfigs);

        if (namedIcon) {
            // We could cache namedIcon in svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return of(namedIcon);
        }

        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        const iconSetFetchRequests: Observable<SVGElement | null>[] = iconSetConfigs
            .filter(iconSetConfig => !iconSetConfig.svgElement)
            .map(iconSetConfig => {
                return this.loadSvgIconSetFromConfig(iconSetConfig).pipe(
                    catchError((err: HttpErrorResponse): Observable<SVGElement | null> => {
                        const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url);

                        // Swallow errors fetching individual URLs so the
                        // combined Observable won't necessarily fail.
                        console.error(`Loading icon set URL: ${url} failed: ${err.message}`);
                        return of(null);
                    })
                );
            });

        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return forkJoin(iconSetFetchRequests).pipe(
            map(() => {
                const foundIcon = this.extractIconWithNameFromIconSetConfigs(name, iconSetConfigs);

                if (!foundIcon) {
                    throw this.getIconNameNotFoundError(name);
                }

                return foundIcon;
            })
        );
    }

    private internalAddSvgIconConfig(namespace: string, iconName: string, config: SvgIconConfig): this {
        this.svgIconConfigs.set(this.buildIconKey(namespace, iconName), config);
        return this;
    }

    public buildIconKey(namespace: string, name: string) {
        return namespace + ':' + name;
    }

    public splitIconName(iconName: string): [string, string] {
        if (!iconName) {
            return ['', ''];
        }
        const parts = iconName.split(':');
        switch (parts.length) {
            case 1:
                return ['', parts[0]]; // Use default namespace.
            case 2:
                return <[string, string]>parts;
            default:
                throw Error(`Invalid icon name: "${iconName}"`);
        }
    }

    public addSvgIconSetInNamespace(namespace: string, url: SvgResourceUrl): this {
        url = isString(url) ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : url;
        return this.internalAddSvgIconSet(namespace, new SvgIconConfig(url));
    }

    /**
     * 添加SVG图标集，添加到默认命名空间
     */
    public addSvgIconSet(url: SvgResourceUrl): this {
        return this.addSvgIconSetInNamespace('', url);
    }

    public addSvgIconSetLiteralInNamespace(namespace: string, literal: SafeHtml): this {
        const sanitizedLiteral = this.sanitizer.sanitize(SecurityContext.HTML, literal);

        if (!sanitizedLiteral) {
            throw this.getIconFailedToSanitizeLiteralError(literal);
        }

        const svgElement = this.svgElementFromString(sanitizedLiteral);
        return this.internalAddSvgIconSet(namespace, new SvgIconConfig(svgElement));
    }

    public addSvgIconSetLiteral(literal: SafeHtml): this {
        return this.addSvgIconSetLiteralInNamespace('', literal);
    }

    /**
     * @description.en-us Registers an icon by URL in the specified namespace.
     * @description 添加单个SVG图标到指定的命名空间
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    public addSvgIconInNamespace(namespace: string, iconName: string, url: SvgResourceUrl): this {
        url = isString(url) ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : url;
        return this.internalAddSvgIconConfig(namespace, iconName, new SvgIconConfig(url));
    }

    /**
     * @description.en-us Registers an icon by URL in the default namespace.
     * @description 添加单个SVG图标
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    public addSvgIcon(iconName: string, url: SvgResourceUrl): this {
        return this.addSvgIconInNamespace('', iconName, url);
    }

    /**
     * @description.en-us Registers an icon using an HTML string in the default namespace.
     * @description 添加单个SVG图标字符串，直接传入 SVG HTML 字符串
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    public addSvgIconLiteral(iconName: string, literal: SvgHtml): this {
        return this.addSvgIconLiteralInNamespace('', iconName, literal);
    }

    /**
     * @description.en-us Registers an icon using an HTML string in the specified namespace.
     * @description 添加单个SVG图标字符串到指定的命名空间，直接传入 SVG HTML 字符串
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    public addSvgIconLiteralInNamespace(namespace: string, iconName: string, literal: SvgHtml): this {
        literal = isString(literal) ? this.sanitizer.bypassSecurityTrustHtml(literal) : literal;
        const sanitizedLiteral = this.sanitizer.sanitize(SecurityContext.HTML, literal);

        if (!sanitizedLiteral) {
            throw this.getIconFailedToSanitizeLiteralError(literal);
        }

        const svgElement = this.createSvgElementForSingleIcon(sanitizedLiteral);
        return this.internalAddSvgIconConfig(namespace, iconName, new SvgIconConfig(svgElement));
    }

    public getDefaultFontSetClass() {
        return this.defaultFontSetClass;
    }

    public getFontSetClassByAlias(fontSet: string) {
        return fontSet;
    }

    /**
     * 获取某个图标
     */
    public getSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
        // Return (copy of) cached icon if possible.
        const key = this.buildIconKey(namespace, name);
        const config = this.svgIconConfigs.get(key);

        if (config) {
            return this.getSvgFromConfig(config);
        }

        // See if we have any icon sets registered for the namespace.
        const iconSetConfigs = this.svgIconSetConfigs.get(namespace);

        if (iconSetConfigs) {
            return this.getSvgFromIconSetConfigs(name, iconSetConfigs);
        }

        return throwError(this.getIconNameNotFoundError(key));
    }

    public setIconMode(mode: IconMode) {
        this.internalIconMode = mode;
    }
}
