import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThySegmentedComponent, ThySegmentedEvent, ThySegmentedModule, ThySegmentedSize } from 'ngx-tethys/segmented';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThySegmentedMode } from '../segmented.component';
import { thySegmentedCustomOption, thySegmentedOption } from '../types';

@Component({
    selector: 'test-segmented-basic',
    template: `
        <thy-segmented [thyOptions]="options" (thyOptionSelect)="selectedChange($event)"></thy-segmented>
    `
})
class TestSegmentedBasicComponent {
    options: thySegmentedCustomOption = [
        { value: 1, labelText: '成员' },
        { value: 2, labelText: '部门' },
        { value: 3, labelText: '用户组' }
    ];

    selectedChange(event: ThySegmentedEvent): void {}
}

@Component({
    selector: 'test-segmented-size',
    template: `
        <thy-segmented [thyOptions]="options" [thySize]="size"></thy-segmented>
    `
})
class TestSegmentedSizeComponent {
    options: thySegmentedCustomOption = [
        { value: 1, labelText: '成员' },
        { value: 2, labelText: '部门' },
        { value: 3, labelText: '用户组' }
    ];
    size: ThySegmentedSize | string = 'default';
}

@Component({
    selector: 'test-segmented-disabled',
    template: `
        <thy-segmented [thyOptions]="options" [thyDisabled]="disabled" (thyOptionSelect)="selectedChange($event)"></thy-segmented>
    `
})
class TestSegmentedDisabledComponent {
    disabled: boolean;
    options: thySegmentedCustomOption = [
        { value: 1, labelText: '成员' },
        { value: 2, labelText: '部门' },
        { value: 3, labelText: '用户组' }
    ];

    selectedChange(event: ThySegmentedEvent): void {}
}

@Component({
    selector: 'test-segmented-active',
    template: `
        <thy-segmented [thyOptions]="options" [thyActive]="index"></thy-segmented>
    `
})
class TestSegmentedActiveComponent {
    options: thySegmentedCustomOption = ['成员', '部门', '用户组'];
    index: number;
}

@Component({
    selector: 'test-segmented-mode',
    template: `
        <thy-segmented [thyOptions]="options" [thyMode]="mode"></thy-segmented>
    `
})
class TestSegmentedModeComponent {
    options: thySegmentedCustomOption = ['成员', '部门', '用户组'];
    mode: ThySegmentedMode = 'block';
}

@Component({
    selector: 'test-segmented-custom-template',
    template: `
        <thy-segmented [thyOptions]="options" [thyLabelTemplate]="customTemplate"></thy-segmented>

        <ng-template #temp1 let-item>
            <div style="padding:4px">
                <thy-avatar thySize="sm" [thyName]="item.avatar"></thy-avatar>
                <div class="text1">{{ item.labelText }}</div>
            </div>
        </ng-template>

        <ng-template #temp2 let-item let-index="index">
            <ng-container [ngSwitch]="index">
                <div style="padding:4px">
                    <ng-container *ngSwitchCase="2">
                        <thy-avatar thySize="sm" thyName="文明"></thy-avatar>
                        <div class="text2">⭐️文明⭐️</div>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                        <thy-avatar thySize="sm" [thyName]="item.avatar"></thy-avatar>
                        <div>{{ item.labelText }}</div>
                    </ng-container>
                </div>
            </ng-container>
        </ng-template>
    `
})
class TestSegmentedCustomTemplateComponent {
    @ViewChild('temp1') temp1: TemplateRef<any>;

    @ViewChild('temp2') temp2: TemplateRef<any>;

    options: thySegmentedCustomOption = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' },
        { value: 'hexie', labelText: '和谐', avatar: 'Hexie' }
    ];

    customTemplate: TemplateRef<{ $implicit: thySegmentedOption; index: number }>;
}

@Component({
    selector: 'test-segmented-ng-model',
    template: `
        <thy-segmented [thyOptions]="options" [(ngModel)]="value" (ngModelChange)="onSelectedChange($event)"></thy-segmented>
    `
})
class TestSegmentedNgModelComponent {
    options: thySegmentedCustomOption = ['成员', '部门', '用户组'];
    value: number = 0;
    onSelectedChange(event: number): void {}
}

