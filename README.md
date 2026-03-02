# Julia Foldable Cells

Enable folding cells in Julia files based on markdown comments.

![](https://raw.githubusercontent.com/miguelmaso/JuliaFoldableCells/main/img/foldable_cell.png)

## Features


## Known Issues

This extension overrides the default folding of VSCode. Hence, it has been needed to re-implement the structural folding of the Julia language.

## Release Notes

### 0.0.1

- Initial release.

### 0.0.2

- Added support for first implicit cell.
- Fixed broken support for structure (condtionals, loops).
- Fixed support for nested structure (inner loop, inner functions...).
- Enhanced the title of the cells.
