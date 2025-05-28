import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-template-example',
    templateUrl: './template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyRate, FormsModule]
})
export class ThyRateTemplateExampleComponent implements AfterViewInit {
    readonly icon1 = viewChild<TemplateRef<any>>('icon1');

    readonly icon2 = viewChild<TemplateRef<any>>('icon2');

    readonly icon3 = viewChild<TemplateRef<any>>('icon3');

    readonly icon4 = viewChild<TemplateRef<any>>('icon4');

    readonly icon5 = viewChild<TemplateRef<any>>('icon5');

    value = 1;

    icon = 'smile';

    icons = ['angry', 'angry', 'expressionless', 'smile', 'smile'];

    templates: TemplateRef<any>[] = null;

    template: TemplateRef<any> = null;

    constructor() {}

    ngAfterViewInit(): void {
        this.templates = [this.icon1(), this.icon2(), this.icon3(), this.icon4(), this.icon5()];
        this.template = this.icon5();
    }
}
