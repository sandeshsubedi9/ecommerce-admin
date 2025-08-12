# E-Commerce Admin 🛍️📊

A full-featured admin panel for managing multiple online stores, products, categories, orders, and real-time sales analytics.

---

## 🏪 Connected Storefront

- There is a E-Commerce store a **separate Next.js project** connected to this admin dashboard via API routes.  
- All products, categories, billboards, and other data created in the admin panel are automatically displayed in the storefront.  
- This allows the admin dashboard to fully manage and update the live store without manual changes in the store project.

---

## 🚀 Live Demo
(ctlr + click to open link in new tab)  
- Admin Dashbaord: https://ecommerce-admin-horizon.vercel.app  
- Ecommerce Store: https://ecommerce-store-horizon.vercel.app

---

## 📌 Features

- **Multi-store Management**
  - Create and manage multiple stores
  - Navigate to each store’s dedicated admin dashboard

- **Product Management**
  - Add, edit, and delete products
  - Assign billboard, category, size, and color to products
  - Paginated product list (10 per page, fetch remaining on demand)

- **Order Tracking**
  - View placed and paid orders from the frontend store
  - Track available stock in real-time

- **Analytics**
  - Overview dashboard showing total sales revenue in bar graph
  - Stock and sales insights

- **Billboards & Categories**
  - Create and manage billboards for promotions
  - Manage product categories, sizes, and colors

- **API Routes**
  - Public GET endpoints
  - Admin-only POST & DELETE endpoints for products, stores, billboards, categories, etc.

## 🛠 Tech Stack

- Next.js  
- React  
- Prisma  
- Neon Database  
- shadcn/ui  
- Cloudinary (Image storage)
- Clerk (Authentication)

---

