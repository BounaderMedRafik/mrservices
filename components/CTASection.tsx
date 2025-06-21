import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {" "}
        {/* Added text-right for RTL */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            انضم إلى آلاف العملاء الراضين الذين يثقون في MRServices لتلبية
            احتياجاتهم من الخدمات المهنية
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center text-white flex-row-reverse">
              {" "}
              {/* Added flex-row-reverse for RTL icon placement */}
              <CheckCircle className="h-5 w-5 ml-2 mr-0 text-green-300" />{" "}
              {/* Adjusted margin */}
              <span>لا توجد رسوم إعداد</span>
            </div>
            <div className="flex items-center text-white flex-row-reverse">
              {" "}
              {/* Added flex-row-reverse for RTL icon placement */}
              <CheckCircle className="h-5 w-5 ml-2 mr-0 text-green-300" />{" "}
              {/* Adjusted margin */}
              <span>دعم 24/7</span>
            </div>
            <div className="flex items-center text-white flex-row-reverse">
              {" "}
              {/* Added flex-row-reverse for RTL icon placement */}
              <CheckCircle className="h-5 w-5 ml-2 mr-0 text-green-300" />{" "}
              {/* Adjusted margin */}
              <span>ضمان استعادة الأموال</span>
            </div>
            <div className="flex items-center text-white flex-row-reverse">
              {" "}
              {/* Added flex-row-reverse for RTL icon placement */}
              <CheckCircle className="h-5 w-5 ml-2 mr-0 text-green-300" />{" "}
              {/* Adjusted margin */}
              <span>متخصصون معتمدون</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold group"
            >
              <ArrowRight className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform rotate-180" />{" "}
              ابدأ الآن - إنه مجاني
              {/* Rotated and adjusted margin */}
            </Button>
          </div>

          <div className="mt-8">
            <p className="text-blue-100 text-sm">
              هل لديك حساب بالفعل؟
              <a
                href="#"
                className="text-white underline hover:no-underline mr-1"
              >
                {" "}
                {/* Adjusted margin */}
                سجل الدخول هنا
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
