import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-changelog',
    templateUrl: 'changelog.component.html'
})
export class ChangelogComponent implements OnInit {
    public markdownValue = require('!!raw-loader!../../../../../CHANGELOG.md');

    constructor() {}

    ngOnInit() {}
}
