import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-example-group',
    templateUrl: './group.component.html'
})
export class CheckboxGroupComponent implements OnInit {
    constructor() {}

    public inlineStatus = true;

    public labelTextKeyStatus = false;

    public labelTextKey = 'name';

    public model = [
        { name: 'item1', key: 'option1', checked: true },
        { name: 'item2', key: 'option2', checked: true },
        { name: 'item3', key: 'option3', checked: false },
        { name: 'item4', key: 'option4', disabled: true, checked: false },
        { name: 'item5', key: 'option5', checked: true },
        { name: 'item6', key: 'option5', checked: false }
    ];

    ngOnInit() {}

    changeLabelTextKey(event: boolean) {
        this.labelTextKey = event ? 'key' : 'name';
    }
}
