"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "سميرة بن حسين",
      role: "أم خدامة",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "MRServices عاونوني بزاف! لقيت طباخة دار تشهي، تطيب أكلات صحية لولادي. الحجز كان سهل بزاف والخدمة روعة.",
    },
    {
      id: 2,
      name: "محمد علاوي",
      role: "مول مشروع صغير",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "الخدمة تاع التنظيف لي حجزتها من MRServices كانت هايلة. ناس محترفين وثقة وبسومة معقولة. وليت ندير تنظيف أسبوعي بلا وجع راس.",
    },
    {
      id: 3,
      name: "خالتي خديجة",
      role: "مريضة كبيرة",
      image:
        "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "خدمة التمريض فالدار جاتني في وقتها. الممرضة كانت قلبها كبير وتفهم خدمتها. ننصح كلشي بـ MRServices.",
    },
    {
      id: 4,
      name: "سليم بوزيد",
      role: "منظم حفلات",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4,
      text: "بلاتفورم هايلة باش تلقى خدمات الطياب. كاين اختيارات بزاف والأسعار باينة. سهلت عليّ نلقى الماتعهد المناسب للحفلة.",
    },
    {
      id: 5,
      name: "ليلى بن عمار",
      role: "ماما جديدة",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "كي ولّيت ماما، وجود ناس صحيين ثقة عبر MRServices عطاني راحة كبيرة. الابليكاسيون ساهل بزاف والمختصين ممتازين.",
    },
    {
      id: 6,
      name: "عبد القادر معمري",
      role: "مدير مشغول",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "MRServices ربحولي وقت كبير! نقدر نحجز كلش من تنظيف حتى لوجبات بسهولة. الناس لي يخدمو معاهم ديما فالمستوى.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            آراء عملائنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            لا تأخذ كلمتنا فقط، استمع إلى تجارب عملائنا الراضين عن خدماتنا
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-blue-500 mb-2" />
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ml-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
