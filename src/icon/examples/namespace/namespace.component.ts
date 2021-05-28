import { ThyIconRegistry } from 'ngx-tethys/icon';

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'thy-icon-namespace-example',
    templateUrl: './namespace.component.html',
    styleUrls: ['./namespace.component.scss']
})
export class ThyIconNamespaceExampleComponent {
    constructor(iconRegistry: ThyIconRegistry, domSanitizer: DomSanitizer) {
        iconRegistry.addSvgIconInNamespace(
            'mat',
            'thumbs-up',
            domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/icons/thumbs-up.svg`)
        );
    }
}
