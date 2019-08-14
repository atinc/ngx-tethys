import { Component, Input, HostBinding } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { coerceArray } from '@angular/cdk/coercion';
export interface CodeExampleInfo {
    type: string;
    name: string;
    content: string;
}

export interface LiveDemoCodeExample {
    title: string;
    description?: string;
    component: ComponentType<any>;
    codeExamples: CodeExampleInfo[];
}

@Component({
    selector: 'app-live-demo',
    templateUrl: './live-demo.component.html'
})
export class LiveDemoComponent {
    showCodeExamples = false;
    examples: CodeExampleInfo[];
    currentCodeExample: CodeExampleInfo;
    @HostBinding(`class.live-demo-container`) addContainerClass = true;
    @Input() title: string;
    @Input() component: ComponentType<any>;
    @Input() description: string;

    @Input() set codeExamples(value: CodeExampleInfo | CodeExampleInfo[]) {
        this.examples = coerceArray(value);
        this.currentCodeExample = this.examples && this.examples.length > 0 ? this.examples[0] : null;
    }

    toggleCodeExample() {
        this.showCodeExamples = !this.showCodeExamples;
    }

    selectCodeExample(item: CodeExampleInfo) {
        this.currentCodeExample = item;
    }
}

@Component({
    selector: 'app-live-demos',
    templateUrl: './live-demos.component.html'
})
export class LiveDemosComponent {
    @HostBinding(`class.live-demos`) addDemosClass = true;

    @Input() data: LiveDemoCodeExample[];
}
