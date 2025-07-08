"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";

import {
  CheckCircle,
  MapPin,
  Phone,
  Search,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";

import { locations, mockProfessionals, Professional } from "@/lib/mockData";
import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { Textarea } from "./ui/textarea";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();
  const { createReservation, loading, error } = useCreateReservation();

  const [location, setLocation] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [extrainfos, setExtraInfos] = useState("");
  const [payoption, setPayOption] = useState("نقدا");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [ccp, setCCP] = useState("");

  console.log(JSON.stringify(user?.unsafeMetadata?.role));

  const handleSubmit = async (professional: Professional) => {
    if (!user || !time || !phonenum || !location) return;

    const newReservation = {
      professsionalid: professional.id,
      userid: user.id,
      time: new Date(time),
      extrainfos,
      location,
      phonenum,
      prixtotal: professional.price * 100,
      payoption,
      status: "waiting",
    };

    const result = await createReservation(newReservation);
    if (result) {
      setSuccess(true);
    }
  };

  const filteredProfessionals = useMemo(() => {
    return mockProfessionals.filter((pro) => {
      const matchesQuery =
        pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesLocation = selectedLocation
        ? pro.location === selectedLocation
        : true;

      return matchesQuery && matchesLocation;
    });
  }, [searchQuery, selectedLocation]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* خلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          ابحث عن خدمات
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            منزلية متكاملة{" "}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-xl mx-auto">
          تواصل مع محترفين موثوقين في المرافقة الصحية،الطبخ والتنظيف بالقرب منك
          وبكل سهولة{" "}
        </p>

        {/* شريط البحث */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8">
          <div className="flex-col flex items-center md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="ابحث عن خدمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 w-full text-lg"
              />
            </div>
            <div className="md:w-64 w-full">
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12">
                  <MapPin className="h-4 w-4 ml-2 text-gray-400" />
                  <SelectValue placeholder="اختر الموقع" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* الزر للبحث */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <div className="flex items-center gap-2">
                    بحث <Search size={13} />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>نتائج البحث</DialogTitle>
                </DialogHeader>

                {filteredProfessionals.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
                    {filteredProfessionals.map((professional) => (
                      <Card
                        key={professional.id}
                        className="hover:shadow-lg transition-shadow duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4 gap-10">
                            <img
                              src={professional.image}
                              alt={professional.name}
                              className="w-16 h-16 rounded-full object-cover ml-4"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {professional.name}
                              </h4>
                              <p className="text-gray-600">
                                {professional.specialty}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < professional.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="mr-2 text-sm text-gray-600">
                              {professional.rating} ({professional.reviews}{" "}
                              تقييم)
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 ml-1" />
                            {professional.location}
                          </div>

                          {/* <div className="flex items-center text-sm text-gray-600 mb-4">
                            <span className="font-semibold text-green-600">
                              ${professional.price}/ساعة
                            </span>
                          </div> */}

                          <div className="flex flex-wrap gap-1 mb-4">
                            {professional.skills.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <SignedIn>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="flex-1" size="sm">
                                    احجز الآن
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogTitle className="hidden" />
                                  {/* Professional Info */}
                                  {!success ? (
                                    <>
                                      <div className="flex items-center gap-4 text-right mb-4">
                                        <img
                                          src={professional.image}
                                          alt={professional.name}
                                          className="w-16 h-16 rounded-full object-cover border"
                                        />
                                        <div className="flex-1">
                                          <h4 className="text-lg font-semibold text-gray-900">
                                            {professional.name}
                                          </h4>
                                          <p className="text-sm text-gray-600">
                                            {professional.specialty}
                                          </p>
                                          <div className="flex items-center text-sm text-gray-500 mt-1 justify-end">
                                            <MapPin className="h-4 w-4 ml-1" />
                                            {professional.location}
                                          </div>
                                          <div className="flex items-center justify-end mt-1 text-sm text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                              <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                  i < professional.rating
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                }`}
                                              />
                                            ))}
                                            <span className="ml-2 text-gray-600 text-xs">
                                              ({professional.reviews} مراجعات)
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Form Fields */}
                                      <div className="space-y-4 text-right">
                                        {/* Fields... */}
                                        {/* (keep all your inputs here as you have them) */}

                                        <div>
                                          <label className="block mb-1 text-sm text-gray-700">
                                            تاريخ ووقت الحجز
                                          </label>
                                          <Input
                                            type="datetime-local"
                                            className="w-full"
                                            value={time}
                                            onChange={(e) =>
                                              setTime(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div>
                                          <label className="block mb-1 text-sm text-gray-700">
                                            رقم الهاتف
                                          </label>
                                          <Input
                                            type="text"
                                            placeholder="رقم الهاتف"
                                            value={phonenum}
                                            onChange={(e) =>
                                              setPhoneNum(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div>
                                          <label className="block mb-1 text-sm text-gray-700">
                                            الموقع
                                          </label>
                                          <Input
                                            type="text"
                                            placeholder="الموقع"
                                            value={location}
                                            onChange={(e) =>
                                              setLocation(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div>
                                          <label className="block mb-1 text-sm text-gray-700">
                                            ملاحظات إضافية
                                          </label>
                                          <Textarea
                                            placeholder="ملاحظات إضافية"
                                            value={extrainfos}
                                            onChange={(e) =>
                                              setExtraInfos(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div>
                                          <label className="block mb-1 text-sm text-gray-700">
                                            طريقة الدفع
                                          </label>
                                          <Select
                                            value={payoption}
                                            onValueChange={setPayOption}
                                          >
                                            <SelectTrigger className="w-full">
                                              <SelectValue placeholder="اختر طريقة الدفع" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="نقدا">
                                                نقدا
                                              </SelectItem>
                                              <SelectItem value="تحويل بريدي">
                                                تحويل بريدي
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        {payoption === "تحويل بريدي" && (
                                          <div>
                                            <label className="block mb-1 text-sm text-gray-700">
                                              رقم CCP
                                            </label>
                                            <Input
                                              type="text"
                                              placeholder="رقم الحساب البريدي"
                                              value={ccp}
                                              onChange={(e) =>
                                                setCCP(e.target.value)
                                              }
                                            />
                                          </div>
                                        )}

                                        {/* Pricing Breakdown */}
                                        <div className="border rounded-md p-4 bg-gray-50 space-y-2 text-sm text-right">
                                          <div className="flex justify-between">
                                            <span>سعر الحجز:</span>
                                            <span>
                                              {professional.price * 100} دج
                                            </span>
                                          </div>

                                          <div className="flex justify-between font-semibold text-gray-900">
                                            <span>السعر الإجمالي:</span>
                                            <span>
                                              {professional.price * 100} دج
                                            </span>
                                          </div>
                                        </div>

                                        <Button
                                          disabled={loading}
                                          onClick={() =>
                                            handleSubmit(professional)
                                          }
                                        >
                                          {loading
                                            ? "جاري الحجز..."
                                            : "تأكيد الحجز"}
                                        </Button>

                                        {error && (
                                          <p className="text-red-500 text-sm">
                                            {error}
                                          </p>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="text-center py-10">
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                          تم الحجز بنجاح!
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                          شكراً لك على استخدام منصتنا. سنقوم
                                          بالتواصل معك قريباً.
                                        </p>
                                        <DialogClose asChild>
                                          <Button
                                            onClick={() => {
                                              setLocation("");
                                              setPhoneNum("");
                                              setExtraInfos("");
                                              setPayOption("");
                                              setTime("");
                                              setSuccess(false);
                                            }}
                                          >
                                            إغلاق
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </SignedIn>

                          <SignedOut>
                            <div className="flex gap-2">
                              <SignUpButton mode="modal">
                                <Button className="flex-1" size="sm">
                                  احجز الآن
                                </Button>
                              </SignUpButton>
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </SignedOut>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic text-center mt-4">
                    لم يتم العثور على أي محترف.
                  </p>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* التسجيل */}
          <SignedOut>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-500">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 group-hover:bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Users className="h-8 w-8 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    التسجيل
                  </h3>
                  <p className="text-gray-600 mb-4">
                    احجز خدمات من محترفين موثوقين بسهولة
                  </p>
                  <SignUpButton
                    mode="modal"
                    unsafeMetadata={{
                      userType: "normal",
                    }}
                  >
                    <Button className="w-full" variant="outline">
                      ابدأ الآن
                    </Button>
                  </SignUpButton>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-teal-500">
                <CardContent className="p-6 text-center">
                  <div className="bg-teal-100 group-hover:bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Stethoscope className="h-8 w-8 text-teal-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    التسجيل كمحترف
                  </h3>
                  <p className="text-gray-600 mb-4">
                    انضم إلى شبكتنا ووسّع عملك
                  </p>
                  <SignUpButton
                    mode="modal"
                    unsafeMetadata={{
                      userType: "pro",
                    }}
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      انضم الآن
                    </Button>
                  </SignUpButton>
                </CardContent>
              </Card>
            </div>
          </SignedOut>
        </div>
      </div>
    </section>
  );
}
