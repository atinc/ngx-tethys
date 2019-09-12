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

export const defaultInlineIconSet = `
  <svg>
    <defs>
        <svg id="inbox"></svg>
        <svg id="close"></svg>
        <svg id="close-bold"></svg>
        <svg id="calendar-check"></svg>
        <svg id="angle-down"></svg>
        <svg id="check"></svg>
        <svg id="application-fill"></svg>
        <svg id="angle-right"></svg>
        <svg id="minus-circle-fill"></svg>
        <svg id="check-circle-fill"></svg>
        <svg id="waring-fill"></svg>
        <svg id="close-circle-fill"></svg>
        <svg id="question-circle-fill"></svg>
        <svg id="more-bold"></svg>
        <svg id="filter"></svg>
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
