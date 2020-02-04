import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Mention } from 'ngx-tethys/mention/interfaces';
import { PEOPLE_NAMES } from '../peoples-mock';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const members = PEOPLE_NAMES.map(name => {
    return {
        name: name,
        display_name: name
    };
});

type Member = typeof members[0];

@Component({
    selector: 'app-demo-mention-remote',
    templateUrl: './remote.component.html'
})
export class DemoMentionRemoteComponent implements OnInit {
    value = `This is remote mention!`;
    @ViewChild('member') memberDisplayTemplateRef: TemplateRef<any>;

    mentions: Mention<any>[];

    constructor() {}

    ngOnInit(): void {
        this.mentions = [
            {
                trigger: '@',
                data: members,
                displayTemplateRef: this.memberDisplayTemplateRef,
                emptyText: '无匹配的成员',
                autoClose: false,
                search: (term: string) => {
                    const result = members.filter(item => {
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
