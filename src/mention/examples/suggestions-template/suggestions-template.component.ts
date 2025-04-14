import { Mention, ThyMentionDirective } from 'ngx-tethys/mention';
import { ThySelectionList } from 'ngx-tethys/list';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyListOption } from 'ngx-tethys/shared';
import { ThyInputDirective } from 'ngx-tethys/input';

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
    templateUrl: './suggestions-template.component.html',
    imports: [ThyMentionDirective, FormsModule, ThySelectionList, ThyListOption, ThyAvatar, ThyInputDirective]
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
