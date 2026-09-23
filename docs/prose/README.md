# Prose lint: rules and decisions

Vale runs over every tracked Markdown and MDX file (`mise run prose`). This
page records which rules run where and why. Every Markdown file in the
repository is a model for the Markdown written after it, so the docs under
`docs/` are in scope even though the site never publishes them.

## Where a rule can go

| Place     | Config               | Task                   | Effect                             |
| --------- | -------------------- | ---------------------- | ---------------------------------- |
| Gate      | `.vale.ini`, error   | `mise run prose`, `ci` | Fails the build                    |
| Every run | `.vale.ini`, warning | `mise run prose`, `ci` | Prints on every run, never fails   |
| Off       | none                 |                        | Costs more reading than it returns |

Rules come from pinned packages (`Packages` in `.vale.ini`), plus
`.vale/styles/House/`, the project's own style for the cases where a
package has a rule backwards for this repository (committed, not fetched).

## Adding a package or a rule

1. Add the package to `Packages` in `.vale.ini`, pinned to a release URL,
   and run `mise run prose-sync`.
2. Run the candidate rules as warnings over the tree and read every hit.
   A rule goes to the gate when a hit is a defect every time, to every run
   when a hit deserves a look but may be deliberate, and off when most
   hits are the project's own vocabulary or conventions.
3. Record the decision in the table below and in `.vale.ini`, with the
   reason next to the rule. Fix the hits of a gating rule first.

The [ai-training](https://github.com/lsimons/ai-training) repo has a longer
version of this process, with per-rule evaluation reports and a metrics
script, for a project with enough prose to tune against.

## Decisions

| Package    | Gate                                                                                                                                                                                                                                                                           | Every run                                                                                                                               | Off                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vale       |                                                                                                                                                                                                                                                                                | Terms (casing of `accept.txt` names)                                                                                                    | Spelling (cspell's job)                                                                                                                                |
| House      |                                                                                                                                                                                                                                                                                | Quotes                                                                                                                                  |                                                                                                                                                        |
| write-good | Illusions                                                                                                                                                                                                                                                                      | Cliches, Weasel, ThereIs, TooWordy                                                                                                      | Passive, So, E-Prime                                                                                                                                   |
| proselint  | Annotations, Cursing, LGBTOffensive, Hyperbole, RASSyndrome, Oxymorons, Malapropisms, Nonwords, DateCase, DateMidnight, DateRedundancy, DateSpacing                                                                                                                            | GenderBias, LGBTTerms, DenizenLabels, GroupTerms, CorporateSpeak, Airlinese, Jargon, Archaisms, Skunked, Hedging, Apologizing, Currency | Typography, Cliches, `Very`, Spelling, Diacritical, P-Value, AnimalLabels, Needless, But, Uncomparables (crashes Vale 3.20.0)                          |
| Google     | AMPM, DateFormat, EmDash, Gender, Periods, HeadingPunctuation, Slang                                                                                                                                                                                                           | `Will`, OxfordComma, Headings, Latin, Timeless, Exclamation, OptionalPlurals                                                            | Quotes, Contractions, Passive, Parens, Colons, WordList, WordListCase, Ellipses, Anthropomorphism, Spacing, LyHyphens, the rest                        |
| ai-tells   | EmDashUsage, DoubleHyphen, ClosingPleasantries, OpeningCliches, ConclusionMarkers, UnpackExplore, DespiteChallenges, RhetoricalSelfAnswer, AICompoundPhrases, PromotionalPuffery, UrgencyInflation, WrapUpHeadings, MarketingHeadings, AnnouncementHeadings, ListIntroductions |                                                                                                                                         | The register rules (figurative verbs, tricolons, contrastive negation, metaphors). Tuned against one corpus; add as warnings once there is prose here. |
