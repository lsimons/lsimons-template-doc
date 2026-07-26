# lsimons-template-doc

Project template for documentation sites built with
[Astro Starlight](https://starlight.astro.build/), with the shared "LSD Warm"
theme, a landing page, [Quarto](https://quarto.org/) slide decks, and GitHub
Pages deployment. Sites built from this template are published as project sites
under <https://lsimons.github.io/>.

## Using this template

1. Click **Use this template** on GitHub (or clone this repo).
2. Install the toolchain and rename the template to your project:

   ```bash
   mise install                       # pin + install bun, quarto, hooks
   mise run init                      # infer the name from the git remote / directory
   # or: mise run init --name my-docs --title "My Docs"
   mise run docs-install              # install the site dependencies (bun)
   ```

   `mise run init` replaces every occurrence of `lsimons-template-doc` (repo name,
   deploy base path, package name, GitHub URLs) and `Template Docs` (the human
   title) across the repo. See `scripts/init.mjs`.

3. Update `AGENTS.md` (and the `CLAUDE.md` symlink) with project-specific
   instructions, and replace the landing page and guides in
   `docs/src/content/docs/` with your content.

## What's included

- **Astro Starlight** site under `docs/`, with a splash landing page and an
  explicit sidebar.
- **LSD Warm theme** (`docs/src/styles/custom.css`) shared with
  [lsimons.github.io](https://lsimons.github.io), Merriweather webfonts, and a
  clickable-card landing layout.
- **Quarto slide decks** - author in `.qmd`, render to reveal.js **HTML** and
  Beamer **PDF**; a worked example lives at
  `docs/public/presentations/example.qmd`.
- **GitHub Actions** - `ci.yml` builds and type-checks on push/PR; `deploy.yml`
  publishes to GitHub Pages on push to `main`.
- **Pinned toolchain and tasks** in `.mise.toml` (run with `mise run <task>`).
- **Git hooks** (`prek.toml`) - mdformat, markdownlint, lychee, gitleaks, and
  commitlint.

## Development

```bash
mise run docs-dev        # dev server at http://localhost:4321/lsimons-template-doc/
mise run docs-build      # build the static site into docs/dist
mise run docs-check      # Astro type/content check
mise run docs-slides     # render the example slide deck to HTML + PDF
mise run docs-favicon    # regenerate the favicon + apple-touch-icon
```

Content lives in `docs/src/content/docs/`; static assets and slide decks in
`docs/public/`.

## Publishing

Enable GitHub Pages with the source set to **GitHub Actions** (not "Deploy from
a branch"). A push to `main` then builds and deploys the site. The deploy base
path (set as `base` in `docs/astro.config.mjs`) matches the repo name, so the
site lands at `https://lsimons.github.io/<repo>/`.

## License

See [LICENSE](./LICENSE) (Apache 2.0).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and the
[Code of Conduct](./CODE_OF_CONDUCT.md).
