import { strict as assert } from "node:assert";

const filename = "TW-Kai-Plus-98_1.ttf";
const buffer = Buffer.from(await Bun.file(new URL(`../${filename}`, import.meta.url)).arrayBuffer());
assert.equal(buffer.length, 25308888, "Unexpected file size");
assert.equal(new Bun.CryptoHasher("sha256").update(buffer).digest("hex"),
  "9924c3831521ec676f8bd52de6e72aee390e66184cce3646ed5b265c2233d498", "Unexpected source font digest");
assert.equal(buffer.readUInt32BE(0), 0x00010000, "Expected a TrueType sfnt");

const tables = new Map<string, { offset: number; length: number }>();
for (let i = 0; i < buffer.readUInt16BE(4); i++) {
  const record = 12 + i * 16;
  const tag = buffer.toString("ascii", record, record + 4);
  const offset = buffer.readUInt32BE(record + 8);
  const length = buffer.readUInt32BE(record + 12);
  assert.ok(offset + length <= buffer.length, `${tag}: truncated table`);
  tables.set(tag, { offset, length });
}
function table(tag: string) {
  const value = tables.get(tag);
  assert.ok(value, `Missing ${tag}`);
  return value;
}

const cmap = table("cmap");
const unicodeSubtables: number[] = [];
for (let i = 0; i < buffer.readUInt16BE(cmap.offset + 2); i++) {
  const record = cmap.offset + 4 + i * 8;
  const platform = buffer.readUInt16BE(record);
  const encoding = buffer.readUInt16BE(record + 2);
  const offset = cmap.offset + buffer.readUInt32BE(record + 4);
  if ((platform === 0 || (platform === 3 && encoding === 10)) && buffer.readUInt16BE(offset) === 12) {
    unicodeSubtables.push(offset);
  }
}
assert.ok(unicodeSubtables.length > 0, "Missing full-repertoire Unicode cmap");

function glyphIdAt(offset: number, codepoint: number) {
  for (let i = 0; i < buffer.readUInt32BE(offset + 12); i++) {
    const group = offset + 16 + i * 12;
    const start = buffer.readUInt32BE(group);
    const end = buffer.readUInt32BE(group + 4);
    if (codepoint >= start && codepoint <= end) return buffer.readUInt32BE(group + 8) + codepoint - start;
  }
  return 0;
}

const shortLoca = buffer.readInt16BE(table("head").offset + 50) === 0;
const loca = table("loca");
const glyf = table("glyf");
const glyphCount = buffer.readUInt16BE(table("maxp").offset + 4);
function glyphOffset(id: number) {
  return shortLoca ? buffer.readUInt16BE(loca.offset + id * 2) * 2 : buffer.readUInt32BE(loca.offset + id * 4);
}

const outlines: Buffer[] = [];
for (const codepoint of [0xf616b, 0xf616c]) {
  const ids = unicodeSubtables.map(offset => glyphIdAt(offset, codepoint));
  const id = ids[0]!;
  assert.ok(ids.every(other => other === id), "Unicode cmap mappings disagree");
  assert.ok(id > 0 && id < glyphCount, "Missing or invalid glyph");
  const start = glyphOffset(id);
  const end = glyphOffset(id + 1);
  assert.ok(end - start >= 10 && end <= glyf.length, "Missing or truncated outline");
  assert.notEqual(buffer.readInt16BE(glyf.offset + start), 0, "Empty contour list");
  outlines.push(buffer.subarray(glyf.offset + start, glyf.offset + end));
  console.log(`U+${codepoint.toString(16).toUpperCase()}: gid ${id}, ${end - start} outline bytes`);
}
assert.ok(!outlines[0]!.equals(outlines[1]!), "Left and full forms must have different outlines");
console.log(`${filename}: digest, Unicode coverage, and distinct outlines verified`);
