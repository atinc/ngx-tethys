import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-section-variables',
    template: `
        <pre><code lang="css" [highlight]="variablesRawContent"></code></pre>
    `
})
export class DemoVariablesSectionComponent implements OnInit {
    public variablesRawContent = require('!!raw-loader!../../../../../src/styles/variables.scss');

    constructor() {}

    ngOnInit() {}
}
