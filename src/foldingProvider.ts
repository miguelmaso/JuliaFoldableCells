import * as vscode from "vscode";

export class JuliaCellFoldingProvider implements vscode.FoldingRangeProvider {
    provideFoldingRanges(
        document: vscode.TextDocument,
        context: vscode.FoldingContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FoldingRange[]>
    {
        const foldableRanges = getFoldableRanges(document);
        return foldableRanges.map(range =>
            new vscode.FoldingRange(
                range.start,
                range.end,
                range.title ? vscode.FoldingRangeKind.Region : undefined
            )
        );
    }
}

interface FoldableRange {
    start: number;
    end: number;
    title: string;  // Only cells have titles at this stage
}

function getFoldableRanges(document: vscode.TextDocument): FoldableRange[] {
    const ranges: FoldableRange[] = [];
    const stack: { start: number }[] = [];
    let cellStart: number | null = 0;
    let cellTitle: string = "";

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;

        // ---- CELL DETECTION ----
        const cellMatch = line.match(/^##\s+(.*)$/);
        if (cellMatch) {
            // Close previous cell
            if (cellStart !== null && i > cellStart + 1) {
                ranges.push({
                    start: cellStart,
                    end: i - 1,
                    title: cellTitle
                });
            }
            cellStart = i;
            cellTitle = normalizeTitle(cellMatch[1]);
        }

        // ---- STRUCTURAL START ----
        if (/^\s*(function|struct|mutable struct|module|let|begin|if|for|while)\b/.test(line)) {
            stack.push({ start: i });
        }

        // ---- STRUCTURAL END ----
        if (/^\s*end\b/.test(line)) {
            const block = stack.pop();
            if (block !== undefined && i > block.start) {
                ranges.push({
                    start: block.start,
                    end: i,
                    title: ""  // Empty title for non-cell blocks
                });
            }
        }
    }

    // Close last cell
    if (cellStart !== null && document.lineCount > cellStart + 1) {
        ranges.push({
            start: cellStart,
            end: document.lineCount - 1,
            title: cellTitle
        });
    }

    return ranges;
}

function normalizeTitle(title: string): string {
    return title
        .replace(/^[-= ]+/, "")
        .replace(/[-= ]+$/, "")
        .trim();
}
