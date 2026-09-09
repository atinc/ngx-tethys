import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyBreadcrumb } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-breadcrumb-reactive-example',
    templateUrl: './reactive.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBreadcrumb, ThyIcon]
})
export class ThyBreadcrumbReactiveExampleComponent {
    items = [
        { name: '测试111', icon: 'test-case-type' },
        { name: '测试222', icon: 'test-case-type' },
        { name: '测试332', icon: 'test-case-type' },
        { name: '测试444', icon: 'test-case-type' },
        { name: '测试555' }
    ];

    currentName = '测试555';
}
