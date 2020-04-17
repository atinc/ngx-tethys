import { Component, OnInit } from '@angular/core';
import { rowApiParameters, colApiParameters } from './api-parameters';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoRasterBasicComponent } from './basic/basic.component';

@Component({
    selector: 'raster-section',
    templateUrl: './raster-section.component.html',
    host: {
        class: 'rester-section'
    }
})
export class DemoRasterSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Raster Basic',
            component: DemoRasterBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'basic.component.html',
                    content: require('!!raw-loader!./basic/basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./basic/basic.component.ts')
                }
            ]
        }
    ];

    rowApiParameters = rowApiParameters;

    colApiParameters = colApiParameters;

    constructor() {}

    ngOnInit() {}
}
