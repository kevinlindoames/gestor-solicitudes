import { expect, test } from "@playwright/test";

test.describe("Gestor de Solicitudes", () => {
  test.describe.configure({ mode: "serial" });

  test("should create a request and redirect to detail page", async ({
    page,
  }) => {
    await page.goto("/solicitudes/nueva");

    await page.getByLabel("Título").fill("Solicitud E2E de acceso");
    await page
      .getByLabel("Descripción")
      .fill("Necesito acceso para validar el flujo E2E de la aplicación.");
    await page.getByLabel("Solicitante").fill("Kevin E2E");
    await page.getByLabel("Categoría").selectOption("Accesos");
    await page.getByLabel("Prioridad").selectOption("high");

    await page.getByRole("button", { name: "Crear solicitud" }).click();

    await expect(
      page.getByText("Solicitud creada correctamente")
    ).toBeVisible();

    await expect(page).toHaveURL(/\/solicitudes\/REQ-\d+/);
    await expect(page.getByText("Solicitud E2E de acceso")).toBeVisible();
    await expect(page.getByText("Kevin E2E")).toBeVisible();
  });

  test("should edit an existing request", async ({ page }) => {
    await page.goto("/solicitudes/REQ-001/editar");

    await page.getByLabel("Solicitante").fill("Kevin Editado E2E");
    await page.getByLabel("Estado").selectOption("in_review");

    await page.getByRole("button", { name: "Guardar cambios" }).click();

    await expect(
      page.getByText("Solicitud actualizada correctamente")
    ).toBeVisible();

    await expect(page).toHaveURL(/\/solicitudes\/REQ-001/);
    await expect(page.getByText("Kevin Editado E2E")).toBeVisible();
  });

  test("should list requests and open request detail", async ({ page }) => {
    await page.goto("/solicitudes");

    const requestsTable = page.getByRole("table");

    await expect(
      requestsTable.getByText("Acceso a plataforma interna").first()
    ).toBeVisible();

    await expect(
      requestsTable.getByText("Soporte para equipo lento").first()
    ).toBeVisible();

    await requestsTable
      .getByRole("link", { name: "Ver detalle de REQ-001" })
      .click();

    await expect(page).toHaveURL(/\/solicitudes\/REQ-001/);

    await expect(
      page.getByText("Acceso a plataforma interna").first()
    ).toBeVisible();

    await expect(page.getByText("Accesos").first()).toBeVisible();
  });
});