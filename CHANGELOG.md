## [Unreleased]

### Changed
- Migrated the structural folding from syntax-based to an indentation-based approach. This provides a faster, native-like experience and avoids conflicts with complex Julia syntax.
- Folding blocks no longer include trailing blank lines.
- Closing keywords (like `end`) are no longer included in the folded region, as they share the same indentation level as the block's opening line.

### Fixed
- Resolved issues where inline statements (e.g., `try`/`catch` or `end` not placed at the first column) caused incorrect or corrupted folding ranges. The new indentation logic bypasses these syntax edge cases entirely.
- Improved the handling of nested structures by strictly following indentation levels.


## [0.0.3]

- Added support for julia.cellDelimiters from Settings.json
- Improved documentation.
- Added logo.

## [0.0.2]

- Added detection of first implicit cell.
- Added support for structure (conditionals, loops).
- Fixed support for nested structure (inner loop, inner functions...).

## [0.0.1]

- Initial release.
