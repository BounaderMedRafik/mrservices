export interface Professional {
  id: string;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  location:
    | "القالة، الطارف"
    | "بوثلجة، الطارف"
    | "بريحان، الطارف"
    | "الزيتونة، الطارف"
    | "بوقوس، الطارف"
    | "عين العسل، الطارف"
    | "بلدية الطارف ,الطارف"
    | "البسباس ,الطارف"
    | "الذرعان ,الطارف"
    | "بن مهيدي ,الطارف";
  image: string;
  skills: string[];
  description: string;
}

export type ProfessionalMetadata = {
  role?: string;
  specialty?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  location?: string;
  image?: string;
  skills?: string[];
  description?: string;
};

export interface ReservationsProps {
  uuid: string;
  created_at: string;
  professsionalid: string;
  userid: string;
  time: Date;
  extrainfos: string;
  location: string;
  phonenum: string;
  prixtotal: number;
  payoption: string;
  status: string;
}

export interface RequestOfJOBprops {
  id: string;
  created_at: string;
  userid: string;
  specialty: string;
  category: string;
  price: number;
  location: string;
  skills: string[];
  description: string;
  phonenum: string;
  certificate: string;
}

export const mockProfessionals: Professional[] = [
  // Food Services - خدمات الطعام
  {
    id: "1",
    name: "مريم بوقرة",
    specialty: "وجبات منزلية",
    category: "وجبات صحية منزلية عادية",
    rating: 5,
    reviews: 127,
    price: 4.5,
    location: "الزيتونة، الطارف",
    image:
      "https://images.pexels.com/photos/3785718/pexels-photo-3785718.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["طبخ صحي", "تحضير وجبات"],
    description:
      "طباخة محترفة بخبرة 10 سنوات في مطبخ البحر الأبيض المتوسط، متخصصة في الوجبات الصحية المنزلية العادية.",
  },
  {
    id: "2",
    name: "عبد القادر بن عمر",
    specialty: "حساء خضر مطهية على البخار",

    category: "وجبات مخصصة للمرضى",
    rating: 5,
    reviews: 89,
    price: 5.2,
    location: "القالة، الطارف",
    image:
      "https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [" وجبة نباتية", "حساء"],
    description:
      "خبير في المطبخ الآسيوي الحديث مع التركيز على المكونات الطازجة والمحلية، ويقدم وجبات مخصصة للمرضى بناءً على توصيات أخصائيي التغذية.",
  },
  {
    id: "3",
    name: "فاطمة الزهراء بلحاج",
    specialty: "المعجنات الفرنسية",
    category: "خدمة الطبخ للمناسبات الصغيرة",
    rating: 5,
    reviews: 156,
    price: 5.5,
    location: "بريحان، الطارف",
    image:
      "https://images.pexels.com/photos/3769739/pexels-photo-3769739.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["مطبخ فرنسي", "معجنات", "حلويات"],
    description:
      "شيف معجنات فرنسية معتمدة متخصصة في الحلويات والخبز الحرفي، وتوفر خدمة الطبخ للمناسبات الصغيرة.",
  },
  {
    id: "4",
    name: "سعاد قاسمي",
    specialty: "وجبات صحية للأمهات",
    category: "وجبات صحية للأمهات الحوامل وبعد الولادة",
    rating: 5,
    reviews: 95,
    price: 6.5,
    location: "بوثلجة، الطارف",
    image:
      "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["مطبخ صحي", "وجبات ما بعد الولادة", "تغذية الأم والطفل"],
    description:
      "متخصصة في إعداد وجبات صحية ومغذية للأمهات الحوامل وبعد الولادة، مع التركيز على التعافي السريع.",
  },
  {
    id: "5",
    name: "أحمد بن علي",
    specialty: "تدريب على الطهي المنزلي",
    category: "تدريب على الطهي الصحي المنزلي",
    rating: 5,
    reviews: 70,
    price: 6.4,
    location: "بوقوس، الطارف",
    image:
      "https://images.pexels.com/photos/375468/pexels-photo-375468.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تدريب على الطهي", "وجبات منزلية صحية", "تخطيط الوجبات"],
    description:
      "يقدم دورات تدريبية عملية للأسر ومقدمي الرعاية حول كيفية إعداد وجبات صحية منزلية بسهولة.",
  },

  // Cleaning Services - خدمات التنظيف
  {
    id: "6",
    name: "حورية مسعودي",
    specialty: "تنظيف سكني",
    category: "تنظيم المنزل",
    rating: 5,
    reviews: 189,
    price: 12,
    location: "بوقوس، الطارف",
    image:
      "https://images.pexels.com/photos/6195111/pexels-photo-6195111.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تنظيف شامل", "تنظيم الغرف", "تنظيف النوافذ"],
    description:
      "منظفة منازل محترفة بخبرة 8 سنوات، متخصصة في تنظيم وتنظيف الغرف والأرضيات والنوافذ.",
  },
  {
    id: "7",
    name: "نورية بوشارب",
    specialty: "تنظيف أخضر",
    category: "تنظيف متخصص",
    rating: 5,
    reviews: 145,
    price: 14,
    location: "عين العسل، الطارف",
    image:
      "https://images.pexels.com/photos/6196581/pexels-photo-6196581.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تنظيف الأجهزة", "تنظيف السيارات", "منتجات صديقة للبيئة"],
    description:
      "متخصصة في التنظيف المتخصص لأدوات المطبخ، الأجهزة الكهرومنزلية، ومفروشات السيارات باستخدام منتجات صديقة للبيئة.",
  },
  {
    id: "8",
    name: "عمر طيبي",
    specialty: "تنظيف وتعقيم",
    category: "تعقيم وتطهير الغرف بعد العودة من المستشفى",
    rating: 5,
    reviews: 167,
    price: 10,
    location: "الزيتونة، الطارف",
    image:
      "https://images.pexels.com/photos/6197122/pexels-photo-6197122.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تعقيم الغرف", "تطهير", "تنظيف عميق للمستشفيات"],
    description:
      "خبير في خدمات التنظيف العميق والتعقيم للغرف بعد عودة المرضى من المستشفى لضمان بيئة آمنة.",
  },
  {
    id: "9",
    name: "سامية بن زكري",
    specialty: "تنظيف شخصي ورعاية",
    category: "تنظيف شخصي للمرضى والمسنين",
    rating: 4,
    reviews: 198,
    price: 13,
    location: "القالة، الطارف",
    image:
      "https://images.pexels.com/photos/7086488/pexels-photo-7086488.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["عناية شخصية", "مساعدة يومية", "تنظيف لطيف"],
    description:
      "توفر خدمات تنظيف شخصية حساسة ومراعية للمرضى والمسنين في منازلهم.",
  },
  {
    id: "10",
    name: "بلال حمدي",
    specialty: "مكافحة الآفات وتنظيف الطوارئ",
    category: "تنظيف وتعقيم",
    rating: 5,
    reviews: 134,
    price: 13,
    location: "بريحان، الطارف",
    image: "/image.png",
    skills: ["تعقيم الطوارئ", "تطهير شامل"],
    description:
      "خبير في مكافحة الحشرات وخدمات التنظيف والتعقيم الطارئة في حالات العدوى.",
  },

  // Medical Services - خدمات طبية
  {
    id: "11",
    name: "الممرضة فريدة بوعلام",
    specialty: "الرعاية الصحية المنزلية للمسنين",
    category: "مرافقة المسنين",
    rating: 5,
    reviews: 167,
    price: 45,
    location: "بوثلجة، الطارف",
    image:
      "https://images.pexels.com/photos/7345465/pexels-photo-7345465.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["رعاية كبار السن", "مساعدة يومية", "تذكير بالأدوية"],
    description:
      "ممرضة مسجلة بخبرة 15 عامًا في الرعاية الصحية المنزلية، متخصصة في مرافقة كبار السن وتقديم الدعم اليومي.",
  },
  {
    id: "12",
    name: "الممرضة ليلى مرابط",
    specialty: "رعاية المرضى والأطفال",
    category: "مرافقة المرضى",
    rating: 5,
    reviews: 142,
    price: 50,
    location: "بوقوس، الطارف",
    image:
      "https://images.pexels.com/photos/7659565/pexels-photo-7659565.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["عناية بالجروح", "إدارة الحقن", "مرافقة المستشفيات"],
    description:
      "ممرضة أطفال متخصصة بخبرة في رعاية الأطفال والمرضى، بما في ذلك إدارة الجروح والأدوية والمرافقة في المستشفى.",
  },
  {
    id: "13",
    name: "د. خالد بن عمر",
    specialty: "علاج طبيعي",
    category: "علاج طبيعي",
    rating: 5,
    reviews: 189,
    price: 20,
    location: "عين العسل، الطارف",
    image:
      "https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["إصابات رياضية", "ما بعد الجراحة", "تدريب على الحركة"],
    description:
      "أخصائي علاج طبيعي مرخص متخصص في الإصابات الرياضية وإعادة التأهيل بعد الجراحة، ويقدم جلسات في المنزل.",
  },
  {
    id: "14",
    name: "د. آمال بوشامة",
    specialty: "طب عام واستشارات",
    category: "استشارات طبية",
    rating: 5,
    reviews: 245,
    price: 25,
    location: "الزيتونة، الطارف",
    image:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["طب عام", "الطب عن بعد", "استشارات وقائية"],
    description:
      "طبيبة عائلة معتمدة تقدم استشارات طبية شاملة ورعاية وقائية، مع إمكانية الاستشارة عن بعد.",
  },
  {
    id: "15",
    name: "د. عبد الرحيم قادري",
    specialty: "طب وقائي وتحاليل منزلية",
    category: "تحاليل في المنزل",
    rating: 5,
    reviews: 178,
    price: 40,
    location: "القالة، الطارف",
    image:
      "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["فحوصات صحية", "تحاليل الدم", "خطط عافية"],
    description:
      "أخصائي طب وقائي يركز على الفحوصات الصحية الشاملة وتقديم خدمة التحاليل الطبية في المنزل.",
  },
  {
    id: "16",
    name: "الممرضة زينب حسين",
    specialty: "مرافقة الأمهات حديثي الولادة",
    category: "مرافقة الأمهات حديثي الولادة",
    rating: 5,
    reviews: 80,
    price: 55,
    location: "بن مهيدي ,الطارف",
    image:
      "https://images.pexels.com/photos/7659570/pexels-photo-7659570.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      "دعم الرضاعة الطبيعية",
      "رعاية ما بعد الولادة",
      "نصائح للأم الجديدة",
    ],
    description:
      "ممرضة متخصصة في دعم الأمهات حديثي الولادة، وتقديم الرعاية والنصائح اللازمة في فترة النفاس.",
  },
  {
    id: "17",
    name: "د. سارة بن زين",
    specialty: "علاج نفسي وسلوكي",
    category: "علاج نفسي",
    rating: 5,
    reviews: 110,
    price: 34,
    location: "البسباس ,الطارف",
    image:
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["جلسات استشارية", "العلاج السلوكي المعرفي", "إدارة التوتر"],
    description:
      "أخصائية علاج نفسي معتمدة تقدم جلسات استشارية لدعم الصحة النفسية والتعامل مع التوتر والقلق.",
  },
  {
    id: "18",
    name: "فريق النقل الطبي",
    specialty: "نقل المرضى",
    category: "نقل المرضى للمستشفى عند الحاجة",
    rating: 4,
    reviews: 65,
    price: 27,
    location: "الذرعان ,الطارف",
    image:
      "https://images.pexels.com/photos/3452997/pexels-photo-3452997.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["نقل آمن", "مساعدة في الحركة", "استجابة سريعة"],
    description:
      "فريق متخصص يوفر خدمة نقل المرضى الآمن والمريح إلى المستشفى عند الحاجة، مع المساعدة الكاملة.",
  },
  {
    id: "19",
    name: "مدرب اللياقة البدنية خالد",
    specialty: "أنشطة ترفيهية صحية",
    category: "أعمال ترفيهية (مثل التنزه)",
    rating: 5,
    reviews: 45,
    price: 12,
    location: "بن مهيدي ,الطارف",
    image:
      "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تنزه", "تمارين خفيفة", "أنشطة جماعية"],
    description:
      "يقود مجموعات للتنزه والأنشطة الترفيهية الخفيفة، لتعزيز النشاط البدني والمزاج الجيد.",
  },
  {
    id: "20",
    name: "المساعدة مريم",
    specialty: "تذكير ورعاية",
    category: "التذكير بالمواعيد الطبية والأدوية",
    rating: 5,
    reviews: 90,
    price: 13,
    location: "بوقوس، الطارف",
    image:
      "https://images.pexels.com/photos/5239919/pexels-photo-5239919.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["تنظيم المواعيد", "تذكير بالأدوية", "دعم يومي"],
    description:
      "تقدم خدمة تذكير شاملة بالمواعيد الطبية وتناول الأدوية لضمان الالتزام بالخطط العلاجية.",
  },
  {
    id: "21",
    name: "السيدة آمال بلقاسم",
    specialty: "مرافقة ودعم الأطفال",
    category: "مرافقة الأطفال",
    rating: 5,
    reviews: 75,
    price: 16,
    location: "بلدية الطارف ,الطارف",
    image:
      "https://images.pexels.com/photos/8376272/pexels-photo-8376272.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: ["رعاية الأطفال", "أنشطة تعليمية", "مرافقة آمنة", "دعم عاطفي"],
    description:
      "مرافقة متخصصة للأطفال، توفر رعاية آمنة ومحفزة، مع التركيز على الأنشطة التعليمية والترفيهية ودعمهم عاطفياً.",
  },
];

export const locations = [
  "القالة، الطارف",
  "بوثلجة، الطارف",
  "بريحان، الطارف",
  "الزيتونة، الطارف",
  "بوقوس، الطارف",
  "عين العسل، الطارف",
  "بلدية الطارف ,الطارف",
  "البسباس ,الطارف",
  "الذرعان ,الطارف",
  "بن مهيدي ,الطارف",
];
