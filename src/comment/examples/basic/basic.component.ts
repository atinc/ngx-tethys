import { Component } from '@angular/core';

import { formatDistance } from 'date-fns';

@Component({
    selector: 'thy-comment-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyCommentBasicExampleComponent {
    time = formatDistance(new Date(), new Date());

    constructor() {}
}
