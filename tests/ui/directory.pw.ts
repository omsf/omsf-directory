import { expect, test, type Page } from "@playwright/test";

const cards = (page: Page) => page.getByRole("article");

test("cards and filter menus appear", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("article", { name: "mBuild", exact: true }),
  ).toBeVisible();

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

  await page.getByRole("link", { name: "Infrastructure" }).click();
  await expect(page).toHaveURL(/\/infrastructure\/?$/);
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

test("required fields control YAML output", async ({ page }) => {
  await page.goto("/new");

  const copyYaml = page.getByRole("button", { name: "Copy YAML" });
  const requiredTextFields = [
    [page.getByLabel("Name *"), "Example project"],
    [
      page.getByLabel("Description *"),
      "A project used to test the directory form.",
    ],
    [page.getByLabel("Repository URL *"), "https://github.com/omsf/example"],
    [page.getByLabel("Tags *"), "testing"],
  ] as const;
  const requiredChoices = [page.getByLabel("MIT"), page.getByLabel("Python")];

  await expect(copyYaml).toBeDisabled();
  for (const [field, value] of requiredTextFields) await field.fill(value);
  for (const choice of requiredChoices) await choice.check();
  await expect(copyYaml).toBeEnabled();

  for (const [field, value] of requiredTextFields) {
    await field.fill("");
    await expect(copyYaml).toBeDisabled();
    await field.fill(value);
    await expect(copyYaml).toBeEnabled();
  }
  for (const choice of requiredChoices) {
    await choice.uncheck();
    await expect(copyYaml).toBeDisabled();
    await choice.check();
    await expect(copyYaml).toBeEnabled();
  }
});
