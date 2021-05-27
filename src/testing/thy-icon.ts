import { ThyIconRegistry } from 'ngx-tethys/icon';

import { Provider, Sanitizer, SecurityContext } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

export const bypassSanitizeProvider: Provider = {
    provide: Sanitizer,
    useValue: {
        sanitize: (context: SecurityContext, html: string) => html
    }
};

export const defaultInlineIconSet = `
  <svg>
    <defs>
        <svg id="inbox"><path d="M10 10"/></svg>
        <svg id="close"><path d="M10 10"/></svg>
        <svg id="close-bold"><path d="M10 10"/></svg>
        <svg id="calendar-check"><path d="M10 10"/></svg>
        <svg id="calendar"><path d="M10 10"/></svg>
        <svg id="angle-down"><path d="M10 10"/></svg>
        <svg id="check"><path d="M10 10"/></svg>
        <svg id="application-fill"></svg>
        <svg id="angle-right"></svg>
        <svg id="minus-circle-fill"></svg>
        <svg id="check-circle-fill"></svg>
        <svg id="waring-fill"></svg>
        <svg id="close-circle-fill"></svg>
        <svg id="question-circle-fill"></svg>
        <svg id="more-bold"></svg>
        <svg id="filter">
         <title>Filter Title</title>
         <defs> <linearGradient id="Gradient1"><stop class="stop1" offset="0%"/><stop class="stop2" offset="50%"/><stop class="stop3" offset="100%"/></linearGradient></defs>
         <style> #rect1 { fill: url(#Gradient1); }</style>
         <path d="filter" style=" "/>
        </svg>
        <svg id="close-circle-bold-fill"></svg>
        <svg id="sort-tt"><style>.circle {  fill: orange; }</style><g id="phnormal/sort-tt" stroke-width="1" fill-rule="nonzero"><path d="M10 10 0 0 1 5.1 1.5v12.99a.6.6 0 0 1-1.2 0V3.607L2.466 6.082a.6.6 0 1 1-1.04-.6l2.47-4.262a.599.599 0 0 1 .426-.293z" id="ph形状结合"/><path d="M13.765 1.027a.6.6 0 0 1 .778.573v12.805a.6.6 0 1 1-1.2 0V3.682L11.82 6.276a.6.6 0 1 1-1.04-.6l2.558-4.356a.599.599 0 0 1 .427-.293z" id="sort-secondary-color" transform="rotate(-180 12.621 8.003)"/></g></svg>
    </defs>
  </svg>
`;

export const defaultSvgHtml = `
<svg viewBox="0 0 16 16" id="close1" xmlns="http://www.w3.org/2000/svg">
   <path d="M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"/>
</svg>`;

export const injectDefaultSvgIconSet = () => {
    inject([ThyIconRegistry, DomSanitizer], (iconRegistry: ThyIconRegistry, domSanitizer: DomSanitizer) => {
        iconRegistry.addSvgIconSetLiteral(domSanitizer.bypassSecurityTrustHtml(defaultInlineIconSet));
    })();
};
