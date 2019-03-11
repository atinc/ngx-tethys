export const thyEditorConstant = {
    typeArray: {
        hs: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        simple: ['bold', 'italic', 'link', 'uploadImg', 'divider', 'hr', 'quote', 'list', 'list-2', 'table','divider','linkModule'],
        complex: ['heading', 'bold', 'italic', 'underline',
            'strikethrough', 'divider', 'hr', 'quote', 'list', 'list-2', 'square', 'check-square', 'divider',
            'link', 'image', 'code', 'table', 'divider', 'math', 'diagram', 'gantt', 'divider', 'preview'],
        all: ['heading', 'bold', 'italic', 'underline',
            'strikethrough', 'divider', 'hr', 'quote', 'list', 'list-2',
            'square', 'check-square', 'divider', 'link', 'uploadImg',
            'code', 'table','linkModule', 'divider', 'math', 'diagram', 'gantt', 'divider', 'preview']
    },
    allButtons: {
        'heading': {
            id: 0,
            title: '标题',
            className: 'wtf wtf-heading',
            type: 'headingFns',
            name: 'heading'
        },
        'bold': {
            id: 1,
            title: '粗体',
            className: 'wtf wtf-bold',
            modifier: '**',
            type: 'styleFn',
            name: 'bold'
        },
        'italic': {
            id: 2,
            title: '斜体',
            className: 'wtf wtf-italic',
            modifier: '*',
            type: 'styleFn',
            name: 'italic'
        },
        'underline': {
            id: 3,
            title: '下划线',
            className: 'wtf wtf-underline',
            modifier: 'u',
            type: 'styleFn',
            name: 'underline'
        },
        'strikethrough': {
            id: 4,
            title: '删除线',
            className: 'wtf wtf-strikethrough',
            modifier: '~~',
            type: 'styleFn',
            name: 'strikethrough'
        },
        'h1': {
            id: 5,
            title: '标题 1',
            className: 'h1',
            level: '1',
            type: 'headingFn',
            name: 'h1'
        },
        'h2': {
            id: 6,
            title: '标题 2',
            className: 'h2',
            level: '2',
            type: 'headingFn',
            name: 'h2'
        },
        'h3': {
            id: 7,
            title: '标题 3',
            className: 'h3',
            level: '3',
            type: 'headingFn',
            name: 'h3'
        },
        'h4': {
            id: 8,
            title: '标题 4',
            className: 'h4',
            level: '4',
            type: 'headingFn',
            name: 'h4'
        },
        'h5': {
            id: 9,
            title: '标题 5',
            className: 'h5',
            level: '5',
            type: 'headingFn',
            name: 'h5'
        },
        'h6': {
            id: 10,
            title: '标题 6',
            className: 'h6',
            level: '6',
            type: 'headingFn',
            name: 'h6'
        },
        'hr': {
            id: 11,
            title: '横线',
            className: 'wtf wtf-minus',
            type: 'styleFn',
            name: 'hr'
        },
        'quote': {
            id: 12,
            title: '引用',
            className: 'wtf wtf-quote-left',
            prefix: '> ',
            type: 'styleFn',
            name: 'quote'
        },
        'list': {
            id: 13,
            title: '无序列表',
            className: 'wtf wtf-list-ul',
            prefix: '- ',
            type: 'styleFn',
            name: 'list'
        },
        'list-2': {
            id: 14,
            title: '有序列表',
            className: 'wtf wtf-list-ol',
            prefix: '1. ',
            type: 'styleFn',
            name: 'list-2'
        },
        'square': {
            id: 15,
            title: '未完成任务列表',
            className: 'wtf wtf-square',
            prefix: '- [ ] ',
            type: 'styleFn',
            name: 'square'
        },
        'check-square': {
            id: 16,
            title: '已完成任务列表',
            className: 'wtf wtf-check-square-o',
            prefix: '- [x] ',
            type: 'styleFn',
            name: 'check-square'
        },
        'link': {
            id: 17,
            title: '链接',
            className: 'wtf wtf-link',
            text: '链接文字',
            url: 'http://example.com',
            type: 'styleFn',
            name: 'link'
        },
        'image': {
            id: 18,
            title: '图片',
            className: 'wtf wtf-image',
            text: '图片描述',
            url: 'http://example.com/example.png',
            type: 'styleFn',
            name: 'image'
        },
        'code': {
            id: 19,
            title: '代码',
            className: 'wtf wtf-code',
            type: 'styleFn',
            name: 'code'
        },
        'table': {
            id: 20,
            title: '表格',
            className: 'wtf wtf-table-toolbar',
            type: 'tableFn',
            name: 'table'
        },
        'emoji': {
            id: 21,
            title: 'Emoji 图标',
            className: 'wtf wtf-smile-o',
            target: 'emoji-modal',
            type: 'emoji'
        },
        'math': {
            id: 22,
            title: '数学公式',
            className: 'wtf wtf-superscript',
            sample: 'E = mc^2',
            type: 'mathFn',
            name: 'math'
        },
        'diagram': {
            id: 24,
            title: '顺序图',
            className: 'wtf wtf-exchange-alt',
            type: 'diagram',
            name: 'diagram'
        },
        'gantt': {
            id: 25,
            title: '甘特图',
            className: 'wtf wtf-sliders-h',
            type: 'gantt',
            name: 'gantt'
        },
        'preview': {
            id: 27,
            title: '预览',
            className: 'wtf wtf-columns',
            type: 'preview'
        },
        'expand': {
            id: 28,
            title: '最大化',
            title2: '还原',
            className: 'wtf wtf-expand',
            type: 'expand'
        },
        'divider': {
            id: parseInt(Math.random() * 1000000 + '', 10),
            type: 'divider'
        },
        'uploadImg': {
            id: 29,
            title: '上传',
            className: 'wtf wtf-image',
            text: '上传',
            type: 'uploadImg',
            name: 'image'
        },
        'linkModule': {
            id: 30,
            title: '关联',
            className: 'wtf wtf-link-entity',
            text: '关联',
            type: 'linkModule',
            name: 'linkModule'
        }
    },
    tableMenu: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
            [0, 5]
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5]
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [2, 4],
            [2, 5]
        ],
        [
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
            [3, 4],
            [3, 5]
        ],
        [
            [4, 0],
            [4, 1],
            [4, 2],
            [4, 3],
            [4, 4],
            [4, 5]
        ]
    ],
    language: {
        'en-us': {
            'heading': 'H1',
            'bold': 'Bold',
            'italic': 'Italic',
            'underline': 'Underline',
            'strikethrough': 'Strike through',
            'h1': 'H1',
            'h2': 'H2',
            'h3': 'H3',
            'h4': 'H4',
            'h5': 'H5',
            'h6': 'H6',
            'hr': 'Hr',
            'quote': 'Quote',
            'list': 'Ul',
            'list-2': 'Ol',
            'square': 'Unfinished',
            'check-square': 'Completed',
            'link': 'Link',
            'link-text': 'Link',
            'image': 'Image',
            'image-text': 'Description',
            'code': 'Code',
            'table': 'Table',
            'emoji': 'Emoji',
            'math': 'Math',
            'flow': 'Flow',
            // 'diagram': 'Flowchart',
            'gantt': 'Gantt',
            'preview': 'Preview',
            'max': 'Max',
            'original': 'Reduction',
            'col': 'col',
            'row': 'row',
            'diagram': 'sequenceDiagram\nA->>B: How are you?\nB->>A: I am fine!',
            'placeholder': 'Content ...'
        },
        'zh-cn': {
            'heading': '标题',
            'bold': '粗体',
            'italic': '斜体',
            'underline': '下划线',
            'strikethrough': '删除线',
            'h1': '标题 1',
            'h2': '标题 2',
            'h3': '标题 3',
            'h4': '标题 4',
            'h5': '标题 5',
            'h6': '标题 6',
            'hr': '横线',
            'quote': '引用',
            'list': '无序列表',
            'list-2': '有序列表',
            'square': '未完成任务列表',
            'check-square': '已完成任务列表',
            'link': '链接',
            'link-text': '链接文字',
            'image': '图片',
            'image-text': '图片描述',
            'code': '代码',
            'table': '表格',
            'emoji': 'Emoji 图标',
            'math': '数学公式',
            'flow': '流程图',
            // 'diagram': '顺序图',
            'gantt': '甘特图',
            'preview': '预览',
            'max': '最大化',
            'original': '还原',
            'col': '列',
            'row': '行',
            'diagram': 'sequenceDiagram\nA->>B: 你好吗?\nB->>A: 我很好3!',
            'placeholder': '输入内容...'
        },
        'zh-tw': {
            'heading': '標題',
            'bold': '粗體',
            'italic': '斜體',
            'underline': '下劃線',
            'strikethrough': '刪除線',
            'h1': '標題 1',
            'h2': '標題 2',
            'h3': '標題 3',
            'h4': '標題 4',
            'h5': '標題 5',
            'h6': '標題 6',
            'hr': '橫線',
            'quote': '引用',
            'list': '無序列表',
            'list-2': '有序列表',
            'square': '未完成任務列表',
            'check-square': '已完成任務列表',
            'link': '鏈接',
            'link-text': '鏈接文字',
            'image': '圖片',
            'image-text': '圖片描述',
            'code': '代碼',
            'table': '表格',
            'emoji': 'Emoji 圖標',
            'math': '數學公式',
            'flow': '流程圖',
            // 'diagram': '順序圖',
            'gantt': '甘特圖',
            'preview': '預覽',
            'max': '最大化',
            'original': '還原',
            'col': '列',
            'row': '行',
            'diagram': 'sequenceDiagram\nA->>B: 你好嗎?\nB->>A: 我很好!',
            'placeholder': '輸入內容...'
        },
        'ja-jp': {
            'heading': '标题',
            'bold': '粗体',
            'italic': '斜体',
            'underline': '下划线',
            'strikethrough': '删除线',
            'h1': '标题 1',
            'h2': '标题 2',
            'h3': '标题 3',
            'h4': '标题 4',
            'h5': '标题 5',
            'h6': '标题 6',
            'hr': '横线',
            'quote': '引用',
            'list': '无序列表',
            'list-2': '有序列表',
            'square': '未完成任务列表',
            'check-square': '已完成任务列表',
            'link': '链接',
            'link-text': '链接文字',
            'image': '图片',
            'image-text': '图片描述',
            'code': '代码',
            'table': '表格',
            'emoji': 'Emoji 图标',
            'math': '数学公式',
            'flow': '流程图',
            // 'diagram': '顺序图',
            'gantt': '甘特图',
            'preview': '预览',
            'max': '最大化',
            'original': '还原',
            'col': '列',
            'row': '行',
            'diagram': 'sequenceDiagram\nA->>B: 你好吗?\nB->>A: 我很好3!',
            'placeholder': '输入内容...'
        }
    }
};
