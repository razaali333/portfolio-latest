import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("profile keeps professional metadata separate from hero demographics", async () => {
  const content = await read("src/lib/content.ts");
  assert.match(content, /role: "Full Stack Web Developer"/);
  assert.match(content, /gender: "Male"/);
  assert.match(content, /location: "Maldives"/);
});

test("all primary routes are present in the sitemap", async () => {
  const sitemap = await read("src/app/sitemap.ts");
  for (const route of ["/about", "/experience", "/work", "/contact", "/career", "/privacy"]) {
    assert.ok(sitemap.includes(`"${route}"`), `${route} is missing from sitemap`);
  }
});

test("referenced social and portrait assets exist", async () => {
  await Promise.all([
    access(new URL("../public/portrait.webp", import.meta.url)),
    access(new URL("../public/og.jpg", import.meta.url)),
    access(new URL("../public/favicon.ico", import.meta.url)),
  ]);
});

test("career experience provides a valid main landmark", async () => {
  const career = await read("src/components/WalkableWorld.tsx");
  assert.match(career, /<main\s+id="main"/);
});
