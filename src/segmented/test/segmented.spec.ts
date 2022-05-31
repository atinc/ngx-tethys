import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import {
    ThySegmentedComponent,
    ThySegmentedEvent,
    ThySegmentedItemComponent,
    ThySegmentedModule,
    ThySegmentedSize
} from 'ngx-tethys/segmented';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThySegmentedMode } from '../segmented.component';

@Component({
    selector: 'test-segmented-basic',
    template: `
        <thy-segmented (thySelectChange)="selectedChange($event)">
            <thy-segmented-item thyValue="member">成员</thy-segmented-item>
            <thy-segmented-item thyValue="department">部门</thy-segmented-item>
            <thy-segmented-item thyValue="group">用户组</thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedBasicComponent {
    selectedChange(event: ThySegmentedEvent): void {}
}

@Component({
    selector: 'test-segmented-only-text',
    template: `
        <thy-segmented>
            <thy-segmented-item thyValue="1" thyLabelText="列表"> </thy-segmented-item>
            <thy-segmented-item thyValue="2" thyLabelText="对齐"></thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedOnlyTextComponent {}

@Component({
    selector: 'test-segmented-only-icon',
    template: `
        <thy-segmented>
            <thy-segmented-item thyValue="1" thyIconName="list"> </thy-segmented-item>
            <thy-segmented-item thyValue="2" thyIconName="paperclip"></thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedOnlyIconComponent {}

@Component({
    selector: 'test-segmented-icon-and-text',
    template: `
        <thy-segmented>
            <thy-segmented-item thyValue="1" thyIconName="list" thyLabelText="列表"> </thy-segmented-item>
            <thy-segmented-item thyValue="2" thyIconName="paperclip" thyLabelText="对齐"></thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedIconAndTextComponent {}

@Component({
    selector: 'test-segmented-size',
    template: `
        <thy-segmented [thySize]="size">
            <thy-segmented-item thyValue="member">成员</thy-segmented-item>
            <thy-segmented-item thyValue="department">部门</thy-segmented-item>
            <thy-segmented-item thyValue="group">用户组</thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedSizeComponent {
    size: ThySegmentedSize | string = 'default';
}

@Component({
    selector: 'test-segmented-disabled',
    template: `
        <thy-segmented [thyDisabled]="disabledAll" (thyOptionSelect)="selectedChange($event)">
            <thy-segmented-item thyValue="member">成员</thy-segmented-item>
            <thy-segmented-item thyValue="department">部门</thy-segmented-item>
            <thy-segmented-item thyValue="group" [thyDisabled]="disableItem">用户组</thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedDisabledComponent {
    disabledAll: boolean;

    disableItem: boolean;

    selectedChange(event: ThySegmentedEvent): void {}
}

@Component({
    selector: 'test-segmented-mode',
    template: `
        <thy-segmented [thyMode]="mode">
            <thy-segmented-item thyValue="member">成员</thy-segmented-item>
            <thy-segmented-item thyValue="department">部门</thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedModeComponent {
    mode: ThySegmentedMode = 'block';
}

@Component({
    selector: 'test-segmented-active',
    template: `
        <thy-segmented [thyActiveIndex]="selectedIndex">
            <thy-segmented-item thyValue="member">成员</thy-segmented-item>
            <thy-segmented-item thyValue="department">部门</thy-segmented-item>
            <thy-segmented-item thyValue="group">用户组</thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedActiveComponent {
    selectedIndex: number = 2;
}

@Component({
    selector: 'test-segmented-custom-template',
    template: `
        <thy-segmented>
            <ng-container *ngFor="let item of items">
                <thy-segmented-item [thyValue]="item.value">
                    <div style="padding: 8px 0px 4px;">
                        <thy-avatar thySize="sm" [thyName]="item.avatar"></thy-avatar>
                        <div class="text1">{{ item.labelText }}</div>
                    </div>
                </thy-segmented-item>
            </ng-container>

            <thy-segmented-item thyValue="hexie">
                <div style="padding: 8px 0px 4px;">
                    <thy-avatar thySize="sm" [thyName]="'HeXie'"></thy-avatar>
                    <div class="text2">⭐️和谐⭐️</div>
                </div>
            </thy-segmented-item>
        </thy-segmented>
    `
})
class TestSegmentedCustomTemplateComponent {
    items = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' }
    ];
}

describe('segmented', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestSegmentedBasicComponent>;
        let segmentedDebugElement: DebugElement;
        let segmentedElement: any;
        let segmentedInstance: ThySegmentedComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedBasicComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedBasicComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            segmentedElement = segmentedDebugElement.nativeElement;
            segmentedInstance = segmentedDebugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create segmented successfully', () => {
            expect(fixture).toBeTruthy();
            expect(segmentedDebugElement).toBeTruthy();
            expect(segmentedElement).toBeTruthy();
            expect(segmentedElement.classList.contains('thy-segmented')).toBeTruthy();

            const items = segmentedDebugElement.queryAll(By.directive(ThySegmentedItemComponent));
            expect(items).toBeTruthy();
            expect(items.length).toBe(3);
        });

        it('should emit correct data when change selected item', () => {
            segmentedInstance.thySelectChange.subscribe((event: ThySegmentedEvent) => {
                expect(event.value).toEqual('department');
            });
            const item1 = getSegmentedItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
        });

        it('should default to block mode', () => {
            expect(segmentedInstance.thyMode).toBe('block');
            expect(segmentedElement.classList.contains('thy-segmented-block')).toBeTruthy();
        });
    });

    describe('thyLabelText', () => {
        let fixture: ComponentFixture<TestSegmentedOnlyTextComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedOnlyTextComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedOnlyTextComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should show text only', () => {
            const item = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(1);
            expect(divElement.children[0].nodeName).toBe('SPAN');
        });
    });

    describe('thyIconName', () => {
        let fixture: ComponentFixture<TestSegmentedOnlyIconComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedOnlyIconComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedOnlyIconComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should show icon only', () => {
            const item = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(1);
            expect(divElement.children[0].nodeName).toBe('THY-ICON');
        });
    });

    describe('thyIconName and thyLabelText', () => {
        let fixture: ComponentFixture<TestSegmentedIconAndTextComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedIconAndTextComponent],
                imports: [ThySegmentedModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedIconAndTextComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should show text and icon', () => {
            fixture.detectChanges();
            const item = getSegmentedItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(2);
            expect(divElement.children[0].nodeName).toBe('THY-ICON');
            expect(divElement.children[1].nodeName).toBe('SPAN');
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
            testInstance.disabledAll = true;
            fixture.detectChanges();
            const item1 = getSegmentedItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
            expect(segmentedElement.classList.contains('disabled')).toBeTruthy();
        });

        it('should disable segmented item successfully', () => {
            const spy = spyOn(testInstance, 'selectedChange');
            testInstance.disableItem = true;
            fixture.detectChanges();
            const disabledItem = segmentedDebugElement.queryAll(By.directive(ThySegmentedItemComponent))[2].nativeElement;
            dispatchFakeEvent(disabledItem, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
            expect(disabledItem.classList.contains('disabled')).toBeTruthy();
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

    describe('thyActiveIndex', () => {
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

        it('should support set default selected item', () => {
            const items = segmentedDebugElement.queryAll(By.directive(ThySegmentedItemComponent));
            expect(items[2].nativeElement.classList.contains('active')).toBeTruthy();
        });
    });

    describe('custom template', () => {
        let fixture: ComponentFixture<TestSegmentedCustomTemplateComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentedCustomTemplateComponent],
                imports: [ThySegmentedModule, ThyAvatarModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentedCustomTemplateComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegmentedComponent));
            fixture.detectChanges();
        });

        it('should support set custom template', () => {
            fixture.detectChanges();
            const item = getSegmentedItemByIndex(2, segmentedDebugElement);
            expect(item.query(By.css('.text1')).nativeElement.innerHTML).toBe('文明');

            fixture.detectChanges();
            const item2 = getSegmentedItemByIndex(3, segmentedDebugElement);
            expect(item2.query(By.css('.text2')).nativeElement.innerHTML).toBe('⭐️和谐⭐️');
        });
    });

    function getSegmentedItemByIndex(index: number, debugElement: any): DebugElement {
        return debugElement.queryAll(By.directive(ThySegmentedItemComponent))[index];
    }
});
