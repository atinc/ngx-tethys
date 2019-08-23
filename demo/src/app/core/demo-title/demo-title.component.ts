import { Component, Input, HostBinding, ElementRef, OnInit } from '@angular/core';
@Component({
    selector: 'app-demo-title',
    templateUrl: './demo-title.component.html'
})
export class DemoTitleComponent implements OnInit {
    public titleList: Element[] = [];

    private maximumOverloads = 10;

    private overloadsNum = 0;

    @Input() title: string;
    @Input() introduction: string;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.getTitleList();
    }

    getTitleList() {
        const domList = this.el.nativeElement.parentNode.getElementsByTagName('h4');
        if (domList.length) {
            for (let i = 0; i < domList.length; i++) {
                const element = domList[i];
                if (element.className === 'demo-title') {
                    this.titleList.push(element);
                }
            }
        } else if (this.maximumOverloads > this.overloadsNum) {
            this.overloadsNum++;
            setTimeout(() => {
                this.getTitleList();
            }, 100);
        }
    }

    scrollTo(element: any) {
        // Element .offsetTop  找不到, 先用any
        const content = document.getElementById('demo-content');
        content.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}
