import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-affix-on-change-example',
    template: `
        <thy-affix [thyOffsetTop]="120" (thyChange)="onChange($event)">
            <button thyButton thyType="primary">
                <span>120px to affix top</span>
            </button>
        </thy-affix>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAffix, ThyButton]
})
export class ThyAffixChangeExampleComponent {
    onChange(status: boolean): void {
        console.log(status);
    }
}
