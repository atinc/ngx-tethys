import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    TemplateRef,
    ViewChild,
    ContentChildren,
    QueryList,
    ChangeDetectionStrategy,
    HostBinding,
    HostListener
} from '@angular/core';
@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionComponent implements OnInit {
    @Input() thyValue: any;

    // 原始值，用于自定义模板展示内容时回传的对象
    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    @Input() thyDisabled: boolean;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @HostBinding('class.thy-option-item') _isOptionItem = true;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    // @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<ThyOptionComponent>;

    // showOptionComponents: ThyOptionComponent[];

    selected = false;

    constructor() {}

    ngOnInit() {}

    @HostListener('click')
    handleSelect() {}

    // ngAfterViewInit() {
    //     this.showOptionComponents = this.listOfOptionComponent ? this.listOfOptionComponent.toArray() : [];
    // }

    // filterOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
    //     const matchComponents: ThyOptionComponent[] = [];
    //     this.listOfOptionComponent.forEach(item => {
    //         if (!item.thyGroupLabel && iterate(item)) {
    //             matchComponents.push(item);
    //         }
    //     });
    //     this.showOptionComponents = matchComponents;
    //     return matchComponents;
    // }

    // resetFilterComponents() {
    //     this.showOptionComponents = this.listOfOptionComponent ? this.listOfOptionComponent.toArray() : [];
    // }
}
