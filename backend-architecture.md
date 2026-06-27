# Doctor Booking Backend Architecture

## 1. Purpose

This document defines the end-to-end backend architecture for the doctor booking platform before implementation starts.

It is designed for:

- `NestJS` as the backend framework
- `PostgreSQL` as the database
- `Prisma` as the ORM
- `Swagger` for API documentation

This architecture should be used for the separate backend project:

```text
C:\Dev_Weekend_Week_1\doctor-booking-backend
```

## 2. Recommended Repo Layout

Recommended local structure:

```text
C:\Dev_Weekend_Week_1
  ├── doctor-booking-ui
  ├── backend-blueprint.md
  ├── backend-architecture.md
  └── doctor-booking-backend
```

Recommendation:

- keep frontend and backend separate
- backend should be created in `doctor-booking-backend`
- backend can be its own Git repo

## 3. Architecture Goals

The backend should provide:

1. secure authentication and authorization
2. doctor, patient, clinic, and specialty management
3. appointment booking and scheduling
4. payment and review support
5. medical record support
6. admin reporting and dashboard APIs
7. clean Swagger documentation for all endpoints

## 4. High-Level Architecture

```text
Next.js Frontend
      |
      v
NestJS REST API
      |
      v
Service Layer
      |
      v
Prisma ORM
      |
      v
PostgreSQL
```

Supporting layers:

- JWT authentication
- role-based authorization
- DTO validation
- exception filters
- request logging
- Swagger API docs

## 5. Main Backend Layers

### Presentation Layer

This is the controller layer in NestJS.

Responsibilities:

- receive HTTP requests
- validate request DTOs
- call services
- return response DTOs
- expose Swagger metadata

### Application Layer

This is the service layer.

Responsibilities:

- business rules
- booking validation
- role checks
- orchestration across modules

### Data Access Layer

This is Prisma.

Responsibilities:

- database reads and writes
- transactions
- relation loading
- data mapping

### Infrastructure Layer

Responsibilities:

- environment config
- database connection
- authentication strategies
- file upload integrations later
- notifications later

## 6. NestJS Project Structure

Recommended structure:

```text
doctor-booking-backend/
  ├── src/
  │   ├── main.ts
  │   ├── app.module.ts
  │   ├── common/
  │   │   ├── decorators/
  │   │   ├── dto/
  │   │   ├── enums/
  │   │   ├── exceptions/
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
  │   └── modules/
  │       ├── auth/
  │       ├── users/
  │       ├── patients/
  │       ├── doctors/
  │       ├── specialties/
  │       ├── clinics/
  │       ├── availability/
  │       ├── appointments/
  │       ├── payments/
  │       ├── reviews/
  │       ├── medical-records/
  │       ├── admin/
  │       └── reports/
  ├── prisma/
  │   ├── schema.prisma
  │   ├── migrations/
  │   └── seed.ts
  ├── test/
  ├── .env
  ├── .env.example
  ├── package.json
  └── README.md
```

## 7. Core Modules

### Auth Module

Responsibilities:

- register patient
- register doctor
- login
- refresh token
- forgot password
- reset password
- current user profile

### Users Module

Responsibilities:

- base user record
- profile update
- account status update

### Patients Module

Responsibilities:

- patient profile CRUD
- patient-specific data access

### Doctors Module

Responsibilities:

- doctor profile CRUD
- doctor listing
- doctor details
- doctor filters

### Specialties Module

Responsibilities:

- specialty CRUD

### Clinics Module

Responsibilities:

- clinic CRUD

### Availability Module

Responsibilities:

- manage doctor schedules
- expose available booking slots

### Appointments Module

Responsibilities:

- create booking
- view appointments
- cancel appointment
- reschedule appointment
- confirm appointment
- complete appointment

### Payments Module

Responsibilities:

- record payment
- update payment status
- payment history

### Reviews Module

Responsibilities:

- create review
- list reviews
- enforce review rules

### Medical Records Module

Responsibilities:

- create records
- access control for sensitive data

### Admin Module

Responsibilities:

- dashboard summary
- user management
- doctor management
- appointment management
- payment oversight

### Reports Module

Responsibilities:

- revenue summaries
- appointment statistics
- doctor performance reports

## 8. Database Architecture

PostgreSQL will be the primary relational database.

Prisma will manage:

- schema definition
- migrations
- queries
- relations
- seed data

Recommended main tables:

1. `users`
2. `patient_profiles`
3. `doctor_profiles`
4. `specialties`
5. `clinics`
6. `doctor_availabilities`
7. `appointments`
8. `payments`
9. `reviews`
10. `medical_records`
11. `doctor_educations`
12. `doctor_languages`
13. `doctor_tags`

## 9. Authentication Architecture

Recommended auth stack:

- `@nestjs/jwt`
- `passport`
- `passport-jwt`
- `bcrypt`

Flow:

1. user registers
2. password is hashed with bcrypt
3. login validates email and password
4. backend issues access token and refresh token
5. protected routes use JWT guard
6. role guard checks `ADMIN`, `DOCTOR`, `PATIENT`

## 10. Authorization Model

