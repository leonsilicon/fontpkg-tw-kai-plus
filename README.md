# TW-Kai-Plus

`fontpkg-tw-kai-plus` packages the original CNS 11643 plane-15 Kai font from Taiwan's Ministry of Digital Affairs. It includes **U+F616C (󶅬), the left-side form of 朿**, and **U+F616B (󶅫), the full component form**.

| Property | Value |
| --- | --- |
| File | `TW-Kai-Plus-98_1.ttf` |
| Family | `TW-Kai-Plus` |
| Font version | `Version 11508.01` |
| Upstream release | 20260805 |
| Size | 25,308,888 bytes |
| License selected | SIL Open Font License 1.1 |

Install with `bun add fontpkg-tw-kai-plus` (or `vp add fontpkg-tw-kai-plus` in a Vite+ project).

```js
import "fontpkg-tw-kai-plus/index.css";
const ciLeft = "\u{F616C}";
const ciFullComponent = "\u{F616B}";
```

```html
<span style="font-family: 'TW-Kai-Plus'; font-weight: 400">&#xF616C; &#xF616B;</span>
```

The TTF can also be imported directly from `fontpkg-tw-kai-plus/TW-Kai-Plus-98_1.ttf` for native applications or font subsetting.

These are CNS-specific private-use assignments, not universally standardized Unicode characters. The ordinary character 朿 is U+673F and should keep using a normal CJK font. Apply this font only to characters intentionally using the CNS mapping; do not treat its PUA coverage as a universal fallback.

Both component glyphs were rendered with CoreText and inspected: U+F616C has the shortened, dot-like final stroke; U+F616B has the full sweeping stroke. The included offline verifier checks the original binary digest, Unicode cmap entries, and distinct nonempty outlines:

```sh
bun scripts/verify-fonts.ts
```

The binary is included unchanged. No install, build, or verification step downloads fonts. See [SOURCE.md](SOURCE.md) for provenance and [NOTICE.md](NOTICE.md) / [LICENSE](LICENSE) for attribution and terms.
