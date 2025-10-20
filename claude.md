**CRITICAL - ALL AGENTS:** When updating ANY documentation file (stories, context files, epics, reports, logs, or any markdown file in `.ai/` or `docs/`), you MUST include a timestamp using the bash `date` command.

  **Required format:**
  ```bash
  # Get current timestamp
  date '+%Y-%m-%d %H:%M:%S'
  # Example output: 2025-10-18 15:45:23

  Apply to:
  - Context files (.ai/sprint-1.1/*.md) - Update "Last Updated" field
  - Story files (docs/stories/*.md) - Add timestamp to Dev Agent Record / QA Results sections
  - Epic files (docs/epics/*.md) - Document last modification date
  - Any progress logs, debug logs, or documentation

  Example usage in file:
  **Last Updated:** 2025-10-18 15:45:23 (via `date '+%Y-%m-%d %H:%M:%S'`)
  **Updated By:** Dev Agent (James) / QA Agent (Quinn) / Orchestrator

  Enforcement: This rule takes precedence over efficiency concerns. ALWAYS timestamp documentation updates.