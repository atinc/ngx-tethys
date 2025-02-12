import { Component, OnInit } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyTags } from '../tags.component';
import { ThyTagModule } from '../tag.module';
import { ThyIconModule } from 'ngx-tethys/icon';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-tags-basic-test',
    template: `
        <thy-tags>
            <thy-tag id="default">Default Tag</thy-tag>
            <thy-tag id="tag1">Tag1</thy-tag>
        </thy-tags>
    `,
    standalone: false
})
export class ThyTagsBasicTestComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

describe('thy-tags', () => {
    let fixture: ComponentFixture<ThyTagsBasicTestComponent>;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThyTagsBasicTestComponent],
            imports: [ThyTagModule, ThyIconModule],
            providers: [provideHttpClient()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTagsBasicTestComponent);
        fixture.detectChanges();
    });

    it('should create thy-tags', () => {
        const tagsDebugElement = fixture.debugElement.query(By.directive(ThyTags));
        expect(tagsDebugElement).toBeTruthy();
        const tagsElement: HTMLElement = tagsDebugElement.nativeElement;
        expect(tagsElement.classList.contains('thy-tags')).toBeTruthy();
        expect(tagsElement.textContent).toContain('Default Tag');
        expect(tagsElement.textContent).toContain('Tag1');
    });
});
