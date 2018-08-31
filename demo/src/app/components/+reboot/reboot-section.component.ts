import { Component, TemplateRef, OnInit } from '@angular/core';
import { ShowcaseSection } from '../../docs/model/showcase-section';
import { ComponentExample } from '../../docs/model/component-example';
import { RebootSectionLinkComponent } from './items/link.component';

@Component({
    selector: 'demo-reboot-section',
    templateUrl: './reboot-section.component.html',
    //   styleUrls: ['./app.component.scss']
})
export class DemoRebootSectionComponent implements OnInit {

    componentExamples: ComponentExample[] = [];

    constructor() {
    }

    ngOnInit() {
        this.componentExamples = [
            {
                title: 'Basic',
                anchor: 'basic',
                description: '',
                component: require('!!raw-loader?lang=typescript!./items/link.component.ts'),
                html: require('!!raw-loader?lang=markup!./items/link.component.html'),
                outlet: RebootSectionLinkComponent
            }
        ];

    }
}
