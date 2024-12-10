import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-unique-key-example',
    templateUrl: './unique-key.component.html',
    standalone: false
})
export class ThyListUniqueKeyExampleComponent implements OnInit {
    public gridUniqueKeyItems = [
        {
            id: 1,
            name: 'Grid Item 1'
        },
        {
            id: 2,
            name: 'Grid Item Same'
        },
        {
            id: 3,
            name: 'Grid Item Same'
        },
        {
            id: 4,
            name: 'Grid Item 4'
        },
        {
            id: 5,
            name: 'Grid Item 5'
        }
    ];

    public gridUniqueKey = 'name';

    public selectionObjectModel: any = { id: 2, name: 'Grid Item Same' };

    constructor() {}

    ngOnInit() {}
}
