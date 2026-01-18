<<<<<<< HEAD
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
=======
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

**CRITICAL - ALL AGENTS - SERVER RESTART PROTOCOL:**

  **NEVER kill node processes blindly** - Claude Code runs in Node.js, killing all node processes will terminate your own session!

  **Safe restart methods:**
  1. Use the KillShell tool with the specific shell_id (preferred)
  2. If using taskkill/kill, ONLY target the SPECIFIC PID of the backend server, never use blanket commands like `taskkill /IM node.exe`
  3. Track PIDs of background processes when starting them
  4. If port conflict occurs, find the SPECIFIC PID using `netstat -ano | findstr :PORT` and kill ONLY that PID

  **FORBIDDEN commands:**
  - `taskkill /F /IM node.exe` (kills ALL node processes including Claude Code)
  - `pkill node` (kills ALL node processes)
  - `killall node` (kills ALL node processes)

  **Example of SAFE restart:**
  ```bash
  # Find specific backend PID on port 5001
  netstat -ano | findstr :5001 | findstr LISTENING
  # Output: TCP  0.0.0.0:5001  0.0.0.0:0  LISTENING  12345

  # Kill ONLY that specific PID
  taskkill //F //PID 12345

  # Or use KillShell with the shell_id
  # <use KillShell tool with shell_id>
  ```
>>>>>>> feature/sprint-2
