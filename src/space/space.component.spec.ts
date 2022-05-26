import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceComponent, ThySpaceModule } from 'ngx-tethys/space';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'test-space-basic',
    template: `
        <thy-space [thyAlign]="align" [thyVertical]="vertical">
            <button *thySpaceItem thyButton="primary">Button1</button>
            <button *thySpaceItem thyButton="info">Button2</button>
            <ng-container *ngIf="dynamicShow">
                <button *thySpaceItem thyButton="info">Button3</button>
            </ng-container>
        </thy-space>
    `
})
class TestBasicComponent {
    dynamicShow = false;
    align: string;
    vertical = false;
}

@Component({
    selector: 'test-space-size',
    template: `
        <thy-space [thySize]="size">
            <button *thySpaceItem thyButton="primary">Button1</button>
            <button *thySpaceItem thyButton="info">Button2</button>
        </thy-space>
    `
})
class TestSizeComponent {
    size: string | number = 'md';
}

describe('space', () => {
    function assertSpaceSize(spaceElement: HTMLElement, size: number) {
        const items = spaceElement.querySelectorAll('.thy-space-item');
        expect(items).toBeTruthy();

        items.forEach((item: HTMLElement, index: number) => {
            expect(item.style.marginRight).toEqual(index === items.length - 1 ? '' : `${size}px`);
        });
    }

    describe('basic', () => {
        let fixture: ComponentFixture<TestBasicComponent>;
        let spaceDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestBasicComponent],
                imports: [ThyButtonModule, ThySpaceModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicComponent);
            spaceDebugElement = fixture.debugElement.query(By.directive(ThySpaceComponent));
            fixture.detectChanges();
        });

        it('should create space success', () => {
            expect(fixture).toBeTruthy();
            expect(spaceDebugElement).toBeTruthy();
            const element: HTMLElement = spaceDebugElement.nativeElement;
            expect(element).toBeTruthy();
            expect(element.classList.contains('thy-space')).toBeTruthy();
            const items = element.querySelectorAll('.thy-space-item');
            expect(items).toBeTruthy();
            expect(items.length).toEqual(2);
            expect(items[0].textContent).toContain('Button1');
            expect(items[1].textContent).toContain('Button2');
            expect(items[0].textContent).toContain('Button1');
            expect(items[0].querySelector('button')).toBeTruthy();
            expect(items[1].querySelector('button')).toBeTruthy();
            assertSpaceSize(element, 15);
        });

        it('should dynamic add space item success', () => {
            fixture.componentInstance.dynamicShow = true;
            fixture.detectChanges();
            const element: HTMLElement = spaceDebugElement.nativeElement;
            const items = element.querySelectorAll('.thy-space-item');
            expect(items).toBeTruthy();
            expect(items.length).toEqual(3);
        });

        it('should set algin success', () => {
            ['start', 'end', 'center', 'baseline'].forEach(align => {
                fixture.componentInstance.align = align;
                fixture.detectChanges();
                const element: HTMLElement = spaceDebugElement.nativeElement;
                expect(element.classList.contains(`align-items-${align}`)).toBeTruthy();
            });
        });

        it('should set thyVertical success', () => {
            fixture.componentInstance.vertical = true;
            fixture.detectChanges();
            const element: HTMLElement = spaceDebugElement.nativeElement;
            expect(element.classList.contains(`thy-space-vertical`)).toBeTruthy();
        });
    });

    describe('size', () => {
        let fixture: ComponentFixture<TestSizeComponent>;
        let spaceDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSizeComponent],
                imports: [ThyButtonModule, ThySpaceModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSizeComponent);
            spaceDebugElement = fixture.debugElement.query(By.directive(ThySpaceComponent));
            fixture.detectChanges();
        });

        it('should set size success', () => {
            const sizes = [
                {
                    value: 'zero',
                    space: 0
                },
                {
                    value: 'xs',
                    space: 5
                },
                {
                    value: 'sm',
                    space: 10
                },
                {
                    value: 'md',
                    space: 15
                },
                {
                    value: 'lg',
                    space: 20
                }
            ];
            sizes.forEach(size => {
                fixture.componentInstance.size = size.value;
                fixture.detectChanges();
                const element: HTMLElement = spaceDebugElement.nativeElement;
                assertSpaceSize(element, size.space);
            });
        });

        it('should set custom size 60px success', () => {
            fixture.componentInstance.size = 60;
            fixture.detectChanges();
            const element: HTMLElement = spaceDebugElement.nativeElement;
            assertSpaceSize(element, 60);
        });

        it('should use default size md when size is invalid', () => {
            fixture.componentInstance.size = 'md-invalid';
            fixture.detectChanges();
            const element: HTMLElement = spaceDebugElement.nativeElement;
            assertSpaceSize(element, 15);
        });
    });
});
