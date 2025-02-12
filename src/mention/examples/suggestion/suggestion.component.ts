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
    selector: 'thy-mention-suggestion-example',
    templateUrl: './suggestion.component.html',
    standalone: false
})
export class ThyMentionSuggestionExampleComponent implements OnInit {
    value = `This is text! please type @`;

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
                data: mockUsers as Array<{ name: string; display_name: string }>,
                displayTemplateRef: this.memberDisplayTemplateRef
            },
            {
                trigger: '#',
                data: mockUsers,
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
                data: mockUsers,
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
