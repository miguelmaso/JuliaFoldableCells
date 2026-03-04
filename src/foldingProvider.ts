import * as vscode from "vscode";

export class JuliaCellFoldingProvider implements vscode.FoldingRangeProvider {
    provideFoldingRanges(
        document: vscode.TextDocument,
        context: vscode.FoldingContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FoldingRange[]>
    {
        const cellDelims = getJuliaCellDelimiters();
        const ranges: vscode.FoldingRange[] = [];
        const stack: number[] = [];
        let cellStart: number | null = null;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;

            // ---- CELL DETECTION ----
            if (cellDelims.some(regex => regex.test(line))) {
                cellStart ??= 0; // If we encounter a cell, make a previous cell from the start of the document.
                if (i > cellStart + 1) {
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

function getJuliaCellDelimiters(): RegExp[] {
    const config = vscode.workspace.getConfiguration("julia");
    const delimiters = config.get<string[]>("cellDelimiters") || [];

    return delimiters.map(pattern => {
        try {
            return new RegExp(pattern);
        } catch {
            return null;
        }
    }).filter((r): r is RegExp => r !== null);
}
