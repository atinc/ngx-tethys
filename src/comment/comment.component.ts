import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyCommentComponent {
    @Input() thyAuthor?: string | TemplateRef<void>;

    @Input() thyDatetime?: string | TemplateRef<void>;

    @Input() thyAvatar?: string | TemplateRef<void>;

    constructor() {}
}
