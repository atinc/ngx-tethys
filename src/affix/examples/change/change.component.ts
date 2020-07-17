import { Component } from '@angular/core';

@Component({
    selector: 'thy-affix-on-change-example',
    template: `
        <thy-affix [thyOffsetTop]="120" (thyChange)="onChange($event)">
            <button thyButton>
                <span>120px to affix top</span>
            </button>
        </thy-affix>
    `
})
export class ThyAffixChangeExampleComponent {
    onChange(status: boolean): void {
        console.log(status);
    }
}
