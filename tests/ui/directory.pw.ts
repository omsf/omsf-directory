import { expect, test, type Page } from "@playwright/test";

const cards = (page: Page) => page.locator("div.min-h-120.max-h-120");

test("cards and filter menus appear", async ({ page }) => {
  await page.goto("/");

  await expect(cards(page).first()).toBeVisible();
  const cardCount = await cards(page).count();
  expect(cardCount).toBeGreaterThan(0);

  for (const [filter, option] of [
    ["Filters", "Molecular Dynamics"],
    ["Language", "Python"],
    ["License", "MIT"],
    ["Project", "Open Force Field"],
  ]) {
    const control = page.getByRole("button", {
      name: new RegExp(`^${filter}`),
    });
    const menuOption = page.getByRole("button", { name: option, exact: true });
    await control.click();
    await expect(menuOption).toBeVisible();
    await control.click();
    await expect(menuOption).toBeHidden();
  }
});

test("filters can be applied", async ({ page }) => {
  await page.goto("/");
  await expect(cards(page).first()).toBeVisible();
  const cardCount = await cards(page).count();

  await page.getByRole("button", { name: /^Language/ }).click();
  await page.getByRole("button", { name: "Python", exact: true }).click();

  await expect(page).toHaveURL(/langs=Python/);
  await expect(
    page.getByRole("button", { name: "Language (1)" }),
  ).toBeVisible();
  const filteredCardCount = await cards(page).count();
  expect(filteredCardCount).toBeGreaterThan(0);
  expect(filteredCardCount).toBeLessThanOrEqual(cardCount);
  for (const text of await cards(page).allTextContents()) {
    expect(text).toContain("Python");
  }
});

test("all menu items can be opened", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /^Filters/ })).toBeVisible();

  await page.getByRole("link", { name: "Workflows" }).click();
  await expect(page).toHaveURL(/\/workflows\/?$/);
  await expect(page.getByRole("button", { name: /^Filters/ })).toBeVisible();

  await page.getByRole("link", { name: "Add your project!" }).click();
  await expect(page).toHaveURL(/\/new\/?$/);
  await expect(
    page.getByRole("heading", { name: "Add New Entry" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Software" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: /^Filters/ })).toBeVisible();
});

test("a complete valid form enables YAML output", async ({ page }) => {
  await page.goto("/new");

  await page.getByLabel("Name *").fill("Example project");
  await page
    .getByLabel("Description *")
    .fill("A project used to test the directory form.");
  await page
    .getByLabel("Repository URL *")
    .fill("https://github.com/omsf/example");
  await page.getByLabel("Project URL").fill("https://example.com");
  await page.getByLabel("Project Docs").fill("https://example.com/docs");
  await page.getByLabel("MIT").check();
  await page.getByLabel("Tags *").fill("testing");
  await page.getByLabel("Python").check();

  await expect(page.getByRole("button", { name: "Copy YAML" })).toBeEnabled();
});
