export interface ThyPaginationConfigModel {
    boundaryLinks?: boolean;
    directionLinks?: boolean;
    pageSize?: number;
    maxCount?: number;
    showJumper?: boolean;
    firstText?: string;
    lastText?: string;
    previousText?: string;
    nextText?: string;
    firstIcon?: string;
    lastIcon?: string;
    previousIcon?: string;
    nextIcon?: string;
    totalPagesFormat?: string;
}

export interface ThyPaginationChangedEvent {
    event: Event;
    page: number;
    pageIndex: number;
}
