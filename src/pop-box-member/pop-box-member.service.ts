import {
    Injectable, Inject, ViewContainerRef, ComponentFactoryResolver,
    EventEmitter, HostListener, ElementRef
} from '@angular/core';
import { TemplateRef, RendererFactory2, Renderer2 } from '@angular/core';
import { PopBoxMemberRef } from './pop-box-member-ref.service';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopBoxMemberContainerComponent } from './pop-box-member-container.component';
import { PopBoxMemberOptions, popBoxConfigDefaults } from './pop-box-member-options.class';

@Injectable()
export class PopBoxMemberService {

    _config: PopBoxMemberOptions;

    isOpen: boolean;

    private _target: ElementRef;

    private _renderer: Renderer2;

    private _popBoxLoader: ComponentLoader<PopBoxMemberContainerComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private clf: ComponentLoaderFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    show(content: string | TemplateRef<any> | any, config: PopBoxMemberOptions): PopBoxMemberRef {
        
    }

    hide() {
    }

    toggle() {
        this._config.target.nativeElement.isOpen = !this._config.target.nativeElement.isOpen;
    }

    dispose() {
        // this._popBoxLoader.dispose();
    }
}
