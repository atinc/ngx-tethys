import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-template-example',
    templateUrl: './template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyRate, FormsModule]
})
export class ThyRateTemplateExampleComponent implements AfterViewInit {
    @ViewChild('icon1') icon1: TemplateRef<any>;

    @ViewChild('icon2') icon2: TemplateRef<any>;

    @ViewChild('icon3') icon3: TemplateRef<any>;

    @ViewChild('icon4') icon4: TemplateRef<any>;

    @ViewChild('icon5') icon5: TemplateRef<any>;

    value = 1;

    icon = 'smile';

    icons = ['angry', 'angry', 'expressionless', 'smile', 'smile'];

    templates: TemplateRef<any>[] = null;

    template: TemplateRef<any> = null;

    constructor() {}

    ngAfterViewInit(): void {
        this.templates = [this.icon1, this.icon2, this.icon3, this.icon4, this.icon5];
        this.template = this.icon5;
    }
}
