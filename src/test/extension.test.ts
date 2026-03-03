import * as assert from 'assert';
import * as vscode from 'vscode';

import { JuliaCellFoldingProvider } from '../foldingProvider';

// a tiny helper constructing a fake TextDocument from a string
function makeDoc(text: string): vscode.TextDocument {
    const lines = text.split(/\r?\n/);
    return {
        lineCount: lines.length,
        lineAt: (n: number) => ({ text: lines[n] }),
        getText: () => text
    } as unknown as vscode.TextDocument;
}

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('provider returns no ranges on empty document', () => {
        const provider = new JuliaCellFoldingProvider();
        const doc = makeDoc('');
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any);
        assert.deepStrictEqual(ranges, []);
    });
});

suite('JuliaCellFoldingProvider', () => {
    let provider: JuliaCellFoldingProvider;

    setup(() => {
        provider = new JuliaCellFoldingProvider();
    });

    test('document without cells', () => {
        const code = 'foo\nbar\nbaz';
        const doc = makeDoc(code);
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any) as vscode.FoldingRange[];
        assert.strictEqual(ranges.length, 0);
    });

    test('cell marker creates a fold', () => {
        const code = '## Cell\nline2\nline3';
        const doc = makeDoc(code);
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any) as vscode.FoldingRange[];
        assert.strictEqual(ranges.length, 1);
        assert.strictEqual(ranges[0].start, 0);
        assert.strictEqual(ranges[0].end, 2);
    });

    test('does not treat ##noSpace as cell', () => {
        const code = '##noSpace\nfoo';
        const doc = makeDoc(code);
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any) as vscode.FoldingRange[];
        assert.strictEqual(ranges.length, 0);
    });

    test('function block folding', () => {
        const code = 'function f()\n  a = 1\nend';
        const doc = makeDoc(code);
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any) as vscode.FoldingRange[];
        assert.ok(ranges.some(r => r.start === 0 && r.end === 2));
    });

    test('nested structures are folded', () => {
        const code = 'module M\n  function g()\n    x = 0\n  end\nend';
        const doc = makeDoc(code);
        const ranges = provider.provideFoldingRanges(doc, {} as any, {} as any) as vscode.FoldingRange[];
        assert.ok(ranges.find(r => r.start === 0 && r.end === 4));
        assert.ok(ranges.find(r => r.start === 1 && r.end === 3));
    });
});
