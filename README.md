# Julia Foldable Cells

The [*Julia Language Extension*](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) provides the definition of cells of code by the syntax `##` at the begining of a line. This extension enhances the cells by adding the possibility to fold them.

![](https://raw.githubusercontent.com/miguelmaso/JuliaFoldableCells/main/img/foldable_cell.png)


## Features

- Provide folding of cells defined by `##`.
- Keep a reasonable folding according to the structure defined by the *Julia* syntax.


## Known Issues

This extension overrides the default folding of VSCode. Hence, it has been needed to re-implement the structural folding of the Julia language. The current implementation has some limitations:
- Do not match `end` at the not being at the first column
- Do not match `begin`, `do`, `if`, `quote`, `try` blocks not begining at the first column
- When an unmatched keyword is followed by an unmatched `end`, there will happen a wrong folding, e.g.:
```jl
if 1 + 1 ≈ 2 true else false end
sqrt_zero(x) = try
    sqrt(x)
catch
    0.0
end
```
