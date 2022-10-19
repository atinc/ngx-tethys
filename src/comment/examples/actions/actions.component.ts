import { Component } from '@angular/core';

import { formatDistance } from 'date-fns';

@Component({
    selector: 'thy-comment-basic-example',
    templateUrl: './actions.component.html'
})
export class ThyCommentActionsExampleComponent {
    time = formatDistance(new Date(), new Date());

    constructor() {}
}