Use role-based access control.

Roles:

- `ADMIN`
- `DOCTOR`
- `PATIENT`

Examples:

- only admin can manage clinics and specialties
- only doctor owner or admin can manage doctor availability
- only patient owner, assigned doctor, or admin can access certain appointment details
- only eligible patient can create review for completed appointment

## 11. Validation Architecture

Use:

- `class-validator`
- `class-transformer`
- NestJS global validation pipe

Rules:

- validate all request bodies
- validate route params and query params where needed
- reject unexpected payload fields
- transform primitives from query strings where needed

Recommended global validation settings:

- `whitelist: true`
- `forbidNonWhitelisted: true`
- `transform: true`

## 12. Error Handling Architecture

Recommended:

- global exception filter
- consistent error response shape
- Prisma error mapping

Suggested response shape:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": ["email must be valid"],
  "timestamp": "2026-06-26T00:00:00.000Z",
  "path": "/auth/register/patient"
}
```

## 13. Swagger Architecture

Swagger should be enabled from the first backend version.

Purpose:

- frontend-backend contract clarity
- easier manual testing
- faster onboarding
- DTO and auth visibility

### Swagger Setup Requirements

Use:

- `@nestjs/swagger`
- `swagger-ui-express`

Setup in `main.ts` should include:

1. API title
2. API description
3. API version
4. bearer auth support
5. Swagger route such as `/docs`

### What Every Module Should Expose in Swagger

Controllers should document:

- route summary
- auth requirement
- role requirement
- request DTO
- response DTO
- error responses

Use decorators such as:

- `@ApiTags`
- `@ApiOperation`
- `@ApiBearerAuth`
- `@ApiResponse`
- `@ApiCreatedResponse`
- `@ApiBadRequestResponse`
- `@ApiUnauthorizedResponse`
- `@ApiForbiddenResponse`

### Suggested Swagger Grouping

- `Auth`
- `Users`
- `Patients`
- `Doctors`
- `Specialties`
- `Clinics`
- `Availability`
- `Appointments`
- `Payments`
- `Reviews`
- `Medical Records`
- `Admin`
- `Reports`

### Swagger Deliverable Standard

Before frontend integration of any module:

1. endpoint should exist
2. DTO validation should work
3. Swagger docs should show payload and response
4. endpoint should be testable from Swagger UI

## 14. API Design Standards

Use REST APIs.

Recommended standards:

- plural resources where appropriate
- clear action routes only when needed
- pagination for list endpoints
- filtering through query params
- standardized response shapes if desired

Examples:

- `GET /doctors`
- `GET /doctors/:id`
- `POST /appointments`
- `PATCH /appointments/:id/cancel`

## 15. Booking Architecture

Appointment booking is the most important business flow.

Flow:

1. patient fetches doctor list
2. patient opens doctor details
3. patient fetches doctor availability
4. patient selects date and slot
5. patient submits booking request
6. backend validates doctor, patient, clinic, and slot
7. backend checks overlap/conflict
8. backend creates appointment
9. backend updates payment status as needed

Required rules:

- no overlapping confirmed bookings
- only active doctors should be bookable
- only active clinics should be selectable if clinic-based
- review allowed only after completed appointment

## 16. Reporting Architecture

Reports should be read-focused APIs.

Examples:

- appointments by date range
- revenue by date range
- doctor earnings summary
- admin dashboard totals

These APIs can use aggregate Prisma queries and optimized SQL later if needed.

## 17. Security Architecture

Security requirements:

- hash passwords with bcrypt
- never return password hashes
- protect all non-public routes with JWT
- apply role guard for sensitive modules
- validate and sanitize input
- store secrets in environment variables
- enable CORS only for frontend origin

## 18. Environment and Config

Use `@nestjs/config`.

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
SWAGGER_PATH=docs
```

## 19. Development Sequence

Recommended implementation sequence:

1. create `doctor-booking-backend`
2. setup NestJS base project
3. configure PostgreSQL and Prisma
4. add config module and env validation
5. add Swagger setup
6. add auth and users
7. add specialties and clinics
8. add doctors and patients
9. add availability and appointments
10. add payments and reviews
11. add medical records
12. add admin dashboards and reports
13. add seed data
14. add tests

## 20. Frontend Integration Sequence

Frontend should consume backend in small slices:

1. auth
2. doctors list
3. doctor detail
4. doctor availability
5. appointment booking
6. patient appointments
7. doctor dashboard
8. admin modules

This avoids large integration issues.

## 21. Definition of Done for Backend Phase 1

Phase 1 backend is complete when:

1. NestJS project exists in `doctor-booking-backend`
2. PostgreSQL is connected
3. Prisma schema and migrations are working
4. Swagger docs are available
5. auth works with JWT
6. doctor list/details/availability work
7. appointment booking works
8. seed data is available

## 22. Immediate Next Step

The first implementation step should be:

1. create the NestJS project in `doctor-booking-backend`
2. configure Prisma and PostgreSQL
3. enable Swagger in `main.ts`
4. build auth module first

Until then, this document and `backend-blueprint.md` are the architecture references for backend development.
