import { Component } from '@angular/core';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-demo-affix-container-example',
    template: `
        <div class="scrollable-container" #container>
            <div class="background">
                <thy-affix [thyContainer]="container" id="affix-container-target">
                    <button thyButton [thyType]="'primary'">
                        <span>Fixed at the top of container</span>
                    </button>
                </thy-affix>
            </div>
        </div>
    `,
    styles: [
        `
            .scrollable-container {
                height: 100px;
                overflow-y: scroll;
            }

            .background {
                padding-top: 60px;
                height: 300px;
            }
        `
    ],
    imports: [ThyAffix, ThyButton]
})
export class ThyAffixContainerExampleComponent {}
