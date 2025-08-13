import { Component, OnInit, ViewChild, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { useElementRenderer } from '@tethys/cdk/dom';

@Component({
    selector: 'thy-dom-use-element-renderer-test',
    template: '<div #container></div>'
})
export class ThyDomUseElementRendererTestComponent implements OnInit {
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

    containerRenderer = useElementRenderer();

    constructor() {}

    ngOnInit(): void {
        this.containerRenderer.setElement(this.container.nativeElement);
        // 必须在之前调用 setElement 设置 Element 元素
        this.containerRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.containerRenderer.setStyle('color', '#000');
    }
}

@Component({
    selector: 'thy-dom-use-element-renderer-without-element-test',
    template: '<div #container></div>'
})
export class ThyDomElementRendererWithoutElementTestComponent implements OnInit {
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

    containerRenderer = useElementRenderer();

    constructor() {}

    ngOnInit(): void {
        this.containerRenderer.updateClass(['thy-button', 'thy-button-primary']);
    }
}

describe('element-renderer', () => {
    let fixture: ComponentFixture<ThyDomUseElementRendererTestComponent> | undefined = undefined;
    let debugElement: DebugElement | undefined = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        fixture = TestBed.createComponent(ThyDomUseElementRendererTestComponent);
        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('div'));
    });

    it('should set class and style useElementRenderer in component', () => {
        expect(debugElement).toBeTruthy();
        const divElement = debugElement.nativeElement as HTMLElement;
        expect(divElement.classList.contains('thy-button')).toBeTruthy();
        expect(divElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(divElement.style.color).toEqual('rgb(0, 0, 0)');
    });

    it('should set new classes and remove old classes', () => {
        const divElement = debugElement.nativeElement as HTMLElement;
        fixture.componentInstance.containerRenderer.updateClass(['thy-new-class', 'thy-button-primary']);
        expect(divElement.classList.contains('thy-button')).toBeFalsy();
        expect(divElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(divElement.classList.contains('thy-new-class')).toBeTruthy();
    });

    it('should set new classes and remove old classes by map', () => {
        const divElement = debugElement.nativeElement as HTMLElement;
        fixture.componentInstance.containerRenderer.updateClassByMap({
            'thy-new-class': true,
            'thy-button-primary': true
        });
        expect(divElement.classList.contains('thy-button')).toBeFalsy();
        expect(divElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(divElement.classList.contains('thy-new-class')).toBeTruthy();
    });

    it('should throw error when element is not set', () => {
        expect(() => {
            fixture = TestBed.createComponent(ThyDomElementRendererWithoutElementTestComponent);
            fixture.detectChanges();
        }).toThrowError('Element is null, should call setElement method for ElementRenderer before update dom.');
    });
});
