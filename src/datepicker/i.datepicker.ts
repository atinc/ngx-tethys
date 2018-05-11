export interface DatepickerValueEntry {
    date: Date | '';
    with_time: boolean;
}

export interface DatepickerInitialState {
    value: DatepickerValueEntry;
    changeValue: Function;
}
