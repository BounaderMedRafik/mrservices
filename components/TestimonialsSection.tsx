"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "سارة جونسون",
      role: "أم عاملة",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "MRServices أنقذني! وجدت طاهية منزلية رائعة تُحضّر وجبات صحية لعائلتي. عملية الحجز كانت سهلة جدًا وجودة الخدمة ممتازة.",
    },
    {
      id: 2,
      name: "مايكل تشين",
      role: "صاحب مشروع صغير",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "خدمة التنظيف التي حجزتها من خلال MRServices كانت رائعة. محترفون وموثوقون وبسعر مناسب. لدي الآن تنظيف أسبوعي منتظم يحافظ على نظافة مكتبي.",
    },
    {
      id: 3,
      name: "إيما ديفيس",
      role: "مسنة",
      image:
        "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "خدمة التمريض المنزلي كانت مثالية لمرحلة التعافي. الممرضة كانت محترفة، عطوفة، وذات خبرة كبيرة. أنصح باستخدام MRServices بشدة!",
    },
    {
      id: 4,
      name: "ديفيد رودريغيز",
      role: "منظم فعاليات",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4,
      text: "منصة ممتازة للعثور على خدمات الطهي. تنوع الخيارات والأسعار الواضحة سهلت عليّ إيجاد المتعهد المثالي للفعالية.",
    },
    {
      id: 5,
      name: "ليزا تومسون",
      role: "أم جديدة",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "كأم جديدة، توفر محترفين صحيين موثوقين عبر MRServices منحني راحة بال كبيرة. التطبيق سهل الاستخدام والمحترفون رائعون.",
    },
    {
      id: 6,
      name: "روبرت ويلسون",
      role: "مدير تنفيذي مشغول",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "MRServices يوفر لي الكثير من الوقت! يمكنني حجز كل شيء من تنظيف المنزل إلى تحضير الوجبات بسهولة. مزودو الخدمة دائمًا على مستوى عالي.",
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
