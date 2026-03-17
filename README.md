# Product Management App (Frontend)

A modern web application to manage products through a simple and intuitive interface.  
Users can create, update, and delete products, as well as view them in a structured table. It is part of a full PERN stack project.

This frontend application consumes a custom external API and demonstrates a clean architecture using React Router Data APIs and runtime validation.

## Live Demo

https://fullstack-products-client.vercel.app/

## Features

- Create new products
- Edit all product fields
- Update individual product attributes
- Delete products
- View products in a structured table
- Form-based product creation and editing
- Navigation between views using routing
- Validation of API data using **Valibot**

## Tech Stack

- **React** – UI library
- **TypeScript** – static typing
- **React Router (Data APIs)** – routing with loaders and actions
- **Axios** – HTTP client for API communication
- **Valibot** – runtime validation of API data
- **Vite** – build tool and development server

## Architecture Highlights

### Routing with Data APIs

The application uses **React Router Data APIs**:

- **Loaders** – fetch product data before rendering views
- **Actions** – handle form submissions (create, update, delete)

This approach keeps data logic **close to the routing layer**, improving maintainability and clarity.

### API Layer

All API communication is centralized in:

- `ProductService` – handles CRUD operations with the external API

This ensures separation between **data fetching logic and UI components**.

### Validation

Data exchanged with the API is validated using **Valibot**, ensuring:

- Type-safe communication
- Early detection of invalid data
- Improved application robustness

### Component Organization

The project follows a **modular structure**, separating responsibilities into:

- UI components
- Views (pages)
- Services (API layer)
- Types and helpers

## Project Structure

```text
client
 ├── src
 │   ├── components        # Reusable UI components
 │   │    ├── ErrorMessage.tsx
 │   │    ├── ProductDetails.tsx
 │   │    └── ProductForm.tsx
 │   ├── views             # Application pages
 │   │    ├── Products.tsx
 │   │    ├── NewProduct.tsx
 │   │    └── EditProduct.tsx
 │   ├── layouts           # Layout components
 │   │    └── Layout.tsx
 │   ├── services          # API communication layer
 │   │    └── ProductService.ts
 │   ├── helpers           # Utility functions
 │   ├── types             # TypeScript types
 │   ├── router.tsx        # Routing (loaders & actions)
 │   └── main.tsx          # Entry point
 │
 ├── index.html
 ├── vite.config.ts
 └── package.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/jordirofu/product-management-frontend.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Author

Developed by **Jordi Romero**.