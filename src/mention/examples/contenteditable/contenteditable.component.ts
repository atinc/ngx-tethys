import { Mention, MentionSuggestionSelectEvent, ThyMentionDirective } from 'ngx-tethys/mention';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

const mockUsers = [
    'Jacob',
    'Isabella',
    'Ethan',
    'Emma',
    'Michael',
    'Olivia',
    'Alexander',
    'Sophia',
    'William',
    'Ava',
    'Joshua',
    'Emily',
    'Daniel',
    'Madison',
    'Onetwothreefourfivesixseven'
].map(name => {
    return {
        name: name.toLocaleLowerCase(),
        display_name: name
    };
});

@Component({
    selector: 'thy-mention-basic-example',
    templateUrl: './contenteditable.component.html',
    styles: [
        `
            .example-text {
                padding: 4px 0 4px 8px;
            }
        `
    ],
    imports: [ThyMentionDirective, FormsModule]
})
export class ThyMentionContenteditableExampleComponent implements OnInit {
    mentions: Mention[] = [
        {
            trigger: '@',
            data: mockUsers as Array<{ name: string; display_name: string }>
        }
    ];

    @ViewChild(ThyMentionDirective) mention: ThyMentionDirective;

    @ViewChild('exampleText') exampleText: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    selectSuggestion(event: MentionSuggestionSelectEvent) {
        console.log(this.exampleText.nativeElement.innerText);
    }
}
