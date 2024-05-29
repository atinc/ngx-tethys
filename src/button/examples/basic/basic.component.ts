import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-button-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyButtonBasicExampleComponent implements OnInit {
    currentTheme = 'default';

    constructor() {}

    ngOnInit(): void {}

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        document.documentElement.setAttribute('theme', this.currentTheme);
    }
}
