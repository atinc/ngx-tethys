import { Component, Input, ElementRef, Renderer2, OnInit, forwardRef, HostBinding } from '@angular/core';
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

    public model: any;

    @Input() config: {};

    public className: String = '';

    @HostBinding('class.thy-editor-wrapper') _thyClass = true;

    @HostBinding('class.thy-editor-wrapper-full') _thyFullClass = true;

    public value: String = '';

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
        this.thyEditorService.setTextareaHeight();
    }


    insertTable() {
        this.thyEditorService.insertTable(this.changeValue.bind(this));
    }

    setHeaderLi(id: string): void {
        this.thyEditorService.header_action = !this.thyEditorService.header_action;
    }

    styleFn(name: string, event: Event) {
        this.thyEditorService.styleFn(name, event, this.changeValue.bind(this));
    }

    togglePreview() {
        this.thyEditorService.isPreview = !this.thyEditorService.isPreview;
        this.value = this.elementRef.nativeElement.querySelector('.thy-editor-textarea').value;
    }

    ngOnInit(): void {
        this.thyEditorService.initEditor(this.config, this.elementRef);
        this._thyFullClass = this.thyEditorService.options.isHeightFull;
    }
}
