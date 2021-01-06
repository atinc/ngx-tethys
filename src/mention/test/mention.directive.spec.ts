import { ThyPopover } from './../../popover/popover.service';
import { dispatchKeyboardEvent } from 'ngx-tethys/testing/dispatcher-events';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement, NgModule, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject, tick, flushMicrotasks, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Mention } from '../interfaces';
import { ThyMentionDirective } from '../mention.directive';
import { ThyMentionModule } from './../mention.module';
import { ENTER, T } from 'ngx-tethys/util';
import { MentionInputorElement } from '../adapter';

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

@NgModule({
    imports: [FormsModule, ThyMentionModule],
    declarations: [ThyTestMentionBasicComponent],
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

    it('should update ngModel when select suggestion test1', () => {
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
