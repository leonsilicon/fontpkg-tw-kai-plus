# Source and verification

- Provider: Ministry of Digital Affairs, Taiwan — CNS11643 Chinese Standard Interchange Code Master Ideographs website, https://www.cns11643.gov.tw/.
- Official archive: https://www.cns11643.gov.tw/opendata/Fonts_Kai.zip
- Official release index: https://www.cns11643.gov.tw/opendata/release.txt (Fonts_Kai.zip version `20260805`).
- Retrieved: 2026-10-01.
- Archive SHA-256: `50fdfafabb40a382b74e7f6cf813bcd036a446b7700be0099de8372fee9c9e38`.
- Extracted file: `TW-Kai-Plus-98_1.ttf`, 25,308,888 bytes, unchanged.
- Font SHA-256: `9924c3831521ec676f8bd52de6e72aee390e66184cce3646ed5b265c2233d498`.
- Internal family: `TW-Kai-Plus`; PostScript name: `TWKaiPlus`; version: `Version 11508.01`.

The archive's font explanation identifies TW-Kai-Plus as the plane-15 font. The separate BMP and plane-2 files are intentionally not included.

The CNS component assignments relevant to this package are U+F616C (left-side 朿, used in 刺 and 棘) and U+F616B (full 朿 component). Both are mapped to distinct glyphs with nonempty TrueType outlines. A CoreText comparison of the source font visually confirms the shortened final stroke in the left-side form.

The upstream binary's copyright field explicitly offers either Open Government Data License 1.0 or SIL Open Font License 1.1. This package selects OFL 1.1, reproduces the upstream copyright notice in NOTICE.md, and includes the full OFL text in LICENSE. The official authorization page is https://www.cns11643.gov.tw/pageView.jsp?ID=59.

To refresh manually, download the official archive and release index, extract the original Plus file, and update these hashes and the verifier. Never wire the network fetch into an install or build hook.
