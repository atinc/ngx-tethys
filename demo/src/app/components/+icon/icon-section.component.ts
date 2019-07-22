import { Component, TemplateRef, Sanitizer, OnInit } from '@angular/core';
import { ThyIconRegistry } from '../../../../../src/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

const BIKE_ICON =
    `
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 ` +
    `5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 ` +
    `1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 ` +
    `0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 ` +
    `1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 ` +
    `5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 ` +
    `3.5-3.5 3.5z"/>
  </svg>
`;

const INLINE_ICON_SET =
    `
  <svg>
    <defs>
    <svg id="account-balance">
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-` +
    `7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
    </svg>
    <svg id="account-balance-wallet">
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-` +
    `2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9` +
    `-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      />
    </svg>
    <svg id="account-box">
      <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H` +
    `5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-` +
    `3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
    </svg>
    </defs>
  </svg>
`;

export const ICON_SVG_BASE_URL = `http://pic4us.com:8888/icons`;
// export const ICON_SVG_BASE_URL = ``;

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
        },
        {
            property: 'thyIconType',
            description: `图标类型，目前支持三种： Outlined, Filled, Two Tone, Two Tone 暂时还不完善，先不要使用`,
            type: 'outline | fill | twotone',
            default: 'outline'
        },
        {
            property: 'thyTwotoneColor',
            description: `twotone 类型的颜色值`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIconSet',
            description: `使用字体图标库`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIconRotate',
            description: `顺时针旋转角度`,
            type: 'Number',
            default: '0'
        }
    ];

    fontSizeClass = 'font-size-xlg';

    colorClass = 'text-body';

    basicCodeExample = require('!!raw-loader!./basic/icon-basic-demo.component.html');

    glyphs: any;

    constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer, private http: HttpClient) {
        iconRegistry
            .addSvgIcon('thumb-up', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/thumbup-icon.svg'))
            .addSvgIconLiteral('bike', sanitizer.bypassSecurityTrustHtml(BIKE_ICON))
            .addSvgIconInNamespace(
                'core',
                'thumb-up',
                sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/thumbup-icon.svg')
            )
            .addSvgIconLiteralInNamespace('core', 'bike', sanitizer.bypassSecurityTrustHtml(BIKE_ICON))
            .addSvgIconSetInNamespace(
                'core',
                sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/core-icon-set.svg')
            )
            .addSvgIconSetLiteralInNamespace('core-inline', sanitizer.bypassSecurityTrustHtml(INLINE_ICON_SET));
    }

    ngOnInit(): void {
        this.http.get(`${ICON_SVG_BASE_URL}/assets/icons/glyphs.json`).subscribe(response => {
            this.glyphs = response;
        });
    }
}
