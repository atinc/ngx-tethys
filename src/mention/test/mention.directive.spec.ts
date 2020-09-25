import { FormsModule } from '@angular/forms';
import { Component, DebugElement, NgModule, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject, tick, flushMicrotasks, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Mention } from '../interfaces';
import { ThyMentionDirective } from '../mention.directive';
import { ThyMentionModule } from './../mention.module';

@Component({
    selector: 'thy-test-mention-basic',
    template: `
        <div class="demo-card">
            <textarea [(ngModel)]="value" thyInput [thyMention]="mentions" [thyPopoverConfig]="popoverConfig"></textarea>
        </div>
    `
})
class ThyTestMentionBasicComponent implements OnInit {
    value = `This is text!`;

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
    let inputElement: HTMLElement;

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

    it('should create an instance', () => {
        expect(mentionDirective).toBeTruthy();
    });

    it('should open suggestions popover with popover config', () => {
        mentionDirective['openSuggestions']({ query: { term: 'a', start: 0, end: 1 }, mention: fixture.componentInstance.mentions[0] });
        fixture.detectChanges();
        expect(document.querySelector('.mention-popover-panel')).toBeTruthy();
    });
});
