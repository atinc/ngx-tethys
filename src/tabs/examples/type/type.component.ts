import { Component } from '@angular/core';

@Component({
    selector: 'thy-tabs-type-example',
    templateUrl: './type.component.html'
})
export class ThyTabsTypeExampleComponent {
    public types = ['pulled', 'tabs', 'pills'];

    public currentType = 'pills';
}
