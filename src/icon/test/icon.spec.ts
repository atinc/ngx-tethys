import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { generateRandomStr } from 'ngx-tethys/util';
import { of } from 'rxjs';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, DebugElement, inject as coreInject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';

import { getWhetherPrintErrorWhenIconNotFound, setPrintErrorWhenIconNotFound } from '../config';
import { ThyIconRegistry } from '../icon-registry';
import { ThyIcon } from '../icon.component';
import { ThyIconModule } from '../icon.module';

@Component({
    template: `
        <thy-icon
            [thyIconName]="iconName"
            [thyIconLinearGradient]="linearGradient"
            [thyIconType]="iconType"
            [thyIconRotate]="rotate"
            [thyIconLegging]="legging"
            [thyTwotoneColor]="twotoneColor"
            [thyIconSet]="iconSet"></thy-icon>
    `
})
class ThyIconTestBasicComponent {
    iconRegistry = coreInject(ThyIconRegistry);

    iconName = 'check';
    iconType = '';
    legging = false;
    linearGradient = false;
    rotate: number;
    twotoneColor: string;
    iconSet: string;
}

describe('ThyIconComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyIconTestBasicComponent],
            imports: [ThyIconModule],
            providers: [bypassSanitizeProvider, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('Basic', () => {
        let fixture: ComponentFixture<ThyIconTestBasicComponent>;
        let componentInstance: ThyIconTestBasicComponent;
        let iconDebugElement: DebugElement;
        const iconSvgClassPrefix = 'thy-icon';

        function assertSvgIcon(iconElement: HTMLElement, iconName: string, classSuffix?: 'fill' | 'tt') {
            expect(iconElement.classList.contains(iconSvgClassPrefix)).toBeTruthy();
            const expectClass = classSuffix ? `${iconSvgClassPrefix}-${iconName}-${classSuffix}` : `${iconSvgClassPrefix}-${iconName}`;
            expect(iconElement.classList.contains(expectClass)).toBeTruthy(
                `expect class ${expectClass}, actual classList is ${iconElement.classList}`
            );
            const svgElement = iconElement.querySelector('svg');
            expect(svgElement).toBeTruthy();
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyIconTestBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            iconDebugElement = fixture.debugElement.query(By.directive(ThyIcon));
        });

        it('should create icon success', () => {
            expect(iconDebugElement.componentInstance).toBeTruthy();
            assertSvgIcon(iconDebugElement.nativeElement, 'check');
        });

        it('should set new icon success', () => {
            const oldIconName = componentInstance.iconName;
            componentInstance.iconName = 'close';
            fixture.detectChanges();
            assertSvgIcon(iconDebugElement.nativeElement, 'close');
            expect(fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${oldIconName}`)).toBeFalsy();
        });

        it('should set icon type success', () => {
            componentInstance.iconType = 'fill';
            fixture.detectChanges();
            assertSvgIcon(iconDebugElement.nativeElement, 'check', 'fill');

            componentInstance.iconType = 'twotone';
            fixture.detectChanges();
            assertSvgIcon(iconDebugElement.nativeElement, 'check', 'tt');
        });

        it('should set thyIconLegging success', () => {
            componentInstance.legging = true;
            fixture.detectChanges();
            assertSvgIcon(iconDebugElement.nativeElement, 'check');
            expect(iconDebugElement.nativeElement.classList.contains(`${iconSvgClassPrefix}-legging`)).toBeTruthy();

            componentInstance.legging = false;
            fixture.detectChanges();
            expect(iconDebugElement.nativeElement.classList.contains(`${iconSvgClassPrefix}-legging`)).toBeFalsy();
        });

        it('should set linearGradient success', () => {
            componentInstance.iconName = 'filter';
            componentInstance.linearGradient = true;
            fixture.detectChanges();
            const svgElement: HTMLElement = iconDebugElement.nativeElement.querySelector('svg');
            expect(svgElement).toBeTruthy();
            expect(svgElement.querySelector('title')).toBeFalsy();
        });

        it('should set rotate success', () => {
            componentInstance.rotate = 90;
            fixture.detectChanges();
            assertSvgIcon(iconDebugElement.nativeElement, 'check');
            const svgElement: HTMLElement = iconDebugElement.nativeElement.querySelector('svg');
            expect(svgElement).toBeTruthy();
            expect(svgElement.style.transform).toEqual(`rotate(90deg)`);
        });

        it('should set twotone success', () => {
            componentInstance.iconType = 'twotone';
            componentInstance.iconName = 'sort-tt';
            componentInstance.twotoneColor = '#66666';
            fixture.detectChanges();

            const svgElement: HTMLElement = iconDebugElement.nativeElement.querySelector('svg');
            expect(svgElement).toBeTruthy();
            const ttPathElement = svgElement.querySelector('#sort-secondary-color');
            expect(ttPathElement).toBeTruthy();
            expect(ttPathElement.getAttribute('fill')).toBe('#66666');
        });

        it('should set icon mode to font', () => {
            const iconRegistry = TestBed.inject(ThyIconRegistry);
            iconRegistry.setIconMode('font');
            componentInstance.iconName = 'inbox';
            fixture.detectChanges();
            expect(iconDebugElement.componentInstance).toBeTruthy();
            const iconElement: HTMLElement = iconDebugElement.nativeElement;
            expect(iconElement.classList.contains('wt-icon'));
            expect(iconElement.classList.contains('wt-icon-inbox'));
            iconRegistry.setIconMode('svg');
        });

        it('should set icon mode to font and custom iconSet', () => {
            const iconRegistry = TestBed.inject(ThyIconRegistry);
            iconRegistry.setIconMode('font');
            componentInstance.iconName = 'inbox';
            componentInstance.iconSet = 'myset';
            fixture.detectChanges();
            expect(iconDebugElement.componentInstance).toBeTruthy();
            const iconElement: HTMLElement = iconDebugElement.nativeElement;
            expect(iconElement.classList.contains('myset-icon'));
            expect(iconElement.classList.contains('myset-icon-inbox'));
            iconRegistry.setIconMode('svg');
        });
    });
});

describe('IconRegistry', () => {
    let iconRegistry: ThyIconRegistry;
    let domSanitizer: DomSanitizer;
    let svgRandomName: string;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ThyIconModule],
            providers: [
                bypassSanitizeProvider,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });
        TestBed.compileComponents();
        iconRegistry = TestBed.inject(ThyIconRegistry);
        domSanitizer = TestBed.inject(DomSanitizer);
        svgRandomName = generateRandomStr();
    });

    function createFakeSvg(name: string) {
        const svg = `<svg id="${name}"><path name="${name}"></path></svg>`;
        return svg;
    }

    function createFakeSvgSymbol(name: string) {
        const svg = `<symbol id="${name}"><path name="${name}"></path></symbol>`;
        return svg;
    }

    function createRandomUrl() {
        return `http://127.0.0.1/svg/${generateRandomStr()}`;
    }

    function assertSvgElement(svg: SVGElement, name: string) {
        expect(svg).toBeTruthy();
        expect(svg.getAttribute('width')).toBe('1em');
        expect(svg.getAttribute('height')).toBe('1em');
        expect(svg.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
        expect(svg.querySelector('path').getAttribute('name')).toEqual(name);
    }

    function assertGetSvgIconSuccess(name: string, namespace?: string) {
        const spy = jasmine.createSpy('get svg icon success spy');
        iconRegistry.getSvgIcon(name, namespace).subscribe(spy);
        expect(spy).toHaveBeenCalled();
        const callArgs = spy.calls.argsFor(0);
        assertSvgElement(callArgs[0], name);
    }

    function assertGetSvgIconFail(name: string, namespace?: string) {
        const spy = jasmine.createSpy('get svg icon success spy');
        const failSpy = jasmine.createSpy('get svg icon fail spy');
        iconRegistry.getSvgIcon(name, namespace).subscribe(spy, failSpy);
        expect(spy).not.toHaveBeenCalled();
        expect(failSpy).toHaveBeenCalled();
        expect(failSpy.calls.argsFor(0)[0].message).toBe(`Unable to find icon with the name ":${name}"`);
    }

    it('should create success', () => {
        expect(iconRegistry).toBeTruthy();
    });

    it('should addSvgIconLiteral success', () => {
        const svg = createFakeSvg(svgRandomName);
        iconRegistry.addSvgIconLiteral(svgRandomName, domSanitizer.bypassSecurityTrustHtml(svg));
        assertGetSvgIconSuccess(svgRandomName);
    });

    it('should addSvgIconLiteral success when url is not trusted url', () => {
        const svg = createFakeSvg(svgRandomName);
        iconRegistry.addSvgIconLiteral(svgRandomName, svg);
        assertGetSvgIconSuccess(svgRandomName);
    });

    it('should addSvgIconLiteralInNamespace success', () => {
        const svg = createFakeSvg(svgRandomName);
        iconRegistry.addSvgIconLiteralInNamespace('nsp1', svgRandomName, domSanitizer.bypassSecurityTrustHtml(svg));

        assertGetSvgIconSuccess(svgRandomName, 'nsp1');
        assertGetSvgIconFail(svgRandomName);
    });

    it('should addSvgIconLiteralInNamespace success  when url is not trusted url', () => {
        const svg1Name = generateRandomStr();
        const svg2Name = generateRandomStr();
        const svg1 = createFakeSvg(svg1Name);
        const svg2 = createFakeSvg(svg2Name);
        const url = createRandomUrl();

        iconRegistry.addSvgIconLiteralInNamespace('nsp1', svg1Name, svg1);
        iconRegistry.addSvgIconLiteralInNamespace('nsp1', svg2Name, svg2);
        assertGetSvgIconSuccess(svg1Name, 'nsp1');
        assertGetSvgIconSuccess(svg2Name, 'nsp1');
        assertGetSvgIconFail(svg1Name);
        assertGetSvgIconFail(svg2Name);
    });

    it('should addSvgIcon success', () => {
        const svg = createFakeSvg(svgRandomName);
        const url = createRandomUrl();
        iconRegistry.addSvgIcon(svgRandomName, domSanitizer.bypassSecurityTrustResourceUrl(url));
        httpClientSpy.get.and.returnValue(of(svg));
        assertGetSvgIconSuccess(svgRandomName);
    });

    it('should addSvgIcon fail when url is null', () => {
        expect(() => {
            iconRegistry.addSvgIcon(svgRandomName, null);
            iconRegistry.getSvgIcon(svgRandomName).subscribe();
        }).toThrowError(`Cannot fetch icon from URL "${null}".`);
    });

    it('should addSvgIconSet success', () => {
        const svg1Name = generateRandomStr();
        const svg2Name = generateRandomStr();
        const svg1 = createFakeSvg(svg1Name);
        const svg2 = createFakeSvg(svg2Name);
        const url = createRandomUrl();
        iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(url));
        httpClientSpy.get.and.returnValue(of(`<svg><defs>${svg1}${svg2}</defs></svg>`));
        assertGetSvgIconSuccess(svg2Name);
    });

    it('should addSvgIconSet success when url is not trusted url', () => {
        const svg1Name = generateRandomStr();
        const svg1 = createFakeSvg(svg1Name);
        const url = createRandomUrl();
        iconRegistry.addSvgIconSet(url);
        httpClientSpy.get.and.returnValue(of(`<svg><defs>${svg1}</defs></svg>`));
        assertGetSvgIconSuccess(svg1Name);
    });

    it('should addSvgIconSet success for symbol', () => {
        const symbol1Name = generateRandomStr();
        const symbol2Name = generateRandomStr();
        const symbol1 = createFakeSvgSymbol(symbol1Name);
        const symbol2 = createFakeSvgSymbol(symbol2Name);
        const url = createRandomUrl();
        iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(url));
        httpClientSpy.get.and.returnValue(of(`<svg>${symbol1}${symbol2}</svg>`));
        assertGetSvgIconSuccess(symbol1Name);
        assertGetSvgIconSuccess(symbol2Name);
    });

    it('should addSvgIconSetInNamespace success', () => {
        const svg1Name = generateRandomStr();
        const svg2Name = generateRandomStr();
        const svg1 = createFakeSvg(svg1Name);
        const svg2 = createFakeSvg(svg2Name);
        const url = createRandomUrl();
        iconRegistry.addSvgIconSetInNamespace('nps2', domSanitizer.bypassSecurityTrustResourceUrl(url));
        httpClientSpy.get.and.returnValue(of(`<svg><defs>${svg1}${svg2}</defs></svg>`));
        assertGetSvgIconSuccess(svg1Name, 'nps2');
        assertGetSvgIconSuccess(svg2Name, 'nps2');
        assertGetSvgIconFail(svg1Name);
        assertGetSvgIconFail(svg2Name);
    });

    it('should addSvgIconSetInNamespace success  when url is not trusted url', () => {
        const svg1Name = generateRandomStr();
        const svg2Name = generateRandomStr();
        const svg1 = createFakeSvg(svg1Name);
        const svg2 = createFakeSvg(svg2Name);
        const url = createRandomUrl();
        iconRegistry.addSvgIconSetInNamespace('nps3', url);
        httpClientSpy.get.and.returnValue(of(`<svg><defs>${svg1}${svg2}</defs></svg>`));
        assertGetSvgIconSuccess(svg1Name, 'nps3');
        assertGetSvgIconSuccess(svg2Name, 'nps3');
        assertGetSvgIconFail(svg1Name);
        assertGetSvgIconFail(svg2Name);
    });

    describe('splitIconName', () => {
        it('should split icon name success use default namespace', () => {
            const [namespace, name] = iconRegistry.splitIconName(svgRandomName);
            expect(namespace).toEqual('');
            expect(name).toEqual(svgRandomName);
        });

        it('should split icon name success with namespace', () => {
            const [namespace, name] = iconRegistry.splitIconName(`nsp3:${svgRandomName}`);
            expect(namespace).toEqual('nsp3');
            expect(name).toEqual(svgRandomName);
        });

        it('should split icon name success with empty', () => {
            const [namespace, name] = iconRegistry.splitIconName(``);
            expect(namespace).toEqual('');
            expect(name).toEqual('');
        });

        it('should throw error when split icon name invalid', () => {
            expect(() => {
                iconRegistry.splitIconName(`nsp3:${svgRandomName}:hello`);
            }).toThrowError(`Invalid icon name: "nsp3:${svgRandomName}:hello"`);
        });
    });
});

describe('Config', () => {
    let originalWhetherPrintErrorWhenIconNotFound: boolean;

    beforeEach(() => {
        originalWhetherPrintErrorWhenIconNotFound = getWhetherPrintErrorWhenIconNotFound();
    });

    afterEach(() => {
        setPrintErrorWhenIconNotFound(originalWhetherPrintErrorWhenIconNotFound);
    });

    it('should set print error when icon not found success', () => {
        setPrintErrorWhenIconNotFound(true);
        expect(getWhetherPrintErrorWhenIconNotFound()).toEqual(true);
        setPrintErrorWhenIconNotFound(false);
        expect(getWhetherPrintErrorWhenIconNotFound()).toEqual(false);
    });
});
