import { ThyIconRegistry } from 'ngx-tethys/icon';

import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const linearGradientSvg = `
<svg width="120" height="120"  viewBox="0 0 120 120"
xmlns="http://www.w3.org/2000/svg" version="1.1"
xmlns:xlink="http://www.w3.org/1999/xlink" >

<defs>
   <linearGradient id="MyGradient">
       <stop offset="5%"  stop-color="green"/>
       <stop offset="95%" stop-color="gold"/>
   </linearGradient>
</defs>

<rect fill="url(#MyGradient)"
     x="10" y="10" width="100" height="100"/>
</svg>`;

@Component({
    selector: 'thy-icon-linear-gradient-example',
    templateUrl: './linear-gradient.component.html',
    styleUrls: ['./linear-gradient.component.scss'],
    standalone: false
})
export class ThyIconLinearGradientExampleComponent {
    constructor() {
        const iconRegistry = inject(ThyIconRegistry);
        const domSanitizer = inject(DomSanitizer);

        iconRegistry.addSvgIconLiteral('my-linear-gradient', domSanitizer.bypassSecurityTrustHtml(linearGradientSvg));
    }
}
