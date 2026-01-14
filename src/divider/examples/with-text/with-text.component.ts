import { Component, ViewEncapsulation } from '@angular/core';
import { mockArticle } from '../mock-article';
import { ThyDivider } from 'ngx-tethys/divider';

import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-with-text-example',
    templateUrl: './with-text.component.html',
    imports: [ThyDivider, ThySelect, ThyOption]
})
export class ThyDividerWithTextExampleComponent {
    articleList: string[] = mockArticle;
    constructor() {}
}
