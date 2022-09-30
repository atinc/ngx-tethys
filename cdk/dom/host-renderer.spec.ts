import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { useElementRenderer } from './element-renderer';
import { HostRenderer, useHostRenderer } from './host-renderer';

@Component({
    selector: 'thy-dom-host-renderer-test',
    template: 'Content',
    providers: [HostRenderer]
})
export class ThyDomHostRendererTestComponent implements OnInit {
    hostRenderer = inject(HostRenderer);

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}

@Component({
    selector: 'thy-dom-use-host-renderer-test',
    template: 'Content'
})
export class ThyDomUseHostRendererTestComponent implements OnInit {
    hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}

@Component({
    selector: 'thy-dom-use-element-renderer-test',
    template: '<div #container></div>'
})
export class ThyDomUseElementRendererTestComponent implements OnInit {
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

    containerRenderer = useElementRenderer();

    constructor() {}

    ngOnInit(): void {
        this.containerRenderer.setElement(this.container.nativeElement);
        // 必须在之前调用 setElement 设置 Element 元素
        this.containerRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.containerRenderer.setStyle('color', '#000');
    }
}
