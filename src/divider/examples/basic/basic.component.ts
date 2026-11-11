import { Component, ViewEncapsulation } from '@angular/core';
import { mockArticle } from '../mock-article';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyDivider]
})
export class ThyDividerBasicExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
