// Comprehensive tests for the JuliaFoldableCells extension

import { FoldingProvider } from 'path-to-folding-provider';

describe('FoldingProvider', () => {
    let foldingProvider;

    beforeEach(() => {
        foldingProvider = new FoldingProvider();
    });

    test('detects cells correctly', () => {
        const code = `# %%\nfunction myFunc()\n    println("Hello")\nend`;
        const cells = foldingProvider.detectCells(code);
        expect(cells.length).toBe(1);
    });

    test('folds functions correctly', () => {
        const code = `# %%\nfunction myFunc() {\n    println("Hello");\n}\n`;
        const folds = foldingProvider.foldFunctions(code);
        expect(folds.length).toBeGreaterThan(0);
    });

    test('folds structs correctly', () => {
        const code = `# %%\ntype MyStruct = { field1, field2 }`;
        const folds = foldingProvider.foldStructs(code);
        expect(folds.length).toBeGreaterThan(0);
    });

    test('handles nested structures', () => {
        const code = `# %%\ntype Outer = { InnerStruct: { field1, field2 } }`;
        const folds = foldingProvider.foldStructs(code);
        expect(folds.length).toBeGreaterThan(0);
    });

    test('fails gracefully with invalid code', () => {
        const code = `# %%\ninvalid code`;
        const folds = foldingProvider.foldFunctions(code);
        expect(folds).toEqual([]);
    });
});
