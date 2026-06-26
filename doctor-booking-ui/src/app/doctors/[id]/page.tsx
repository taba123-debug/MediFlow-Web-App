import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Globe, MapPin, Medal, Star } from "lucide-react";
import { doctors } from "@/data/mock-doctors";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RatingStars } from "@/components/common/rating-stars";
import { formatDate } from "@/lib/utils";

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((item) => item.id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container-shell space-y-8 py-10">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-6 p-0 md:grid-cols-[280px_1fr]">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={800}
                height={1000}
                className="h-full min-h-80 w-full object-cover"
              />
              <div className="space-y-6 p-8">
                <div className="flex flex-wrap gap-2">
                  {doctor.tags.map((tag) => (
                    <Badge key={tag} variant="blue">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <h1 className="text-4xl font-semibold text-slate-950">{doctor.name}</h1>
                  <p className="mt-2 text-lg text-slate-500">{doctor.specialty}</p>
                </div>
                <div className="grid gap-4 text-sm text-slate-500 md:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    {doctor.clinic}, {doctor.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-sky-600" />
                    {doctor.experience} years experience
                  </p>
                  <p className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {doctor.rating} average rating
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-sky-600" />
                    {doctor.languages.join(", ")}
                  </p>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-slate-600">{doctor.about}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
                Book now
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Consultation fee ${doctor.fee}
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 text-sm text-slate-500">
                {doctor.availability.map((day) => (
                  <div key={day.day} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{day.day}</p>
                    <p className="mt-2">{day.slots.join("  •  ")}</p>
                  </div>
                ))}
              </div>
              <Link href="/patient/book" className="block">
                <Button className="w-full">
                  <Calendar className="h-4 w-4" />
                  Continue to booking
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Start video consultation
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-slate-950">Education & highlights</h2>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Education
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    {doctor.education.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Focus areas
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    {doctor.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-slate-950">Patient reviews</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {doctor.reviews.map((review) => (
                  <div key={`${review.patientName}-${review.date}`} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{review.patientName}</p>
                        <p className="text-sm text-slate-500">{formatDate(review.date)}</p>
                      </div>
                      <RatingStars rating={review.rating} />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card className="h-fit">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-slate-950">Why patients choose {doctor.name.split(" ")[1]}</h2>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              <p>Fast booking experience with clear availability and trusted reviews.</p>
              <p>Consistent digital follow-up plans and clean consultation summaries.</p>
              <p>Professional communication with a focus on clarity and patient comfort.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
