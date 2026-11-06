const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createApp, isWithinWorkingHours } = require("../server");

test("working hours include weekdays from 9:00 up to but not including 17:00", () => {
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 2, 9, 0)), true);
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 6, 16, 59)), true);
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 2, 8, 59)), false);
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 2, 17, 0)), false);
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 7, 10, 0)), false);
  assert.equal(isWithinWorkingHours(new Date(2026, 10, 8, 10, 0)), false);
});

test("all pages render shared navigation during working hours", async (t) => {
  const app = createApp(() => new Date(2026, 10, 2, 10, 0));
  const server = app.listen(0);
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  for (const [route, heading] of [
    ["/", "A taste of West Africa, made with heart"],
    ["/services", "Something delicious for every occasion"],
    ["/contact", "We saved you a seat"],
  ]) {
    const response = await fetch(`${baseUrl}${route}`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, new RegExp(heading));
    assert.match(html, /Baobab Table/);
    assert.match(html, /href="\/"(?: aria-current="page")?>Home/);
    assert.match(html, /href="\/services"(?: aria-current="page")?>Our Services/);
    assert.match(html, /href="\/contact"(?: aria-current="page")?>Contact us/);
  }
});

test("requests outside working hours receive a closed page", async (t) => {
  const app = createApp(() => new Date(2026, 10, 7, 10, 0));
  const server = app.listen(0);
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await new Promise((resolve) => server.once("listening", resolve));

  const response = await fetch(`http://127.0.0.1:${server.address().port}/`);
  const html = await response.text();

  assert.equal(response.status, 503);
  assert.match(html, /We’re currently closed/);
  assert.match(html, /Our restaurant is open Monday to Friday, from 9:00 to 17:00/);
});
