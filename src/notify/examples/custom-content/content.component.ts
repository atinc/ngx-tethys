import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-content-example',
    template: `
        <h3>{{ title }}</h3>
        <div class="mb-1">段落1...</div>
        <div class="mb-1">段落2...</div>
        <div class="mb-1">段落3...</div>
    `,
    host: {
        class: 'thy-notify-content-example'
    }
})
export class ThyNotifyContentExampleComponent implements OnInit {
    title: string = '默认标题';

    constructor() {}

    ngOnInit() {}
}
