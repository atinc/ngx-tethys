import { Component, OnInit, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostRenderer, useHostRenderer } from '@tethys/cdk/dom';

@Component({
    selector: 'thy-dom-host-renderer-test',
    template: 'Content',
    providers: [HostRenderer]
})
export class ThyDomHostRendererTestComponent implements OnInit {
    hostRenderer = inject(HostRenderer);

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}

@Component({
    selector: 'thy-dom-use-host-renderer-test',
    template: 'Content'
})
export class ThyDomUseHostRendererTestComponent implements OnInit {
    hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}

describe('host-renderer', () => {
    let fixture: ComponentFixture<ThyDomUseHostRendererTestComponent> | undefined = undefined;
    let hostElement: HTMLElement | undefined = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        fixture = TestBed.createComponent(ThyDomUseHostRendererTestComponent);
        fixture.detectChanges();
        hostElement = fixture.debugElement.nativeElement;
    });

    it('should set class and style for useHostRenderer', () => {
        expect(hostElement).toBeTruthy();
        expect(hostElement.classList.contains('thy-button')).toBeTruthy();
        expect(hostElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(hostElement.style.color).toEqual('rgb(0, 0, 0)');
    });

    it('should set new classes and remove old classes', () => {
        fixture.componentInstance.hostRenderer.updateClass(['thy-new-class', 'thy-button-primary']);
        expect(hostElement.classList.contains('thy-button')).toBeFalsy();
        expect(hostElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(hostElement.classList.contains('thy-new-class')).toBeTruthy();
    });

    it('should set new classes and remove old classes by map', () => {
        fixture.componentInstance.hostRenderer.updateClassByMap({
            'thy-new-class': true,
            'thy-button-primary': true
        });
        expect(hostElement.classList.contains('thy-button')).toBeFalsy();
        expect(hostElement.classList.contains('thy-button-primary')).toBeTruthy();
        expect(hostElement.classList.contains('thy-new-class')).toBeTruthy();
    });
});
