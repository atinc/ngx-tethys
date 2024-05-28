import { Component } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-items-example',
    templateUrl: './items.component.html'
})
export class ThyBreadcrumbItemsExampleComponent {
    items = [
        { name: '测试111', icon: 'test-case-type' },
        { name: '测试222', icon: 'test-case-type' },
        { name: '测试332', icon: 'test-case-type' },
        { name: '测试444', icon: 'test-case-type' },
        { name: '测试555' }
    ];

    currentName = '测试555';
}
