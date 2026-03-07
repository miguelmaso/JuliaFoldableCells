# Julia foldable cells

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml/badge.svg)](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml)

The [*Julia Language Extension*](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) provides the definition of cells of code by means of the syntax `##` or `#%%` at the begining of a line. This extension enhances cells allowing to fold them.

![](https://raw.githubusercontent.com/miguelmaso/JuliaFoldableCells/main/img/foldable_cell.png)


## Features

- *Cell folding:* Automatically provides folding ranges for cells defined by your [Julia cell delimiters](vscode://settings/julia.cellDelimiters).
- *Native-like structural folding:* Because registering a custom folding provider overrides VS Code's default behavior, this extension integrates an *indentation-based* folding. It mimics VS Code's native fallback, ensuring that your loops, functions, and standard code blocks remain perfectly foldable alongside your cells.


## Keyboard shortcuts

This extension registers Julia cells as native VS Code folding regions (specifically, "Marker Regions"). Therefore, you can use [VS Code's default folding commands](https://code.visualstudio.com/docs/editor/codebasics#_folding) to easily collapse or expand them. Some of the defaults are
- Fold all regions `Ctrl+K Ctrl+8`
- Unfold all Regions `Ctrl+K Ctrl+9`
- Fold all except selected `Ctrl+K Ctrl+-`
- Unfold all `Ctrl+K Ctrl+J`

You can customize these shortcuts anytime by opening the Keyboard Shortcuts menu (Preferences: Open Keyboard Shortcuts)


## Known issues

- *Minimap titles:* VSCode does not yet expose an API for providing minimap titles. However, a practical workaround is to add the `MARK:` keyword to your cell definition. For example, the line `## MARK: My definitions` will define a Julia cell, generate a foldable range, and display the title *My definitions* in the minimap.
- *Indentation dependency:* Structural folding relies strictly on code indentation rather than syntax parsing. If a script has inconsistent or incorrect indentation, the code blocks might not fold as expected. Using a code formatter (like `JuliaFormatter.jl`) will ensure optimal folding behavior.
- *Multiple folding providers overlap:* If another extension (or a future update to the official Julia extension) registers a custom syntax-based folding provider, VS Code will merge its ranges with the indentation ranges provided by this extension. This could lead to redundant or slightly overlapping folding regions.
