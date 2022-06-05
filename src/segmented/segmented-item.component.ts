import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, Optional } from '@angular/core';
import { IThySegmentedComponent, THY_SEGMENTED_COMPONENT } from './segmented.token';
import { InputBoolean } from 'ngx-tethys/core';
import { assertIconOnly } from 'ngx-tethys/util';

@Component({
    selector: 'thy-segmented-item,[thy-segmented-item]',
    templateUrl: './segmented-item.component.html',
    host: {
        class: 'thy-segmented-item'
    }
})
export class ThySegmentedItemComponent implements OnInit {
    @Input() thyValue: string;

    @Input() thyIconName: string;

    @Input() thyLabelText: string;

    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    public isOnlyIcon: boolean;

    constructor(public elementRef: ElementRef, @Optional() @Inject(THY_SEGMENTED_COMPONENT) public parent: IThySegmentedComponent) {}

    ngOnInit() {
        this.isOnlyIcon = assertIconOnly(this.elementRef.nativeElement.children[0]) && this.parent.thyMode === 'adaptive';
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (!this.thyDisabled && !this.parent.thyDisabled && this.parent.selectedItem !== this) {
            this.parent.selectedItem.unselect();
            this.parent.changeSelectedItem(event, this);
        }
    }

    select() {
        this.elementRef.nativeElement.classList.add('active');
    }

    unselect() {
        this.elementRef.nativeElement.classList.remove('active');
    }
}
