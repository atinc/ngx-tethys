import { Component, TemplateRef, Sanitizer, OnInit } from '@angular/core';
import { ThyIconRegistry } from '../../../../../src/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'demo-icon-section',
    templateUrl: './icon-section.component.html',
    styleUrls: ['./icon-section.scss']
})
export class DemoIconSectionComponent implements OnInit {
    apiThyIconParameters = [
        {
            property: 'thyIconName',
            description: `图标名称`,
            type: 'String',
            default: ''
        }
    ];

    fontSizeClass = 'font-size-xlg';

    colorClass = 'text-body';

    basicCodeExample = require('!!raw-loader!./basic/icon-basic-demo.component.html');

    glyphs: any;

    constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer, private http: HttpClient) {
        iconRegistry.addSvgIconSet(
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/defs/svg/sprite.defs.svg')
            // sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/symbol/svg/sprite.symbol.svg')
        );
    }

    ngOnInit(): void {
        this.http.get(`/assets/icons/glyphs.json`).subscribe(response => {
            this.glyphs = response;
        });
    }
}
