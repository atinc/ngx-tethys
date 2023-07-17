export interface ThySegmentEvent<TValue = unknown> {
    event: Event;
    value: TValue;
    activeIndex: number;
}
