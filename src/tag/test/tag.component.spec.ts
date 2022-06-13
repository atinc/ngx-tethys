import { Component, OnInit } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyTagColor } from '../tag.component';
import { ThyTagModule } from '../tag.module';

@Component({
    selector: 'thy-tag-basic-test',
    template: `
        <thy-tag id="default">Default Tag</thy-tag>
        <thy-tag id="color" [thyColor]="color">Tag 1</thy-tag>
    `
})
export class ThyTagBasicTestComponent implements OnInit {
    color: ThyTagColor = 'default';

    constructor() {}

    ngOnInit(): void {}
}

describe('thy-tag', () => {
    let fixture: ComponentFixture<ThyTagBasicTestComponent>;
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ThyTagBasicTestComponent],
                imports: [ThyTagModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTagBasicTestComponent);
        fixture.detectChanges();
    });

    it('should create default tag', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#default'));
        expect(tagDebugElement).toBeTruthy();
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        expect(tagElement.classList.contains('thy-tag')).toBeTruthy();
        expect(tagElement.classList.contains('thy-tag-default')).toBeTruthy();
        expect(tagElement.classList.contains('thy-tag-md')).toBeTruthy();
        expect(tagElement.textContent).toContain('Default Tag');
    });

    it('should create tag with theme colors', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#color'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        ['default', 'primary', 'success', 'warning', 'danger', 'info'].forEach(color => {
            fixture.componentInstance.color = color;
            fixture.detectChanges();
            expect(tagElement.classList.contains(`thy-tag-${color}`)).toBeTruthy();
        });
    });
});
