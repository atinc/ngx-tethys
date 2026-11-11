import { Mention, ThyMentionDirective } from 'ngx-tethys/mention';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    selector: 'thy-mention-async-example',
    templateUrl: './async.component.html',
    imports: [ThyMentionDirective, ThyAvatar, FormsModule, ThyInputDirective]
})
export class ThyMentionAsyncExampleComponent implements OnInit {
    value = `This is remote mention!`;

    memberDisplayTemplateRef = viewChild<TemplateRef<any>>('member');

    mentions!: Mention<any>[];

    constructor() {}

    ngOnInit() {
        this.mentions = [
            {
                trigger: '@',
                data: mockUsers,
                displayTemplateRef: this.memberDisplayTemplateRef(),
                emptyText: '无匹配的成员',
                autoClose: false,
                search: (term: string) => {
                    const result = mockUsers.filter(item => {
                        return (
                            item.name.toLowerCase().includes(term.toLowerCase()) ||
                            item.display_name.toLowerCase().includes(term.toLowerCase())
                        );
                    });
                    return of(result).pipe(
                        delay(1000),
                        tap(() => console.log('remote search'))
                    );
                }
            }
        ];
    }
}
