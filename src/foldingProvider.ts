import * as vscode from "vscode";

export class JuliaCellFoldingProvider implements vscode.FoldingRangeProvider {
    provideFoldingRanges(
        document: vscode.TextDocument,
        context: vscode.FoldingContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FoldingRange[]>
    {
        const cellDelims = getJuliaCellDelimiters();
        const tabSize = getTabSize();
        const ranges: vscode.FoldingRange[] = [];
        const blockStack: { line: number, indent: number }[] = [];
        let cellStart: number | null = null;
        let lastLine = -1;

        for (let i = 0; i < document.lineCount; i++) {
            if (token.isCancellationRequested) { break; }

            const rawLine = document.lineAt(i);
            if (rawLine.isEmptyOrWhitespace) { continue; }

            const line = rawLine.text;

            // ---- CELL DETECTION ----
            if (cellDelims.some(regex => regex.test(line))) {
                cellStart ??= 0; // If we encounter a cell, make a previous cell from the start of the document.
                if (lastLine > cellStart) {
                    ranges.push(new vscode.FoldingRange(cellStart, lastLine, vscode.FoldingRangeKind.Region));
                }
                cellStart = i;
                lastLine = i;
                continue;
            }

            // ---- INDENT DETECTION ----
            const indent = computeIndentLevel(line, tabSize);
            while (blockStack.length > 0 && blockStack[blockStack.length - 1].indent >= indent) {
                const block = blockStack.pop()!;
                if (lastLine > block.line) {
                    ranges.push(new vscode.FoldingRange(block.line, lastLine));
                }
            }
            
            blockStack.push({ line: i, indent });
            lastLine = i;
        }

        // ---- CLOSE REMAINING BLOCKS ----
        while (blockStack.length > 0) {
            const block = blockStack.pop()!;
            if (lastLine > block.line) {
                ranges.push(new vscode.FoldingRange(block.line, lastLine));
            }
        }

        // ---- CLOSE LAST CELL ----
        if (cellStart !== null && document.lineCount > cellStart + 1) {
            ranges.push(new vscode.FoldingRange(cellStart, document.lineCount - 1, ));
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

function getTabSize(): number {
    const config = vscode.workspace.getConfiguration("editor");
    const tabSize = config.get<number | string>("tabSize", 4);
    return typeof tabSize === "number" ? tabSize : 4;
}

function computeIndentLevel(line: string, tabSize: number): number {
    let indent = 0;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === ' ') { indent++; }
        else if (char === '\t') { indent += tabSize; }
        else { break; }
    }
    return indent;
}
