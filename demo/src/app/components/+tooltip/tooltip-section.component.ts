import { OnInit, Component } from '@angular/core';
import { apiParameters } from './api-parameters';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { TooltipBasicDemoComponent } from './basic/tooltip-basic.component';
import { TooltipTemplateDemoComponent } from './template/tooltip-template.component';
import { TooltipTemplateDataDemoComponent } from './template-data/tooltip-template-data.component';

@Component({
    selector: 'app-demo-tooltip-section',
    templateUrl: './tooltip-section.component.html'
})
export class DemoTooltipSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Basic',
            component: TooltipBasicDemoComponent,
            description: `基本使用`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'tooltip-basic.component.html',
                    content: require('!!raw-loader!./basic/tooltip-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'tooltip-basic.component.ts',
                    content: require('!!raw-loader!./basic/tooltip-basic.component.ts')
                }
            ]
        },
        {
            title: 'Custom Template',
            component: TooltipTemplateDemoComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'tooltip-template.component.html',
                    content: require('!!raw-loader!./template/tooltip-template.component.html')
                },
                {
                    type: 'ts',
                    name: 'tooltip-template.component.ts',
                    content: require('!!raw-loader!./template/tooltip-template.component.ts')
                }
            ]
        },
        {
            title: 'Custom Template Tooltip with data',
            component: TooltipTemplateDataDemoComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'tooltip-template-data.component.html',
                    content: require('!!raw-loader!./template-data/tooltip-template-data.component.html')
                },
                {
                    type: 'ts',
                    name: 'tooltip-template-data.component.ts',
                    content: require('!!raw-loader!./template-data/tooltip-template-data.component.ts')
                }
            ]
        }
    ];

    apiParameters = apiParameters;

    ngOnInit() {}
}
