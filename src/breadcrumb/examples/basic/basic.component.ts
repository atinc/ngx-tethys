import { Component } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyBreadcrumbBasicExampleComponent {
    items = ['测试111', '测试222', '测试332', '测试444', '测试555'];

    currentName = '测试555';

    select(text: string) {
        console.log(text);
    }
}
