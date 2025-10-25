type Specificity = [ids: number, classes: number, elements: number];

const parseSpecificity = (selector: string): Specificity => {
    let ids = 0;
    let classes = 0;
    let elements = 0;

    const tokens = selector.trim().split(' ').filter(Boolean);

    for (const token of tokens) {
        if (
            token === '*' ||
            token === '>' ||
            token === '+' ||
            token === '~' ||
            token === '||' ||
            token === ''
        ) continue;

        ids += (token.match(/#[A-Za-z0-9_-]+/g)?.length ?? 0);
        classes += (token.match(/\.[A-Za-z0-9_-]+/g)?.length ?? 0);

        const typeMatch = token.match(/^[A-Za-z][A-Za-z0-9-]*/);
        if (typeMatch && token[0] !== '.' && token[0] !== '#') {
            elements += 1;
        }
    }

    return [ids, classes, elements];
};

const cmpTuple = (a: Specificity, b: Specificity): number => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    if (a[2] !== b[2]) return a[2] - b[2];
    return 0;
};

export function compare(a: string, b: string): string {
    const A = parseSpecificity(a);
    const B = parseSpecificity(b);

    const c = cmpTuple(A, B);
    if (c > 0) return a;
    if (c < 0) return b;
    return b;
} 