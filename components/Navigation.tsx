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

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
              <div className=" hidden md:block">
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

                      <DropdownMenuItem className=" bg-red-50  border border-red-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 text-red-500">
                        <div className="flex items-center justify-between w-full">
                          <div>زر الطوارئ</div>
                          <TriangleAlert size={14} />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <SignedOut>
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <a
                  href="#services"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  الخدمات
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  الميزات
                </a>
                <a
                  href="#testimonials"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  من نحن
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تواصل معنا
                </a>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
