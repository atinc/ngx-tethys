import { Provider, Sanitizer, SecurityContext } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ThyIconRegistry } from '../../icon';
import { DomSanitizer } from '@angular/platform-browser';

export const bypassSanitizeProvider: Provider = {
    provide: Sanitizer,
    useValue: {
        sanitize: (context: SecurityContext, html: string) => html
    }
};

export const defaultInlineIconSet =
    `
  <svg>
    <defs>
        <svg id="inbox">
        <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-` +
    `7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
        </svg>
        <svg id="close">
        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-` +
    `2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9` +
    `-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        />
        </svg>
        <svg id="calendar-check">
        <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H` +
    `5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-` +
    `3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
        </svg>
        <svg id="angle-down">
           <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H/>
        </svg>
        <svg id="check">
           <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H/>
        </svg>
    </defs>
  </svg>
`;

export const defaultSvgHtml = `
<svg viewBox="0 0 16 16" id="close1" xmlns="http://www.w3.org/2000/svg">
   <path d="M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"/>
</svg>`;

export const injectDefaultSvgIconSet = () => {
    inject([ThyIconRegistry], (iconRegistry: ThyIconRegistry) => {
        iconRegistry.addSvgIconSetLiteral(defaultInlineIconSet);
    })();
};
