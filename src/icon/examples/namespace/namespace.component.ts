import { ThyIcon, ThyIconRegistry } from 'ngx-tethys/icon';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'thy-icon-namespace-example',
    templateUrl: './namespace.component.html',
    styleUrls: ['./namespace.component.scss'],
    imports: [ThyIcon]
})
export class ThyIconNamespaceExampleComponent {
    constructor() {
        const iconRegistry = inject(ThyIconRegistry);
        const domSanitizer = inject(DomSanitizer);

        iconRegistry.addSvgIconInNamespace(
            'mat',
            'thumbs-up',
            domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/icons/thumbs-up.svg`)
        );
    }
}
