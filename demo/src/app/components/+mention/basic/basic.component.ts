import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-mention-basic',
    templateUrl: './basic.component.html'
})
export class DemoMentionBasicComponent implements OnInit {
    value = `This is text!`;
    mentions = [
        {
            trigger: '@',
            data: [
                {
                    name: 'peter',
                    display_name: 'peter xu'
                },
                {
                    name: 'lily',
                    display_name: 'lily li'
                }
            ]
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
            ]
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
            ]
        }
    ];
    constructor() {}

    ngOnInit(): void {}
}
