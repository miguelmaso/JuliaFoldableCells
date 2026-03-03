import * as vscode from 'vscode';

import { JuliaCellFoldingProvider } from "./foldingProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log("Activating extension julia-foldable-cells");
  
    const provider = new JuliaCellFoldingProvider();

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            { language: "julia" },
            provider
        )
    );
}

export function deactivate() {}
