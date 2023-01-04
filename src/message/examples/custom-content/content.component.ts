import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'thy-message-content-example',
    template: `
        <h3>{{ title }}</h3>
        <div class="mb-1">段落1...</div>
        <div class="mb-1">段落2...</div>
        <div class="mb-1">段落3...</div>
    `,
    host: {
        class: 'thy-message-content-example'
    }
})
export class ThyMessageContentExampleComponent implements OnInit {
    title: string = '默认标题';

    constructor() {}

    ngOnInit() {}
}
