import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-markdown-plan-text-example',
    templateUrl: './plan-text.component.html',
    styleUrls: ['../style.css']
})
export class ThyMarkdownPlanTextExampleComponent implements OnInit {
    constructor() {}

    public markdownValue = `**加粗** *斜体* \`代码\` \`\`\`格式化\`\`\` [Worktile](http://worktile.com) [http://worktile.com|这是一个 Worktile 链接] [@54704b26c7dd2059dfeb81c6|Terry] <////--><details open ontoggle=confirm(/我是脚本/)> # <span id='t1'>Worktile 异常追踪 Node.js SDK 使用指南</span>`;

    ngOnInit() {}
}
