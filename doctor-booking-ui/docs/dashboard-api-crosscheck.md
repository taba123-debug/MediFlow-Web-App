# Dashboard API Cross-Check

This document maps each dashboard widget in the UI to the backend API that can supply it today.

The goal is to answer two questions clearly:

1. Which dashboard items already match a real backend response?
2. Which items still need backend support or a frontend-derived calculation?

## Current frontend dashboard files

- `src/app/patient/dashboard/page.tsx`
- `src/app/doctor/dashboard/page.tsx`
- `src/app/admin/dashboard/page.tsx`

## Backend source checked

- `../doctor-booking-backend/API_REFERENCE.md`
- `../doctor-booking-backend/src/modules/auth/auth.service.ts`
- `../doctor-booking-backend/src/modules/appointments/appointments.service.ts`
- `../doctor-booking-backend/src/modules/doctors/doctors.service.ts`
- `../doctor-booking-backend/src/modules/medical-records/medical-records.service.ts`
- `../doctor-booking-backend/src/modules/notifications/notifications.service.ts`
- `../doctor-booking-backend/src/modules/payments/payments.service.ts`
- `../doctor-booking-backend/src/modules/admin/admin.service.ts`

## Summary

- `GET /admin/dashboard` already exists and is the only dedicated dashboard endpoint.
- Patient dashboard data must be composed from existing endpoints.
- Doctor dashboard data must also be composed from existing endpoints.
- Some current UI cards do not have a true backend source yet.

## Patient dashboard

### Header

- UI need: `Good afternoon, Sarah`
- Backend API: `GET /auth/me`
- Auth: protected
- Exact field: `response.name`
- Status: covered

Example backend shape:

```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "PATIENT",
  "patientProfile": {},
  "doctorProfile": null,
  "notifications": []
}
```

### Upcoming appointments card

- UI need: count of upcoming patient appointments
- Backend API: `GET /appointments`
- Auth: protected, patient-scoped automatically by backend
- Suggested query: `/appointments?page=1&limit=100&sortOrder=asc`
- Exact response source:
  - `response.data[].appointmentDate`
  - `response.data[].status`
  - `response.meta.total`
- Frontend rule needed:
  - count only future appointments
  - exclude `CANCELLED`, likely exclude `COMPLETED`
- Status: covered, but requires frontend filtering because backend has no dedicated `upcomingCount`

Example response item fields already returned by backend:

```json
{
  "id": "appointment-id",
  "status": "CONFIRMED",
  "appointmentDate": "2026-06-30T00:00:00.000Z",
  "scheduledStartAt": "2026-06-30T09:00:00.000Z",
  "scheduledEndAt": "2026-06-30T09:30:00.000Z",
  "reason": "Fever and headache",
  "consultationType": "CLINIC_VISIT",
  "patient": {
    "user": {
      "name": "John Doe"
    }
  },
  "doctor": {
    "user": {
      "name": "Dr Ali"
    },
    "specialty": {
      "name": "Cardiology"
    },
    "clinic": {
      "name": "City Hospital"
    }
  },
  "clinic": {},
  "timeSlot": {},
  "payment": {},
  "review": {}
}
```

### Average wait time card

- UI need: `15 min`
- Backend API: none
- Closest existing data: `scheduledStartAt`, `scheduledEndAt` on appointments
- Problem: backend does not store actual check-in time, actual start time, or queue wait time
- Status: backend gap

### Medical records card

- UI need: total patient records
- Backend API: `GET /medical-records`
- Auth: protected, patient-scoped automatically by backend
- Suggested query: `/medical-records?page=1&limit=1`
- Exact field: `response.meta.total`
- Status: covered

Example response shape:

```json
{
  "data": [
    {
      "id": "record-id",
      "title": "Blood Test",
      "recordDate": "2026-06-27T00:00:00.000Z",
      "patient": {
        "user": {
          "name": "John Doe"
        }
      },
      "doctor": {
        "user": {
          "name": "Dr Ali"
        }
      },
      "appointment": {}
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 1,
    "totalPages": 12
  }
}
```

### Unread messages card

- UI need: unread doctor or system messages
- Backend API available today: `GET /notifications?isRead=false`
- Auth: protected
- Exact field: `response.meta.total`
- Important note: backend module is notifications, not chat/messages
- Status: partial match

What matches:

- unread count can come from notifications

What does not match:

- there is no conversation or message thread endpoint
- label should probably become `Unread notifications` unless backend adds messaging

### Upcoming appointment list

- UI need: list cards under the stats area
- Backend API: `GET /appointments`
- Suggested query: `/appointments?page=1&limit=2&sortOrder=asc`
- Exact response fields needed from each item:
  - `id`
  - `reason`
  - `status`
  - `appointmentDate`
  - `scheduledStartAt`
  - `consultationType`
  - `doctor.user.name`
  - `doctor.specialty.name`
  - `clinic.name` or `doctor.clinic.name`
- Status: covered

Frontend transform needed because current UI type is different:

- `status`: backend uppercase enum to current lowercase badge values
- `appointmentDate` + `scheduledStartAt`: format into current `date` and `time`
- `consultationType`: map `CLINIC_VISIT` / `ONLINE_CONSULTATION` into `In-person` / `Video`

### Recommended doctors

- UI need: doctor recommendation list
- Backend API: `GET /doctors`
- Auth: public
- Suggested query: `/doctors?page=1&limit=3`
- Exact response fields:
  - `response.data[].id`
  - `response.data[].user.name`
  - `response.data[].specialty.name`
  - `response.data[].about`
- Status: covered for a simple list, but not truly personalized

