/// <reference types="react" />
import { GenerateConfig } from '../../generate';
import { Locale, NullableDateType } from '../../interface';
export declare const YEAR_COL_COUNT = 3;
export interface YearBodyProps<DateType> {
    prefixCls: string;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
}
declare function YearBody<DateType>(props: YearBodyProps<DateType>): JSX.Element;
export default YearBody;