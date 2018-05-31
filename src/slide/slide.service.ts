import { Injectable, TemplateRef, HostListener } from '@angular/core';
import { ThySliderOption, thySlideOptionDefaults } from './slide-options.class';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef } from './slide-ref.service';

@Injectable()
export class ThySlideService {

    private _slideLoader: ComponentLoader<ThySlideContainerComponent>;

    constructor(
        private clf: ComponentLoaderFactory,
    ) {
    }

    public show(content: string | TemplateRef<any> | any, config?: ThySliderOption) {

        if (this._slideLoader) {
            this._slideLoader.hide();
        }

        const _config = Object.assign({}, thySlideOptionDefaults, config);

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
            .provide({ provide: ThySliderOption, useValue: _config })
            .attach(ThySlideContainerComponent)
            .to('body')
            .show({ content, thySlideRef: thySlideRef });
    }

    public hide() {
        this._slideLoader.hide();
        this._slideLoader = null;
    }

}
