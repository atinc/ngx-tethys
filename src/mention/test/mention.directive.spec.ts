import { ThyPopover } from 'ngx-tethys/popover';
import { dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ENTER } from 'ngx-tethys/util';

import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyListModule } from '../../list';
import { MentionInputorElement } from '../adapter';
import { Mention } from '../interfaces';
import { ThyMentionDirective } from '../mention.directive';
import { ThyMentionModule } from '../mention.module';

@Component({
    selector: 'thy-test-mention-basic',
    template: `
        <div class="demo-card">
            <textarea [(ngModel)]="value" thyInput [thyMention]="mentions" [thyPopoverConfig]="popoverConfig"></textarea>
        </div>
    `
})
class ThyTestMentionBasicComponent implements OnInit {
    value = `@t`;

    mentions: Mention<any>[];

    popoverConfig = {
        panelClass: 'mention-popover-panel'
    };

    @ViewChild(ThyMentionDirective, { static: true }) mentionDirective: ThyMentionDirective;

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '@',
                data: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }]
            }
        ];
    }
}

@Component({
    selector: 'thy-test-mention-suggestions-template',
    template: `
        <div class="demo-card">
            <textarea [(ngModel)]="value" thyInput [thyMention]="mentions" [thyPopoverConfig]="popoverConfig"></textarea>
            <ng-template #suggestionsTemplateRef let-data="data">
                <thy-selection-list thyMultiple="false" thyAutoActiveFirstItem="true">
                    <thy-option-group [thyGroupLabel]="'label1'">
                        <thy-list-option>{{ 'test1' }} </thy-list-option>
                    </thy-option-group>
                    <thy-option-group [thyGroupLabel]="'label2'">
                        <thy-list-option>{{ 'test2' }} </thy-list-option>
                    </thy-option-group>
                </thy-selection-list>
            </ng-template>
        </div>
    `
})
class ThyTestMentionSuggestionsTemplateComponent implements OnInit {
    value = `@`;

    mentions: Mention<any>[];

    popoverConfig = {
        panelClass: 'mention-suggestions-template-popover-panel'
    };

    @ViewChild('suggestionsTemplateRef', { static: true }) suggestionsTemplateRef: TemplateRef<{ data: [] }>;

    @ViewChild(ThyMentionDirective, { static: true }) mentionDirective: ThyMentionDirective;

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '@',
                suggestionsTemplateRef: this.suggestionsTemplateRef,
                data: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }]
            }
        ];
    }
}

@NgModule({
    imports: [FormsModule, ThyMentionModule, ThyListModule],
    declarations: [ThyTestMentionBasicComponent, ThyTestMentionSuggestionsTemplateComponent],
    exports: []
})
export class MentionTestModule {}

describe('MentionDirective', () => {
    let fixture: ComponentFixture<ThyTestMentionBasicComponent>;
    let mentionDirective: ThyMentionDirective;
    let inputDebugElement: DebugElement;
    let inputElement: MentionInputorElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [MentionTestModule, NoopAnimationsModule],
            providers: []
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ThyTestMentionBasicComponent);
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(By.css('textarea'));
        inputElement = inputDebugElement.nativeElement;
        mentionDirective = inputDebugElement.injector.get<ThyMentionDirective>(ThyMentionDirective);
    }));

    beforeEach(inject([ThyPopover], (_popover: ThyPopover) => {
        popover = _popover;
    }));

    afterEach(() => {
        popover.close();
    });

    it('should create an instance', () => {
        expect(mentionDirective).toBeTruthy();
    });

    it('should open suggestions popover success', () => {
        mentionDirective['openSuggestions']({ query: { term: 'test1', start: 0, end: 1 }, mention: mentionDirective.mentions[0] });
        fixture.detectChanges();
        const panelElement = document.querySelector('.mention-popover-panel');
        expect(panelElement).toBeTruthy();
        const mentionSuggestionsElement = document.querySelector('thy-mention-suggestions');
        expect(mentionSuggestionsElement).toBeTruthy();
        expect(mentionSuggestionsElement.textContent).toContain('test1');
    });

    it('should update ngModel value when select suggestion test1', () => {
        inputElement.focus();
        inputElement.setSelectionRange(2, 2);
        mentionDirective['lookup'](null);
        fixture.detectChanges();
        const panelElement = document.querySelector('.mention-popover-panel');
        expect(fixture.componentInstance.value).toEqual('@t');
        dispatchKeyboardEvent(panelElement, 'keydown', ENTER);
        expect(fixture.componentInstance.value).toEqual('@test1 ');
    });
});

describe('MentionSuggestionsTemplateDirective', () => {
    let fixture: ComponentFixture<ThyTestMentionSuggestionsTemplateComponent>;
    let mentionDirective: ThyMentionDirective;
    let inputDebugElement: DebugElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [MentionTestModule, NoopAnimationsModule],
            providers: []
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ThyTestMentionSuggestionsTemplateComponent);
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(By.css('textarea'));
        mentionDirective = inputDebugElement.injector.get<ThyMentionDirective>(ThyMentionDirective);
    }));

    beforeEach(inject([ThyPopover], (_popover: ThyPopover) => {
        popover = _popover;
    }));

    afterEach(() => {
        popover.close();
    });

    it('should create an instance', () => {
        expect(mentionDirective).toBeTruthy();
    });

    it('should open group suggestions-template popover and show group', () => {
        mentionDirective['lookup'](null);
        fixture.detectChanges();
        const panelElement = document.querySelector('.mention-suggestions-template-popover-panel');
        expect(panelElement).toBeTruthy();
        const mentionSuggestionsElement = document.querySelector('thy-mention-suggestions');
        expect(mentionSuggestionsElement).toBeTruthy();
        const mentionGroupElement = document.querySelectorAll('thy-option-group');
        const mentionListOptionElement = document.querySelectorAll('thy-list-option');
        expect(mentionGroupElement.length).toEqual(2);
        expect(mentionListOptionElement.length).toEqual(2);
    });
});
