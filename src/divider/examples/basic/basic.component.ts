import { Component, ViewEncapsulation } from '@angular/core';
import { mockArticle } from '../mock-article';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyDividerBasicExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
