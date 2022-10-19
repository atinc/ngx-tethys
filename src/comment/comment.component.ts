import { Component, Input } from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';

@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    providers: [UpdateHostClassService]
})
export class ThyCommentComponent {
    @Input() thyAuthor?: string;

    @Input() thyDatetime?: string;

    @Input() thyAvatar?: string;

    constructor() {}
}
