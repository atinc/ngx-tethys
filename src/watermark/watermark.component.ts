import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';

const MAX_Z_INDEX = 2147483647;
@Component({
    selector: 'thy-watermark',
    template: '<ng-container></ng-container>',
    host: {
        id: 'thy-watermark-wrap'
    }
})
export class ThyWatermarkComponent implements OnInit, OnDestroy {
    content: string;
    mo: MutationObserver;

    @Input() thyMust: boolean = false;
    @Input()
    set thyContent(value: string) {
        this.content = value;
        setTimeout(() => {
            this.canvasWM();
        }, 4);
    }

    constructor(private el: ElementRef) {}

    ngOnInit() {}

    canvasWM({
        width = '300px',
        height = '200px',
        font = '12px microsoft yahei',
        fillStyle = 'rgba(184, 184, 184, 0.8)',
        content = this.content,
        rotate = -15,
        zIndex = MAX_Z_INDEX
    } = {}) {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        var ctx = canvas.getContext('2d');
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.rotate((Math.PI / 180) * rotate);
        ctx.fillText(content, parseFloat(width) / 20, parseFloat(height) / 2);
        const base64Url = canvas.toDataURL();

        const watermarkDiv = this.el.nativeElement;
        const styleStr = `
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`;

        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');

        const parentNode = this.el.nativeElement.parentNode;
        const style = `${parentNode.getAttribute('style')}position:relative;`;
        parentNode.setAttribute('style', style);

        const __wm = parentNode.querySelector('__vm');
        if (!__wm) {
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }

        if (this.thyMust) {
            console.log(parentNode, 'parentNode');
            const MutationObserver = window.MutationObserver;
            if (MutationObserver) {
                this.mo = new MutationObserver(() => {
                    const __wm = document.querySelector('.__wm');
                    if (__wm) {
                        this.mo.disconnect();
                        this.mo = null;
                        this.canvasWM();
                    }
                });

                this.mo.observe(parentNode, {
                    attributes: true,
                    subtree: true,
                    childList: true
                });
            }
        }
    }
    ngOnDestroy() {
        this.mo?.disconnect();
        this.mo = null;
    }
}
