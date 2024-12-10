import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyListModule } from '../list.module';
import { ThyList } from '../list.component';

describe('list', () => {
    let fixture: ComponentFixture<TestListComponent>;
    let listDebugElement: DebugElement;
    let listElement: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyListModule],
            declarations: [TestListComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestListComponent);
        listDebugElement = fixture.debugElement.query(By.directive(ThyList));
        listElement = listDebugElement.nativeElement;
        fixture.detectChanges();
    });

    describe('divided-list', () => {
        for (const value of [true, false]) {
            it(`[${value}]`, () => {
                fixture.componentInstance.divided = value;
                fixture.detectChanges();
                expect(listElement.classList.contains('thy-list-divided')).toBe(value);
            });
        }
    });

    describe('item-meta', () => {
        it('should has avatar and title and description', () => {
            expect(listDebugElement.query(By.css('.thy-list-item-meta-title')) != null).toBe(true);
            expect(listDebugElement.query(By.css('.thy-list-item-meta-description')) != null).toBe(true);
            expect(listDebugElement.query(By.css('.thy-list-item-meta-avatar')) != null).toBe(true);
        });
        it('should has correct element when use template', () => {
            expect(listDebugElement.query(By.css('.item-title')) != null).toBe(true);
            expect(listDebugElement.query(By.css('.item-desc')) != null).toBe(true);
            expect(listDebugElement.query(By.css('.item-avatar')) != null).toBe(true);
        });
    });
});

@Component({
    template: `
        <thy-list [thyDivided]="divided">
            <thy-list-item>
                <thy-list-item-meta
                    thyTitle="Google Analytics"
                    thyAvatar="dfea7c36-5147-4569-8910-829137920172_80x80.png"
                    thyDescription="GitHub是一个受您工作方式启发的开发平台。从开源到企业，您可以托管和查看代码，您可以托管和查看代码，管理项目以及与4000万开发人员一起构建软件。">
                </thy-list-item-meta>
            </thy-list-item>
            <thy-list-item>
                <thy-list-item-meta>
                    <ng-template #metaAvatar><p class="item-avatar">Avatar</p></ng-template>
                    <ng-template #metaTitle><p class="item-title">Title</p></ng-template>
                    <ng-template #metaDescription><p class="item-desc">Description</p></ng-template>
                </thy-list-item-meta>
            </thy-list-item>
        </thy-list>
    `,
    standalone: false
})
class TestListComponent {
    divided = false;
}
