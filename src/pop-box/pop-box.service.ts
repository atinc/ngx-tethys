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

    private _loaders: {
        target: any,
        loader: any
    }[] = [];

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
        const targetLoader = this._loaders.find((item) => {
            return item.target === target;
        });
        if (targetLoader) {
            this._hide(targetLoader);
            return;
        }

        const _config = Object.assign({}, popBoxConfigDefaults, config, {
            target: target
        });

        const loader = this._popBoxLoader = this.clf.createLoader<PopBoxContainerComponent>(
            config.target,
            null,
            null
        );

        const popBoxRef = new PopBoxRef();
        const popBoxContainerRef = loader
            .provide({ provide: PopBoxOptions, useValue: _config })
            .provide({ provide: PopBoxRef, useValue: popBoxRef })
            .attach(PopBoxContainerComponent)
            .to('body')
            .position({ attachment: _config.placement, target: _config.target, targetOffset: '10px' })
            .show({ content, initialState: _config.initialState, popBoxRef: popBoxRef });

        const _loader = {
            target: target,
            loader: loader
        };
        popBoxContainerRef.instance.config = _config;
        popBoxRef.hide = () => {
            this._hide(_loader);
        };
        popBoxRef.content = loader.getInnerComponent() || null;
        this._loaders.push(_loader);
        return popBoxRef;
    }

    private _hide(loader: {
        target: any,
        loader: any
    }) {
        this._loaders = this._loaders.filter((item) => {
            return item.target !== loader.target;
        });
        setTimeout(() => {
            loader.loader.hide();
        });

    }

    hide() {
        if (this._loaders && this._loaders.length > 0) {
            this._hide(this._loaders[this._loaders.length - 1]);
        }
    }
}
