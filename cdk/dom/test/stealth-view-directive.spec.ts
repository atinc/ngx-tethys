import {
    AfterViewInit,
    Component,
    ElementRef,
    Injector,
    runInInjectionContext,
    TemplateRef,
    viewChild,
    ViewChild,
    inject,
    effect
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyStealthView } from '../stealth-view-directive';
import { useStealthViewRenderer } from '../stealth-view-renderer';

@Component({
    selector: 'thy-stealth-view-test',
    template: `
        <ng-template thyStealthView>
            <span>directive test</span>
            <button thyButton="primary" disabled="disabled">Primary</button>
        </ng-template>

        <ng-template #testStealth>
            <span>function test</span>
            <button thyButton="primary" disabled="disabled">Primary</button>
        </ng-template>
    `,
    standalone: true,
    imports: [ThyStealthView]
})
class ThyStealthViewDirectiveTestComponent {
    private injector = inject(Injector);

    @ViewChild(ThyStealthView) thyStealthView: ThyStealthView;

    templateRef = viewChild('testStealth', { read: TemplateRef });

    nodesByDirective: Node[];

    nodesByFunction: Node[];

    stealthViewRenderer = useStealthViewRenderer(this.templateRef);
    constructor() {
        effect(() => {
            this.nodesByDirective = this.thyStealthView.rootNodes;
            this.nodesByFunction = this.stealthViewRenderer.rootNodes;
        });
    }
}

describe('ThyStealthViewDirective', () => {
    let fixture: ComponentFixture<ThyStealthViewDirectiveTestComponent>;
    let component: ThyStealthViewDirectiveTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [], declarations: [] });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyStealthViewDirectiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get correct nodes by Directive ', fakeAsync(() => {
        expect(component.nodesByDirective.length).toBe(2);
        const htmlString = `<span>directive test</span><button thyButton="primary" disabled="disabled">Primary</button>`;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const tempNodes = doc.body.childNodes;
        for (let i = 0; i < tempNodes.length; i++) {
            expect(component.nodesByDirective[i]).toEqual(tempNodes[i]);
        }
    }));

    it('should get correct nodes by Function ', fakeAsync(() => {
        expect(component.nodesByFunction.length).toBe(2);
        const htmlString = `<span>function test</span><button thyButton="primary" disabled="disabled">Primary</button>`;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const tempNodes = doc.body.childNodes;
        for (let i = 0; i < tempNodes.length; i++) {
            expect(component.nodesByFunction[i]).toEqual(tempNodes[i]);
        }
    }));
});
