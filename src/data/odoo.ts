import type { Bilingual } from "./site";

// ============ تفاصيل البرامج — تُعرض كبطاقة منتج (product.template + variants) ============

export type ProgramDetail = {
  id: string;
  tagline: Bilingual;
  description: Bilingual;
  highlights: Bilingual[];
  includes: Bilingual[];
  practical: Bilingual;
  odooModels: string[];
};

export const programDetails: Record<string, ProgramDetail> = {
  "hosting-2": {
    id: "hosting-2",
    tagline: { ar: "بداية آمنة ومرحة لأول خطوات تعليمية", en: "A safe, playful start for early learners" },
    description: {
      ar: "برنامج استضافة صباحية مرن يمنح الطفل في مرحلة ما قبل المدرسة بيئة آمنة مليئة باللعب الهادف، مع أنشطة قصيرة تُنمّي اللغة والحركة والتفاعل الاجتماعي، وبإشراف مباشر من مربية مؤهلة.",
      en: "A flexible morning hosting program giving preschool children a safe space full of purposeful play, with short activities that build language, movement, and social skills under qualified supervision.",
    },
    highlights: [
      { ar: "مربيات ذوات خبرة في مراحل الطفولة المبكرة", en: "Experienced early-childhood educators" },
      { ar: "أنشطة يومية قصيرة تناسب عمر الطفل وتركيزه", en: "Short daily activities matched to the child's age" },
      { ar: "تقرير مصغّر لولي الأمر عن يوم الطفل", en: "A short daily note to parents about the child's day" },
    ],
    includes: [
      { ar: "استقبال وتسليم منظّم", en: "Structured drop-off and pick-up" },
      { ar: "حلقة نشاط جماعي يومية", en: "A daily group activity circle" },
      { ar: "لعب حر بإشراف في مساحة آمنة", en: "Supervised free play in a safe space" },
      { ar: "متابعة سلوكية ومرحلية للطفل", en: "Ongoing developmental follow-up" },
    ],
    practical: {
      ar: "تُقام الفترة الصباحية من 7:00 إلى 11:00، ويمكن اختيار ساعتين ثابتتين أسبوعياً أو حضور مرن شهري حسب حاجة الأسرة.",
      en: "Morning sessions run 7:00–11:00, with a fixed 2-hour weekly slot or a flexible monthly plan as needed.",
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  },
  "hosting-4": {
    id: "hosting-4",
    tagline: { ar: "صباح أطول، اكتشاف أعمق", en: "A longer morning, deeper discovery" },
    description: {
      ar: "نسخة ممتدة من برنامج الاستضافة تمنح الطفل أربع ساعات صباحية تجمع بين اللعب الحر والأنشطة المهارية والحلقات اللغوية القصيرة، لطفل مستعد لرحلة يوم كامل من الاكتشاف.",
      en: "An extended hosting program giving children four morning hours that blend free play, skill activities, and short language circles for a full morning of discovery.",
    },
    highlights: [
      { ar: "أربع ساعات منظمة بمزيج لعب وتعلم", en: "Four organized hours blending play and learning" },
      { ar: "حلقات لغوية قصيرة بالعربية والإنجليزية", en: "Short Arabic and English language circles" },
      { ar: "أنشطة مهارية تدعم الاستعداد للمدرسة", en: "Skill activities that prepare children for school" },
    ],
    includes: [
      { ar: "كل مزايا الاستضافة المرنة", en: "Everything in Flexible Hosting" },
      { ar: "حلقتا مهارات أسبوعياً", en: "Two weekly skill circles" },
      { ar: "نشاط فني أسبوعي", en: "A weekly art activity" },
      { ar: "لقطة متابعة دورية مع ولي الأمر", en: "Periodic parent check-in" },
    ],
    practical: {
      ar: "تُقام الفترة الصباحية من 7:00 إلى 11:00، مع خطتين: أسبوعية بأربع ساعات أو شهرية كاملة.",
      en: "Morning sessions run 7:00–11:00, with a weekly 4-hour plan or a full monthly plan.",
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  },
  foundation: {
    id: "foundation",
    tagline: { ar: "تأسيس قوي للغة الإنجليزية قبل المدرسة", en: "A strong English foundation before school" },
    description: {
      ar: "برنامج تأسيس يبني لدى الطفل قاعدة صوتية ومفرداتية في اللغة الإنجليزية من خلال أنشطة قصيرة متكررة: أصوات الحروف، الكلمات الأساسية، ومحادثات مبسطة تكسر حاجز الخوف من التحدث.",
      en: "A foundation program building phonics, core vocabulary, and simple conversations through short repeated activities that remove the fear of speaking.",
    },
    highlights: [
      { ar: "منهج صوتي متدرج (Phonics) يناسب المبتدئين", en: "A graded phonics approach for beginners" },
      { ar: "مجموعات صغيرة تضمن مشاركة كل طفل", en: "Small groups so every child participates" },
      { ar: "تقييم مرحلي يوضح تقدم الطفل لأولياء الأمور", en: "Periodic assessment shared with parents" },
    ],
    includes: [
      { ar: "حصتان إلى أربع حصص أسبوعياً حسب الخطة", en: "Two to four sessions weekly by plan" },
      { ar: "أنشطة تعزيز منزلية قصيرة", en: "Short home practice activities" },
      { ar: "اختبار تحديد مستوى في البداية", en: "A placement check at the start" },
      { ar: "شهادة إتمام للمستوى التأسيسي", en: "A foundation completion certificate" },
    ],
    practical: {
      ar: "تُقام الحصص من 12:30 إلى 3:30، بخيار يومين أو أربعة أيام أسبوعياً، شهرياً أو لفصل دراسي كامل.",
      en: "Sessions run 12:30–3:30, with 2-day or 4-day weekly options, monthly or for a full term.",
    },
    odooModels: ["product.template", "product.product", "slide.channel", "website_sale"],
  },
  international: {
    id: "international",
    tagline: { ar: "دعم دراسي يواكب المناهج العالمية", en: "Academic support aligned with international curricula" },
    description: {
      ar: "برنامج متابعة دراسية لطلاب المدارس العالمية يراجع معهم الواجبات والمفاهيم الأساسية في اللغة الإنجليزية والرياضيات والعلوم، ويعدهم للاختبارات الدورية بأسلوب منظم ومطمئن.",
      en: "School support for international-curriculum students covering homework review and core concepts in English, math, and science, with structured test preparation.",
    },
    highlights: [
      { ar: "متابعة الواجبات اليومية ومتابعة المفاهيم", en: "Daily homework and concept follow-up" },
      { ar: "إعداد منظم للاختبارات الدورية", en: "Structured preparation for school tests" },
      { ar: "تواصل دوري مع ولي الأمر عن مستوى الطالب", en: "Regular parent updates on progress" },
    ],
    includes: [
      { ar: "حصص دعم من 2:00 إلى 8:00 مساءً", en: "Support sessions from 2:00 to 8:00 PM" },
      { ar: "مراجعة لكل مادة أساسية", en: "Review for each core subject" },
      { ar: "تدريبات على نماذج الاختبارات", en: "Practice with test formats" },
      { ar: "تقرير شهري بمستوى الطالب", en: "A monthly progress report" },
    ],
    practical: {
      ar: "نافذة الحضور من 2:00 إلى 8:00 مساءً، ويُحدد جدول الطالب حسب مراحله الدراسية بخطة يومين أو أربعة أيام.",
      en: "Attendance window 2:00–8:00 PM; each student's schedule is set by grade with a 2-day or 4-day plan.",
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  },
  private: {
    id: "private",
    tagline: { ar: "مواكبة دقيقة لمناهج المدارس الأهلية", en: "Close support for private-school curricula" },
    description: {
      ar: "برنامج دعم مصمم لمناهج المدارس الأهلية، يواكب ما يدرسه الطالب في المدرسة أسبوعاً بأسبوع، ويقوّي نقاط الضعف قبل أن تتراكم، مع تركيز على مهارات القراءة والكتابة والحساب.",
      en: "Support tailored to private-school curricula, keeping pace week by week with what the student studies and strengthening weak spots early, with focus on reading, writing, and math.",
    },
    highlights: [
      { ar: "مواكبة مباشرة للمنهج الأسبوعي", en: "Direct tracking of the weekly curriculum" },
      { ar: "تركيز على القراءة والكتابة والحساب", en: "Focus on reading, writing, and numeracy" },
      { ar: "معالجة مبكرة لنقاط الضعف", en: "Early intervention for weak areas" },
    ],
    includes: [
      { ar: "حصص دعم من 2:00 إلى 8:00 مساءً", en: "Support sessions from 2:00 to 8:00 PM" },
      { ar: "خطة أسبوعية مبنية على جدول المدرسة", en: "A weekly plan built around the school schedule" },
      { ar: "تمارين تقوية موجزة بعد كل موضوع", en: "Brief reinforcement drills per topic" },
      { ar: "متابعة شهرية مع ولي الأمر", en: "Monthly follow-up with parents" },
    ],
    practical: {
      ar: "نافذة الحضور من 2:00 إلى 8:00 مساءً، بخطط يومين أو أربعة أيام أسبوعياً.",
      en: "Attendance window 2:00–8:00 PM, with 2-day or 4-day weekly plans.",
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  },
  government: {
    id: "government",
    tagline: { ar: "دعم متين لمناهج المدارس الحكومية", en: "Solid support for government-school curricula" },
    description: {
      ar: "برنامج دعم لطلاب المدارس الحكومية يراجع المواد الأساسية ويقوّي مهارات القراءة والإنجليزية والحساب، ويساعد الطالب على الالتزام بجدول مراجعة ثابت يرفع مستواه بهدوء وثبات.",
      en: "Support for government-school students reviewing core subjects and strengthening reading, English, and math, with a steady revision routine that lifts performance gradually.",
    },
    highlights: [
      { ar: "جدول مراجعة ثابت يبني عادة الدراسة", en: "A steady revision routine that builds study habits" },
      { ar: "مراجعة شاملة للمواد الأساسية", en: "Comprehensive review of core subjects" },
      { ar: "أسعار مناسبة تناسب جميع الأسر", en: "Accessible pricing for every family" },
    ],
    includes: [
      { ar: "حصص دعم من 2:00 إلى 8:00 مساءً", en: "Support sessions from 2:00 to 8:00 PM" },
      { ar: "ملخصات مراجعة مبسطة", en: "Simplified revision summaries" },
      { ar: "اختبارات قصيرة دورية", en: "Regular short quizzes" },
      { ar: "تقرير مرحلي لولي الأمر", en: "A periodic progress report" },
    ],
    practical: {
      ar: "نافذة الحضور من 2:00 إلى 8:00 مساءً، بخطط يومين أو أربعة أيام أسبوعياً.",
      en: "Attendance window 2:00–8:00 PM, with 2-day or 4-day weekly plans.",
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  },
  english: {
    id: "english",
    tagline: { ar: "دورات لغة إنجليزية متدرجة بعد المدرسة", en: "Graded English courses after school" },
    description: {
      ar: "دورات لغة إنجليزية مسائية للأطفال من عمر 5 سنوات فأكثر، تنتقل بالمتعلم عبر مستويات متدرجة تجمع بين المحادثة والمفردات والقواعد بأسلوب مرح قائم على الأنشطة والقصص.",
      en: "After-school English courses for ages 5+, moving learners through graded levels that blend conversation, vocabulary, and grammar through playful, story-based activities.",
    },
    highlights: [
      { ar: "مستويات متدرجة من المبتدئ إلى المتقدم", en: "Graded levels from beginner to advanced" },
      { ar: "تركيز على المحادثة والثقة في التحدث", en: "Focus on conversation and speaking confidence" },
      { ar: "أنشطة وقصص تجعل اللغة ممتعة", en: "Activities and stories that make English fun" },
    ],
    includes: [
      { ar: "حصص مسائية من 4:00 إلى 8:00", en: "Evening sessions from 4:00 to 8:00" },
      { ar: "مواد تدريس مناسبة للأطفال", en: "Child-friendly teaching materials" },
      { ar: "أنشطة محادثة جماعية", en: "Group conversation activities" },
      { ar: "شهادة لكل مستوى مكتمل", en: "A certificate for each completed level" },
    ],
    practical: {
      ar: "تُقام الحصص من 4:00 إلى 8:00 مساءً، بخطة شهرية بأربعة أيام أو خطة فصل دراسي.",
      en: "Sessions run 4:00–8:00 PM, with a monthly 4-day plan or a term plan.",
    },
    odooModels: ["product.template", "product.product", "slide.channel", "website_sale"],
  },
};

// ============ الدورة التعليمية — تُعرض كقناة تعلم (slide.channel + slide.slide) ============

export type Slide = { title: Bilingual; kind: "video" | "content" | "activity" | "quiz"; minutes: number; preview: Bilingual };
export type Section = { title: Bilingual; slides: Slide[] };

export const demoCourse = {
  id: "english-kids",
  title: "English for Kids",
  subtitle: {
    ar: "مسار تمهيدي ممتع يبني أساس اللغة الإنجليزية خطوة بخطوة",
    en: "A playful starter track building English foundations step by step",
  } as Bilingual,
  level: { ar: "مستوى تمهيدي", en: "Starter level" } as Bilingual,
  tags: ["Phonics", "Vocabulary", "Speaking"],
  sections: [
    {
      title: { ar: "الوحدة 1 · مرحباً بك", en: "Unit 1 · Welcome" },
      slides: [
        {
          title: { ar: "مرحباً بك في الإنجليزية", en: "Welcome to English" },
          kind: "video",
          minutes: 4,
          preview: {
            ar: "فيديو تعريفي قصير يعرّف الطفل بمسار الدورة بطريقة مرحة.",
            en: "A short welcome video introducing the child to the course track.",
          },
        },
        {
          title: { ar: "دليل ولي الأمر", en: "Parent guide" },
          kind: "content",
          minutes: 3,
          preview: {
            ar: "نصائح بسيطة لمساعدة الطفل على التدرب في المنزل بثقة.",
            en: "Simple tips to help your child practice confidently at home.",
          },
        },
      ],
    },
    {
      title: { ar: "الوحدة 2 · أصوات الحروف", en: "Unit 2 · Alphabet Sounds" },
      slides: [
        {
          title: { ar: "أصوات الحروف", en: "Alphabet Sounds" },
          kind: "video",
          minutes: 6,
          preview: {
            ar: "نتعلم صوت كل حرف عبر أمثلة وكلمات يحبها الأطفال.",
            en: "Learning each letter's sound through examples and kid-favorite words.",
          },
        },
        {
          title: { ar: "نشاط مطابقة الأصوات", en: "Sound matching activity" },
          kind: "activity",
          minutes: 8,
          preview: {
            ar: "نشاط تفاعلي يطابق الحرف بصوته وصورة الكلمة.",
            en: "An interactive activity matching letters to sounds and pictures.",
          },
        },
        {
          title: { ar: "اختبار قصير: الأصوات", en: "Quick quiz: sounds" },
          kind: "quiz",
          minutes: 5,
          preview: {
            ar: "أسئلة قصيرة للتأكد من إتقان أصوات الحروف قبل الانتقال.",
            en: "Short questions to confirm letter sounds before moving on.",
          },
        },
      ],
    },
    {
      title: { ar: "الوحدة 3 · الألوان والأشكال", en: "Unit 3 · Colors & Shapes" },
      slides: [
        {
          title: { ar: "الألوان والأشكال", en: "Colors & Shapes" },
          kind: "video",
          minutes: 6,
          preview: {
            ar: "مفردات الألوان والأشكال عبر مشاهد من حياة الطفل اليومية.",
            en: "Color and shape vocabulary drawn from a child's daily life.",
          },
        },
        {
          title: { ar: "نشاط تلوين ووصف", en: "Color & describe activity" },
          kind: "activity",
          minutes: 8,
          preview: {
            ar: "الطفل يلوّن ثم يصف ما رسمه بجمل إنجليزية بسيطة.",
            en: "The child colors, then describes the picture in simple English.",
          },
        },
      ],
    },
    {
      title: { ar: "الوحدة 4 · كلمات الصف", en: "Unit 4 · Classroom Words" },
      slides: [
        {
          title: { ar: "كلمات الصف الأساسية", en: "Classroom Words" },
          kind: "video",
          minutes: 7,
          preview: {
            ar: "الكلمات التي يحتاجها الطفل داخل الصف: أدوات، أوامر، وتحيات.",
            en: "The words a child needs in class: objects, instructions, and greetings.",
          },
        },
        {
          title: { ar: "اختبار الدورة الختامي", en: "Final course quiz" },
          kind: "quiz",
          minutes: 10,
          preview: {
            ar: "تقييم ختامي يغطي وحدات الدورة ويفتح الشهادة عند الإتمام.",
            en: "A final assessment covering all units that unlocks the certificate.",
          },
        },
      ],
    },
  ] as Section[],
};

export const slideKindLabel: Record<Slide["kind"], Bilingual> = {
  video: { ar: "فيديو", en: "Video" },
  content: { ar: "محتوى", en: "Content" },
  activity: { ar: "نشاط", en: "Activity" },
  quiz: { ar: "اختبار", en: "Quiz" },
};

// ============ الفعاليات — تُعرض كحدث (event.event + event.event.ticket) ============

export type AcademyEvent = {
  id: string;
  day: string;
  month: Bilingual;
  title: Bilingual;
  type: Bilingual;
  time: Bilingual;
  seats: number;
  seatsTaken: number;
  description: Bilingual;
  audience: Bilingual;
  schedule: { time: string; item: Bilingual }[];
  tickets: { name: Bilingual; price: number; note: Bilingual }[];
};

export const academyEvents: AcademyEvent[] = [
  {
    id: "national-day",
    day: "23",
    month: { ar: "سبتمبر", en: "SEP" },
    title: { ar: "احتفاء اليوم الوطني", en: "Saudi National Day Celebration" },
    type: { ar: "فعالية مجتمعية", en: "Community event" },
    time: { ar: "5:00 – 7:00 مساءً", en: "5:00 – 7:00 PM" },
    seats: 60,
    seatsTaken: 41,
    description: {
      ar: "أمسية عائلية احتفالية بأرض الوحدة تجمع الأطفال وأولياء الأمور في أنشطة فنية وألعاب تقليدية وفقرات قصيرة تعبّر عن حبنا لوطننا. الأطفال يشاركون بلبس الأخضر ويصنعون أعمالاً تذكارية يأخذونها معهم.",
      en: "A family celebration evening with art activities, traditional games, and short performances. Children wear green and take home their own handmade keepsakes.",
    },
    audience: { ar: "الأطفال من 3 سنوات فأكثر مع عائلاتهم", en: "Children 3+ with their families" },
    schedule: [
      { time: "5:00", item: { ar: "استقبال العائلات", en: "Family reception" } },
      { time: "5:20", item: { ar: "فقرات الأطفال", en: "Children's performances" } },
      { time: "6:00", item: { ar: "ورشة فنية وطنية", en: "National art workshop" } },
      { time: "6:40", item: { ar: "ألعاب جماعية وتوزيع الهدايا", en: "Group games and giveaways" } },
    ],
    tickets: [
      { name: { ar: "دخول عائلي", en: "Family entry" }, price: 0, note: { ar: "مجاني بموعد مسبق", en: "Free with advance booking" } },
    ],
  },
  {
    id: "talents-lab",
    day: "08",
    month: { ar: "أكتوبر", en: "OCT" },
    title: { ar: "مختبر المواهب الصغير", en: "Little Talents Lab" },
    type: { ar: "ورشة أطفال", en: "Kids workshop" },
    time: { ar: "5:00 – 7:00 مساءً", en: "5:00 – 7:00 PM" },
    seats: 24,
    seatsTaken: 17,
    description: {
      ar: "ورشة عملية يجرب فيها الطفل ثلاث محطات مهارية: فن، بناء وتصميم، وتعبير لغوي، ليكتشف ما يشدّه فعلاً قبل اختيار البرنامج الأنسب له. يخرج كل طفل ببطاقة «مواهبي الأولى» يكتب فيها ما أحبه.",
      en: "A hands-on workshop where children rotate through three skill stations — art, building & design, and language play — to discover what truly draws them before choosing a program.",
    },
    audience: { ar: "الأطفال من 4 إلى 10 سنوات", en: "Children aged 4–10" },
    schedule: [
      { time: "5:00", item: { ar: "تقسيم المجموعات", en: "Group assignment" } },
      { time: "5:10", item: { ar: "المحطة الأولى: الفن", en: "Station 1: Art" } },
      { time: "5:40", item: { ar: "المحطة الثانية: البناء والتصميم", en: "Station 2: Building & design" } },
      { time: "6:10", item: { ar: "المحطة الثالثة: التعبير اللغوي", en: "Station 3: Language play" } },
      { time: "6:45", item: { ar: "بطاقة المواهب والتكريم", en: "Talent cards and closing" } },
    ],
    tickets: [
      { name: { ar: "مقعد فردي", en: "Single seat" }, price: 50, note: { ar: "يشمل المواد والهدايا", en: "Includes materials and giveaways" } },
      { name: { ar: "شقيقان", en: "Two siblings" }, price: 85, note: { ar: "خصم عائلي لمقعدَين", en: "Family discount for two seats" } },
    ],
  },
  {
    id: "language-day",
    day: "22",
    month: { ar: "أكتوبر", en: "OCT" },
    title: { ar: "يوم اللغة المرح", en: "Fun Language Day" },
    type: { ar: "نشاط تعليمي", en: "Learning activity" },
    time: { ar: "5:00 – 7:00 مساءً", en: "5:00 – 7:00 PM" },
    seats: 30,
    seatsTaken: 12,
    description: {
      ar: "يوم مفتوح يجعل اللغة لعبة: محطات قراءة قصصية، مسابقات كلمات، وألعاب حوار بالعربية والإنجليزية. مناسب للأطفال المترددين في التحدث، وهو مدخل جميل للتعرف على برامج اللغة في الأكاديمية.",
      en: "An open day turning language into play: story stations, word games, and conversation games in Arabic and English — a lovely introduction to the academy's language programs.",
    },
    audience: { ar: "الأطفال من 5 سنوات فأكثر", en: "Children aged 5+" },
    schedule: [
      { time: "5:00", item: { ar: "افتتاح وترحيب", en: "Opening welcome" } },
      { time: "5:15", item: { ar: "محطات القصص", en: "Story stations" } },
      { time: "6:00", item: { ar: "مسابقة الكلمات المرحة", en: "Fun word contest" } },
      { time: "6:30", item: { ar: "تعريف ببرامج اللغة", en: "Language programs intro" } },
    ],
    tickets: [
      { name: { ar: "دخول مجاني", en: "Free entry" }, price: 0, note: { ar: "بالتسجيل المسبق فقط", en: "Advance registration required" } },
    ],
  },
];

// ============ خريطة نماذج أودو — تُعرض تفاعلياً في صفحة عن الأكاديمية ============

export type OdooModuleMap = {
  id: string;
  name: { ar: string; en: string };
  appName: string;
  models: { model: string; label: Bilingual }[];
  shownAs: Bilingual;
  custom?: boolean;
};

export const odooModules: OdooModuleMap[] = [
  {
    id: "website",
    name: { ar: "الموقع الإلكتروني", en: "Website" },
    appName: "Website Builder",
    models: [{ model: "website.page", label: { ar: "صفحات الموقع", en: "Site pages" } }],
    shownAs: {
      ar: "هيكل الموقع الذي تستعرضه الآن: صفحات البرامج والفعاليات والتعلم، وبنية القوالب التي ستُبنى كثيم لأودو 19.",
      en: "The site structure you are browsing now: pages and template blocks that will be rebuilt as an Odoo 19 theme.",
    },
  },
  {
    id: "ecommerce",
    name: { ar: "المتجر الإلكتروني", en: "eCommerce" },
    appName: "Website + Sale",
    models: [
      { model: "product.template", label: { ar: "البرنامج كمنتج", en: "Program as a product" } },
      { model: "product.product", label: { ar: "الباقات كخيارات (متغيرات)", en: "Plans as variants" } },
      { model: "sale.order", label: { ar: "طلب التسجيل", en: "Registration order" } },
      { model: "product.pricelist", label: { ar: "جدول الأسعار 2026–2027", en: "2026–2027 price list" } },
    ],
    shownAs: {
      ar: "صفحة تفاصيل البرنامج: اختيار الباقة (أسبوعي/شهري/فصل) يحدّث السعر مباشرة كما في صفحة منتج بالمتجر.",
      en: "The program detail page: picking a plan (weekly / monthly / term) updates the price live, exactly like a store product page.",
    },
  },
  {
    id: "elearning",
    name: { ar: "التعلم الإلكتروني", en: "eLearning" },
    appName: "Website + eLearning",
    models: [
      { model: "slide.channel", label: { ar: "الدورة", en: "Course channel" } },
      { model: "slide.slide", label: { ar: "الدروس والأنشطة والاختبارات", en: "Lessons, activities, quizzes" } },
      { model: "slide.slide.partner", label: { ar: "إنجاز الطفل في كل درس", en: "Child's completion per lesson" } },
    ],
    shownAs: {
      ar: "صفحة الدورة التفاعلية: وحدات ودروس وشريط تقدم وشهادة تُفتح عند الإتمام.",
      en: "The interactive course page: units, lessons, a progress bar, and a certificate unlocked on completion.",
    },
  },
  {
    id: "events",
    name: { ar: "الفعاليات", en: "Events" },
    appName: "Website + Events",
    models: [
      { model: "event.event", label: { ar: "الفعالية وتاريخها ومقرها", en: "Event, date, venue" } },
      { model: "event.event.ticket", label: { ar: "أنواع التذاكر والمقاعد", en: "Ticket types and seats" } },
      { model: "event.registration", label: { ar: "تسجيل الحضور", en: "Attendee registration" } },
    ],
    shownAs: {
      ar: "صفحة الفعالية: البرنامج الزمني، عدد المقاعد المتبقية، والتذاكر مع نموذج تسجيل.",
      en: "The event page: schedule, remaining seats, tickets, and a registration form.",
    },
  },
  {
    id: "contacts",
    name: { ar: "جهات الاتصال والعلاقات", en: "Contacts & CRM" },
    appName: "Contacts + CRM",
    models: [
      { model: "res.partner", label: { ar: "ولي الأمر وجهات الاتصال", en: "Parents and contacts" } },
      { model: "crm.lead", label: { ar: "الاستفسار حتى التسجيل", en: "Inquiry through registration" } },
    ],
    shownAs: {
      ar: "نموذج التسجيل والاستفسار: كل رسالة تواصل تصبح جهة اتصال وفرصة متابعة حتى إتمام التسجيل.",
      en: "The registration and inquiry forms: every message becomes a contact and a follow-up lead until enrollment.",
    },
  },
  {
    id: "hr",
    name: { ar: "الموظفون والحضور", en: "Employees & attendance" },
    appName: "Employees + Attendances",
    models: [
      { model: "hr.employee", label: { ar: "ملف المربي/المعلم", en: "Teacher profile" } },
      { model: "hr.attendance", label: { ar: "حضور وانصراف الموظفين", en: "Staff check-in/out" } },
    ],
    shownAs: {
      ar: "بيانات فريق الأكاديمية وحضورهم تُدار بالكامل عبر تطبيقات الموارد البشرية الأساسية دون إضافات.",
      en: "Academy staff records and check-ins are fully managed by the standard HR apps, with no extras.",
    },
  },
  {
    id: "academy-core",
    name: { ar: "ملفات الطلاب والدرجات", en: "Student records & grades" },
    appName: "Custom extension",
    models: [
      { model: "academy.student", label: { ar: "ملف الطفل الأكاديمي", en: "Child's academic profile" } },
      { model: "academy.grade", label: { ar: "الدرجات والتقييمات", en: "Grades and assessments" } },
    ],
    shownAs: {
      ar: "سجلات الطلاب ودرجاتهم غير موجودة في أودو الأساسي، وتُبنى كإضافة مخصصة عند التنفيذ تربط الطفل بولي أمره وببرنامجه.",
      en: "Student records and grades are not in core Odoo; they are built as a custom extension linking each child to their parent and program.",
    },
    custom: true,
  },
  {
    id: "parent-portal",
    name: { ar: "تواصل أولياء الأمور", en: "Parent communication" },
    appName: "Custom extension",
    models: [
      { model: "academy.parent.message", label: { ar: "رسائل ومتابعات ولي الأمر", en: "Parent messages and updates" } },
      { model: "academy.attendance", label: { ar: "حضور الطفل اليومي", en: "Child's daily attendance" } },
    ],
    shownAs: {
      ar: "بوابة ولي الأمر: تقارير دورية، إشعارات، ومتابعة حضور الطفل — تُنفذ ضمن الإضافة المخصصة نفسها.",
      en: "A parent portal: periodic reports, notifications, and attendance tracking — delivered within the same custom extension.",
    },
    custom: true,
  },
  {
    id: "program-admin",
    name: { ar: "إدارة البرامج والأسعار", en: "Programs & pricing management" },
    appName: "Sales / eCommerce",
    models: [
      { model: "product.template", label: { ar: "البرنامج كمنتج", en: "The program as a product" } },
      { model: "product.product", label: { ar: "الباقة كمتغيّر بسعره", en: "Each plan as a priced variant" } },
      { model: "product.pricelist", label: { ar: "قوائم الأسعار والعروض", en: "Pricelists and offers" } },
    ],
    shownAs: {
      ar: "شاشة داخل الموقع لإضافة البرامج وتعديل باقاتها وأسعارها وحذفها، بنفس منطق بطاقة المنتج في أودو، وتنعكس التغييرات مباشرة على صفحات البرامج والتسجيل.",
      en: "An in-site screen to add, edit, and delete programs with their plans and prices — mirroring Odoo's product form, with changes reflected instantly across the programs and registration pages.",
    },
  },
];
