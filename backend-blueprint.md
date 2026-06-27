# Doctor Booking Backend Blueprint

## 1. Recommended Project Structure

You currently have:

- `doctor-booking-ui/` -> frontend Next.js UI

Recommended backend setup:

- `doctor-booking-ui/` -> frontend repo/folder
- `doctor-booking-backend/` -> backend repo/folder

Best practice:

1. Keep frontend and backend separate.
2. Use a separate folder locally right beside the frontend.
3. If your team wants cleaner deployment and ownership, use a separate Git repository for backend too.

Suggested workspace layout:

```text
C:\Dev_Weekend_Week_1
  ├── doctor-booking-ui
  └── doctor-booking-backend
```

## 2. Is the Current Frontend Only UI?

Yes, from the current codebase this is mainly UI plus mock data.

The frontend currently has:

- pages and dashboard screens
- local TypeScript types
- mock users, doctors, appointments, payments
- no real backend integration yet

That means:

1. The frontend is ready for API integration.
2. Real actions like login, booking, payments, reviews, availability, and dashboard counts should come from backend APIs.
3. The mock data files will later be replaced by API calls.

## 3. Backend Tech Stack

Recommended stack:

- `NestJS` -> backend framework
- `PostgreSQL` -> main database
- `Prisma` -> ORM and schema management
- `JWT` -> authentication
- `bcrypt` -> password hashing
- `class-validator` and `class-transformer` -> DTO validation
- `Swagger` -> API documentation
- `Passport` -> auth guards and strategies

Optional later:

- `Redis` -> caching / OTP / queue support
- `Cloudinary` or `S3` -> file uploads
- `Stripe` or another gateway -> card payments
- `BullMQ` -> background jobs and reminders

## 4. Main Business Modules Needed

Based on the frontend screens, these backend modules are needed:

1. `auth`
2. `users`
3. `patients`
4. `doctors`
5. `specialties`
6. `clinics`
7. `availability`
8. `appointments`
9. `payments`
10. `reviews`
11. `medical-records`
12. `admin`
13. `reports`
14. `notifications` (optional first phase, useful later)
15. `uploads` (optional first phase if profile image/files are needed)

## 5. Core Roles

Use these roles:

- `ADMIN`
- `DOCTOR`
- `PATIENT`

Permissions:

- `PATIENT` can register, login, browse doctors, book appointments, cancel own appointments, review doctors, manage profile, view payments, view medical records allowed to them.
- `DOCTOR` can manage profile, set availability, view appointments, add notes, see patients assigned through appointments, view earnings, access reviews.
- `ADMIN` can manage users, doctors, clinics, specialties, payments, reports, reviews, appointments, settings.

## 6. Database Models

Recommended Prisma entities for phase 1:

### User

Shared login and identity table.

Fields:

- `id`
- `name`
- `email`
- `passwordHash`
- `phone`
- `role`
- `avatarUrl`
- `location`
- `status`
- `createdAt`
- `updatedAt`

### PatientProfile

Fields:

- `id`
- `userId`
- `dateOfBirth`
- `gender`
- `bloodGroup`
- `address`
- `emergencyContactName`
- `emergencyContactPhone`
- `createdAt`
- `updatedAt`

### DoctorProfile

Fields:

- `id`
- `userId`
- `specialtyId`
- `clinicId`
- `licenseNumber`
- `experienceYears`
- `consultationFee`
- `about`
- `ratingAverage`
- `reviewsCount`
- `isVerified`
- `createdAt`
- `updatedAt`

### Specialty

Fields:

- `id`
- `name`
- `description`
- `isActive`
- `createdAt`
- `updatedAt`

### Clinic

Fields:

- `id`
- `name`
- `address`
- `city`
- `state`
- `country`
- `phone`
- `email`
- `isActive`
- `createdAt`
- `updatedAt`

### DoctorAvailability

Fields:

- `id`
- `doctorId`
- `dayOfWeek`
- `startTime`
- `endTime`
- `slotDurationMinutes`
- `isActive`
- `createdAt`
- `updatedAt`

### Appointment

Fields:

