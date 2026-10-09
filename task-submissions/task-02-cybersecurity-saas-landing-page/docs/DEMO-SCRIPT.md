# Demo Script — ReadySignal (Task 2)

Target length: **5 minutes** (assignment range 4–6). Output: MP4 (1080p, 30 fps).

> No recording has been generated. You must record the real website yourself.

## Before recording

- [ ] Close other tabs and notifications; set Do Not Disturb.
- [ ] Chrome at 100% zoom, bookmarks bar hidden, a clean profile or Incognito.
- [ ] Open `index.html` (and, if deployed, the GitHub Pages URL).
- [ ] Open VS Code with the `css/` folder visible.
- [ ] Microphone test; speak slowly.
- [ ] **OBS Studio:** Sources → Display Capture (or Window Capture), Audio Input Capture; Settings → Output → Recording Format **MP4** (or MKV then File → Remux), 1080p. Start/stop with Start Recording.
- [ ] **Xbox Game Bar:** press Win+G → Capture → Record (Win+Alt+R). Saves MP4 to `Videos\Captures`. Game Bar records one window, so switch windows deliberately.

## Timed plan

| Time | Show | Say (suggested) |
| --- | --- | --- |
| 0:00–0:30 | Page top, then README | "I'm Abdullah Khan, registration OCT26-FE06-08. This is Task 2 for Appverse Technologies: a cybersecurity SaaS landing page, ReadySignal, using only HTML and CSS with no JavaScript. It is a concept, not a real security product." |
| 0:30–1:30 | Scroll desktop page slowly | Walk through hero, trust, features, dashboard preview, how it works, use cases, pricing, FAQ, final CTA, footer. Mention that data is illustrative. Click nav links to show smooth scrolling. |
| 1:30–2:15 | DevTools device toolbar: 320, 375, 768, 1024, 1440 | Show layouts reflow, no sideways scroll. Open the mobile menu with the checkbox hack; show the dashboard rearranging (container queries). |
| 2:15–3:15 | VS Code | Open `tokens.css` (custom properties, `clamp()`), then explain the file order: tokens, reset, base, layout, components, responsive, animations, print. Show the checkbox hack rules in `components.css` and a container query. Point out there is no `<script>`. |
| 3:15–3:50 | Browser | Press Tab from the top: skip link, logo, menu, links with visible focus ring. Open an FAQ item with Enter/Space. |
| 3:50–4:15 | DevTools → Rendering → Emulate prefers-reduced-motion | Reload: animations stop, anchors still work. Switch back to "no preference" and reload to show load-in animation. |
| 4:15–4:35 | Ctrl+P | Show print preview: white background, no menu, readable cards. |
| 4:35–5:10 | DevTools → Lighthouse | Run Mobile (and Desktop). Read out the **actual** scores shown. If a score is below 95, say so honestly and what you would improve. |
| 5:10–5:30 | Page top | Summarise: requirements met, what you learned (tokens, responsive CSS, accessibility). Mention GitHub repo / live link if deployed. |

## After recording

- [ ] Play it back: audio clear, text readable, 4–6 minutes.
- [ ] Export/trim as MP4 (CapCut or Clipchamp optional).
- [ ] Name the file clearly, e.g. `ReadySignal-Demo-Abdullah-Khan-OCT26-FE06-08.mp4`.
