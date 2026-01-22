import { Mention, MentionSuggestionSelectEvent, ThyMentionDirective } from 'ngx-tethys/mention';
import { ThyInputDirective } from 'ngx-tethys/input';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    templateUrl: './basic.component.html',
    imports: [ThyMentionDirective, FormsModule, ThyInputDirective]
})
export class ThyMentionBasicExampleComponent {
    value = ``;

    mentions: Mention[] = [
        {
            trigger: '@',
            data: mockUsers as Array<{ name: string; display_name: string }>
        }
    ];

    mention = viewChild<ThyMentionDirective>(ThyMentionDirective);

    selectSuggestion(event: MentionSuggestionSelectEvent) {
        console.log(event);
    }

    onEnter(event: KeyboardEvent) {
        if (!this.mention()?.isOpened) {
            console.log(event);
        }
    }
}
