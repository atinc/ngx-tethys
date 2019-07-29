import { Component, Input, HostBinding } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

export interface CodeExampleInfo {
    type: string;
    content: string;
}

@Component({
    selector: 'app-live-demo',
    templateUrl: './live-demo.component.html'
})
export class LiveDemoComponent {
    showCodeExamples = false;

    @HostBinding(`class.live-demo-container`) addContainerClass = true;
    @Input() title: string;
    @Input() component: ComponentType<any>;
    @Input() description: string;
    @Input() codeExamples: CodeExampleInfo[];

    toggleCodeExample() {
        this.showCodeExamples = !this.showCodeExamples;
    }
}
