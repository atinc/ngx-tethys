import { ShowcaseSection } from '../model/showcase-section';
import { ChangeDetectionStrategy, Component, Injector, Input, ReflectiveInjector } from '@angular/core';
import { ComponentExample } from '../model/component-example';

@Component({
    selector: 'showcase-section',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: `./showcase-section.component.html`,
    styleUrls: ['./showcase-section.scss']
})
export class ShowcaseSectionsComponent {

    @Input() sections: ComponentExample[];

    _injectors = new Map<ComponentExample, ReflectiveInjector>();

    public usageType = 'html';

    public showCode = false;

    constructor(private injector: Injector) {
    }

    sectionInjections(_content: ComponentExample) {
        if (this._injectors.has(_content)) {
            return this._injectors.get(_content);
        }

        const _injector = ReflectiveInjector.resolveAndCreate([{
            provide: ComponentExample,
            useValue: _content
        }], this.injector);

        this._injectors.set(_content, _injector);

        return _injector;
    }
}
