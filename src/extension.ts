import * as vscode from 'vscode';

import { JuliaCellFoldingProvider } from "./foldingProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log("Activating extension JuliaFoldableCells");
  
    const provider = new JuliaCellFoldingProvider();

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            { language: "julia" },  // , scheme: "file"
            provider
        )
    );
}

// export function deactivate() {}



  // "contributes": {
  // "foldingRangeProviders": [
  //     {
  //       "language": "julia"
  //     }
  //   ]
  // },

