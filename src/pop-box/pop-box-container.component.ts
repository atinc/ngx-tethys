import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation, HostListener } from '@angular/core';
import { PopBoxRef } from './pop-box-ref.service';
import { PopBoxOptions } from './pop-box-options.class';

@Component({
    selector: 'pop-box-container',
    template: `
      <div [class]="'pop-box'" role="document">
        <div class="pop-box-content">
          <ng-content></ng-content>
        </div>
      </div>
    `,
})
export class PopBoxContainerComponent implements OnInit {

    public popBoxRef: PopBoxRef;

    public config: PopBoxOptions;


    constructor(
        protected element: ElementRef,
        private renderer: Renderer2) {

    }

    ngOnInit(): void {
    }


    hide(): void {
        this.popBoxRef.hide();
    }

    @HostListener('window:keydown.esc', ['$event'])
    onEsc(event: any): void {
        if (this.config.keyboardESCClose) {
            event.preventDefault();
            this.hide();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        if (!this.config.target.contains(event.target)) {
            if (this.config.insideAutoClose || !this.element.nativeElement.contains(event.target)) {
                this.hide();
            }
        }
    }
}
