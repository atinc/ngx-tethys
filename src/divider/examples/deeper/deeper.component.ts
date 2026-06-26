import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { mockArticle } from '../mock-article';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-deeper-example',
    templateUrl: './deeper.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider]
})
export class ThyDividerDeeperExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
