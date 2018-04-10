import {
    Injectable, Inject, ViewContainerRef, ComponentFactoryResolver,
    EventEmitter, HostListener, ElementRef
} from '@angular/core';
import { TemplateRef, RendererFactory2, Renderer2 } from '@angular/core';
import { PopBoxRef } from './pop-box-ref.service';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { PopBoxOptions, popBoxConfigDefaults } from './pop-box-options.class';

@Injectable()
export class ThyPopBoxService {

    public config: PopBoxOptions;

    private isOpen: boolean;

    private _target: any;

    private _renderer: Renderer2;

    private _popBoxLoader: ComponentLoader<PopBoxContainerComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private clf: ComponentLoaderFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    show(content: string | TemplateRef<any> | any, config: PopBoxOptions): PopBoxRef {
        const target = config.target.nativeElement || config.target;
        if (this._popBoxLoader) {
            this.hide();
            if (target && this._target === target) {
                return;
            }
        }
        this._target = target;
        this.config = Object.assign({}, popBoxConfigDefaults, config, {
            target: target
        });

        const loader = this._popBoxLoader = this.clf.createLoader<PopBoxContainerComponent>(
            config.target,
            null,
            null
        );

        const popBoxRef = new PopBoxRef();
        const popBoxContainerRef = loader
            .provide({ provide: PopBoxOptions, useValue: this.config })
            .provide({ provide: PopBoxRef, useValue: popBoxRef })
            .attach(PopBoxContainerComponent)
            .to('body')
            .position({ attachment: this.config.placement, target: config.target, targetOffset: '10px' })
            .show({ content, initialState: this.config.initialState, popBoxService: this });

        popBoxRef.hide = () => {
            popBoxContainerRef.instance.hide();
        };
        popBoxRef.content = loader.getInnerComponent() || null;

        return popBoxRef;
    }

    hide() {
        if (this._popBoxLoader) {
            this._popBoxLoader.hide();
            this._popBoxLoader = null;
        }
    }
}
