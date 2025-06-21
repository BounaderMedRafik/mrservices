"use client";

import { ShieldCheck, Clock, Lock, Handshake, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: Settings2,
      title: "مرونة في استخدام الموقع",
      description:
        "واجهة سهلة وبسيطة تتيح لك التنقل بسلاسة واستخدام الخدمات بكل راحة.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Handshake,
      title: "مقدمي خدمة أكفاء ومحترفين",
      description:
        "فريق عمل مدرّب وذو خبرة عالية لتقديم أفضل جودة في تنفيذ الخدمات.",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: Lock,
      title: "ضمان الأمان والاطمئنان",
      description: "نحرص على حماية بياناتك وتوفير بيئة آمنة للتعاملات.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "خدمة سريعة متوفّرة 24/7",
      description: "نقدم خدماتنا على مدار الساعة لتلبية احتياجاتك في أي وقت.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: ShieldCheck,
      title: "خدمات عالية الجودة متنوعة ومتكاملة",
      description: "مجموعة شاملة من الخدمات بجودة مضمونة تناسب جميع احتياجاتك.",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            لماذا تختار{" "}
            <div className="font-black">
              <span className=" text-blue-500">MR</span>Services
            </div>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
