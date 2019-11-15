import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-markdown-section',
    templateUrl: './markdown-section.component.html',
    styleUrls: ['./markdown-section.scss']
})
export class DemoMarkdownSectionComponent implements OnInit {
    public markdownValue = `**加粗** *斜体* \`代码\` \`\`\`格式化\`\`\` [Worktile](http://worktile.com) [http://worktile.com|这是一个 Worktile 链接] [@54704b26c7dd2059dfeb81c6|Terry] <////--><details open ontoggle=confirm(/我是脚本/)>`;

    constructor() {}

    ngOnInit() {}
}
