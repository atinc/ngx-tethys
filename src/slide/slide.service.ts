import { Injectable, TemplateRef, HostListener } from '@angular/core';
import { ThySlideOption, thySlideOptionDefaults } from './slide-options.class';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef } from './slide-ref.service';

@Injectable()
export class ThySlideService {

    private _slideLoader: ComponentLoader<ThySlideContainerComponent>;

    private _config: ThySlideOption;

    constructor(
        private clf: ComponentLoaderFactory,
    ) {
    }

    public show(content: string | TemplateRef<any> | any, config?: ThySlideOption) {

        if (this._slideLoader) {
            const oldTarget = this._config && this._config.target;
            const newTarget = config && config.target;
            if (oldTarget && newTarget && oldTarget.nativeElement.contains(newTarget.nativeElement)) {
                this.hide();
                return;
            } else {
                this.hide();
            }
        }

        this._config = Object.assign({}, thySlideOptionDefaults, config);

        this._slideLoader = this.clf.createLoader<ThySlideContainerComponent>(
            null,
            null,
            null
        );

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
            .show({ content, thySlideRef: thySlideRef });
    }

    public hide() {
        this._slideLoader.hide();
        this._slideLoader = null;
        this._config = null;
    }

}
