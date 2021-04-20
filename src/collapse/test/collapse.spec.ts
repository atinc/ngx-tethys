import { ThyCollapseComponent, ThyCollapseModule } from 'ngx-tethys';

import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <thy-collapse [thyAccordion]="accordion" [thyBordered]="border" [thyExpandIconPosition]="position">
            <thy-collapse-panel thyTitle="这是一个头部标题" [thyActive]="true">isAccording</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域3</thy-collapse-panel>
        </thy-collapse>
    `
})
export class TestCollapseBasicComponent {
    accordion = false;

    border = true;

    position = 'left';
}

fdescribe('collapse', () => {
    describe('basic', () => {
        let component: TestCollapseBasicComponent;
        let fixture: ComponentFixture<TestCollapseBasicComponent>;
        let debugElement: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThyCollapseModule],
                declarations: [TestCollapseBasicComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCollapseBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCollapseComponent));
            fixture.detectChanges();
        });

        it('should create collapse component', () => {
            expect(component).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-collapse');
        });

        it('should collapse expand more than one panel default', () => {});
    });
});
