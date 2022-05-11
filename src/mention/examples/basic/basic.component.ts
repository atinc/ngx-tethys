import { Mention, MentionSuggestionSelectEvent } from 'ngx-tethys/mention';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

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
    templateUrl: './basic.component.html'
})
export class ThyMentionBasicExampleComponent implements OnInit {
    value = ``;

    mentions: Mention[] = [
        {
            trigger: '@',
            data: mockUsers as Array<{ name: string; display_name: string }>
        }
    ];

    constructor() {}

    ngOnInit(): void {}

    selectSuggestion(event: MentionSuggestionSelectEvent) {
        console.log(event);
    }
}
