export interface ThyFileSizeExceedsContext {
    files: File[];
    exceedsFiles: File[];
    nativeEvent?: Event;
    sizeThreshold?: number;
}
