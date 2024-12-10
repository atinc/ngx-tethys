import { Component, ViewEncapsulation } from '@angular/core';

import { mockArticle } from '../mock-article';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-with-text-example',
    templateUrl: './with-text.component.html',
    standalone: false
})
export class ThyDividerWithTextExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
