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
        let cellStart: number | null = 0;  // begin at 0, so that the first cell can be folded if it starts at the top of the file

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;

            // ---- CELL DETECTION ----
            if (/^\s*##/.test(line)) {

                // If we were already inside a cell, close it
                if (cellStart !== null && i > cellStart + 1) {
                    ranges.push(
                        new vscode.FoldingRange(cellStart, i - 1)
                    );
                }

                cellStart = i;
            }

            // ---- STRUCTURAL START ----
            if (/^(function|struct|mutable struct|module|let|begin)\b/.test(line)) {
                stack.push(i);
            }

            // ---- STRUCTURAL END ----
            if (/^end\b/.test(line)) {
                const start = stack.pop();
                if (start !== undefined && i > start) {
                    ranges.push(
                        new vscode.FoldingRange(start, i)
                    );
                }
            }
        }

        // Close last cell
        if (cellStart !== null && document.lineCount > cellStart + 1) {
            ranges.push(
                new vscode.FoldingRange(cellStart, document.lineCount - 1)
            );
        }

        return ranges;
    }
}
