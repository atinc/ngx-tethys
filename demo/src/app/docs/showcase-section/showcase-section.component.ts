import { ShowcaseSection } from '../model/showcase-section';
import { ChangeDetectionStrategy, Component, Injector, Input, ReflectiveInjector } from '@angular/core';

@Component({
    selector: 'showcase-section',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-container *ngFor="let section of sections">
      <ng-container *ngComponentOutlet="section.outlet; injector: sectionInjections(section)">
      </ng-container>
    </ng-container>
    `
})
export class ShowcaseSectionsComponent {

    @Input() sections: ShowcaseSection[];

    _injectors = new Map<ShowcaseSection, ReflectiveInjector>();

    constructor(private injector: Injector) {
    }

    sectionInjections(_content: ShowcaseSection) {
        if (this._injectors.has(_content)) {
            return this._injectors.get(_content);
        }

        const _injector = ReflectiveInjector.resolveAndCreate([{
            provide: ShowcaseSection,
            useValue: _content
        }], this.injector);

        this._injectors.set(_content, _injector);

        return _injector;
    }
}
