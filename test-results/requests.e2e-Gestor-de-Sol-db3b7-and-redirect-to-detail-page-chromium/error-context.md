# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: requests.e2e.spec.ts >> Gestor de Solicitudes >> should create a request and redirect to detail page
- Location: e2e\requests.e2e.spec.ts:6:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Solicitud creada correctamente')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Solicitud creada correctamente')

```

```yaml
- main:
  - heading "Nueva solicitud" [level=1]
  - paragraph: Registra una nueva solicitud interna con la información necesaria para su atención.
  - link "Volver a bandeja":
    - /url: /solicitudes
    - button "Volver a bandeja"
  - heading "Crear solicitud" [level=1]
  - paragraph: Registra una nueva solicitud para que pueda ser revisada y gestionada.
  - link "Volver a solicitudes":
    - /url: /solicitudes
  - heading "No se pudo crear la solicitud" [level=2]
  - paragraph: Ocurrió un problema al registrar la solicitud. Intenta nuevamente.
  - text: Título
  - textbox "Título":
    - /placeholder: Ej. Solicitud de acceso a sistema
    - text: Solicitud E2E de acceso
  - text: Descripción
  - textbox "Descripción":
    - /placeholder: Describe el motivo de la solicitud...
    - text: Necesito acceso para validar el flujo E2E de la aplicación.
  - text: Solicitante
  - textbox "Solicitante":
    - /placeholder: Ej. Kevin Lindo
    - text: Kevin E2E
  - text: Categoría
  - combobox "Categoría":
    - option "Accesos" [selected]
    - option "Soporte técnico"
    - option "Recursos humanos"
    - option "Infraestructura"
    - option "Compras"
    - option "Finanzas"
    - option "Legal"
    - option "Otros"
  - text: Prioridad
  - combobox "Prioridad":
    - option "Baja"
    - option "Media"
    - option "Alta" [selected]
    - option "Crítica"
  - button "Crear solicitud"
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("Gestor de Solicitudes", () => {
  4  |   test.describe.configure({ mode: "serial" });
  5  | 
  6  |   test("should create a request and redirect to detail page", async ({
  7  |     page,
  8  |   }) => {
  9  |     await page.goto("/solicitudes/nueva");
  10 | 
  11 |     await page.getByLabel("Título").fill("Solicitud E2E de acceso");
  12 |     await page
  13 |       .getByLabel("Descripción")
  14 |       .fill("Necesito acceso para validar el flujo E2E de la aplicación.");
  15 |     await page.getByLabel("Solicitante").fill("Kevin E2E");
  16 |     await page.getByLabel("Categoría").selectOption("Accesos");
  17 |     await page.getByLabel("Prioridad").selectOption("high");
  18 | 
  19 |     await page.getByRole("button", { name: "Crear solicitud" }).click();
  20 | 
  21 |     await expect(
  22 |       page.getByText("Solicitud creada correctamente")
> 23 |     ).toBeVisible();
     |       ^ Error: expect(locator).toBeVisible() failed
  24 | 
  25 |     await expect(page).toHaveURL(/\/solicitudes\/REQ-\d+/);
  26 |     await expect(page.getByText("Solicitud E2E de acceso")).toBeVisible();
  27 |     await expect(page.getByText("Kevin E2E")).toBeVisible();
  28 |   });
  29 | 
  30 |   test("should edit an existing request", async ({ page }) => {
  31 |     await page.goto("/solicitudes/REQ-001/editar");
  32 | 
  33 |     await page.getByLabel("Solicitante").fill("Kevin Editado E2E");
  34 |     await page.getByLabel("Estado").selectOption("in_review");
  35 | 
  36 |     await page.getByRole("button", { name: "Guardar cambios" }).click();
  37 | 
  38 |     await expect(
  39 |       page.getByText("Solicitud actualizada correctamente")
  40 |     ).toBeVisible();
  41 | 
  42 |     await expect(page).toHaveURL(/\/solicitudes\/REQ-001/);
  43 |     await expect(page.getByText("Kevin Editado E2E")).toBeVisible();
  44 |   });
  45 | 
  46 |   test("should list requests and open request detail", async ({ page }) => {
  47 |     await page.goto("/solicitudes");
  48 | 
  49 |     const requestsTable = page.getByRole("table");
  50 | 
  51 |     await expect(
  52 |       requestsTable.getByText("Acceso a plataforma interna").first()
  53 |     ).toBeVisible();
  54 | 
  55 |     await expect(
  56 |       requestsTable.getByText("Soporte para equipo lento").first()
  57 |     ).toBeVisible();
  58 | 
  59 |     await requestsTable
  60 |       .getByRole("link", { name: "Ver detalle de REQ-001" })
  61 |       .click();
  62 | 
  63 |     await expect(page).toHaveURL(/\/solicitudes\/REQ-001/);
  64 | 
  65 |     await expect(
  66 |       page.getByText("Acceso a plataforma interna").first()
  67 |     ).toBeVisible();
  68 | 
  69 |     await expect(page.getByText("Accesos").first()).toBeVisible();
  70 |   });
  71 | });
```