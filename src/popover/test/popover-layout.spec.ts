import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyPopoverBodyComponent, ThyPopoverHeaderComponent } from '../index';
import { ThyPopoverModule } from '../module';

@Component({
    selector: 'popover-header-basic',
    template: '<thy-popover-header thyTitle="I am popover header"></thy-popover-header>'
})
class PopoverHeaderBasicComponent {}

@Component({
    selector: 'popover-body-basic',
    template: '<thy-popover-body></thy-popover-body>'
})
class PopoverBodyBasicComponent {}

describe('popover-layout', () => {
    describe('popover-header', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                declarations: [PopoverHeaderBasicComponent]
            });
            TestBed.compileComponents();
        });

        let popoverBasicFixture: ComponentFixture<PopoverHeaderBasicComponent>;
        let popoverHeaderDebugElement: DebugElement;
        let popoverHeaderElement: HTMLElement;

        beforeEach(() => {
            popoverBasicFixture = TestBed.createComponent(PopoverHeaderBasicComponent);
            popoverBasicFixture.detectChanges();
            popoverHeaderDebugElement = popoverBasicFixture.debugElement.query(By.directive(ThyPopoverHeaderComponent));
            popoverHeaderElement = popoverHeaderDebugElement.nativeElement;
        });

        it('should create', () => {
            expect(popoverBasicFixture).toBeTruthy();
            expect(popoverHeaderDebugElement).toBeTruthy();
            expect(popoverHeaderElement).toBeTruthy();
        });

        it('should has correct DOM structure', () => {
            const thyPopoverHeaderNode = popoverHeaderElement.children[0];
            expect(thyPopoverHeaderNode.childElementCount).toEqual(2);
            expect(thyPopoverHeaderNode.classList).toContain('thy-popover-header');

            const thyTitleNode = thyPopoverHeaderNode.children[0];
            expect(thyTitleNode.nodeName).toEqual('H5');
            expect(thyTitleNode.nodeType).toEqual(1);
            expect(thyTitleNode.childElementCount).toEqual(0);
            expect(thyTitleNode.classList).toContain('thy-popover-title');

            const closeButtonNode = thyPopoverHeaderNode.children[1];
            expect(closeButtonNode.nodeName).toEqual('BUTTON');
            expect(closeButtonNode.nodeType).toEqual(1);
            expect(closeButtonNode.childElementCount).toEqual(1);
            expect(closeButtonNode.classList).toContain('close');
            expect(closeButtonNode.attributes['type'].nodeValue).toEqual('button');

            const closeIconNode = closeButtonNode.children[0];
            expect(closeIconNode.childElementCount).toEqual(0);
            expect(closeIconNode.nodeName).toEqual('THY-ICON');
            expect(closeIconNode.nodeType).toEqual(1);
            expect(closeIconNode.attributes['thyiconname'].nodeValue).toEqual('close-bold');
        });

        it('should has correct title', () => {
            expect(popoverHeaderElement.textContent.includes('I am popover header')).toBeTruthy();
        });
    });

    describe('popover-body', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                declarations: [PopoverBodyBasicComponent]
            });
            TestBed.compileComponents();
        });

        let popoverBasicFixture: ComponentFixture<PopoverBodyBasicComponent>;
        let popoverBodyDebugElement: DebugElement;
        let popoverBodyElement: HTMLElement;

        beforeEach(() => {
            popoverBasicFixture = TestBed.createComponent(PopoverBodyBasicComponent);
            popoverBasicFixture.detectChanges();
            popoverBodyDebugElement = popoverBasicFixture.debugElement.query(By.directive(ThyPopoverBodyComponent));
            popoverBodyElement = popoverBodyDebugElement.nativeElement;
        });

        it('should create', () => {
            expect(popoverBasicFixture).toBeTruthy();
            expect(popoverBodyDebugElement).toBeTruthy();
            expect(popoverBodyElement).toBeTruthy();
        });

        it('should has correct DOM structure and class', () => {
            expect(popoverBodyElement.childElementCount).toEqual(0);
            expect(popoverBodyElement.classList).toContain('thy-popover-body');
        });
    });
});
