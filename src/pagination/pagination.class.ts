/**
 * 分页的配置
 * @public
 * @order 20
 */
export interface ThyPaginationConfigModel {
    /**
     * 是否显示第一页和最后一页
     */
    boundaryLinks?: boolean;

    /**
     * 是否显示上一页和下一页
     */
    directionLinks?: boolean;

    /**
     * 设置默认每页显示条数
     */
    pageSize?: number;

    /**
     * 设置最大显示数量，超出最大显示数后会自动进行分割显示
     */
    maxCount?: number;

    rangeCount?: number;

    /**
     * 设置是否显示快速跳转
     */
    showQuickJumper?: boolean;

    /**
     * 设置是否显示总页数信息
     */
    showTotalPageCount?: boolean;

    /**
     * 第一页按钮显示文本
     */
    firstText?: string;

    /**
     * 最后一页按钮显示文本
     */
    lastText?: string;

    /**
     * 上一页显示文本
     */
    previousText?: string;

    /**
     * 下一页显示文本
     */
    nextText?: string;

    /**
     * 第一页按钮显示图标
     */
    firstIcon?: string;

    /**
     * 最后一页按钮显示图标
     */
    lastIcon?: string;

    /**
     * 上一页显示图标
     */
    previousIcon?: string;

    /**
     * 下一页显示图标
     */
    nextIcon?: string;

    /**
     * 设置总页数显示格式
     */
    totalPagesFormat?: string;

    showSizeChanger?: boolean;

    pageSizeOptions?: number[];

    /**
     * 设置后缀单位
     */
    suffixUnit?: string;
}

export interface ThyPaginationChangedEvent {
    event: Event;
    page: number;
    pageIndex: number;
}
