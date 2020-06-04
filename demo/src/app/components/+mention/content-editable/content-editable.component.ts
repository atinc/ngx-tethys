import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Mention } from 'ngx-tethys/mention/interfaces';

@Component({
    selector: 'app-demo-mention-content-editable',
    templateUrl: './content-editable.component.html'
})
export class DemoMentionContentEditableComponent implements OnInit {
    value = `This is text!`;

    @ViewChild('member', { static: true }) memberDisplayTemplateRef: TemplateRef<any>;

    mentions: Mention[];

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
                ],
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
}
