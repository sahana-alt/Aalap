import * as React from 'react';
export declare function fillRef<T>(ref: React.Ref<T>, node: T): void;
export declare function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T>;
export declare function usePrevious<T = undefined>(value: T): T | undefined;
