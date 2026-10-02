export const questions = [
  {
    id: 1,
    text: {
      en: "Oh no! A giant meteor is hurtling toward Earth! What is your immediate cartoon counter-attack?",
      ar: "كارثة! نيزك عملاق يتجه نحو الأرض بسرعة! ما هي خطتك الكرتونية الخارقة للتصدي له؟",
      fr: "Oh non ! Un météore géant fonce vers la Terre ! Quelle est ta contre-attaque de dessin animé ?"
    },
    options: [
      {
        text: {
          en: "Scream for 3 straight episodes until my hair turns glowing gold and punch it.",
          ar: "أصرخ لـ 3 حلقات متتالية حتى يتحول شعري للّون الذهبي المشع ثم ألكمه.",
          fr: "Crier pendant 3 épisodes complets jusqu'à ce que mes cheveux deviennent dorés et le frapper."
        },
        scores: { action: 2 }
      },
      {
        text: {
          en: "Kick a blazing soccer ball straight into the meteor to redirect it into the sun.",
          ar: "أركل كرة قدم مشتعلة مباشرة نحو النيزك لتغيير مساره نحو الشمس.",
          fr: "Taper dans un ballon de foot en feu directement sur le météore pour le renvoyer sur le soleil."
        },
        scores: { sport: 2 }
      },
      {
        text: {
          en: "Adjust my glasses, smirk, and activate my anti-meteor giant laser satellite.",
          ar: "أعدل نظاراتي الذكية، أبتسم بثقة، وأفعل قمرًا صناعيًا عملاقًا ليزريًا مضادًا للنيازك.",
          fr: "Ajuster mes lunettes, sourire intelligemment et activer mon satellite laser géant anti-météore."
        },
        scores: { science: 2 }
      },
      {
        text: {
          en: "Pack a backpack, grab an old map, and jump into a mysterious portal to find a new home.",
          ar: "أحزم حقيبتي، آخذ خريطة قديمة، وأقفز في بوابة غامضة للبحث عن موطن جديد.",
          fr: "Préparer un sac à dos, prendre une vieille carte et sauter dans un portail mystérieux."
        },
        scores: { adventure: 2 }
      }
    ]
  },
  {
    id: 2,
    text: {
      en: "You are late for the first day of school! How are you getting there?",
      ar: "لقد تأخرت عن اليوم الأول في المدرسة! كيف ستصل إلى هناك؟",
      fr: "Tu es en retard pour le premier jour d'école ! Comment tu y vas ?"
    },
    options: [
      {
        text: {
          en: "Running with a full slice of toast in my mouth while crying 'I'm late, I'm late!'",
          ar: "أركض وفي فمي قطعة توست وأنا أصرخ باكياً: 'لقد تأخرت، لقد تأخرت!'",
          fr: "Courir avec une tartine dans la bouche en criant 'Je suis en retard, je suis en retard !'"
        },
        scores: { comedy: 2 }
      },
      {
        text: {
          en: "Sprint across telephone wires, doing backflips over traffic to look cool.",
          ar: "أركض بسرعة خارقة فوق أسلاك الهاتف وأقوم بشقلبات خلفية فوق السيارات لأبدو رائعاً.",
          fr: "Courir sur les câbles téléphoniques en faisant des saltos au-dessus des voitures."
        },
        scores: { action: 2 }
      },
      {
        text: {
          en: "Suddenly spin around in a magical flash of light and teleport there in a beautiful outfit.",
          ar: "أدور فجأة في ومضة ضوء سحرية لأجد نفسي هناك مرتدياً ملابس براقة وجميلة.",
          fr: "Tourner sur moi-même dans un flash magique et me téléporter là-bas dans une tenue magnifique."
        },
        scores: { zumorroda: 2 }
      },
      {
        text: {
          en: "Crawl there slowly because I am a literal giant baby holding a massive lollipop.",
          ar: "أزحف ببطء شديد لأنني طفل عملاق أحمل مصاصة حلوى ضخمة.",
          fr: "Ramper lentement parce que je suis un bébé géant avec une énorme sucette."
        },
        scores: { bonbon: 2 }
      }
    ]
  }
];