describe('segmented', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestSegmentedBasicComponent>;
        let segmentedDebugElement: DebugElement;
        let segmentedElement: any;
        let segmentedInstance: ThySegmentedComponent;
        let testInstance: TestSegmentedBasicComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedBasicComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedBasicComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            segmentedElement = segmentedDebugElement.nativeElement;
            segmentedInstance = segmentedDebugElement.componentInstance;
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create segmented successfully', () => {
            expect(fixture).toBeTruthy();
            expect(segmentedDebugElement).toBeTruthy();
            expect(segmentedElement).toBeTruthy();
            expect(segmentedElement.classList.contains('thy-segmented')).toBeTruthy();

            const items = segmentedElement.querySelectorAll('.thy-segmented-item');
            expect(items).toBeTruthy();
            expect(items.length).toBe(3);
        });

        it('should emit correct data when change selected item', () => {
            segmentedInstance.thyOptionSelect.subscribe((event: ThySegmentedEvent) => {
                expect(event).toEqual({
                    option: { value: 1, labelText: '成员' },
                    index: 0
                });
            });
            const item0 = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item0, 'click');
            fixture.detectChanges();
        });

        it('should support string[] options', () => {
            testInstance.options = ['成员', '部门', '用户组'];
            fixture.detectChanges();
            segmentedInstance.thyOptionSelect.subscribe((event: ThySegmentedEvent) => {
                expect(event).toEqual({
                    option: { value: '部门', labelText: '部门' },
                    index: 1
                });
            });
            const item1 = getSegmentedItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
        });

        it('should support number[] options', () => {
            testInstance.options = [10, 100, 1000, 10000, 100000];
            fixture.detectChanges();
            segmentedInstance.thyOptionSelect.subscribe((event: ThySegmentedEvent) => {
                expect(event).toEqual({
                    option: { value: 10000, labelText: '10000' },
                    index: 3
                });
            });
            const item3 = getSegmentedItemByIndex(3, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item3, 'click');
            fixture.detectChanges();
        });

        it('should default to block mode', () => {
            expect(segmentedInstance.thyMode).toBe('block');
            expect(segmentedElement.classList.contains('thy-segmented-block')).toBeTruthy();
        });
    });

    describe('thySize', () => {
        let fixture: ComponentFixture<TestSegmentedSizeComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedSizeComponent],
                imports: [ThySegmentedModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedSizeComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should set segmented size success', fakeAsync(() => {
            ['xs', 'sm', 'md', 'default'].forEach(size => {
                fixture.componentInstance.size = size;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                const segmentedElement: HTMLElement = segmentedDebugElement.nativeElement;
                expect(segmentedElement.classList.contains(`thy-segmented-${size}`)).toBeTruthy();
            });
        }));
    });

    describe('text and icon', () => {
        let fixture: ComponentFixture<TestSegmentedBasicComponent>;
        let segmentedDebugElement: DebugElement;
        let testInstance: TestSegmentedBasicComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedBasicComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedBasicComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create segmented', () => {
            expect(fixture).toBeTruthy();
            expect(segmentedDebugElement).toBeTruthy();
        });

        it('should show text only', () => {
            testInstance.options = [
                { value: 1, labelText: '列表' },
                { value: 2, labelText: '对齐' }
            ];
            fixture.detectChanges();
            const item0 = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            expect(item0.children.length).toBe(1);
            expect(item0.children[0].nodeName).toBe('SPAN');
        });

        it('should show icon only', () => {
            testInstance.options = [
                { value: 'list', icon: 'list' },
                { value: 'paperclip', icon: 'paperclip' }
            ];
            fixture.detectChanges();
            const item0 = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            expect(item0.children.length).toBe(1);
            expect(item0.children[0].nodeName).toBe('THY-ICON');
        });

        it('should show text and icon', () => {
            testInstance.options = [
                { value: 1, labelText: '列表', icon: 'list' },
                { value: 2, labelText: '对齐', icon: 'paperclip' }
            ];
            fixture.detectChanges();
            const item0 = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            expect(item0.children.length).toBe(2);
            expect(item0.children[0].nodeName).toBe('THY-ICON');
            expect(item0.children[1].nodeName).toBe('SPAN');
        });
    });

    describe('thyDisabled', () => {
        let fixture: ComponentFixture<TestSegmentedDisabledComponent>;
        let segmentedDebugElement: DebugElement;
        let segmentedElement: any;
        let testInstance: TestSegmentedDisabledComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedDisabledComponent],
                imports: [ThySegmentedModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedDisabledComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            segmentedElement = segmentedDebugElement.nativeElement;
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should disable segmented successfully', () => {
            const spy = spyOn(testInstance, 'selectedChange');
            testInstance.disabled = true;
            fixture.detectChanges();
            const item1 = getSegmentedItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
            expect(segmentedElement.classList.contains('thy-segmented-disabled')).toBeTruthy();
        });

        it('should disable segmented item successfully', () => {
            testInstance.options = [
                { value: 1, labelText: '成员' },
                { value: 2, labelText: '部门' },
                { value: 3, labelText: '用户组', disabled: true }
            ];
            fixture.detectChanges();
            const disabledItem = segmentedElement.querySelectorAll('.thy-segmented-item')[2];
            expect(disabledItem.classList.contains('thy-segmented-item-disabled')).toBeTruthy();
        });
    });

    describe('thyActive', () => {
        let fixture: ComponentFixture<TestSegmentedActiveComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedActiveComponent],
                imports: [ThySegmentedModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedActiveComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should support set current selected item', () => {
            const segmentedElement = segmentedDebugElement.nativeElement;
            const items = segmentedElement.querySelectorAll('.thy-segmented-item');
            expect(items[0].classList.contains('thy-segmented-item-selected')).toBeTruthy();

            fixture.debugElement.componentInstance.index = 1;
            fixture.detectChanges();
            expect(items[0].classList.contains('thy-segmented-item-selected')).toBeFalsy();
            expect(items[1].classList.contains('thy-segmented-item-selected')).toBeTruthy();
        });
    });

    describe('thyMode', () => {
        let fixture: ComponentFixture<TestSegmentedModeComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedModeComponent],
                imports: [ThySegmentedModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedModeComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should support set mode', () => {
            fixture.detectChanges();
            const segmentedElement = segmentedDebugElement.nativeElement;
            const segmentedInstance = segmentedDebugElement.componentInstance;

            expect(segmentedInstance.thyMode).toBe('block');
            expect(segmentedElement.classList.contains('thy-segmented-block')).toBeTruthy();

            fixture.debugElement.componentInstance.mode = 'adaptive';
            fixture.detectChanges();
            expect(segmentedInstance.thyMode).toBe('adaptive');
            expect(segmentedElement.classList.contains('thy-segmented-block')).toBeFalsy();
        });
    });

    describe('thyLabelTemplate', () => {
        let fixture: ComponentFixture<TestSegmentedCustomTemplateComponent>;
        let segmentedDebugElement: DebugElement;
        let testInstance: TestSegmentedCustomTemplateComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedCustomTemplateComponent],
                imports: [ThySegmentedModule, ThyAvatarModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedCustomTemplateComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should support set custom template', () => {
            testInstance.customTemplate = testInstance.temp1;
            fixture.detectChanges();
            const item = getSegmentedItemByIndex(2, segmentedDebugElement);
            expect(item.query(By.css('.text1')).nativeElement.innerHTML).toBe('文明');

            testInstance.customTemplate = testInstance.temp2;
            fixture.detectChanges();
            const item2 = getSegmentedItemByIndex(2, segmentedDebugElement);
            expect(item2.query(By.css('.text2')).nativeElement.innerHTML).toBe('⭐️文明⭐️');
        });
    });

    describe('ngModel', () => {
        let fixture: ComponentFixture<TestSegmentedNgModelComponent>;
        let segmentedDebugElement: DebugElement;
        let testInstance: TestSegmentedNgModelComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedNgModelComponent],
                imports: [ThySegmentedModule, FormsModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedNgModelComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should support ngModel and ngModelChange to work', () => {
            const segmentedInstance = segmentedDebugElement.componentInstance;
            expect(segmentedInstance.selectedIndex).toBe(0);
            const spy = spyOn(testInstance, 'onSelectedChange');
            const item2 = getSegmentedItemByIndex(2, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item2, 'click');
            fixture.detectChanges();
            expect(testInstance.value).toBe(2);
            expect(spy).toHaveBeenCalledWith(2);
        });
    });

    function getSegmentedItemByIndex(index: number, debugElement: any): DebugElement {
        return debugElement.queryAll(By.css('.thy-segmented-item-label'))[index];
    }
});
