import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { PopBoxService } from './pop-box.service';
@Component({
    selector: 'pop-box-container',
    template: `
      <div [class]="'pop-box'" role="document">
        <div class="pop-box-content">
          <ng-content></ng-content>
        </div>
      </div>
    `,
    styleUrls: ['./pop-box.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PopBoxContainerComponent {

    public popBoxService: PopBoxService;

    constructor(
        protected _element: ElementRef,
        private _renderer: Renderer2) {

    }

    hide(): void {
        this.popBoxService.hide();
    }
}