export const uiStrings = {
  startScreen: {
    title: { en: "Which Planet Are You?", ar: "أي كوكب أنت؟", fr: "Quel Planète Es-Tu ?" },
    desc: {
      en: "Guess the choices from your ultimate childhood scenarios. The crazier your cartoon logic, the closer your true planetary alignment!",
      ar: "اختر إجاباتك بناءً على مواقف طفولتك الخيالية. كلما كان منطقك الكرتوني مجنونًا، كلما كنت أقرب لكوكبك الحقيقي!",
      fr: "Devine les choix de tes scénarios d'enfance. Plus ta logique de dessin animé est folle, plus ton alignement planétaire est proche !"
    },
    btn: { en: "Start The Mission", ar: "ابدأ المهمة", fr: "Démarrer La Mission" }
  },
  quizScreen: {
    scenario: { en: "Scenario", ar: "الموقف", fr: "Scénario" },
    of: { en: "of", ar: "من", fr: "sur" }
  },
  resultScreen: {
    destiny: { en: "Your Cosmic Destiny:", ar: "مصيرك الكوني المكتوب:", fr: "Ton Destin Cosmique :" },
    planet: { en: "Planet", ar: "كوكب", fr: "Planète" },
    btn: { en: "Test Another Variant", ar: "اختبر شخصية أخرى", fr: "Tester Une Autre Variante" }
  }
}; // تم إغلاق الكائن هنا بشكل صحيح قبل بدء كائن الكواكب

