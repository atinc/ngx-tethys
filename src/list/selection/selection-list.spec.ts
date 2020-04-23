import { Component, DebugElement, ViewChild } from '@angular/core';
import { ThySelectionListChange } from './selection.interface';
import { async, ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { ThyListModule } from '../list.module';
import { By } from '@angular/platform-browser';
import { ThyListOptionComponent, ThyListLayout } from '../../core/option';
import { ThySelectionListComponent } from './selection-list';

export function createFakeEvent(type: string, canBubble = false, cancelable = true) {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}

// import {
//     createKeyboardEvent,
//     dispatchFakeEvent,
//     dispatchEvent,
//     dispatchKeyboardEvent,
// } from '@angular/cdk/testing';

describe('ThySelectionList without forms', () => {
    describe('with list option', () => {
        let fixture: ComponentFixture<SelectionListWithListOptionsComponent>;
        let listOptions: DebugElement[];
        let selectionList: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThyListModule],
                declarations: [
                    SelectionListWithListOptionsComponent,
                    SelectionListWithListOptionsDefaultComponent
                    // SelectionListWithListDisabled,
                    // SelectionListWithOnlyOneOption
                ]
            });

            TestBed.compileComponents();
        }));

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SelectionListWithListOptionsComponent);
            fixture.detectChanges();
            listOptions = fixture.debugElement.queryAll(By.directive(ThyListOptionComponent));
            selectionList = fixture.debugElement.query(By.directive(ThySelectionListComponent));
        }));

        it('should be able to set a value on a list option', () => {
            fixture.detectChanges();
            const optionValues = ['inbox', 'starred', 'sent-mail', 'drafts'];

            optionValues.forEach((optionValue, index) => {
                expect(listOptions[index].componentInstance.thyValue).toBe(optionValue);
            });
        });

        it('should emit a selectionChange event if an option got clicked', () => {
            fixture.detectChanges();
            spyOn(fixture.componentInstance, 'onValueChange');

            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(0);

            listOptions[2].nativeElement.dispatchEvent(createFakeEvent('click'));
            fixture.detectChanges();

            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(1);
        });

        it('should has class "thy-grid-list" when thyLayout is list', () => {
            fixture.detectChanges();
            expect(selectionList.nativeElement.classList).not.toContain('thy-grid-list');
            expect(listOptions[0].nativeElement.classList).toContain('thy-list-option');
            expect(listOptions[0].nativeElement.classList).not.toContain('thy-grid-option');
        });

        it('should has class "thy-grid-list" when thyLayout is null', () => {
            const defaultFixture = TestBed.createComponent(SelectionListWithListOptionsDefaultComponent);
            fixture.detectChanges();
            const defaultListOptions = fixture.debugElement.queryAll(By.directive(ThyListOptionComponent));

            expect(defaultFixture.nativeElement.classList).not.toContain('thy-grid-list');
            expect(defaultListOptions[0].nativeElement.classList).toContain('thy-list-option');
            expect(defaultListOptions[0].nativeElement.classList).not.toContain('thy-grid-option');
        });

        it('should has class "thy-grid-list" when thyLayout is grid', () => {
            const component = fixture.debugElement.componentInstance;
            component.layout = 'grid';
            fixture.detectChanges();
            expect(selectionList.nativeElement.classList).toContain('thy-grid-list');
            expect(listOptions[0].nativeElement.classList).toContain('thy-grid-option');
        });

        it(`should hover first when thyFirstItemDefaultActive is true`, () => {
            const selectionFixture = TestBed.createComponent(SelectionListWithListOptionsComponent);
            selectionFixture.debugElement.componentInstance.firstItemDefaultActive = true;
            const selectionListOptions = selectionFixture.debugElement.queryAll(By.directive(ThyListOptionComponent));
            selectionFixture.detectChanges();
            expect(selectionListOptions[0].nativeElement.classList).toContain('hover');
        });

        it(`should not hover first when thyFirstItemDefaultActive is false`, () => {
            const component = fixture.debugElement.componentInstance;
            component.firstItemDefaultActive = false;
            fixture.detectChanges();
            expect(listOptions[0].nativeElement.classList).not.toContain('hover');
        });

        it(`should hover first when thyAutoActiveFirstItem is true`, () => {
            const defaultFixture = TestBed.createComponent(SelectionListWithListOptionsDefaultComponent);
            defaultFixture.componentInstance.autoActiveFirstItem = true;
            defaultFixture.detectChanges();
            const defaultListOptions = defaultFixture.debugElement.queryAll(By.directive(ThyListOptionComponent));
            expect(defaultListOptions[0].nativeElement.classList).toContain('hover');
        });

        it(`should not hover first when thyAutoActiveFirstItem is false`, () => {
            const defaultFixture = TestBed.createComponent(SelectionListWithListOptionsDefaultComponent);
            defaultFixture.componentInstance.autoActiveFirstItem = false;
            defaultFixture.detectChanges();
            const defaultListOptions = defaultFixture.debugElement.queryAll(By.directive(ThyListOptionComponent));
            expect(defaultListOptions[0].nativeElement.classList).not.toContain('hover');
        });
    });
});

@Component({
    template: `
        <thy-selection-list
            id="selection-list-1"
            [thyLayout]="layout"
            (thySelectionChange)="onValueChange($event)"
            [thyFirstItemDefaultActive]="firstItemDefaultActive"
        >
            <thy-list-option thyValue="inbox">
                Inbox (disabled selection-option)
            </thy-list-option>
            <thy-list-option id="testSelect" class="test-native-focus" thyValue="starred">
                Starred
            </thy-list-option>
            <thy-list-option thyValue="sent-mail">
                Sent Mail
            </thy-list-option>
            <thy-list-option thyValue="drafts" *ngIf="showLastOption">
                Drafts
            </thy-list-option>
        </thy-selection-list>
    `
})
class SelectionListWithListOptionsComponent {
    showLastOption = true;

    layout: ThyListLayout = 'list';

    firstItemDefaultActive = false;

    onValueChange(_change: ThySelectionListChange) {}
}

@Component({
    template: `
        <thy-selection-list
            id="selection-list-1"
            [thyAutoActiveFirstItem]="autoActiveFirstItem"
            (thySelectionChange)="onValueChange($event)"
        >
            <thy-list-option thyValue="inbox">
                Inbox (disabled selection-option)
            </thy-list-option>
            <thy-list-option id="testSelect" class="test-native-focus" thyValue="starred">
                Starred
            </thy-list-option>
            <thy-list-option thyValue="sent-mail">
                Sent Mail
            </thy-list-option>
            <thy-list-option thyValue="drafts">
                Drafts
            </thy-list-option>
        </thy-selection-list>
    `
})
class SelectionListWithListOptionsDefaultComponent {
    @ViewChild(ThySelectionListComponent) thySelectionListComponent: ThySelectionListComponent;

    autoActiveFirstItem = false;

    onValueChange(_change: ThySelectionListChange) {}
}
