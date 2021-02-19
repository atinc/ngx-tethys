export interface ThyFileSizeExceedsContext {
    files: File[];
    exceedsFiles: File[];
    nativeEvent?: Event;
    sizeThreshold?: number;
}

export type ThySizeExceedsHandler = (data: ThyFileSizeExceedsContext) => File[] | undefined | void;

export interface ThyFileSelectEvent {
    files: File[];
    nativeEvent: Event;
}
