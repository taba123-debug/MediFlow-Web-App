import Image from "next/image";
import Link from "next/link";
import { BriefcaseMedical, MapPin, Star } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="h-48 w-full bg-slate-100">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            {doctor.tags.map((tag) => (
              <Badge key={tag} variant="blue">
                {tag}
              </Badge>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-950">{doctor.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{doctor.specialty}</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-500">
            <p className="flex items-center gap-2">
              <BriefcaseMedical className="h-4 w-4 text-sky-600" />
              {doctor.experience} years experience
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-600" />
              {doctor.clinic}, {doctor.location}
            </p>
            <p className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {doctor.rating} ({doctor.reviewsCount} reviews)
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Consultation fee</p>
              <p className="text-2xl font-semibold text-slate-950">${doctor.fee}</p>
            </div>
            <Link href={`/doctors/${doctor.id}`}>
              <Button>View Profile</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
