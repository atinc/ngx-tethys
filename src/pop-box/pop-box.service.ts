import { Injectable, Inject, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TemplateRef, RendererFactory2, Renderer2 } from '@angular/core';
import { PopBoxRef } from './pop-box-ref.service';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { PopBoxOptions } from './pop-box-options.class';

@Injectable()
export class PopBoxService {

    private _renderer: Renderer2;

    private _popBoxLoader: ComponentLoader<PopBoxContainerComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private clf: ComponentLoaderFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    show(content: string | TemplateRef<any> | any, config: PopBoxOptions): PopBoxRef {
        if (this._popBoxLoader) {
            this._popBoxLoader.hide();
        }
        const loader = this.clf.createLoader<PopBoxContainerComponent>(
            null,
            null,
            null
        );
        this._popBoxLoader = loader;
        const _config = Object.assign({}, config);
        const popBoxRef = new PopBoxRef();
        const popBoxContainerRef = loader
            .provide({ provide: PopBoxOptions, useValue: _config })
            .provide({ provide: PopBoxRef, useValue: popBoxRef })
            .attach(PopBoxContainerComponent)
            .to('body')
            .show({ content, initialState: _config.initialState, popBoxService: this });

        popBoxRef.hide = () => {
            popBoxContainerRef.instance.hide();
        };
        popBoxRef.content = loader.getInnerComponent() || null;

        return popBoxRef;
    }

    hide() {
        if (this._popBoxLoader) {
            this._popBoxLoader.hide();
        }
    }
}
