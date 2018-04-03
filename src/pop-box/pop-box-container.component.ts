import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation, HostListener } from '@angular/core';
import { PopBoxService } from './pop-box.service';
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

    public popBoxService: PopBoxService;

    protected config: PopBoxOptions;


    constructor(
        protected element: ElementRef,
        private renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.config = this.popBoxService.config;
    }


    hide(): void {
        this.popBoxService.hide();
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
