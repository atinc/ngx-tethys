import { Component, ElementRef, HostBinding, HostListener, Input, Optional } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { assertIconOnly } from 'ngx-tethys/util';
import { ThySegmentedComponent } from './segmented.component';

@Component({
    selector: 'thy-segmented-item,[thy-segmented-item]',
    templateUrl: './segmented-item.component.html',
    host: {
        class: 'thy-segmented-item'
    }
})
export class ThySegmentedItemComponent {
    @Input() thyValue: string;

    @Input() thyIconName: string;

    @Input() thyLabelText: string;

    @Input() thyTooltip: string;

    @Input() thyTooltipPlacement: string = 'top';

    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    @HostBinding(`class.active`)
    get isSelected() {
        return this.parent.selectedItem === this;
    }

    get isOnlyIcon(): boolean {
        return assertIconOnly(this.elementRef.nativeElement.children[0]) && this.parent.thyMode === 'adaptive';
    }

    constructor(@Optional() private parent: ThySegmentedComponent, public elementRef: ElementRef) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (!this.thyDisabled && !this.parent.thyDisabled && this.parent.selectedItem !== this) {
            this.parent.changeSelectedItem(event, this);
        }
    }
}
