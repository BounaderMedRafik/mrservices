"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Globe,
  Menu,
  TriangleAlert,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { ProfessionalMetadata } from "@/lib/mockData";
import { useReservationsByProfessional } from "@/hooks/useReservationsByProfessional";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { useReservationsByUser } from "@/hooks/useReservationsByUser";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useSendJobRequest } from "@/hooks/useSendJOB";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { services } from "./ServicesSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const professionalMeta = user?.unsafeMetadata as ProfessionalMetadata;
  const { reservations, loading, error } = useReservationsByProfessional(
    //@ts-ignore
    user?.unsafeMetadata?.id || null
  );
  const {
    reservations: userReservations,
    loading: userLoading,
    error: userErrors,
  } = useReservationsByUser(user?.id || null);

  const handleUpdateReservationStatus = async (
    uuid: string,
    newStatus: string
  ) => {
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("uuid", uuid);

    if (error) {
      alert("فشل تحديث الحالة");
      console.error(error);
    } else {
      toast(`تم ${newStatus === "accepted" ? "قبول" : "رفض"} الحجز`);
      // You may optionally re-fetch reservations here if needed
    }
  };

  const handleCertificateUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("certs")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error.message);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("certs")
      .getPublicUrl(fileName);

    setForm((prev) => ({ ...prev, certificate: publicUrl.publicUrl }));
  };

  const [form, setForm] = useState({
    specialty: "",
    category: "",
    price: 0,
    location: "",
    skills: "",
    description: "",
    phonenum: "",
    certificate: "",
  });
  const selectedService = services.find((s) => s.id === form.category);

  const {
    sendRequest,
    loading: JOBloading,
    error: JOBerror,
    success,
  } = useSendJobRequest();
  console.log(JOBerror);

  const handleSubmit = async () => {
    if (!user?.id) return;

    await sendRequest({
      userid: user.id,
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
      price: Number(form.price),
    });

    if (success) {
      setForm({
        specialty: "",
        category: "",
        price: 0,
        location: "",
        skills: "",
        description: "",
        phonenum: "",
        certificate: "",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="w-10" src="/logo-couleur.svg" alt="الشعار" />
          </div>

          {/* Desktop Navigation */}
          <SignedOut>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                الخدمات
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                الميزات
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                من نحن
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                تواصل معنا
              </a>
            </div>
          </SignedOut>
          {/* Right side - Language & Menu */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size={"sm"}>
                  <div className="flex items-center gap-2">
                    <ArrowLeft size={13} /> تسجيل الدخول
                  </div>
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <div className=" ">
                <DropdownMenu dir="rtl">
                  <DropdownMenuTrigger asChild>
                    <Button
                      className=" rounded-full bg-primary/10 text-foreground hover:bg-primary/20"
                      size={"icon"}
                    >
                      <Menu size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <div className="flex items-center justify-between gap-7">
                        <div>خيارات</div>
                        <div>
                          {user?.unsafeMetadata?.role == "pro" ? (
                            <Badge>محترف</Badge>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {professionalMeta?.role === "pro" && (
                        <>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              معلومات المحترف
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="w-64 p-4 text-right space-y-2 text-sm">
                                {professionalMeta?.image && (
                                  <div className="flex justify-center">
                                    <img
                                      src={professionalMeta.image}
                                      alt="Professional"
                                      className="w-full h-16  rounded-md object-cover border"
                                    />
                                  </div>
                                )}

                                <div>
                                  <span className="font-semibold">
                                    الاختصاص:
                                  </span>{" "}
                                  {professionalMeta.specialty}
                                </div>

                                <div>
                                  <span className="font-semibold">الفئة:</span>{" "}
                                  {professionalMeta.category}
                                </div>

                                <div>
                                  <span className="font-semibold">الموقع:</span>{" "}
                                  {professionalMeta.location}
                                </div>

                                <div>
                                  <span className="font-semibold">السعر:</span>{" "}
                                  {
                                    //@ts-ignore
                                    professionalMeta.price * 100
                                  }{" "}
                                  دج
                                </div>

                                <div>
                                  <span className="font-semibold">
                                    التقييم:
                                  </span>{" "}
                                  ⭐ {professionalMeta.rating} (
                                  {professionalMeta.reviews} مراجعة)
                                </div>

                                {Array.isArray(professionalMeta.skills) && (
                                  <div>
                                    <span className="font-semibold">
                                      المهارات:
                                    </span>
                                    <ul className="list-disc list-inside text-xs mt-1 text-gray-700">
                                      {professionalMeta.skills.map(
                                        (skill, i) => (
                                          <li key={i}>{skill}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                                {professionalMeta.description && (
                                  <div>
                                    <span className="font-semibold">
                                      الوصف:
                                    </span>
                                    <p className="text-xs mt-1 text-gray-600">
                                      {professionalMeta.description}
                                    </p>
                                  </div>
                                )}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              الزبائن
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="w-64 p-2 text-right space-y-1 text-sm max-h-96 overflow-y-auto">
                                {loading && (
                                  <p className="text-gray-500 text-sm">
                                    جاري التحميل...
                                  </p>
                                )}
                                {error && (
                                  <p className="text-red-500 text-sm">
                                    حدث خطأ: {error}
                                  </p>
                                )}
                                {reservations.length === 0 && !loading && (
                                  <p className="text-gray-500 text-sm">
                                    لا توجد حجوزات حالياً.
                                  </p>
                                )}

                                {reservations.map((res) => (
                                  <DropdownMenuSub key={res.uuid}>
                                    <DropdownMenuSubTrigger className="w-full flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 text-sm">
                                      <span className="truncate">
                                        <span className="font-semibold">
                                          📍
                                        </span>{" "}
                                        {res.location}
                                      </span>
                                    </DropdownMenuSubTrigger>

                                    <DropdownMenuPortal>
                                      <DropdownMenuSubContent className="w-72 p-3 space-y-2 text-sm text-right">
                                        <div>
                                          <span className="font-semibold">
                                            الوقت:
                                          </span>{" "}
                                          <span
                                            dir="ltr"
                                            className="inline-block"
                                          >
                                            {new Date(
                                              res.time
                                            ).toLocaleString()}
                                          </span>
                                        </div>

                                        <div>
                                          <span className="font-semibold">
                                            الهاتف:
                                          </span>{" "}
                                          <span
                                            dir="ltr"
                                            className="inline-block"
                                          >
                                            {res.phonenum}
                                          </span>
                                        </div>

                                        <div>
                                          <span className="font-semibold">
                                            الموقع:
                                          </span>{" "}
                                          {res.location}
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <span className="font-semibold">
                                            الحالة:
                                          </span>
                                          {res.status === "accepted" && (
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                                              مقبول
                                            </span>
                                          )}
                                          {res.status === "rejected" && (
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                                              مرفوض
                                            </span>
                                          )}
                                          {res.status === "waiting" && (
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                                              قيد الانتظار
                                            </span>
                                          )}
                                        </div>

                                        {res.extrainfos && (
                                          <div>
                                            <span className="font-semibold">
                                              ملاحظات:
                                            </span>
                                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                                              {res.extrainfos}
                                            </p>
                                          </div>
                                        )}

                                        {res.status == "waiting" && (
                                          <div className="flex items-center gap-2 w-full pt-2">
                                            <Button
                                              size="sm"
                                              className="bg-green-500 w-full hover:bg-green-600 text-white"
                                              onClick={() =>
                                                handleUpdateReservationStatus(
                                                  res.uuid,
                                                  "accepted"
                                                )
                                              }
                                            >
                                              قبول
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="destructive"
                                              className="w-full"
                                              onClick={() =>
                                                handleUpdateReservationStatus(
                                                  res.uuid,
                                                  "rejected"
                                                )
                                              }
                                            >
                                              رفض
                                            </Button>
                                          </div>
                                        )}
                                      </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                  </DropdownMenuSub>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                        </>
                      )}

                      {/* Pro request */}

                      {/* Notifications */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          الاشعارات
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-44 space-y-2 text-right max-h-96 overflow-y-auto">
                            {userLoading && (
                              <p className="text-sm text-gray-500">
                                جاري تحميل الاشعارات...
                              </p>
                            )}
                            {userErrors && (
                              <p className="text-sm text-red-500">
                                حدث خطأ أثناء جلب الاشعارات: {userErrors}
                              </p>
                            )}
                            {userReservations.length === 0 && !userLoading && (
                              <p className="text-sm text-gray-500">
                                لا توجد اشعارات حالياً.
                              </p>
                            )}

                            {userReservations.map((res) => (
                              <DropdownMenuItem
                                key={res.uuid}
                                className="flex flex-col items-end text-right space-y-1"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-sm font-medium text-gray-900">
                                    {res.status === "accepted"
                                      ? "تم تأكيد الحجز"
                                      : res.status === "rejected"
                                      ? "تم رفض الحجز"
                                      : "حجزك قيد الانتظار"}
                                  </span>
                                  <div>
                                    {res.status === "accepted" && (
                                      <CheckCircle className="text-green-600" />
                                    )}
                                    {res.status === "rejected" && (
                                      <XCircle className="text-red-600" />
                                    )}
                                    {res.status === "waiting" && (
                                      <Clock className="text-yellow-500" />
                                    )}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {res.status === "accepted" &&
                                    `تم تأكيد حجزك مع مقدم الخدمة في ${res.location}`}
                                  {res.status === "rejected" &&
                                    `تم رفض الحجز مع مقدم الخدمة في ${res.location}`}
                                  {res.status === "waiting" &&
                                    `طلب الحجز في ${res.location} ما زال قيد الانتظار.`}
                                  <br />
                                  ليوم{" "}
                                  {new Date(res.time).toLocaleDateString(
                                    "ar-DZ",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                  على الساعة{" "}
                                  {new Date(res.time).toLocaleTimeString(
                                    "ar-DZ",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      {/* Reminders */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>منبه</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className=" w-44">
                            <DropdownMenuItem className="flex flex-col items-end text-right space-y-1">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium text-gray-900">
                                  تذكير بالحجز
                                </span>
                                <div>
                                  <Clock className="text-yellow-500" />
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">
                                تبقّى يومان فقط على موعدك مع المرافقة الصحية
                                زينب يوم الأحد الساعة 10:00 صباحاً.
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      {/* Dropdown item that opens the dialog */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="bg-red-50 border border-red-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 text-red-500">
                          <div className="flex items-center justify-between w-full">
                            <div>زر الطوارئ</div>
                            <TriangleAlert size={14} />
                          </div>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuSubContent className="w-64 p-4 text-right space-y-2">
                          <div className="text-red-600 font-semibold text-sm">
                            🚨 حالة طوارئ
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            تم تفعيل وضع الطوارئ. اتبع التعليمات التالية بسرعة:
                          </p>

                          <div className="space-y-1 text-xs">
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>🚒 الحماية المدنية:</span>
                                <span className="font-bold text-red-600">
                                  14
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>🚓 الشرطة الوطنية:</span>
                                <span className="font-bold text-red-600">
                                  17
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>👮‍♂️ الدرك الوطني:</span>
                                <span className="font-bold text-red-600">
                                  1055
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>📞 استعلامات:</span>
                                <span className="font-bold text-red-600">
                                  12
                                </span>
                              </div>
                            </div>

                            <DropdownMenuSeparator />
                            <div className="flex justify-between">
                              <span>📍 شارك موقعك:</span>
                              <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                افتح الخريطة
                              </a>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>💬 دعم فني:</span>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="text-blue-600 underline cursor-pointer">
                                    صفحة المساعدة
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="text-right" dir="rtl">
                                  <DialogTitle className="text-lg font-bold text-gray-800">
                                    الدعم الفني
                                  </DialogTitle>
                                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                    إذا كنت تواجه مشكلة تقنية أو لديك استفسار،
                                    يمكنك التواصل معنا عبر:
                                  </p>
                                  <ul className="mt-4 text-sm space-y-1">
                                    <li>
                                      📧 البريد الإلكتروني:{" "}
                                      <span className="font-semibold text-gray-700">
                                        mrs.services.36@gmail.com
                                      </span>
                                    </li>
                                    <li>
                                      📱 واتساب:{" "}
                                      <span
                                        dir="ltr"
                                        className="font-semibold text-gray-700"
                                      >
                                        +213 6 78 56 34 12
                                      </span>
                                    </li>
                                    <li>
                                      💬 مركز المساعدة:{" "}
                                      <a
                                        target="_blank"
                                        href="https://www.facebook.com/share/1AfnkmjCwh/?mibextid=wwXIfr"
                                        className="text-blue-600 underline"
                                      >
                                        فتح صفحة الدعم
                                      </a>
                                    </li>
                                  </ul>
                                  <div className="mt-4 text-xs text-gray-500">
                                    نحن هنا لمساعدتك على مدار الساعة في الحالات
                                    الحرجة.
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>

                          <div className="pt-2 border-t mt-2 text-xs text-gray-500">
                            تنبيه: استخدام هذا الزر مخصص للحالات الحرجة فقط.
                          </div>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="text-right">
                          <DialogTitle className="text-red-600 text-lg">
                            🚨 حالة طوارئ
                          </DialogTitle>
                          <p className="mt-2 text-sm text-gray-700">
                            تم تفعيل زر الطوارئ. يرجى اتباع التعليمات التالية أو
                            التواصل مع الدعم فوراً.
                          </p>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm">
                              📞 رقم الطوارئ:{" "}
                              <span className="font-bold text-red-600">
                                112
                              </span>
                            </p>
                            <p className="text-sm">
                              💬 تواصل مع الدعم عبر{" "}
                              <a
                                href="/support"
                                className="text-blue-600 underline"
                              >
                                صفحة المساعدة
                              </a>
                            </p>
                          </div>

                          <div className="mt-6 flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                alert("تم إرسال إشعار إلى فريق الدعم.");
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              إرسال إشعار
                            </button>
                            <button
                              onClick={() => setOpen(false)}
                              className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                              إغلاق
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* request pro */}
                      {user?.unsafeMetadata?.role !== "pro" && (
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            💼 طلب احتراف
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="w-96 p-2 space-y-2 text-right">
                            {/* Category Select */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                الفئة
                              </label>
                              <Select
                                onValueChange={(value) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    category: value,
                                    specialty: "",
                                  }))
                                }
                                value={form.category}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الفئة" />
                                </SelectTrigger>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem
                                      key={service.id}
                                      value={service.id}
                                    >
                                      {service.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Specialty Select */}
                            {form.category && (
                              <div>
                                <label className="block mb-1 text-sm text-gray-700">
                                  التخصص
                                </label>
                                <Select
                                  onValueChange={(value) =>
                                    setForm((prev) => ({
                                      ...prev,
                                      specialty: value,
                                    }))
                                  }
                                  value={form.specialty}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر التخصص" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {selectedService?.categories.map(
                                      (item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {/* Phone Number */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                رقم الهاتف
                              </label>
                              <Input
                                placeholder="رقم الهاتف"
                                value={form.phonenum}
                                onChange={(e) =>
                                  setForm({ ...form, phonenum: e.target.value })
                                }
                              />
                            </div>

                            {/* Price */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                السعر المقترح بالدينار
                              </label>
                              <Input
                                type="number"
                                value={form.price}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    price: parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>

                            {/* Location */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                الموقع
                              </label>
                              <Input
                                value={form.location}
                                onChange={(e) =>
                                  setForm({ ...form, location: e.target.value })
                                }
                              />
                            </div>

                            {/* Skills */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                المهارات (افصل بينها بفواصل)
                              </label>
                              <Input
                                value={form.skills}
                                onChange={(e) =>
                                  setForm({ ...form, skills: e.target.value })
                                }
                              />
                            </div>

                            {/* Certificate Upload */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                شهادة أو وثيقة
                              </label>
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleCertificateUpload}
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="block mb-1 text-sm text-gray-700">
                                وصف إضافي
                              </label>
                              <Textarea
                                value={form.description}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>

                            {/* Submit Button */}
                            <div className="text-left pt-2">
                              <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-blue-600 text-white hover:bg-blue-700"
                              >
                                {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                              </Button>
                            </div>

                            {/* Feedback */}
                            {JOBerror && (
                              <p className="text-red-500 text-xs">{error}</p>
                            )}
                            {success && (
                              <p className="text-green-600 text-xs">
                                تم إرسال الطلب بنجاح!
                              </p>
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
