import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyIconModule } from 'ngx-tethys/icon';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyPopoverBody, ThyPopoverHeader } from '../index';
import { ThyPopoverModule } from '../module';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-popover-header-basic',
    template: '<thy-popover-header thyTitle="I am popover header" (thyClosed)="close()"></thy-popover-header>',
    standalone: false
})
class PopoverHeaderBasicComponent {
    close() {}
}

@Component({
    selector: 'thy-popover-header-translation',
    template: '<thy-popover-header thyTitleTranslationKey="Translation Key Title"></thy-popover-header>',
    standalone: false
})
class PopoverHeaderTranslationComponent {}

@Component({
    selector: 'thy-popover-header-template-basic',
    template: `
        <thy-popover-header>
            <ng-template #popoverHeader>
                <div class="header-template">我是自定义头部模板</div>
                <button type="button" class="close" (click)="close($event)">
                    <thy-icon thyIconName="close"></thy-icon>
                </button>
            </ng-template>
        </thy-popover-header>
    `,
    standalone: false
})
class PopoverHeaderTemplateBasicComponent {
    close() {}
}

@Component({
    selector: 'thy-popover-body-basic',
    template: '<thy-popover-body></thy-popover-body>',
    standalone: false
})
class PopoverBodyBasicComponent {}

describe('popover-layout', () => {
    describe('popover-header', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                declarations: [PopoverHeaderBasicComponent],
                providers: [provideHttpClient()]
            });
            TestBed.compileComponents();
        });

        let popoverBasicFixture: ComponentFixture<PopoverHeaderBasicComponent>;
        let popoverHeaderDebugElement: DebugElement;
        let popoverHeaderElement: HTMLElement;

        beforeEach(() => {
            popoverBasicFixture = TestBed.createComponent(PopoverHeaderBasicComponent);
            popoverBasicFixture.detectChanges();
            popoverHeaderDebugElement = popoverBasicFixture.debugElement.query(By.directive(ThyPopoverHeader));
            popoverHeaderElement = popoverHeaderDebugElement.nativeElement;
        });

        it('should create', () => {
            expect(popoverBasicFixture).toBeTruthy();
            expect(popoverHeaderDebugElement).toBeTruthy();
            expect(popoverHeaderElement).toBeTruthy();
        });

        it('should has correct DOM structure', () => {
            expect(popoverHeaderElement.childElementCount).toEqual(2);
            expect(popoverHeaderElement.classList).toContain('thy-popover-header');

            const thyTitleNode = popoverHeaderElement.children[0];
            expect(thyTitleNode.nodeName).toEqual('H5');
            expect(thyTitleNode.nodeType).toEqual(1);
            expect(thyTitleNode.childElementCount).toEqual(0);
            expect(thyTitleNode.classList).toContain('thy-popover-title');

            const closeButtonNode = popoverHeaderElement.children[1];
            expect(closeButtonNode.nodeName).toEqual('BUTTON');
            expect(closeButtonNode.nodeType).toEqual(1);
            expect(closeButtonNode.childElementCount).toEqual(1);
            expect(closeButtonNode.classList).toContain('close');
            expect(closeButtonNode.attributes['type'].nodeValue).toEqual('button');

            const closeIconNode = closeButtonNode.children[0];
            expect(closeIconNode.childElementCount).toEqual(0);
            expect(closeIconNode.nodeName).toEqual('THY-ICON');
            expect(closeIconNode.nodeType).toEqual(1);
            expect(closeIconNode.attributes['thyiconname'].nodeValue).toEqual('close');
        });

        it('should has correct title', () => {
            expect(popoverHeaderElement.textContent.includes('I am popover header')).toBeTruthy();
        });

        it('should support thyClosed', () => {
            const closeSpy = jasmine.createSpy('after thyClosed subscribe spy');
            popoverHeaderDebugElement.componentInstance.thyClosed.subscribe(() => {
                closeSpy();
            });

            const closeButton = popoverBasicFixture.nativeElement.querySelector('.close');
            closeButton.click();
            popoverBasicFixture.detectChanges();
            expect(closeSpy).toHaveBeenCalled();
        });
    });

    describe('popover-header-translation', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                declarations: [PopoverHeaderTranslationComponent],
                providers: [provideHttpClient()]
            }).compileComponents();
        });

        let fixture: ComponentFixture<PopoverHeaderTranslationComponent>;
        let popoverHeaderElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(PopoverHeaderTranslationComponent);
            fixture.detectChanges();
            popoverHeaderElement = fixture.debugElement.query(By.directive(ThyPopoverHeader)).nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(popoverHeaderElement).toBeTruthy();
        });

        it('should show thyTitle when popover header only set thyTitleTranslationKey', () => {
            expect(popoverHeaderElement.textContent.includes('Translation Key Title')).toBeTruthy();
        });
    });

    describe('popover-body', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule],
                declarations: [PopoverBodyBasicComponent],
                providers: [provideHttpClient()]
            });
            TestBed.compileComponents();
        });

        let popoverBasicFixture: ComponentFixture<PopoverBodyBasicComponent>;
        let popoverBodyDebugElement: DebugElement;
        let popoverBodyElement: HTMLElement;

        beforeEach(() => {
            popoverBasicFixture = TestBed.createComponent(PopoverBodyBasicComponent);
            popoverBasicFixture.detectChanges();
            popoverBodyDebugElement = popoverBasicFixture.debugElement.query(By.directive(ThyPopoverBody));
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

    describe('popover-header-template', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyPopoverModule, ThyIconModule],
                declarations: [PopoverHeaderTemplateBasicComponent],
                providers: [provideHttpClient()]
            });
            TestBed.compileComponents();
        });

        let fixture: ComponentFixture<PopoverHeaderTemplateBasicComponent>;
        let popoverHeaderDebugElement: DebugElement;
        let popoverHeaderElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(PopoverHeaderTemplateBasicComponent);
            fixture.detectChanges();
            popoverHeaderDebugElement = fixture.debugElement.query(By.directive(ThyPopoverHeader));
            popoverHeaderElement = popoverHeaderDebugElement.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(popoverHeaderDebugElement).toBeTruthy();
            expect(popoverHeaderElement).toBeTruthy();
        });

        it('should have header when has header template', () => {
            fixture.detectChanges();
            const headerTemplate = fixture.debugElement.query(By.css('.header-template'));
            expect(headerTemplate).toBeTruthy();
            expect(headerTemplate.parent.nativeElement.innerText).toBe('我是自定义头部模板');
        });

        it('should have close', () => {
            const close = jasmine.createSpy('popover close');
            fixture.componentInstance.close = close;
            fixture.detectChanges();
            clickClose();
            expect(close).toHaveBeenCalled();
        });

        function clickClose() {
            fixture.detectChanges();
            const closeElement = fixture.debugElement.nativeElement.querySelector('.close');
            dispatchMouseEvent(closeElement, 'click');
            fixture.detectChanges();
        }
    });
});
