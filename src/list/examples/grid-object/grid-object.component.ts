import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-grid-object-example',
    templateUrl: './grid-object.component.html'
})
export class ThyListGridObjectExampleComponent implements OnInit {
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

    public gridUniqueKey = 'id';

    public selectionObjectModel: any = null;

    constructor() {}

    ngOnInit() {}
}
