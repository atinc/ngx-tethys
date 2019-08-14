import { Injectable, TemplateRef, HostListener } from '@angular/core';
import { ThySlideOption, thySlideOptionDefaults } from './slide-options.class';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef } from './slide-ref.service';

@Injectable()
export class ThySlideService {
    private openedSlideRefs: {
        config: ThySlideOption;
        thySlideRef: ThySlideRef;
    }[] = [];

    private _slideLoader: ComponentLoader<ThySlideContainerComponent>;

    private _config: ThySlideOption;

    private _isHide = false;

    constructor(private clf: ComponentLoaderFactory) {}

    public show(content: string | TemplateRef<any> | any, config?: ThySlideOption) {
        this._isHide = false;
        setTimeout(() => {
            this._show(content, config);
        });
    }

    private _show(content: string | TemplateRef<any> | any, config?: ThySlideOption) {
        if (this.openedSlideRefs.length > 0) {
            const openedSlideRef = this.openedSlideRefs[this.openedSlideRefs.length - 1];
            if (openedSlideRef && openedSlideRef.config) {
                const oldKey = openedSlideRef.config.key;
                const newKey = config && config.key;
                if (oldKey && newKey && oldKey === newKey) {
                    this.hide();
                    return;
                }
            }
        }

        this._config = Object.assign({}, thySlideOptionDefaults, config);

        this._slideLoader = this.clf.createLoader<ThySlideContainerComponent>(null, null, null);

        const thySlideRef = new ThySlideRef();
        thySlideRef.hide = () => {
            this.hide();
        };
        thySlideRef.content = content || null;
        this._slideLoader
            .provide({ provide: ThySlideRef, useValue: thySlideRef })
            .provide({ provide: ThySlideOption, useValue: this._config })
            .attach(ThySlideContainerComponent)
            .to('body')
            .show({
                content,
                initialState: this._config.initialState,
                thySlideRef: thySlideRef,
                thySlideService: this
            });
        this.openedSlideRefs.push({
            config: this._config,
            thySlideRef: this._slideLoader
        });
    }

    public hide() {
        this._isHide = true;
        this._hide();
    }

    private _hide() {
        if (this.openedSlideRefs.length > 0) {
            const openedSlideRef = this.openedSlideRefs[this.openedSlideRefs.length - 1];
            if (openedSlideRef && openedSlideRef.thySlideRef) {
                openedSlideRef.thySlideRef['instance'].flyInOut = 'void';
                setTimeout(() => {
                    openedSlideRef.thySlideRef.hide();
                    this.openedSlideRefs.splice(this.openedSlideRefs.length - 1, 1);
                }, 200);
            }
        }
    }
}
