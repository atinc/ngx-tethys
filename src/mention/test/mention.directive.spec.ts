import { ThyPopover } from 'ngx-tethys/popover';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ENTER } from 'ngx-tethys/util';
import { Component, DebugElement, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThySelectionList } from 'ngx-tethys/list';
import { Mention, ThyMentionDirective, ThyMentionModule } from 'ngx-tethys/mention';
import { ThySelectOptionGroup, ThyListOption } from 'ngx-tethys/shared';
import { MentionInputorElement } from '../adapter';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-test-mention-basic',
    template: `
        <div class="demo-card">
            <textarea [(ngModel)]="value" thyInput [thyMention]="mentions" [thyPopoverConfig]="popoverConfig"></textarea>
        </div>
    `,
    imports: [FormsModule, ThyMentionDirective, ThyInputDirective]
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
                limit: 2,
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
    `,
    imports: [FormsModule, ThyMentionDirective, ThySelectionList, ThySelectOptionGroup, ThyListOption, ThyInputDirective]
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

@Component({
    selector: 'thy-test-input-mention',
    template: `
        <div class="demo-card">
            <input
                placeholder="Mention people using @"
                thyInput
                [style]="{ boxSizing: 'border-box' }"
                [thyMention]="mentions"
                [(ngModel)]="value" />
        </div>
    `,
    imports: [FormsModule, ThyMentionDirective, ThyInputDirective]
})
class ThyTestInputMentionComponent implements OnInit {
    value = ``;

    mentions: Mention[] = [
        {
            trigger: '@',
            data: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }]
        }
    ];

    @ViewChild(ThyMentionDirective) mentionDirective: ThyMentionDirective;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-test-contenteditable-mention',
    template: `
        <div class="demo-card">
            <p class="example-text" #exampleText contenteditable="true" [thyMention]="mentions">&#64;t</p>
        </div>
    `,
    imports: [ThyMentionDirective, ThyInputDirective]
})
class ThyTestContenteditableMentionComponent implements OnInit {
    mentions: Mention[] = [
        {
            trigger: '@',
            data: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }]
        }
    ];

    @ViewChild(ThyMentionDirective, { static: true }) mentionDirective: ThyMentionDirective;

    @ViewChild('exampleText') exampleText: ElementRef;

    constructor() {}

    ngOnInit(): void {}
}

describe('MentionDirective', () => {
    let fixture: ComponentFixture<ThyTestMentionBasicComponent> | undefined = undefined;
    let mentionDirective: ThyMentionDirective | undefined = undefined;
    let inputDebugElement: DebugElement | undefined = undefined;
    let inputElement: MentionInputorElement | undefined = undefined;
    let popover: ThyPopover | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMentionModule],
            providers: [provideAnimations()]
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
        mentionDirective['openSuggestions']({ query: { term: 'test1', start: 0, end: 1 }, mention: mentionDirective.mentions()[0] });
        fixture.detectChanges();
        const panelElement = document.querySelector('.mention-popover-panel');
        expect(panelElement).toBeTruthy();
        const mentionSuggestionsElement = document.querySelector('thy-mention-suggestions');
        expect(mentionSuggestionsElement).toBeTruthy();
        expect(mentionSuggestionsElement.textContent).toContain('test1');
    });

    it('should limit effect', () => {
        mentionDirective['openSuggestions']({ query: { term: 'test', start: 0, end: 1 }, mention: mentionDirective.mentions()[0] });
        fixture.detectChanges();
        const suggestionsElement = document.querySelectorAll('thy-mention-suggestions .thy-list-option');
        expect(suggestionsElement.length).toEqual(2);
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
    let fixture: ComponentFixture<ThyTestMentionSuggestionsTemplateComponent> | undefined = undefined;
    let mentionDirective: ThyMentionDirective | undefined = undefined;
    let inputDebugElement: DebugElement | undefined = undefined;
    let popover: ThyPopover | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMentionModule],
            providers: [provideAnimations()]
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

describe('TestMentionInput', () => {
    let fixture: ComponentFixture<ThyTestInputMentionComponent> | undefined = undefined;
    let mentionDirective: ThyMentionDirective | undefined = undefined;
    let inputDebugElement: DebugElement | undefined = undefined;
    let inputElement: MentionInputorElement | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMentionModule],
            providers: [provideNoopAnimations()]
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ThyTestInputMentionComponent);
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(By.css('input'));
        inputElement = inputDebugElement.nativeElement;
        mentionDirective = inputDebugElement.injector.get<ThyMentionDirective>(ThyMentionDirective);
    }));

    it('should input @ open suggestions and delete @ close suggestions', fakeAsync(() => {
        fixture.componentInstance.value = '';
        fixture.detectChanges();
        inputElement.value = '@';
        dispatchFakeEvent(inputElement, 'input', true);
        expect(fixture.componentInstance.mentionDirective.isOpened).toBeTruthy();
        inputElement.value = '';
        dispatchFakeEvent(inputElement, 'input', true);
        tick(1000);
        fixture.detectChanges();
        expect(fixture.componentInstance.mentionDirective.isOpened).toBeFalsy();
    }));

    it('should click open suggestions before input @', () => {
        inputElement.value = '@';
        fixture.detectChanges();
        dispatchFakeEvent(inputElement, 'click', true);
        expect(fixture.componentInstance.mentionDirective.isOpened).toBeTruthy();
    });
});

describe('TestContenteditableMention', () => {
    let fixture: ComponentFixture<ThyTestContenteditableMentionComponent> | undefined = undefined;
    let textDebugElement: DebugElement | undefined = undefined;
    let textElement: MentionInputorElement | undefined = undefined;
    let mentionDirective: ThyMentionDirective | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMentionModule],
            providers: [provideAnimations()]
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ThyTestContenteditableMentionComponent);
        fixture.detectChanges();
        textDebugElement = fixture.debugElement.query(By.directive(ThyMentionDirective));
        textElement = textDebugElement.nativeElement;
        mentionDirective = textDebugElement.injector.get<ThyMentionDirective>(ThyMentionDirective);
    }));

    it('should click open suggestions before input @', () => {
        textElement.innerText = '@';
        fixture.detectChanges();
        dispatchFakeEvent(textElement, 'click', true);
        expect(fixture.componentInstance.mentionDirective.isOpened).toBeTruthy();
    });

    it('should update innerText when select suggestion test1', () => {
        dispatchFakeEvent(textElement, 'click', true);
        mentionDirective['lookup'](null);
        fixture.detectChanges();
        const panelElement = document.querySelector('.thy-mention-suggestions');
        expect(textElement.innerText).toEqual('@t');
        dispatchKeyboardEvent(panelElement, 'keydown', ENTER);
        expect(textElement.innerText).toEqual('@test1');
    });
});
