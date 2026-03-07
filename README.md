# Julia Foldable Cells

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml/badge.svg)](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml)

The [*Julia Language Extension*](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) provides the definition of cells of code by means of the syntax `##` or `#%%` at the begining of a line. This extension enhances cells allowing to fold them.

![](https://raw.githubusercontent.com/miguelmaso/JuliaFoldableCells/main/img/foldable_cell.png)


## Features

- **Cell Folding:** Automatically provides folding ranges for cells defined by your [Julia cell delimiters](vscode://settings/julia.cellDelimiters).
- **Native-like Structural Folding:** Because registering a custom folding provider overrides VS Code's default behavior, this extension integrates a fast **indentation-based** folding. It mimics VS Code's native fallback, ensuring that your loops, functions, and standard code blocks remain perfectly foldable alongside your cells.


## Known Issues

- **Indentation Dependency:** Structural folding relies strictly on code indentation rather than syntax parsing. If a script has inconsistent or incorrect indentation, the code blocks might not fold as expected. Using a code formatter (like `JuliaFormatter.jl`) will ensure optimal folding behavior.
- **Multiple Folding Providers Overlap:** If another extension (or a future update to the official Julia extension) registers a custom syntax-based folding provider, VS Code will merge its ranges with the indentation ranges provided by this extension. This could lead to redundant or slightly overlapping folding regions.