- `id`
- `patientId`
- `doctorId`
- `clinicId`
- `appointmentDate`
- `startTime`
- `endTime`
- `type` -> `IN_PERSON | VIDEO`
- `status` -> `PENDING | CONFIRMED | COMPLETED | CANCELLED | RESCHEDULED`
- `reason`
- `notes`
- `paymentStatus` -> `UNPAID | PAID | REFUNDED`
- `createdAt`
- `updatedAt`

### Payment

Fields:

- `id`
- `appointmentId`
- `amount`
- `currency`
- `method` -> `CARD | INSURANCE | WALLET | CASH`
- `status` -> `PENDING | PAID | FAILED | REFUNDED`
- `transactionRef`
- `paidAt`
- `createdAt`
- `updatedAt`

### Review

Fields:

- `id`
- `appointmentId`
- `doctorId`
- `patientId`
- `rating`
- `comment`
- `createdAt`
- `updatedAt`

### MedicalRecord

Fields:

- `id`
- `patientId`
- `doctorId`
- `appointmentId`
- `title`
- `description`
- `fileUrl`
- `recordDate`
- `createdAt`
- `updatedAt`

### DoctorEducation

Fields:

- `id`
- `doctorId`
- `institution`
- `degree`
- `yearCompleted`

### DoctorLanguage

Fields:

- `id`
- `doctorId`
- `language`

### DoctorTag

Fields:

- `id`
- `doctorId`
- `label`

## 7. Suggested Prisma Enums

```prisma
enum UserRole {
  ADMIN
  DOCTOR
  PATIENT
}

enum UserStatus {
  ACTIVE
  INACTIVE
  PENDING
}

enum AppointmentType {
  IN_PERSON
  VIDEO
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  RESCHEDULED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CARD
  INSURANCE
  WALLET
  CASH
}
```

## 8. Backend Folder Structure

Recommended NestJS structure:

```text
doctor-booking-backend/
  ├── src/
  │   ├── main.ts
  │   ├── app.module.ts
  │   ├── common/
  │   │   ├── decorators/
  │   │   ├── dto/
  │   │   ├── enums/
  │   │   ├── filters/
  │   │   ├── guards/
  │   │   ├── interceptors/
  │   │   ├── pipes/
  │   │   └── utils/
  │   ├── config/
  │   │   ├── configuration.ts
  │   │   └── env.validation.ts
  │   ├── prisma/
  │   │   ├── prisma.module.ts
  │   │   └── prisma.service.ts
  │   ├── modules/
  │   │   ├── auth/
  │   │   ├── users/
  │   │   ├── patients/
  │   │   ├── doctors/
  │   │   ├── specialties/
  │   │   ├── clinics/
  │   │   ├── availability/
  │   │   ├── appointments/
  │   │   ├── payments/
  │   │   ├── reviews/
  │   │   ├── medical-records/
  │   │   ├── admin/
  │   │   ├── reports/
  │   │   └── notifications/
  │   └── shared/
  │       ├── constants/
  │       ├── interfaces/
  │       └── types/
  ├── prisma/
  │   ├── schema.prisma
  │   ├── migrations/
  │   └── seed.ts
  ├── test/
  ├── .env
  ├── .env.example
  ├── package.json
  ├── tsconfig.json
  └── README.md
```

## 9. API Endpoints Needed

### Auth

