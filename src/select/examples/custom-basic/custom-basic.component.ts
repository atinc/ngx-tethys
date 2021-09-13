import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'thy-select-custom-basic-example',
    templateUrl: './custom-basic.component.html',
    styles: [
        `
            .custom-basic-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-custom-select {
                flex: 0 0 auto;
                width: 120px;
                margin-right: 20px;
            }
        `
    ]
})
export class ThySelectCustomBasicExampleComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
