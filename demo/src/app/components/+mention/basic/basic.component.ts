import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Mention, MentionSuggestionSelectEvent } from 'ngx-tethys/mention/interfaces';
import { PEOPLE_NAMES } from '../peoples-mock';

@Component({
    selector: 'app-demo-mention-basic',
    templateUrl: './basic.component.html'
})
export class DemoMentionBasicComponent implements OnInit {
    value = `This is text!`;
    @ViewChild('member', { static: true }) memberDisplayTemplateRef: TemplateRef<any>;

    mentions: Mention<any>[];

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '@',
                data: [
                    {
                        name: 'peter',
                        display_name: 'Peter Xu'
                    },
                    {
                        name: 'lily',
                        display_name: 'Lily Li'
                    }
                ].concat(
                    PEOPLE_NAMES.map(name => {
                        return {
                            name: name,
                            display_name: name
                        };
                    })
                ),
                displayTemplateRef: this.memberDisplayTemplateRef
            },
            {
                trigger: '#',
                data: [
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
                ],
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
                data: [
                    {
                        name: `I'm busy. I'll get back to you later'`
                    },
                    {
                        name: `This story is in planing`
                    },
                    {
                        name: `This story is in developing`
                    }
                ],
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
