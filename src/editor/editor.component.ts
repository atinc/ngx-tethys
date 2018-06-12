import { Component, Input, ElementRef, Renderer2, OnInit, forwardRef, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyEditorService } from './editor.service';
@Component({
    selector: 'thy-editor',
    templateUrl: './editor.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ThyEditorComponent),
        multi: true
    }]
})
export class ThyEditorComponent implements OnInit, ControlValueAccessor {

    // <wt-editor ng-model="vm.temp.description" ctrl-enter="vm.updateDescription()"
    // config="{type:'simple',className:'wt-editor-desc',autofocus:false,autoHeight:true}"></wt-editor>

    public model: any;

    @Input() config: {};

    public className: String = '';

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        public thyEditorService: ThyEditorService,
    ) {
    }

    writeValue(value: any) {
        this.model = value;
    }

    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.onModelTouched = fn;
    }

    public onModelChange: Function = () => {

    }

    public onModelTouched: Function = () => {

    }

    changeValue(event: Event) {
        this.model = event;
        this.onModelChange(this.model);
    }

    setHeaderLi(id: string): void {
        this.thyEditorService.header_action = !this.thyEditorService.header_action;
    }

    styleFn(name: string, event: Event) {
        this.thyEditorService.styleFn(name, event);
    }

    togglePreview() {

    }


    ngOnInit(): void {
        this.thyEditorService.initEditor(this.config, this.elementRef);
    }
}
