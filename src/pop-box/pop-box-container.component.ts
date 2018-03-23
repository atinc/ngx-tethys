import { Component, ElementRef, Renderer2, ViewEncapsulation, HostListener } from '@angular/core';
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
    encapsulation: ViewEncapsulation.None
})
export class PopBoxContainerComponent {

    public popBoxService: PopBoxService;

    protected config: PopBoxOptions;


    constructor(
        protected _element: ElementRef,
        private _renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.config = this.popBoxService._config;
    }


    hide(): void {
        this.popBoxService.hide();
    }

    @HostListener('window:keydown.esc', ['$event'])
    onEsc(event: any): void {
        if (event.keyCode === 27) {
            event.preventDefault();
        }

        if (this.config.keyboard) {
            this.hide();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        if (!this.config.target.nativeElement.contains(event.target) &&
            !this._element.nativeElement.contains(event.target)) {
            this.hide();
        }
    }

    ngOnDestroy(): void {
    }
}
