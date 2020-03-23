import {
    Injectable,
    Inject,
    ViewContainerRef,
    ComponentFactoryResolver,
    EventEmitter,
    HostListener,
    ElementRef,
    NgZone
} from '@angular/core';
import { TemplateRef, RendererFactory2, Renderer2 } from '@angular/core';
import { PopBoxRef } from './pop-box-ref.service';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { PopBoxOptions, popBoxConfigDefaults } from './pop-box-options.class';
import { ThyPositioningService } from '../positioning/positioning.service';
import { warnDeprecation } from '../core/logger';

@Injectable()
export class ThyPopBoxService {
    private _loaders: {
        target: any;
        loader: any;
        config: PopBoxOptions;
    }[] = [];

    private _renderer: Renderer2;

    private _popBoxLoader: ComponentLoader<PopBoxContainerComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private clf: ComponentLoaderFactory,
        private thyPositioningService: ThyPositioningService,
        private ngZone: NgZone
    ) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * @deprecated The ThyPopBox will be deprecated, please use ThyPopover.
     */
    show(content: string | TemplateRef<any> | any, config: PopBoxOptions): PopBoxRef {
        warnDeprecation(`The ThyPopBox will be deprecated, please use ThyPopover.`);

        if (config.target && config.position) {
            throw new Error(`target and position only set one.`);
        }
        const target = config.target && (config.target.nativeElement || config.target);
        const targetLoader = this._loaders.find(item => {
            return item.target === target;
        });
        if (targetLoader) {
            // 已经弹出了一样的 Loader， 再次点击直接关闭
            this._hide(targetLoader);
            // 如果 target 有值返回，没有值说明通过 position 传入位置，直接关闭后再次打开
            if (target) {
                return;
            }
        }

        const _config = Object.assign({}, popBoxConfigDefaults, config, {
            target: target
        });

        const loader = (this._popBoxLoader = this.clf.createLoader<PopBoxContainerComponent>(
            config.target,
            null,
            null
        ));

        const popBoxRef = new PopBoxRef();
        const popBoxContainerRef = loader
            .provide({ provide: PopBoxOptions, useValue: _config })
            .provide({ provide: PopBoxRef, useValue: popBoxRef })
            .attach(PopBoxContainerComponent)
            .to('body')
            // .position({ attachment: _config.placement, target: _config.target, targetOffset: '10px' })
            .show({ content, initialState: _config.initialState, popBoxRef: popBoxRef });

        this.thyPositioningService.setPosition({
            target: popBoxContainerRef.location,
            attach: _config.target,
            placement: _config.placement,
            offset: _config.offset,
            appendToBody: true,
            position: _config.position,
            autoAdapt: true
        });
        const _loader = {
            target: target,
            loader: loader,
            config: _config
        };
        if (target) {
            this._renderer.addClass(target, _config.openedClass);
        }
        popBoxRef.hide = () => {
            this._hide(_loader);
        };
        popBoxRef.content = loader.getInnerComponent() || null;
        this._loaders.push(_loader);
        return popBoxRef;
    }

    private _hide(loader: { target: any; loader: any; config: PopBoxOptions }) {
        if (loader.config && loader.config.target) {
            this._renderer.removeClass(loader.config.target, loader.config.openedClass);
        }
        this._loaders = this._loaders.filter(item => {
            return item.target !== loader.target;
        });
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                loader.loader.hide();
            });
        });
    }

    hide() {
        if (this._loaders && this._loaders.length > 0) {
            this._hide(this._loaders[this._loaders.length - 1]);
        }
    }
}
