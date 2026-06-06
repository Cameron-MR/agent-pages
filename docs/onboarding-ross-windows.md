# Ross — Agent Pages setup (Windows)

This gets you working on the Agent Pages prototype exactly like Cameron: editing
in Claude (Cowork), running it locally, and pushing changes to GitHub. Do the
"On your computer" steps once, then use the "Kickoff prompt" in Cowork.

---

## Part A — One-time setup on your computer

### 1. Install the tools
Install these (accept defaults on each installer):
- **Claude desktop app** for Windows, then sign in. (You need Cowork access on
  your account. If you don't see Cowork mode, ask Cameron/IT to enable it.)
- **Git for Windows** — https://git-scm.com/download/win (this includes the
  credential manager that handles GitHub login).
- **Node.js LTS** — https://nodejs.org (the "LTS" button).
- **VS Code** — https://code.visualstudio.com (optional but recommended).

### 2. Get GitHub access
- Make sure you have a GitHub account and tell Cameron your GitHub username so he
  can add you to the `Cameron-MR/agent-pages` repo.
- Check your email for the GitHub invite and click **Accept invitation**.

### 3. Clone the project
Open **PowerShell** (Start menu, type "PowerShell") and run these one at a time:

```powershell
mkdir $HOME\Projects -Force
cd $HOME\Projects
git clone https://github.com/Cameron-MR/agent-pages.git
cd agent-pages
npm install
```

The first time you push (later), Git will pop up a browser window to sign in to
GitHub. Sign in once and it remembers you.

### 4. Run it locally (optional, to see it live on your machine)
```powershell
npm run dev
```
Then open http://localhost:3000 in your browser. Press Ctrl+C in PowerShell to
stop it.

---

## Part B — Connect Cowork to the project
1. Open the **Claude desktop app** and start a **Cowork** chat.
2. When prompted to choose a folder (or via the folder/attach option), select
   `C:\Users\<you>\Projects\agent-pages`.
3. Paste the Kickoff prompt below as your first message.

---

## Part C — Kickoff prompt (paste this into your Cowork chat)

```
You're helping build "Agent Pages," a reference UI/UX prototype for Marshall
Reddick Real Estate. Before doing anything, read these files in the project for
full context: CLAUDE.md, agent-pages-memory.md, and docs/PROJECT-GUIDE.md. Then
wait for my instructions.

Key facts:
- Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- Brand: teal #316878, dark #1C3C45, light teal #50AAC4; Raleway headings, Open
  Sans body; Apple liquid-glass aesthetic.
- Rules: no em dashes, no emojis, fabricated sample data only, Marshall Reddick
  scope only (exclude Crowne Point, Rendara, Kindred Oak).
- All data and logic are mocks; the live MLS/CRM APIs are not connected yet.

When I ask for changes: make them in this repo, keep `npx tsc --noEmit` and
`npx next lint` clean, then commit and push to GitHub. Update
docs/PROJECT-GUIDE.md when you add or change a feature.
```

---

## Part D — Daily workflow
Each time you sit down to work:

1. Get the latest before you start (in PowerShell, inside the project):
   ```powershell
   cd $HOME\Projects\agent-pages
   git pull
   ```
2. Work with Claude in Cowork as normal.
3. When you're happy, push your changes:
   ```powershell
   git add -A
   git commit -m "Short description of what changed"
   git push
   ```
   (Claude can also do the commit/push for you; this is the manual way.)

Vercel auto-deploys every push, so the live preview updates a minute or two
after you push.

### Working at the same time as Cameron
You both share one repo, so to avoid conflicts: `git pull` before you start,
push when you finish, and try not to edit the same files at the same moment. If
git ever says you're behind, run `git pull` then push again.

---

## If you get stuck
- "git push" asks to log in: a browser window opens, sign in to GitHub once.
- "npm not recognized": close and reopen PowerShell after installing Node.
- Can't find Cowork in Claude: confirm Cowork is enabled on your account.
- Merge conflict on pull: ping Cameron, don't force anything.
