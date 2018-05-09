import { Directive, OnInit, ElementRef, Renderer2, ViewContainerRef, Input, ComponentRef, Output, EventEmitter } from '@angular/core';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ThyDatepickerContainerComponent } from './datepicker-container.component';
import { ThyDatepickerConfig } from './datepicker.config';
import { DatepickerValueEntry } from './i.datepicker';

@Directive({
    selector: 'input[thyDatepicker]',
    exportAs: 'thyDatepicker'
})
export class ThyDatepickerDirective implements OnInit {
    @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
    @Input() triggers = 'click';
    @Input() container = 'body';
    @Input() outsideClick = true;

    _value: DatepickerValueEntry;
    @Input()
    set thyDatepicker(value: DatepickerValueEntry) {
        this._value = value;
    }

    @Output() thyOnChange: EventEmitter<any> = new EventEmitter();

    private _loader: ComponentLoader<ThyDatepickerContainerComponent>;

    constructor(
        public _config: ThyDatepickerConfig,
        private _elementRef: ElementRef,
        _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef,
        cis: ComponentLoaderFactory
    ) {
        this._loader = cis.createLoader<ThyDatepickerContainerComponent>(
            _elementRef,
            _viewContainerRef,
            _renderer
        );
    }

    ngOnInit() {
        this._loader.listen({
            outsideClick: this.outsideClick,
            triggers: this.triggers,
            show: () => this.show()
        });
        this.setConfig();
    }

    setConfig() {
    }

    show() {
        this._loader.provide({ provide: ThyDatepickerConfig, useValue: this._config })
            .attach(ThyDatepickerContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
                hideLoader: () => {
                    this.hide();
                },
                initialState: {
                    value: this._value,
                    changeValue: (date: DatepickerValueEntry) => {
                        this.thyOnChange.emit(date);
                    }
                }
            });
    }

    hide() {
        this._loader.hide();
    }

}
