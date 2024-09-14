import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ThyTimelineModule } from '../timeline.module';
import { By } from '@angular/platform-browser';
import { ThyTimeDirection, ThyTimeline } from '../timeline.component';

@Component({
    template: `
        <ng-template #dotTemplate>template</ng-template>
        <thy-timeline [thyMode]="mode" [thyReverse]="reverse">
            <thy-timeline-item [thyColor]="color">111</thy-timeline-item>
            <thy-timeline-item [thyColor]="color">
                222
                <ng-template #dot>template</ng-template>
            </thy-timeline-item>
            <thy-timeline-item [thyColor]="color">333</thy-timeline-item>
        </thy-timeline>
    `
})
export class TestTimelineBasicComponent {
    mode = 'left';
    reverse = false;
    color = 'primary';
}

@Component({
    template: `
        <thy-timeline [thyMode]="mode">
            <thy-timeline-item thyPosition="right">111</thy-timeline-item>
            <thy-timeline-item thyPosition="left">222</thy-timeline-item>
        </thy-timeline>
    `
})
export class TestTimelineCustomPositionComponent {
    mode = 'left';
}

@Component({
    template: `
        <thy-timeline [thyMode]="mode">
            <thy-timeline-item>111</thy-timeline-item>
            <thy-timeline-item>
                222
                <ng-template #description> 另一侧的描述 </ng-template>
            </thy-timeline-item>
        </thy-timeline>
    `
})
export class TestTimelineCustomDescriptionComponent {
    mode = 'left';
}

@Component({
    template: `
        <thy-timeline [thyDirection]="direction">
            <thy-timeline-item>111</thy-timeline-item>
            <thy-timeline-item>
                222
                <ng-template #description> 另一侧的描述 </ng-template>
            </thy-timeline-item>
        </thy-timeline>
    `
})
export class TestTimelineCustomHorizontalComponent {
    direction: ThyTimeDirection = 'horizontal';
}

@Component({
    template: `
        <thy-timeline>
            @for (item of timelineItems; track $index) {
                <thy-timeline-item></thy-timeline-item>
            }
        </thy-timeline>
    `
})
export class TestTimelineCustomItemsComponent {
    timelineItems = ['节点1', '节点2', '节点3', '节点4'];
}

describe('timeline', () => {
    describe('basic', () => {
        let component: TestTimelineBasicComponent;
        let fixture: ComponentFixture<TestTimelineBasicComponent>;
        let debugElement: DebugElement;
        let items: HTMLDivElement[] = [];

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTimelineModule],
                declarations: [TestTimelineBasicComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTimelineBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyTimeline));
            items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            fixture.detectChanges();
        });

        it('should create timeline component and init className correct', () => {
            expect(component).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-timeline');
            expect(items.length).toBeGreaterThan(0);
            expect(items[0].classList).toContain('thy-timeline-item-left');
        });

        it('should dot work', () => {
            fixture.detectChanges();
            expect((items[0].querySelector('.thy-timeline-item-dot') as HTMLDivElement).innerText).toBe('');
            expect((items[1].querySelector('.thy-timeline-item-dot') as HTMLDivElement).innerText).toBe('template');
        });

        it('should color work', () => {
            fixture.detectChanges();
            expect(items[0].querySelector('.thy-timeline-item-dot')!.classList).toContain('thy-timeline-item-dot-primary');
            component.color = 'success';
            fixture.detectChanges();
            expect(items[0].querySelector('.thy-timeline-item-dot')!.classList).toContain('thy-timeline-item-dot-success');
            component.color = 'danger';
            fixture.detectChanges();
            expect(items[0].querySelector('.thy-timeline-item-dot')!.classList).toContain('thy-timeline-item-dot-danger');
        });

        it('should reverse work', () => {
            fixture.detectChanges();
            expect(items[0].innerText).toEqual('111');
            expect(items[2].innerText).toEqual('333');
            component.reverse = true;
            fixture.detectChanges();
            items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(items[0].classList).toContain('thy-timeline-item-reverse-first');
            expect(items[2].classList).toContain('thy-timeline-item-reverse-last');
            expect(items[0].innerText).toEqual('333');
            expect(items[2].innerText).toEqual('111');
        });

        it('should mode work', () => {
            fixture.detectChanges();
            expect(items[0].classList).toContain('thy-timeline-item-left');
            expect(items[1].classList).toContain('thy-timeline-item-left');
            expect(items[2].classList).toContain('thy-timeline-item-left');

            component.mode = 'right';
            fixture.detectChanges();
            expect(debugElement.nativeElement.classList).toContain('thy-timeline-right');
            items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(items[0].classList).toContain('thy-timeline-item-right');
            expect(items[1].classList).toContain('thy-timeline-item-right');
            expect(items[2].classList).toContain('thy-timeline-item-right');

            component.mode = 'center';
            fixture.detectChanges();
            expect(debugElement.nativeElement.classList).toContain('thy-timeline-center');
            items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(items[0].classList).toContain('thy-timeline-item-left');
            expect(items[1].classList).toContain('thy-timeline-item-right');
            expect(items[2].classList).toContain('thy-timeline-item-left');
        });
    });
    describe('custom position', () => {
        let fixture: ComponentFixture<TestTimelineCustomPositionComponent>;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTimelineModule],
                declarations: [TestTimelineCustomPositionComponent]
            }).compileComponents();
        }));
        beforeEach(() => {
            fixture = TestBed.createComponent(TestTimelineCustomPositionComponent);
            fixture.detectChanges();
        });

        it('should init className correct', () => {
            const items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(items[0].classList).toContain('thy-timeline-item-right');
            expect(items[1].classList).toContain('thy-timeline-item-left');
        });
    });
    describe('custom description', () => {
        let fixture: ComponentFixture<TestTimelineCustomDescriptionComponent>;
        let debugElement: DebugElement;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTimelineModule],
                declarations: [TestTimelineCustomDescriptionComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTimelineCustomDescriptionComponent);
            debugElement = fixture.debugElement.query(By.directive(ThyTimeline));
            fixture.detectChanges();
        });

        it('should init className correct', () => {
            expect(debugElement.nativeElement.classList).toContain('thy-timeline-template');
        });
    });
    describe('custom direction', () => {
        let fixture: ComponentFixture<TestTimelineCustomHorizontalComponent>;
        let debugElement: DebugElement;
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTimelineModule],
                declarations: [TestTimelineCustomHorizontalComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTimelineCustomHorizontalComponent);
            debugElement = fixture.debugElement.query(By.directive(ThyTimeline));
            fixture.detectChanges();
        });

        it('should init className correct', () => {
            expect(debugElement.nativeElement.classList).toContain('thy-timeline-horizontal');
        });
    });
    describe('custom timeline items', () => {
        let fixture: ComponentFixture<TestTimelineCustomItemsComponent>;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTimelineModule],
                declarations: [TestTimelineCustomItemsComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTimelineCustomItemsComponent);
            fixture.detectChanges();
        });

        it('should get correct timeline item', () => {
            fixture.detectChanges();
            const items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(items.length).toBe(4);
            fixture.detectChanges();
            fixture.componentInstance.timelineItems.push('节点5');
            fixture.detectChanges();
            const newItems = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-timeline-item'));
            expect(newItems.length).toBe(5);
        });
    });
});
