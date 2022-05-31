import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Inject, Input, Optional } from '@angular/core';
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
export class ThySegmentedItemComponent implements AfterViewInit {
    /**
     * 选项的值
     * @default ''
     */
    @Input() thyValue: string;

    /**
     * 选项的图标
     * @default ''
     */
    @Input() thyIconName: string;

    /**
     * 选项的文本
     * @default ''
     */
    @Input() thyLabelText: string;

    /**
     * 是否禁用该选项
     * @default false
     */
    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    public isOnlyIcon: boolean;

    constructor(
        public elementRef: ElementRef,
        @Optional() @Inject(THY_SEGMENTED_COMPONENT) public parent: IThySegmentedComponent,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {
        this.isOnlyIcon = assertIconOnly(this.elementRef.nativeElement.children[0]) && this.parent.thyMode === 'adaptive';
        this.cdr.detectChanges();
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (!this.thyDisabled && !this.parent.thyDisabled && this.parent.selectedItem !== this) {
            this.parent.selectedItem.unselect();
            this.parent.changeSelectedItem(event, this);
        }
    }

    public select() {
        this.elementRef.nativeElement.classList.add('active');
    }

    private unselect() {
        this.elementRef.nativeElement.classList.remove('active');
    }
}
