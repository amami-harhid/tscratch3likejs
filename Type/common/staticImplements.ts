export const staticImplements = function<T>() {
    return <U extends T>(constructor: U) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        constructor
    };
}