- `POST /auth/register/patient`
- `POST /auth/register/doctor`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me`

### Users

- `GET /users/:id`
- `PATCH /users/:id`
- `PATCH /users/:id/status`

### Doctors

- `GET /doctors`
- `GET /doctors/:id`
- `PATCH /doctors/:id`
- `GET /doctors/:id/reviews`
- `GET /doctors/:id/availability`
- `POST /doctors/:id/availability`
- `PATCH /doctors/:id/availability/:availabilityId`
- `DELETE /doctors/:id/availability/:availabilityId`

### Specialties

- `GET /specialties`
- `POST /specialties`
- `PATCH /specialties/:id`
- `DELETE /specialties/:id`

### Clinics

- `GET /clinics`
- `POST /clinics`
- `PATCH /clinics/:id`
- `DELETE /clinics/:id`

### Appointments

- `GET /appointments`
- `GET /appointments/:id`
- `POST /appointments`
- `PATCH /appointments/:id`
- `PATCH /appointments/:id/cancel`
- `PATCH /appointments/:id/reschedule`
- `PATCH /appointments/:id/confirm`
- `PATCH /appointments/:id/complete`

### Payments

- `GET /payments`
- `GET /payments/:id`
- `POST /payments`
- `PATCH /payments/:id/status`

### Reviews

- `GET /reviews`
- `POST /reviews`
- `DELETE /reviews/:id`

### Medical Records

- `GET /medical-records`
- `GET /medical-records/:id`
- `POST /medical-records`
- `PATCH /medical-records/:id`
- `DELETE /medical-records/:id`

### Admin Dashboards / Reports

- `GET /admin/dashboard`
- `GET /admin/doctors`
- `GET /admin/patients`
- `GET /admin/appointments`
- `GET /admin/payments`
- `GET /admin/reviews`
- `GET /reports/revenue`
- `GET /reports/appointments`

## 10. Frontend Screen to Backend Mapping

Map the current UI to backend APIs like this:

- `auth/login`, `auth/register`, `auth/forgot-password` -> Auth APIs
- `doctors` listing and `doctors/[id]` -> Doctors APIs
- `patient/book` -> Doctors availability + Appointments create API
- `patient/appointments` -> Patient appointments API
- `patient/profile` -> User + patient profile APIs
- `patient/medical-records` -> Medical records API
- `doctor/dashboard` -> Doctor dashboard aggregate API
- `doctor/appointments` -> Doctor appointments API
- `doctor/availability` -> Availability API
- `doctor/patients` -> doctor filtered patient list from appointments/records
- `doctor/earnings` -> doctor payments aggregate API
- `admin/dashboard` -> admin summary API
- `admin/doctors`, `admin/patients`, `admin/appointments`, `admin/payments`, `admin/reviews`, `admin/clinics`, `admin/specialties` -> admin CRUD APIs

## 11. Order of Development

Build backend in this order:

### Phase 1: Project Setup

1. Create NestJS app
2. Install Prisma and PostgreSQL support
3. Configure env, Prisma service, validation, Swagger
4. Create base schema and first migration

### Phase 2: Identity and Access

1. User model
2. Auth module
3. JWT login
4. Roles guard
5. Patient and doctor registration

### Phase 3: Master Data

1. Specialties
2. Clinics
3. Doctor profiles
4. Patient profiles

### Phase 4: Booking Flow

1. Doctor availability
2. Doctor listing with filters
3. Appointment creation
4. Appointment status management

### Phase 5: Business Extensions

1. Payments
2. Reviews
3. Medical records
4. Dashboard stats
5. Reports

### Phase 6: Production Readiness

1. Error handling
2. Authorization checks
3. Logging
4. Pagination/filtering/sorting
5. Seed data
6. Tests
7. Deployment

## 12. Integration Flow With Frontend

Recommended frontend integration order:

1. Replace auth mock flow with real login/register API
2. Replace doctors list and details with real doctor APIs
3. Replace availability selector with live doctor slots
4. Replace booking form with appointment create API
5. Replace patient appointments page with real appointments API
6. Replace doctor dashboard and appointments page
7. Replace admin pages one by one
8. Replace payments, reviews, medical records last if needed

Important:

- Do not try to integrate every screen at once.
- Build and integrate one feature vertically.
- Example vertical slice:
  - backend doctor list API
  - frontend fetch doctor list
  - doctor detail API
  - booking API

## 13. Example Feature Flow: Book Appointment

This is the real app flow:

1. Patient logs in.
2. Frontend calls `GET /doctors` and `GET /doctors/:id`.
3. Frontend calls `GET /doctors/:id/availability`.
4. Patient selects slot and submits booking form.
5. Frontend calls `POST /appointments`.
6. Backend validates slot, doctor, patient, and conflict rules.
7. Backend creates appointment in PostgreSQL.
8. Backend returns created appointment.
9. Frontend updates patient appointment list.
10. Payment can be created immediately or later depending on business rules.

## 14. DTO Examples You Will Need

Examples:

- `LoginDto`
- `RegisterPatientDto`
- `RegisterDoctorDto`
- `CreateDoctorDto`
- `UpdateDoctorDto`
- `CreateClinicDto`
- `CreateSpecialtyDto`
- `CreateAvailabilityDto`
- `CreateAppointmentDto`
- `UpdateAppointmentStatusDto`
- `CreatePaymentDto`
- `CreateReviewDto`
- `CreateMedicalRecordDto`

## 15. Real Backend Rules To Enforce

Important validations:

1. Email must be unique.
2. Doctor and patient must exist before appointment creation.
3. Appointment slot must not overlap an existing confirmed booking.
4. Review should only be allowed after completed appointment.
5. Only admin can manage specialties and clinics.
6. Only doctor owner or admin can update doctor availability.
7. Only appointment owner, assigned doctor, or admin can view sensitive appointment details.
8. Medical records should be protected carefully.

## 16. Suggested Initial Prisma Schema Direction

You do not need to keep every frontend field in one table.

Better mapping:

- `User` stores identity and auth data
- `DoctorProfile` stores doctor-specific data
- `PatientProfile` stores patient-specific data
- `Review` stores comments and ratings
- `DoctorEducation`, `DoctorLanguage`, and `DoctorTag` normalize repeatable fields

This keeps the backend cleaner than copying frontend mock shapes directly.

## 17. Environment Variables

Recommended `.env.example`:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doctor_booking_db?schema=public"
JWT_ACCESS_SECRET=change_me_access
JWT_REFRESH_SECRET=change_me_refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

## 18. Suggested Commands To Create Backend

```powershell
cd C:\Dev_Weekend_Week_1
npx @nestjs/cli new doctor-booking-backend
cd doctor-booking-backend
npm install @nestjs/config @nestjs/swagger swagger-ui-express class-validator class-transformer @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install @prisma/client
npm install -D prisma @types/passport-jwt @types/bcrypt
npx prisma init
```

## 19. Recommended First Deliverable

Do this first before full feature work:

1. Scaffold backend
2. Configure PostgreSQL and Prisma
3. Add auth module
4. Add users, doctors, specialties, clinics, availability, appointments modules
5. Write schema and migrations
6. Seed demo data
7. Test booking flow with Swagger/Postman

If this works, frontend integration becomes much easier.

## 20. Ready-to-Use Codex Prompt

Use this prompt when you want Codex to scaffold the backend in a new folder:

```text
Create a new NestJS backend in a folder named doctor-booking-backend beside the existing doctor-booking-ui project.

