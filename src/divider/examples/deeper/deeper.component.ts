import { Component, ViewEncapsulation } from '@angular/core';

import { mockArticle } from '../mock-article';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-deeper-example',
    templateUrl: './deeper.component.html',
    styleUrls: ['./deeper.component.scss']
})
export class ThyDividerDeeperExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