What is missing for real recommendations:

- no recommendation endpoint
- no patient preference/history scoring
- current backend can only provide a general doctor list

## Doctor dashboard

### Header

- UI need: `Practice pulse for today`
- Backend API: optional `GET /auth/me` if doctor name/profile should be shown
- Status: optional, current static text is acceptable

### Today appointments card

- UI need: number of appointments for today
- Backend API: `GET /appointments?date=YYYY-MM-DD`
- Auth: protected, doctor-scoped automatically by backend
- Exact field: `response.meta.total`
- Status: covered

### Patients waiting card

- UI need: live queue count
- Backend API: none dedicated
- Closest source: `GET /appointments?date=YYYY-MM-DD`
- Possible derived fallback:
  - count `PENDING` or `CONFIRMED` appointments for today whose slot time is still upcoming
- Problem: backend does not expose check-in / arrived / in-queue state
- Status: backend gap for an exact queue

### Avg consultation card

- UI need: average consultation duration
- Backend API: none dedicated
- Closest source: `scheduledStartAt`, `scheduledEndAt`
- Possible fallback:
  - average scheduled slot duration
- Problem:
  - this is not actual consultation duration
- Status: backend gap for a true metric

### This month earnings card

- UI need: doctor earnings aggregate
- Backend API available today: `GET /payments?status=PAID`
- Auth: protected, doctor-scoped automatically by backend
- Exact source fields:
  - `response.data[].amount`
  - `response.data[].status`
  - `response.meta.total`
- Frontend rule needed:
  - filter current month by `paidAt` if returned in payment item
- Status: partially covered

Important gap:

- there is no dedicated doctor earnings summary endpoint
- there is no doctor report endpoint like admin revenue reports

### Doctor appointment list

- UI need: dashboard appointment cards
- Backend API: `GET /appointments`
- Auth: protected, doctor-scoped automatically by backend
- Suggested query: `/appointments?page=1&limit=3&sortOrder=asc`
- Exact response fields needed:
  - `id`
  - `reason`
  - `status`
  - `appointmentDate`
  - `scheduledStartAt`
  - `consultationType`
  - `patient.user.name`
  - `doctor.specialty.name`
  - `clinic.name`
- Status: covered

Important UI mismatch:

- current `AppointmentCard` expects `doctorName`
- doctor dashboard should display `patient.user.name` instead, or use a doctor-specific card variant

## Admin dashboard

### High-level stats cards

Current UI cards:

- Monthly bookings
- Registered patients
- Partner clinics
- Gross payments

Actual backend dashboard endpoint:

- `GET /admin/dashboard`

Exact response:

```json
{
  "usersCount": 0,
  "doctorsCount": 0,
  "patientsCount": 0,
  "appointmentsCount": 0,
  "pendingAppointments": 0,
  "completedAppointments": 0,
  "paidPayments": 0,
  "unreadNotifications": 0
}
```

Cross-check:

- `Registered patients` -> use `patientsCount` -> covered
- `Monthly bookings` -> not exact, because backend returns total all-time `appointmentsCount` only -> gap
- `Partner clinics` -> not in admin dashboard response; can be derived from `GET /clinics` and `meta.total` -> partial
- `Gross payments` -> not in admin dashboard response; can be derived from `GET /reports/revenue` -> partial

### Operations notes

- UI need: narrative operational insights
- Backend API: none
- Status: backend gap

## End-to-end API plan by dashboard

### Patient dashboard request plan

1. `GET /auth/me`
2. `GET /appointments?page=1&limit=2&sortOrder=asc`
3. `GET /medical-records?page=1&limit=1`
4. `GET /notifications?isRead=false&page=1&limit=1`
5. `GET /doctors?page=1&limit=3`

### Doctor dashboard request plan

1. `GET /auth/me`
2. `GET /appointments?date=YYYY-MM-DD&page=1&limit=3&sortOrder=asc`
3. `GET /payments?status=PAID&page=1&limit=100`

### Admin dashboard request plan

1. `GET /admin/dashboard`
2. `GET /clinics?page=1&limit=1`
3. `GET /reports/revenue?from=YYYY-MM-01&to=YYYY-MM-DD`

## Exact backend gaps to raise with backend team

These are the items that cannot be matched exactly today:

- patient average wait time
- patient unread messages as true chat/messages
- patient personalized doctor recommendations
- doctor live waiting queue
- doctor average actual consultation duration
- doctor monthly earnings summary endpoint
- admin monthly bookings count
- admin partner clinics count inside `GET /admin/dashboard`
- admin gross payments total inside `GET /admin/dashboard`
- admin operations notes or insight summaries

## Recommended backend additions

Best option for stable frontend integration:

- add `GET /patient/dashboard`
- add `GET /doctor/dashboard`
- expand `GET /admin/dashboard`

Suggested shapes:

```json
{
  "greetingName": "John Doe",
  "stats": {
    "upcomingAppointments": 3,
    "medicalRecords": 12,
    "unreadNotifications": 4
  },
  "appointments": [],
  "recommendedDoctors": []
}
```

```json
{
  "stats": {
    "todayAppointments": 8,
    "patientsWaiting": 3,
    "monthEarnings": 8400
  },
  "appointments": []
}
```

```json
{
  "usersCount": 0,
  "doctorsCount": 0,
  "patientsCount": 0,
  "appointmentsCount": 0,
  "monthlyBookings": 0,
  "clinicsCount": 0,
  "grossRevenue": 0,
  "pendingAppointments": 0,
  "completedAppointments": 0,
  "paidPayments": 0,
  "unreadNotifications": 0
}
```
