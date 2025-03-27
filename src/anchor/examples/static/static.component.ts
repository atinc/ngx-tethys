import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-anchor-static-example',
    template: `
        <div class="demo-card">
            <thy-anchor thyAffix="false" [thyOffsetTop]="60" thyContainer=".dg-scroll-container">
                <thy-anchor-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#components-anchor-demo-static" thyTitle="Static demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#API" thyTitle="API">
                    <thy-anchor-link thyHref="#anchor-props" thyTitle="thy-anchor"></thy-anchor-link>
                    <thy-anchor-link thyHref="#link-props" thyTitle="thy-anchor-link"></thy-anchor-link>
                </thy-anchor-link>
            </thy-anchor>
        </div>
    `,
    standalone: false
})
export class ThyAnchorStaticExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