export const planets = {
  action: {
    color: "#8898A1",
    name: { en: "Action", ar: "أكشن", fr: "Action" },
    desc: {
      en: "You belong to the planet of continuous energy and epic showdowns, just like Goku, Vegeta, and Detective Conan. You face challenges head-on and never back down from a battlefield.",
      ar: "تنتمي إلى كوكب طاقة التحدي والمواجهات الملحمية الخالدة مثل غوكو، فيجيتا، والمحقق كونان. تواجه مشاكلك وقضاياك مباشرة ولا تيأس أبداً.",
      fr: "Tu appartiens à la planète de l'énergie brute et des duels épiques, tout comme Goku, Vegeta et Détective Conan. Tu affrontes les obstacles de front sans jamais battre en retraite."
    }
  },
  sport: {
    color: "#3C470A",
    name: { en: "Sports", ar: "رياضة", fr: "Sport" },
    desc: {
      en: "Determination, training arc sequences, and teamwork define you, just like Captain Tsubasa. You know that victory lives inside a hardworking heart.",
      ar: "العزم، تدريبات الإصرار المتواصلة، والروح الجماعية يمثلونك تماماً مثل الكابتن ماجد أو أبطال سيلفرس. تؤمن أن الفوز يحتاج جهداً كبيراً ولا تتوقف عن السعي.",
      fr: "La détermination, l'entraînement rigoureux et l'esprit d'équipe te définissent, tout comme Captain Tsubasa. Tu sais que la victoire se trouve dans le cœur de ceux qui travaillent dur."
    }
  },
  adventure: {
    color: "#53306A",
    name: { en: "Adventure", ar: "مغامرات", fr: "Aventure" },
    desc: {
      en: "Curiosity pushes you to explore uncharted worlds, just like Simba, Adnan, and Lina. Hidden pathways, cryptic mysteries, and forgotten ancient maps are your true calling.",
      ar: "شغفك يدفعك لاستكشاف عوالم غامضة وجديدة تماماً مثل سيمبا أو عدنان ولينا. الخرائط القديمة المنسية والرحلات الاستكشافية المشوقة هي ما تبحث عنه.",
      fr: "Ta curiosité t'emmène vers des mondes sauvages et inexplorés, tout comme Simba, Adnan et Lina. Les passages secrets, les mystères et les vieilles cartes sont ta vocation."
    }
  },
  comedy: {
    color: "#F9A400",
    name: { en: "Comedy", ar: "كوميديا", fr: "Comédie" },
    desc: {
      en: "You break real-world logic with pure laughter, just like the wacky cast of Tom and Jerry or the Mask. Slipping on literal banana peels and sharing punchlines is how you survive.",
      ar: "تكسر قوانين الواقع والفيزياء بالضحك والمرح العفوي المستمر مثل ثنائي توم وجيري أو القناع الضاحك. المواقف الطريفة والابتسامة هي سلاحك لتبسيط كل الأمور.",
      fr: "Tu brises la logique du monde réel par le rire et la dérision, tout comme Tom et Jerry ou The Mask. Les farces absurdes et la bonne humeur sont tes meilleurs outils."
    }
  },
  science: {
    color: "#85E9F3",
    name: { en: "Science", ar: "علوم", fr: "Sciences" },
    desc: {
      en: "Logic, high-tech devices, and calculated plans guide you, just like the brilliant minds in CyberFormula. You solve dilemmas with calculations, tech upgrades, and sheer brainpower.",
      ar: "المنطق، الاختراعات المتطورة، والخطط المدروسة تقودك دائماً مثل عباقرة سايبر فورميولا وسابق ولاحق. تحل المعضلات الكبيرة بالتفكير والتحليل الذكي.",
      fr: "La logique, les gadgets de haute technologie et les plans calculés te guident, comme les esprits brillants de CyberFormula. Tu résous les dilemmes par la réflexion."
    }
  },
  zumorroda: {
    color: "#D64AC1",
    name: { en: "Zumorroda", ar: "زمردة", fr: "Zumorroda" },
    desc: {
      en: "Empathy, magical transformations, and unbreakable bonds are your constants, just like Remy, Cinderella, or Emily. You bring soft light and understanding wherever you go.",
      ar: "التعاطف، العاطفة الصادقة، والروابط القوية التي لا تنكسر هي قوتك الحقيقية مثل ريمي، سندريلا، أو إيميلي. تنشر الأمل والمحبة أينما حللت.",
      fr: "L'empathie, les transformations magiques et les amitiés sincères font ta force, tout comme Rémi, Cendrillon ou Emily. Tu apportes de la douceur partout où tu vas."
    }
  },
  bonbon: {
    color: "#E52C3C",
    name: { en: "Bon Bon", ar: "بون بون", fr: "Bon Bon" },
    desc: {
      en: "Sweetness, innocence, and pastel-colored nostalgia are your safety zones, just like Babar or Moomin. You protect your inner childhood dreams and gentle nature at all costs.",
      ar: "البراءة، العفوية المطلقة، وذكريات الطفولة الدافئة هي عالمك الخاص مثل بابار أو مغامرات ميمون في وادي الأمان. تحافظ على نقاء قلبك وأحلامك دائماً.",
      fr: "La douceur, l'innocence et la nostalgie aux tons pastel sont tes refuges, tout comme Babar ou les Moomins. Tu protèges ton âme d'enfant et ta gentillesse avant tout."
    }
  },
  abjad: {
    color: "#E69E3F",
    name: { en: "Abjad", ar: "أبجد", fr: "Abjad" },
    desc: {
      en: "Knowledge, grammar precision, and educational paths motivate you. You love learning new topics, quoting facts, and explaining difficult details with complete accuracy.",
      ar: "المعرفة الثقافية، دقة الكلمات، وحب القراءة والمطالعة يحفزونك دائماً. تعشق تعلم لغات جديدة وتوضيح الأمور للجميع بكل أمانة وتفصيل.",
      fr: "Le savoir, la précision de la grammaire et la culture générale te passionnent. Tu adores découvrir de nouvelles matières et expliquer les détails avec clarté."
    }
  },
  history: {
    color: "#9E7E55",
    name: { en: "History", ar: "تاريخ", fr: "Histoire" },
    desc: {
  en: "Ancient tales and ancestral paths deeply inspire you, just like the legends in Robin Hood. You hold a deep respect for historical structures, secrets, and traditional wisdom.",
  ar: "القصص القديمة، وعبر التاريخ وأصالة الماضي تلهمك بعمق مثل أساطير روبن هود وصقور الأرض. تملك احتراماً كبيراً للحكمة والقصص التراثية.",
  fr: "Les récits d'autrefois et l'héritage du passé t'inspirent profondément, tout comme les aventures de Robin des Bois. Tu as un grand respect pour la sagesse historique."
  }
},
movies: {
color: "#FE5E54",
name: { en: "Movies", ar: "أفلام", fr: "Films" },
desc: {
en: "Grand cinematic lighting and dramatic storytelling follow you everywhere. You view your life path like a spectacular feature film full of surprising plot twists and dynamic frames.",
ar: "الأجواء السينمائية الكبرى، الإخراج المميز، والقصص المشوقة تتبعك في كل مكان. ترى مجريات حياتك كفيلم رائع مليء بالتحولات الدرامية الباهرة.",
fr: "Les grandes mises en scène et les récits captivants t'accompagnent. Tu vois ta propre vie comme un long-métrage spectaculaire riche en rebondissements."
}
}
};