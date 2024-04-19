import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThySegment, ThySegmentEvent, ThySegmentItem, ThySegmentModule, ThySegmentSize } from 'ngx-tethys/segment';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThySegmentMode } from '../segment.component';

@Component({
    selector: 'test-segment-basic',
    template: `
        <thy-segment (thySelectChange)="selectedChange($event)">
            <thy-segment-item thyValue="member">成员</thy-segment-item>
            <thy-segment-item thyValue="department">部门</thy-segment-item>
            <thy-segment-item thyValue="group">用户组</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentBasicComponent {
    selectedChange(event: ThySegmentEvent): void {}
}

@Component({
    selector: 'test-segment-only-text',
    template: `
        <thy-segment>
            <thy-segment-item thyValue="1">列表</thy-segment-item>
            <thy-segment-item thyValue="2">对齐</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentOnlyTextComponent {}

@Component({
    selector: 'test-segment-only-icon',
    template: `
        <thy-segment>
            <thy-segment-item thyValue="1" thyIcon="list"> </thy-segment-item>
            <thy-segment-item thyValue="2" thyIcon="paperclip"></thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentOnlyIconComponent {}

@Component({
    selector: 'test-segment-icon-and-text',
    template: `
        <thy-segment>
            <thy-segment-item thyValue="1" thyIcon="list">列表</thy-segment-item>
            <thy-segment-item thyValue="2" thyIcon="paperclip">对齐</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentIconAndTextComponent {}

@Component({
    selector: 'test-segment-size',
    template: `
        <thy-segment [thySize]="size">
            <thy-segment-item thyValue="member">成员</thy-segment-item>
            <thy-segment-item thyValue="department">部门</thy-segment-item>
            <thy-segment-item thyValue="group">用户组</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentSizeComponent {
    size: ThySegmentSize | string = 'default';
}

@Component({
    selector: 'test-segment-disabled',
    template: `
        <thy-segment [thyDisabled]="disabledAll" (thyOptionSelect)="selectedChange($event)">
            <thy-segment-item thyValue="member">成员</thy-segment-item>
            <thy-segment-item thyValue="department">部门</thy-segment-item>
            <thy-segment-item thyValue="group" [thyDisabled]="disableItem">用户组</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentDisabledComponent {
    disabledAll: boolean;

    disableItem: boolean;

    selectedChange(event: ThySegmentEvent): void {}
}

@Component({
    selector: 'test-segment-mode',
    template: `
        <thy-segment [thyMode]="mode">
            <thy-segment-item thyValue="member">成员</thy-segment-item>
            <thy-segment-item thyValue="department">部门</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentModeComponent {
    mode: ThySegmentMode = 'block';
}

@Component({
    selector: 'test-segment-active',
    template: `
        <thy-segment [thyActiveIndex]="selectedIndex" (thySelectChange)="selectedChange($event)">
            <thy-segment-item thyValue="member">成员</thy-segment-item>
            <thy-segment-item thyValue="department">部门</thy-segment-item>
            <thy-segment-item thyValue="group">用户组</thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentActiveComponent {
    selectedIndex: number = 2;

    selectedChange(event: ThySegmentEvent) {
        this.selectedIndex = event.activeIndex;
    }

    setSelectedItem(index: number) {
        this.selectedIndex = index;
    }
}

@Component({
    selector: 'test-segment-custom-template',
    template: `
        <thy-segment>
            <ng-container *ngFor="let item of items">
                <thy-segment-item [thyValue]="item.value">
                    <div style="padding: 8px 0px 4px;">
                        <thy-avatar thySize="sm" [thyName]="item.avatar"></thy-avatar>
                        <div class="text1">{{ item.labelText }}</div>
                    </div>
                </thy-segment-item>
            </ng-container>
            <thy-segment-item thyValue="hexie">
                <div style="padding: 8px 0px 4px;">
                    <thy-avatar thySize="sm" [thyName]="'HeXie'"></thy-avatar>
                    <div class="text2">⭐️和谐⭐️</div>
                </div>
            </thy-segment-item>
        </thy-segment>
    `
})
class TestSegmentCustomTemplateComponent {
    items = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' }
    ];
}

describe('segment', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestSegmentBasicComponent>;
        let segmentedDebugElement: DebugElement;
        let segmentedElement: any;
        let segmentedInstance: ThySegment;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentBasicComponent],
                imports: [ThySegmentModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentBasicComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            segmentedElement = segmentedDebugElement.nativeElement;
            segmentedInstance = segmentedDebugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create segment successfully', () => {
            expect(fixture).toBeTruthy();
            expect(segmentedDebugElement).toBeTruthy();
            expect(segmentedElement).toBeTruthy();
            expect(segmentedElement.classList.contains('thy-segment')).toBeTruthy();

            const items = segmentedDebugElement.queryAll(By.directive(ThySegmentItem));
            expect(items).toBeTruthy();
            expect(items.length).toBe(3);
        });

        it('should emit correct data when change selected item', () => {
            segmentedInstance.thySelectChange.subscribe((event: ThySegmentEvent) => {
                expect(event.value).toEqual('department');
            });
            const item1 = getSegmentItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
        });

        it('should default to block mode', () => {
            expect(segmentedInstance.thyMode).toBe('block');
            expect(segmentedElement.classList.contains('thy-segment-block')).toBeTruthy();
        });
    });

    describe('only text', () => {
        let fixture: ComponentFixture<TestSegmentOnlyTextComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentOnlyTextComponent],
                imports: [ThySegmentModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentOnlyTextComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should show text only', () => {
            const item = getSegmentItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(1);
            expect(divElement.children[0].nodeName).toBe('SPAN');
        });
    });

    describe('only icon', () => {
        let fixture: ComponentFixture<TestSegmentOnlyIconComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentOnlyIconComponent],
                imports: [ThySegmentModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentOnlyIconComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should show icon only', () => {
            const item = getSegmentItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(1);
            expect(divElement.children[0].nodeName).toBe('THY-ICON');
        });
    });

    describe('icon and text', () => {
        let fixture: ComponentFixture<TestSegmentIconAndTextComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentIconAndTextComponent],
                imports: [ThySegmentModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentIconAndTextComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should show text and icon', () => {
            fixture.detectChanges();
            const item = getSegmentItemByIndex(0, segmentedDebugElement).nativeElement;
            const divElement = item.children[0];
            expect(divElement.children.length).toBe(2);
            expect(divElement.children[0].nodeName).toBe('THY-ICON');
            expect(divElement.children[1].nodeName).toBe('SPAN');
        });
    });

    describe('thySize', () => {
        let fixture: ComponentFixture<TestSegmentSizeComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentSizeComponent],
                imports: [ThySegmentModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentSizeComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should set segment size success', fakeAsync(() => {
            ['xs', 'sm', 'md', 'default'].forEach(size => {
                fixture.componentInstance.size = size;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                const segmentedElement: HTMLElement = segmentedDebugElement.nativeElement;
                expect(segmentedElement.classList.contains(`thy-segment-${size}`)).toBeTruthy();
            });
        }));
    });

    describe('thyDisabled', () => {
        let fixture: ComponentFixture<TestSegmentDisabledComponent>;
        let segmentedDebugElement: DebugElement;
        let segmentedElement: any;
        let testInstance: TestSegmentDisabledComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentDisabledComponent],
                imports: [ThySegmentModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentDisabledComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            segmentedElement = segmentedDebugElement.nativeElement;
            testInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should disable segment successfully', () => {
            const spy = spyOn(testInstance, 'selectedChange');
            testInstance.disabledAll = true;
            fixture.detectChanges();
            const item1 = getSegmentItemByIndex(1, segmentedDebugElement).nativeElement;
            dispatchFakeEvent(item1, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
            expect(segmentedElement.classList.contains('disabled')).toBeTruthy();
        });

        it('should disable segment item successfully', () => {
            const spy = spyOn(testInstance, 'selectedChange');
            testInstance.disableItem = true;
            fixture.detectChanges();
            const disabledItem = segmentedDebugElement.queryAll(By.directive(ThySegmentItem))[2].nativeElement;
            dispatchFakeEvent(disabledItem, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
            expect(disabledItem.classList.contains('disabled')).toBeTruthy();
        });
    });

    describe('thyMode', () => {
        let fixture: ComponentFixture<TestSegmentModeComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentModeComponent],
                imports: [ThySegmentModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentModeComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should support set mode', () => {
            fixture.detectChanges();
            const segmentedElement = segmentedDebugElement.nativeElement;
            const segmentedInstance = segmentedDebugElement.componentInstance;

            expect(segmentedInstance.thyMode).toBe('block');
            expect(segmentedElement.classList.contains('thy-segment-block')).toBeTruthy();

            fixture.debugElement.componentInstance.mode = 'inline';
            fixture.detectChanges();
            expect(segmentedInstance.thyMode).toBe('inline');
            expect(segmentedElement.classList.contains('thy-segment-block')).toBeFalsy();
        });
    });

    describe('thyActiveIndex', () => {
        let fixture: ComponentFixture<TestSegmentActiveComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentActiveComponent],
                imports: [ThySegmentModule, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentActiveComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should support set default selected item', () => {
            fixture.whenStable().then(() => {
                const items = segmentedDebugElement.queryAll(By.directive(ThySegmentItem));
                expect(items[2].nativeElement.classList.contains('active')).toBeTruthy();
            });
        });

        it('should change selected value manually', fakeAsync(() => {
            const spy = spyOn(fixture.componentInstance, 'selectedChange');
            fixture.componentInstance.setSelectedItem(1);
            fixture.detectChanges();
            tick(100);
            fixture.whenStable().then(() => {
                expect(spy).toHaveBeenCalled();
            });
        }));

        it('should not change selected value manually when some segment item', () => {
            const spy = spyOn(fixture.componentInstance, 'selectedChange');
            fixture.componentInstance.setSelectedItem(2);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });

        it('should not change selected value manually when index less than zero', () => {
            const spy = spyOn(fixture.componentInstance, 'selectedChange');
            fixture.componentInstance.setSelectedItem(-1);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });

        it('should change active index when options is changed', fakeAsync(() => {
            const spy = spyOn(fixture.componentInstance, 'selectedChange');
            segmentedDebugElement.componentInstance.newActiveIndex = 3;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();

            segmentedDebugElement.componentInstance.newActiveIndex = 1;
            fixture.detectChanges();
            const options = segmentedDebugElement.componentInstance.options;
            options.changes.next();
            fixture.detectChanges();
            const items = segmentedDebugElement.queryAll(By.directive(ThySegmentItem));
            expect(items[1].nativeElement.classList.contains('active')).toBeTruthy();
        }));
    });

    describe('custom template', () => {
        let fixture: ComponentFixture<TestSegmentCustomTemplateComponent>;
        let segmentedDebugElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestSegmentCustomTemplateComponent],
                imports: [ThySegmentModule, ThyAvatarModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestSegmentCustomTemplateComponent);
            segmentedDebugElement = fixture.debugElement.query(By.directive(ThySegment));
            fixture.detectChanges();
        });

        it('should support set custom template', () => {
            fixture.detectChanges();
            const item = getSegmentItemByIndex(2, segmentedDebugElement);
            expect(item.query(By.css('.text1')).nativeElement.innerHTML).toBe('文明');

            fixture.detectChanges();
            const item2 = getSegmentItemByIndex(3, segmentedDebugElement);
            expect(item2.query(By.css('.text2')).nativeElement.innerHTML).toBe('⭐️和谐⭐️');
        });
    });

    function getSegmentItemByIndex(index: number, debugElement: any): DebugElement {
        return debugElement.queryAll(By.directive(ThySegmentItem))[index];
    }
});
