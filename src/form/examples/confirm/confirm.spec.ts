import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ThyFormConfirmExampleComponent } from './confirm.component';

@Component({
    selector: 'form-comfirm',
    template: `
        <thy-form-confirm-example></thy-form-confirm-example>
    `
})
class ConfirmComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

fdescribe(`confirm test`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmComponent],
            imports: [],
            providers: []
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ConfirmComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfirmComponent);
            fixture.detectChanges();
        });
    });
});
