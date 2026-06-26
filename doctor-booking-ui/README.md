# MediFlow Doctor Booking UI

MediFlow is a complete frontend UI prototype for a Doctor Booking Management System built with Next.js App Router, TypeScript, Tailwind CSS, and reusable component patterns.

This repository is intentionally frontend-only.

- No backend logic
- No real API integration
- No database connection
- Mock data only

The project focuses on complete screen coverage, reusable UI structure, and clean healthcare SaaS UX.

## Overview

MediFlow is designed around three core user roles plus the public marketing and discovery experience:

- Patients can browse doctors, book appointments, manage records, and leave reviews
- Doctors can manage appointments, availability, patients, and consultation notes
- Admins can manage platform operations, doctors, clinics, specialties, payments, and reports

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React
- Radix UI primitives
- Local mock data

## UI Scope

### Public Pages

- Home page
- Doctors listing page
- Doctor detail page
- Login page
- Register page
- Forgot password page

### Patient Pages

- Patient dashboard
- Book appointment stepper
- My appointments
- Appointment detail
- Patient profile
- Medical records
- Reviews

### Doctor Pages

- Doctor dashboard
- Doctor profile
- Availability management
- Doctor appointments
- Appointment detail and consultation notes
- Patients list
- Earnings

### Admin Pages

- Admin dashboard
- Doctors management
- Patients management
- Appointments management
- Specialties management
- Clinics management
- Payments
- Reviews
- Reports
- Settings

## Reusable Components

The app is built around reusable components inside `src/components`.

Included component groups:

- `layout`: navbar, sidebar, app shell
- `common`: page headers, filters, badges, pagination, modal, empty state
- `dashboard`: stats cards and management overview blocks
- `doctors`: doctor cards
- `appointments`: appointment cards
- `forms`: stepper, date picker field, time slot selector, file upload UI
- `tables`: data table
- `ui`: button, card, input, textarea, avatar, badge

## Folder Structure

```text
src/
  app/
    admin/
    auth/
    doctor/
    doctors/
    patient/
    globals.css
    layout.tsx
    page.tsx
  components/
    appointments/
    common/
    dashboard/
    doctors/
    forms/
    layout/
    tables/
    ui/
  data/
    mock-appointments.ts
    mock-doctors.ts
    mock-payments.ts
    mock-specialties.ts
    mock-users.ts
  lib/
    navigation.ts
    utils.ts
  types/
    appointment.ts
    doctor.ts
    payment.ts
    user.ts
```

## Main Routes

### Public

- `/`
- `/doctors`
- `/doctors/[id]`
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`

### Patient

- `/patient/dashboard`
- `/patient/book`
- `/patient/appointments`
- `/patient/appointments/[id]`
- `/patient/profile`
- `/patient/medical-records`
- `/patient/reviews`

### Doctor

- `/doctor/dashboard`
- `/doctor/profile`
- `/doctor/availability`
- `/doctor/appointments`
- `/doctor/appointments/[id]`
- `/doctor/patients`
- `/doctor/earnings`

### Admin

- `/admin/dashboard`
- `/admin/doctors`
- `/admin/patients`
- `/admin/appointments`
- `/admin/specialties`
- `/admin/clinics`
- `/admin/payments`
- `/admin/reviews`
- `/admin/reports`
- `/admin/settings`

## Mock Data

All current screens are powered by local mock data from `src/data`.

Current mock datasets include:

- doctors
- appointments
- users
- specialties
- payments

This makes the UI fully explorable without waiting for backend services.

## Design Notes

The interface follows a clean medical SaaS direction:

- white and soft-tinted surfaces
- blue and green accent colors
- rounded cards and controls
- subtle shadows
- responsive dashboard layouts
- reusable role-based shells

## File Upload UI

The upload area is implemented as a frontend interaction component.

Current behavior:

- browse files with file picker
- drag and drop support
- accepts PDF, JPG, JPEG, and PNG
- frontend validation for unsupported file types
- selected file preview list
- remove selected files

It does not upload to a real server yet.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Quality Checks

The project has been verified with:

```bash
npm run lint
npm run build
```

Both pass successfully.

## Backend Handoff Notes

This codebase is ready for future backend integration. Several screens include `TODO` comments where real API connections should be added later.

Likely backend integration points:

- authentication
- doctor search and filters
- appointment booking submission
- appointment cancellation and rescheduling
- consultation note persistence
- profile updates
- medical file upload
- review submission
- payments
- admin settings and reporting

## Current Limitations

- data is not persisted
- actions are dummy or UI-only
- no auth enforcement exists yet
- no server-side validation exists yet
- no production backend workflows are implemented

## Suggested Next Steps

1. Connect authentication and role-aware routing
2. Replace mock datasets with API-backed queries
3. Add form validation and submission handling
4. Persist appointment and consultation flows
5. Add upload API integration for medical records
6. Add analytics and charting with real report data
7. Add automated tests for routes and shared components

## Repository Note

If Git was initialized from `C:\Dev_Weekend_Week_1`, this app lives inside the `doctor-booking-ui` subfolder. Keep that in mind when pushing, structuring branches, or publishing the repository.
