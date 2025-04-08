import { Mention, MentionSuggestionSelectEvent, ThyMentionDirective } from 'ngx-tethys/mention';
import { ThyInputDirective } from 'ngx-tethys/input';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

const mockTasks = [
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

const mockMessages = [
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
    selector: 'thy-mention-custom-example',
    templateUrl: './custom.component.html',
    imports: [ThyMentionDirective, FormsModule, ThyInputDirective]
})
export class ThyMentionCustomExampleComponent implements OnInit {
    value = `Custom insert transform and search, using # to relate task, quick reply using /`;

    mentions: Mention<any>[];

    popoverConfig = {
        panelClass: 'mention-popover-panel'
    };

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '#',
                data: mockTasks,
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
                data: mockMessages,
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
