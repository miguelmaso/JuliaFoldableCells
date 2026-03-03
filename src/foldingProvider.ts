import * as vscode from "vscode";

export class JuliaCellFoldingProvider implements vscode.FoldingRangeProvider {
    provideFoldingRanges(
        document: vscode.TextDocument,
        context: vscode.FoldingContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FoldingRange[]>
    {
        const ranges: vscode.FoldingRange[] = [];
        const stack: number[] = [];
        let cellStart: number | null = 0;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;

            // ---- CELL DETECTION ----
            if (/^##/.test(line)) {
                if (cellStart !== null && i > cellStart + 1) {
                    ranges.push(new vscode.FoldingRange(cellStart, i - 1));
                }
                cellStart = i;
                continue;
            }

            // ---- STRUCTURAL START ----
            if (/^\s*(function|struct|mutable struct|module|let|begin|if|for|while)\b/.test(line)) {
                stack.push(i);
                continue;
            }

            // ---- STRUCTURAL END ----
            if (/^\s*end\b/.test(line)) {
                const start = stack.pop();
                if (start !== undefined && i > start) {
                    ranges.push(new vscode.FoldingRange(start, i));
                }
            }
        }

        // ---- CLOSE LAST CELL ----
        if (cellStart !== null && document.lineCount > cellStart + 1) {
            ranges.push(new vscode.FoldingRange(cellStart, document.lineCount - 1));
        }

        return ranges;
    }
}