Tech stack:
- NestJS
- PostgreSQL
- Prisma
- JWT auth
- Swagger
- class-validator

Project requirements:
- Separate modules for auth, users, patients, doctors, specialties, clinics, availability, appointments, payments, reviews, medical-records, admin, and reports
- PostgreSQL database with Prisma schema
- Roles: ADMIN, DOCTOR, PATIENT
- Auth with register/login/me/refresh endpoints
- CRUD for doctors, specialties, clinics
- Doctor availability management
- Appointment booking flow with slot conflict validation
- Payments and reviews basic support
- Medical records basic CRUD
- Swagger documentation
- DTO validation
- Prisma service and module
- Seed file with sample admin, doctor, patient, specialty, clinic, and appointment data

Implementation expectations:
- Use clean NestJS module structure
- Put reusable guards/decorators/utilities in common/
- Use Prisma for all data access
- Add enums for role, appointment status, payment status, and payment method
- Add .env.example
- Add a README with local setup instructions
- Keep the code production-minded and integration-ready for the existing doctor-booking-ui frontend

Please implement the project step by step:
1. scaffold base app
2. configure Prisma and PostgreSQL
3. create schema and migrations
4. create auth and user modules
5. create doctors/specialties/clinics modules
6. create availability and appointments modules
7. create payments/reviews/medical-records/admin/report modules
8. add seed data
9. add Swagger and setup documentation
```

## 21. Final Recommendation

Yes, the current frontend is mostly UI, and the real application behavior should now move into backend APIs.

Best path:

1. Create `doctor-booking-backend/` as a separate folder.
2. Build the backend end to end there.
3. Keep the frontend and backend decoupled.
4. Integrate one module at a time starting from auth, doctors, and appointments.

Once that base is ready, the UI you already built can become a real working product.
