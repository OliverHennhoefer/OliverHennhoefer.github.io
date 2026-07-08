```powershell
# Start local Astro dev server (workspace-write sandbox safe)
cd C:\Users\heol\Projects\OliverHennhoefer.github.io

# install deps once (or after package updates)
npm install

# required in this environment due to telemetry write restrictions
$env:ASTRO_TELEMETRY_DISABLED = '1'

# run and keep this terminal open
npx astro dev --host 127.0.0.1 --port 4321
```

Open:
- http://127.0.0.1:4321/

Checks:
- `npx astro dev status`  (only while the server is running in the same environment)
- `npx astro dev stop`    (to stop when done)

Encoding note:
- If you see mojibake like `Ã¶` instead of `ö` in text files, open/save them as UTF-8 (no UTF-16/BOM) in the editor and keep terminal output in UTF-8 (`$OutputEncoding = [System.Text.UTF8Encoding]::new($false)`).
