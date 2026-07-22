# 🌿 Eila Eco Pencils — Sustainable E-Commerce Platform

A production-ready, full-stack e-commerce web application built for **Eila Eco Pencils**, promoting 100% tree-free plantable seed pencils and recycled newspaper stationery across India.

Designed according to the complete specification docs in [`/docs`](file:///c:/Projects/eila/docs) and optimized for 100% free unified deployment on **Vercel** with **Supabase PostgreSQL** and **Razorpay Payments**.

---

## 📄 Documentation Traceability Matrix

This codebase fully implements and satisfies all requirements from the 8 official specification documents:

1. [01_Eila_Eco_Pencils_Vision_Document.pdf](file:///c:/Projects/eila/docs/01_Eila_Eco_Pencils_Vision_Document.pdf) — Core vision, eco objectives & success criteria.
2. [02_Eila_Eco_Pencils_PRD.pdf](file:///c:/Projects/eila/docs/02_Eila_Eco_Pencils_PRD.pdf) — Functional requirements, customer/admin journeys & business rules.
3. [03_Eila_Eco_Pencils_TRD.pdf](file:///c:/Projects/eila/docs/03_Eila_Eco_Pencils_TRD.pdf) — High-level architecture, payment flow & security specifications.
4. [04_Eila_Eco_Pencils_Database_Design_Document.pdf](file:///c:/Projects/eila/docs/04_Eila_Eco_Pencils_Database_Design_Document.pdf) — 3NF PostgreSQL database design & RLS policies in [`/supabase/schema.sql`](file:///c:/Projects/eila/supabase/schema.sql).
5. [05_Eila_Eco_Pencils_API_Documentation.pdf](file:///c:/Projects/eila/docs/05_Eila_Eco_Pencils_API_Documentation.pdf) — REST API endpoints (`/api/v1/products`, `/api/v1/payment/*`, `/api/v1/inquiry`).
6. [06_Eila_Eco_Pencils_UI_UX_Design_Specification.pdf](file:///c:/Projects/eila/docs/06_Eila_Eco_Pencils_UI_UX_Design_Specification.pdf) — Design system, color tokens, typography & component library.
7. [07_Eila_Eco_Pencils_Testing_Documentation.pdf](file:///c:/Projects/eila/docs/07_Eila_Eco_Pencils_Testing_Documentation.pdf) — Functional test cases, Razorpay sandbox testing, and acceptance verification.
8. [09_Eila_Eco_Pencils_Application_Flow_Document.pdf](file:///c:/Projects/eila/docs/09_Eila_Eco_Pencils_Application_Flow_Document.pdf) — End-to-end customer, admin & inventory workflows.

---

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Lucide Icons, Outfit + Inter Google Fonts.
* **Backend:** Vercel Serverless API Routes (`/api/*`).
* **Database & Auth:** Supabase PostgreSQL (RLS enabled), Supabase Auth.
* **Payments:** Razorpay (INR payments, UPI, NetBanking, Cards) with HMAC-SHA256 signature verification.
* **Messaging:** Instant WhatsApp Order Receipt confirmation generator.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase & Razorpay credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

NEXT_PUBLIC_COMPANY_WHATSAPP=919876543210
```

### 3. Database Migration
Run the contents of [`supabase/schema.sql`](file:///c:/Projects/eila/supabase/schema.sql) in your Supabase SQL Editor to create tables, indexes, seed data, and Row Level Security policies.

### 4. Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API Endpoint Catalog

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Retrieve active eco products catalog |
| `GET` | `/api/v1/categories` | Retrieve eco stationery categories |
| `POST` | `/api/v1/payment/create-order` | Create server-side Razorpay order |
| `POST` | `/api/v1/payment/verify` | Verify Razorpay HMAC signature & persist order |
| `POST` | `/api/v1/inquiry` | Submit corporate & school bulk quote request |

---

## 📦 Production Build & Validation

To test the production build locally:
```bash
npm run build
npm run start
```
