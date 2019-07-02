import { TestBed, inject } from '@angular/core/testing';
import { ThySelectModule } from './module';
import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIconRegistry } from '../icon';

@Component({
    selector: 'app-basic-select-demo',
    template: `
        <thy-select [(ngModel)]="value" (change)="change()" [thyAllowClear]="allowClear">
            <option value="">请选择</option>
            <option value="option1">选项1</option>
            <option value="option2">选项2</option>
        </thy-select>
    `
})
class BasicSelectComponent {
    value = '';
    allowClear = false;
}

describe(`select`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThySelectModule, FormsModule],
            declarations: [BasicSelectComponent],
            providers: [
                {
                    provide: Sanitizer,
                    useValue: {
                        sanitize: (context: SecurityContext, html: string) => html
                    }
                }
            ]
        }).compileComponents();

        inject([ThyIconRegistry], (iconRegistry: ThyIconRegistry) => {
            iconRegistry.addSvgIconLiteral(
                'angle-down',
                `<svg viewBox="0 0 16 16" id="angle-down" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"/>
                </svg>`
            );
        })();
    });

    describe(`basic`, () => {
        // TODO:
    });
});
