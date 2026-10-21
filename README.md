# Product UI

React front end for the product catalogue. It lists products, links to a details page for each one, and is localised into English and Czech. The data comes from the Spring Boot [`product_backend`](../product_backend) (PostgreSQL on Supabase, schema managed by Flyway).

## Features

- **Product listing:** a table whose columns and rows come from data. It has a coloured header, alternating row colours, and fills 70% of the viewport width.
- **Product details:** each product name links to `/products/:productId`, which makes its own API call.
- **Localisation:** Lingui, with a language switcher (`en`, `cs`).
- **Styling:** styled-components with one shared theme (colours and spacing).
- **Containers and CI:** an nginx image, built, tagged and pushed to GitHub Container Registry by GitHub Actions. The backend and UI always use the same version.

## Tech stack

React 19 · Vite 8 · React Router 7 · styled-components 6 · Lingui 6 · axios · nginx

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000; /v1 calls are proxied to http://localhost:8080
npm run build        # production bundle in dist/
npm run extract      # update src/locales/*/messages.po after adding text
```

The backend must be running on port 8080. See its README for the database settings.

## API contract

```text
GET /v1/api/getProducts?page=1&pageSize=100
  → { success, message, data: { items: [Product], pagination: { page, pageSize, totalItems, totalPages } } }

GET /v1/api/getProducts/{productId}
  → { success, message, data: Product }        (404 with success: false if not found)
```

## Project structure

```text
src/
├── components/
│   ├── Table.jsx            # organism: puts the table pieces together
│   ├── table/               # atoms (TableCell, TableHeaderCell) and molecules (TableHeader, TableRow, TableBody, TableEmptyRow)
│   └── LocaleSwitcher.jsx
├── pages/                   # ProductListing, ProductDetails (fetch the data and pass it to components)
├── state/apiService.js      # HTTP access in one place
├── i18n/i18n.js             # locale list and loading catalogs on demand
├── locales/{en,cs}/         # translation catalogs (.po)
└── styles/                  # theme, global styles, shared layout pieces
```

## Design patterns

| Pattern | Where |
|---|---|
| **Atomic design** | Table cells (atoms), then header, row and body (molecules), then `Table` (organism) |
| **Container / presentational** | Pages fetch and prepare the data; `Table` and its pieces have no state and only render props |
| **Configuration-driven UI** | `columns = [{ id, label, render? }]` decides what the table shows |
| **Render props** | A column's `render(row)` customises a cell, e.g. turns the product name into a link |
| **Provider (context)** | `I18nProvider` and `ThemeProvider` make the active locale and the theme available to every component |
| **Service layer** | `apiService.js` keeps HTTP calls (and future interceptors) out of components |
| **Design tokens / theming** | Every colour and spacing value comes from `styles/theme.js` |
| **Memoisation** | `useMemo` derives the product list and the translated columns from the response |
| **Build once, deploy many** | CI builds one image per commit; a release adds a version tag to that same image instead of rebuilding it |

## SOLID principles

- **S, single responsibility:** each piece has one job. Cells render a value, rows map columns to cells, pages fetch data, `apiService` talks HTTP, `i18n.js` loads translations.
- **O, open/closed:** new columns or custom cells are added through the `columns` config and `render`, without changing `Table`.
- **L, Liskov substitution:** any object with `{ id, label }` works as a column, and any array of row objects works as `products`. Styled atoms like `TableCell` can be used anywhere a plain `<td>` is expected.
- **I, interface segregation:** components get only the props they use. `TableHeader` takes `columns`, `TableEmptyRow` takes `colSpan` and `message`.
- **D, dependency inversion:** components depend on props, the theme and the i18n context, not on concrete data sources or values. Pages depend on the `get()` service, not on axios.

## Releases

Builds are done by [`.github/workflows/image.yml`](.github/workflows/image.yml), and images go to `ghcr.io/<owner>/product-ui`.

| Event | Result |
|---|---|
| Pull request | Build only |
| Push to `main` | `:sha-<commit>` and `:main` |
| Tag `vX.Y.Z` | `:X.Y.Z` and `:X.Y`. The tag must match `package.json`, and `product-backend:X.Y.Z` must already exist |

To cut a release, release the backend first with the same version, then run:

```bash
scripts/release.sh 1.1.0
git push origin main && git push origin v1.1.0
```

To run the image:

```bash
docker run -p 8080:8080 -e BACKEND_URL=http://<backend-host>:8080 ghcr.io/<owner>/product-ui:1.1.0
```
