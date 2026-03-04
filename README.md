# Julia Foldable Cells

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml/badge.svg)](https://github.com/miguelmaso/JuliaFoldableCells/actions/workflows/ci.yml)

The [*Julia Language Extension*](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) provides the definition of cells of code by means of the syntax `##` or `#%%` at the begining of a line. This extension enhances cells allowing to fold them.

![](https://raw.githubusercontent.com/miguelmaso/JuliaFoldableCells/main/img/foldable_cell.png)


## Features

- Provide folding of cells defined by [Julia cell delimiters](vscode://settings/julia.cellDelimiters).
- Keep a reasonable structural folding according to the *Julia* syntax.


## Known Issues

This extension overrides the default folding of VSCode. Hence, it has been needed to re-implement the structural folding of the Julia language. The current implementation has some limitations:
- Does not match `end` which is not at the first column
- Does not match `begin`, `do`, `if`, `quote`, `try` blocks which are not at the begining of a line
- When an unmatched keyword is followed by an unmatched `end`, there will happen a wrong folding, e.g.:
```julia
if 1 + 1 ≈ 2 true else false end
sqrt_zero(x) = try
    sqrt(x)
catch
    0.0
end
```
