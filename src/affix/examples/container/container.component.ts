import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-affix-container',
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
    ]
})
export class ThyAffixContainerExampleComponent {}
