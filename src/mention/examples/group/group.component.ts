import { Mention, ThyMentionDirective } from 'ngx-tethys';

import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

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
].map((name, index) => {
    return {
        groupId: index % 2 ? '1' : '2',
        name: name.toLocaleLowerCase(),
        display_name: name
    };
});

@Component({
    selector: 'thy-mention-group-example',
    templateUrl: './group.component.html'
})
export class ThyMentionGroupExampleComponent implements OnInit {
    value = `This is group mention! @`;
    @ViewChild(ThyMentionDirective, { static: true }) mention: ThyMentionDirective;

    @ViewChild('suggestionsTemplateRef', { static: true }) suggestionsTemplateRef: TemplateRef<{ data: [] }>;

    mentions: Mention<any>[];

    groupData = [
        { name: '分组1', groupId: '1' },
        { name: '分组2', groupId: '2' }
    ];
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.mentions = [
            {
                trigger: '@',
                data: mockUsers,
                emptyText: '无匹配的成员',
                autoClose: false,
                suggestionsTemplateRef: this.suggestionsTemplateRef,
                search: (term: string, data) => {
                    const result = data.filter(item => {
                        return (
                            item.name.toLowerCase().includes(term.toLowerCase()) ||
                            item.display_name.toLowerCase().includes(term.toLowerCase())
                        );
                    });
                    return result;
                }
            }
        ];
    }
}
