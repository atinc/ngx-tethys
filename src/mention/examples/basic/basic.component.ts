import { Mention, MentionSuggestionSelectEvent } from 'ngx-tethys';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

const UsersMock = [
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

const TasksMock = [
    {
        name: 'Task 1',
        identifier: 'AGL-1'
    },
    {
        name: 'Task 2',
        identifier: 'AGL-2'
    },
    {
        name: 'Task 3',
        identifier: 'AGL-3'
    }
];

const MessagesMock = [
    {
        name: `I'm busy. I'll get back to you later'`
    },
    {
        name: `This story is in planing`
    },
    {
        name: `This story is in developing`
    }
];

@Component({
    selector: 'thy-mention-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyMentionBasicExampleComponent implements OnInit {
    value = `This is text!`;

    @ViewChild('memberDisplayTemplate', { static: true }) memberDisplayTemplateRef: TemplateRef<any>;

    mentions: Mention<any>[];

    popoverConfig = {
        panelClass: 'mention-popover-panel'
    };

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '@',
                data: UsersMock as Array<{ name: string; display_name: string }>,
                displayTemplateRef: this.memberDisplayTemplateRef
            },
            {
                trigger: '#',
                data: TasksMock,
                insertTransform: (item: { name: string; identifier: string }) => {
                    return `#${item.identifier}`;
                },
                search: (term, items) => {
                    if (term) {
                        return items.filter(item => {
                            return (
                                item.identifier.toLowerCase().includes(term.toLowerCase()) ||
                                item.name.toLowerCase().includes(term.toLowerCase())
                            );
                        });
                    } else {
                        return items;
                    }
                }
            },
            {
                trigger: '/',
                data: MessagesMock,
                insertTransform: (item: { name: string }) => {
                    return item.name;
                }
            }
        ];
    }

    selectSuggestion(event: MentionSuggestionSelectEvent) {
        console.log(event);
    }
}
