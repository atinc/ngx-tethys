import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-anchor-static-example',
    template: `
        <div class="demo-card">
            <thy-anchor thyAffix="false" [thyOffsetTop]="60">
                <thy-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-link>
                <thy-link thyHref="#components-anchor-demo-static" thyTitle="Static demo"></thy-link>
                <thy-link thyHref="#API" thyTitle="API">
                    <thy-link thyHref="#anchor-props" thyTitle="thy-anchor"></thy-link>
                    <thy-link thyHref="#link-props" thyTitle="thy-link"></thy-link>
                </thy-link>
            </thy-anchor>
        </div>
    `
})
export class ThyAnchorStaticExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
