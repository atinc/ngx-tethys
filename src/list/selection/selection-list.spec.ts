import { Component, DebugElement } from '@angular/core';
import { ThySelectionListChange } from './selection.interface';
import { async, ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { ThyListModule } from '../list.module';
import { By } from '@angular/platform-browser';
import { ThyListOptionComponent } from '../../core/option';
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

describe('MatSelectionList without forms', () => {
    describe('with list option', () => {
        let fixture: ComponentFixture<SelectionListWithListOptions>;
        let listOptions: DebugElement[];
        let selectionList: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThyListModule],
                declarations: [
                    SelectionListWithListOptions,
                    // SelectionListWithListDisabled,
                    // SelectionListWithOnlyOneOption
                ],
            });

            TestBed.compileComponents();
        }));


        beforeEach(async(() => {
            fixture = TestBed.createComponent(SelectionListWithListOptions);
            fixture.detectChanges();

            listOptions = fixture.debugElement.queryAll(By.directive(ThyListOptionComponent));
            selectionList = fixture.debugElement.query(By.directive(ThySelectionListComponent));
        }));

        it('should be able to set a value on a list option', () => {
            const optionValues = ['inbox', 'starred', 'sent-mail', 'drafts'];

            optionValues.forEach((optionValue, index) => {
                expect(listOptions[index].componentInstance.thyValue).toBe(optionValue);
            });
        });

        it('should emit a selectionChange event if an option got clicked', () => {
            spyOn(fixture.componentInstance, 'onValueChange');

            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(0);

            listOptions[2].nativeElement.dispatchEvent(createFakeEvent('click'));
            fixture.detectChanges();

            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(1);
        });
    });
});

@Component({
    template: `
<thy-selection-list id="selection-list-1" (thySelectionChange)="onValueChange($event)">
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
class SelectionListWithListOptions {
    showLastOption = true;

    onValueChange(_change: ThySelectionListChange) { }
}

