import {
    Injectable, Inject, ViewContainerRef, ComponentFactoryResolver,
    EventEmitter, HostListener
} from '@angular/core';
import { TemplateRef, RendererFactory2, Renderer2 } from '@angular/core';
import { PopBoxRef } from './pop-box-ref.service';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { PopBoxOptions, popBoxConfigDefaults } from './pop-box-options.class';

@Injectable()
export class PopBoxService {

    _config: PopBoxOptions;

    isOpen: boolean;



    private _renderer: Renderer2;

    private _popBoxLoader: ComponentLoader<PopBoxContainerComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private clf: ComponentLoaderFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    show(content: string | TemplateRef<any> | any, config: PopBoxOptions): PopBoxRef {
        if (this.isOpen) {
            this.hide();
            return;
        }

        const loader = this.clf.createLoader<PopBoxContainerComponent>(
            config.target,
            null,
            null
        );
        this._popBoxLoader = loader;
        this._config = Object.assign({}, popBoxConfigDefaults, config);
        const popBoxRef = new PopBoxRef();
        const popBoxContainerRef = loader
            .provide({ provide: PopBoxOptions, useValue: this._config })
            .provide({ provide: PopBoxRef, useValue: popBoxRef })
            .attach(PopBoxContainerComponent)
            .to('body')
            .position({ attachment: this._config.placement, target: config.target, targetOffset: '10px' })
            .show({ content, initialState: this._config.initialState, popBoxService: this });

        popBoxRef.hide = () => {
            popBoxContainerRef.instance.hide();
        };
        popBoxRef.content = loader.getInnerComponent() || null;
        this.isOpen = true;
        return popBoxRef;
    }

    hide() {
        if (this._popBoxLoader) {
            this._popBoxLoader.hide();
            this.isOpen = false;
        }
    }

    dispose() {
        // this._popBoxLoader.dispose();
    }
}
