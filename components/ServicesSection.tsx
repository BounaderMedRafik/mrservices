"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  Sparkles,
  HeartHandshake,
  Star,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProfessionals, Professional } from "@/lib/mockData";
import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateReservation } from "@/hooks/useCreateReservation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceType = "food" | "cleaning" | "medical" | null;
export const services = [
  {
    id: "food",
    icon: UtensilsCrossed,
    title: "خدمات الطبخ",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    categories: [
      "وجبات صحية منزلية عادية",
      "وجبات مخصصة للمرضى",
      "وجبات صحية للأمهات الحوامل وبعد الولادة",
      "تدريب على الطهي الصحي المنزلي",
      "خدمة الطبخ للمناسبات الصغيرة",
    ],
  },
  {
    id: "cleaning",
    icon: Sparkles,
    title: "خدمات التنظيف",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    categories: [
      "تنظيم المنزل",
      "تنظيف متخصص",
      "تعقيم وتطهير الغرف بعد العودة من المستشفى",
      "تنظيف شخصي للمرضى والمسنين",
      "تنظيف وتعقيم",
    ],
  },
  {
    id: "medical",
    icon: HeartHandshake,
    title: "خدمات المرافقة الصحية",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    categories: [
      "مرافقة المسنين",
      "مرافقة المرضى",
      "مرافقة الأمهات حديثي الولادة",
      "مرافقة الأطفال",
      "تحاليل في المنزل",
      "علاج طبيعي",
      "علاج نفسي",
      "استشارات طبية",
      "التذكير بالمواعيد الطبية والأدوية",
      "نقل المرضى للمستشفى عند الحاجة",
      "أعمال ترفيهية (مثل التنزه)",
      "مرافقة المعاقين وذوي الاحتياجات الخاصة",
    ],
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const [ccp, setCCP] = useState("");

  const handleServiceClick = (serviceType: ServiceType) => {
    setSelectedService(selectedService === serviceType ? null : serviceType);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (category: string) => {
    setSelectedSubCategory(category);
  };

  const filteredProfessionals = selectedSubCategory
    ? mockProfessionals.filter((prof) => prof.category === selectedSubCategory)
    : [];

  const { user } = useUser();
  const { createReservation, loading, error } = useCreateReservation();

  const [location, setLocation] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [extrainfos, setExtraInfos] = useState("");
  const [payoption, setPayOption] = useState("نقدا");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);

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
    };

    const result = await createReservation(
      //@ts-ignore
      newReservation
    );
    if (result) {
      setSuccess(true);
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من مجموعتنا الواسعة من الخدمات المهنية المصممة لتلبية احتياجاتك
          </p>
        </div>

        {/* Service Icons */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;

            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                }`}
                onClick={() => handleServiceClick(service.id as ServiceType)}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`${service.color} ${service.hoverColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sub-categories */}
        {selectedService && (
          <div className="mb-12 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                اختر فئة لـ{" "}
                {services.find((s) => s.id === selectedService)?.title}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services
                  .find((s) => s.id === selectedService)
                  ?.categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedSubCategory === category ? "default" : "outline"
                      }
                      className="h-12 text-sm font-medium"
                      onClick={() => handleSubCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Professional Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card
              key={professional.id}
              className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute top-2 left-2 bg-white/75 backdrop-blur-md rounded-md overflow-hidden shadow-md">
                  <img className="w-12 p-2" src="/logo-couleur.svg" alt="" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-right flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {professional.name}
                    </h4>
                    <p className="text-gray-600">{professional.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center mb-2 justify-end">
                  <span className="mr-2 text-sm text-gray-600">
                    {professional.rating} ({professional.reviews} مراجعات)
                  </span>
                  <div className="flex flex-row-reverse">
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
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2 justify-end">
                  {professional.location}
                  <MapPin className="h-4 w-4 ml-1 mr-0" />
                </div>

                <div className="flex flex-wrap gap-1 mb-4 justify-end">
                  {professional.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
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
                                  onChange={(e) => setTime(e.target.value)}
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
                                  onChange={(e) => setPhoneNum(e.target.value)}
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
                                  onChange={(e) => setLocation(e.target.value)}
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
                                    <SelectItem value="نقدا">نقدا</SelectItem>
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
                                    onChange={(e) => setCCP(e.target.value)}
                                  />
                                </div>
                              )}

                              {/* Pricing Breakdown */}
                              <div className="border rounded-md p-4 bg-gray-50 space-y-2 text-sm text-right">
                                <div className="flex justify-between">
                                  <span>سعر الحجز:</span>
                                  <span>{professional.price * 100} دج</span>
                                </div>

                                <div className="flex justify-between font-semibold text-gray-900">
                                  <span>السعر الإجمالي:</span>
                                  <span>{professional.price * 100} دج</span>
                                </div>
                              </div>

                              <Button
                                disabled={loading}
                                onClick={() => handleSubmit(professional)}
                              >
                                {loading ? "جاري الحجز..." : "تأكيد الحجز"}
                              </Button>

                              {error && (
                                <p className="text-red-500 text-sm">{error}</p>
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
                                شكراً لك على استخدام منصتنا. سنقوم بالتواصل معك
                                قريباً.
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
      </div>
    </section>
  );
}
