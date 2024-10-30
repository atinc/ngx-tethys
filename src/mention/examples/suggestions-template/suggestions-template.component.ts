import { Mention, ThyMentionDirective } from 'ngx-tethys/mention';

import { Component, ElementRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';

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
    selector: 'thy-mention-suggestion-template-example',
    templateUrl: './suggestions-template.component.html'
})
export class ThyMentionSuggestionsTemplateExampleComponent implements OnInit {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    value = `This is suggestion-template mention! @`;

    @ViewChild(ThyMentionDirective, { static: true }) mention: ThyMentionDirective;

    @ViewChild('suggestionsTemplateRef', { static: true }) suggestionsTemplateRef: TemplateRef<{ data: [] }>;

    mentions: Mention<any>[];

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
