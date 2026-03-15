# CLAUDE.md - ISF Playground

## Project Reference

See `project-context.md` for full project context including technology stack, conventions, and architecture details.

## Code Lookup Strategy (jcodemunch-mcp)

Use jcodemunch-mcp for all code lookups to minimize token usage. Never read full files when MCP symbol retrieval can answer the question.

### Workflow

1. Call `list_repos` first — if the project is not indexed, call `index_folder` with the current working directory.
2. Use `search_symbols` / `get_symbol` to find and retrieve code by symbol name instead of reading entire files.
3. Use `get_repo_outline` or `get_file_outline` to explore project structure before diving into files.
4. Use `search_text` for finding specific patterns, TODOs, or string matches across the codebase.
5. Fall back to direct file reads only when editing files or when MCP tools are unavailable.

### Available jcodemunch Tools

| Tool | When to Use |
|------|-------------|
| `index_folder` | Index the local project (run once, or after major changes) |
| `list_repos` | Check if project is already indexed |
| `get_repo_outline` | Get high-level overview of repo structure |
| `get_file_tree` | Browse the file structure |
| `get_file_outline` | See all symbols in a specific file |
| `search_symbols` | Find functions, classes, methods by name |
| `get_symbol` | Retrieve exact source code for a symbol |
| `get_symbols` | Batch retrieve multiple symbols at once |
| `search_text` | Full-text search with context lines |
| `get_file_content` | Get cached file content (prefer over raw file read for lookups) |
| `invalidate_cache` | Clear index after major refactors |

## Documentation Lookup Strategy (jdocmunch-mcp)

Use jdocmunch-mcp for navigating documentation by section instead of reading entire doc files. This applies to project docs, external library docs, and any markdown/text documentation.

### Workflow

1. Call `list_repos` first — if docs are not indexed, call `index_local` with the docs directory path.
2. Use `get_toc` or `get_toc_tree` to browse available documentation sections.
3. Use `search_sections` to find relevant sections by keyword instead of scanning full files.
4. Use `get_section` to retrieve the exact section content needed.
5. Fall back to direct file reads only when editing docs or when MCP tools are unavailable.

### Available jdocmunch Tools

| Tool | When to Use |
|------|-------------|
| `index_local` | Index a local documentation folder (run once, or after doc changes) |
| `index_repo` | Index a GitHub repository's docs |
| `list_repos` | Check if docs are already indexed |
| `get_toc` | Flat section list in document order |
| `get_toc_tree` | Nested section tree per document |
| `get_document_outline` | Section hierarchy for one document |
| `search_sections` | Search docs returning section summaries |
| `get_section` | Retrieve full content of one section |
| `get_sections` | Batch retrieve multiple sections |
| `get_section_context` | Section + ancestors + child summaries |
| `delete_index` | Remove a doc index |
