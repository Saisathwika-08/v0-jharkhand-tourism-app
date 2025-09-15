"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface TranslationContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  t: (key: string) => string
  languages: { code: string; name: string; nativeName: string }[]
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.tripPlanner": "Trip Planner",
    "nav.guides": "Guides",
    "nav.bookings": "Bookings",
    "nav.translate": "Translate",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",

    // Homepage
    "home.title": "Discover Jharkhand",
    "home.subtitle": "Experience the untouched beauty of tribal heritage, pristine waterfalls, and dense forests",
    "home.exploreDestinations": "Explore Destinations",
    "home.planTrip": "Plan Your Trip",

    // Destinations
    "destinations.waterfalls": "Pristine Waterfalls",
    "destinations.waterfalls.desc": "Discover breathtaking waterfalls hidden in lush forests",
    "destinations.heritage": "Tribal Heritage",
    "destinations.heritage.desc": "Experience rich cultural traditions and ancient customs",
    "destinations.forests": "Dense Forests",
    "destinations.forests.desc": "Explore wildlife sanctuaries and biodiversity hotspots",
    "destinations.homestays": "Authentic Homestays",
    "destinations.homestays.desc": "Stay with local families and experience tribal lifestyle",

    // Smart Tourism
    "smartTourism.title": "Smart Tourism Features",
    "smartTourism.aiTripPlanner": "AI Trip Planner",
    "smartTourism.planYourTrip": "Plan Your Trip",
    "smartTourism.languageTranslator": "Language Translator",
    "smartTourism.startTranslating": "Start Translating",
    "smartTourism.verifiedGuides": "Verified Guides",
    "smartTourism.findGuides": "Find Guides",

    // Cuisines
    "cuisines.title": "Traditional Cuisines",
    "cuisines.subtitle": "Taste the authentic flavors of Jharkhand",
    "cuisines.dhuska": "Dhuska",
    "cuisines.dhuska.desc": "Deep-fried rice and lentil pancakes served with curry",
    "cuisines.koinarDaal": "Koinar Daal",
    "cuisines.koinarDaal.desc": "Traditional arhar dal cooked with local spices and herbs",
    "cuisines.pittha": "Pittha",
    "cuisines.pittha.desc": "Sweet rice dumplings filled with jaggery and coconut",
    "cuisines.rugra": "Rugra",
    "cuisines.rugra.desc": "Wild mushrooms cooked with onions and local spices",
    "cuisines.handia": "Handia",
    "cuisines.handia.desc": "Traditional rice beer fermented with herbs",
    "cuisines.chilkaRoti": "Chilka Roti",
    "cuisines.chilkaRoti.desc": "Thin, crispy rice flour flatbread cooked on clay ovens",

    // Emergency
    "emergency.title": "Emergency Services",
    "emergency.subtitle": "Quick access to help when you need it most",
    "emergency.police": "Police",
    "emergency.medical": "Medical Emergency",
    "emergency.fire": "Fire Department",
    "emergency.tourist": "Tourist Helpline",

    // Employment
    "employment.title": "Employment Opportunities",
    "employment.subtitle": "Supporting tribal communities through sustainable tourism",
    "employment.tourismGuideTraining": "Tourism Guide Training",
    "employment.tourismGuideTraining.duration": "3 months certification program",
    "employment.tourismGuideTraining.fee": "₹5,000 fee",
    "employment.tourismGuideTraining.description": "Learn local history, languages, and guiding skills",
    "employment.handicraftTraining": "Handicraft Training",
    "employment.handicraftTraining.duration": "6 months skill development",
    "employment.handicraftTraining.fee": "₹3,000 fee",
    "employment.handicraftTraining.description": "Traditional bamboo work and tribal art",
    "employment.homestayManagement": "Homestay Management",
    "employment.homestayManagement.duration": "2 months hospitality training",
    "employment.homestayManagement.fee": "₹4,000 fee",
    "employment.homestayManagement.description": "Hospitality and business management skills",

    // Footer
    "footer.jharkhandTourism": "Jharkhand Tourism",
    "footer.discover": "Discover the authentic beauty and rich tribal heritage of Jharkhand.",
    "footer.explore": "Explore",
    "footer.tripPlanner": "Trip Planner",
    "footer.guides": "Guides",
    "footer.bookings": "Bookings",
    "footer.translate": "Translate",
    "footer.pristineWaterfalls": "Pristine Waterfalls",
    "footer.tribalHeritage": "Tribal Heritage",
    "footer.denseForests": "Dense Forests",
    "footer.authenticHomestays": "Authentic Homestays",
    "footer.services": "Services",
    "footer.aiTripPlanner": "AI Trip Planner",
    "footer.languageTranslation": "Language Translation",
    "footer.verifiedGuides": "Verified Guides",
    "footer.bookExperiences": "Book Experiences",
    "footer.contact": "Contact",
    "footer.touristHelpline": "Tourist Helpline",
    "footer.location": "Ranchi, Jharkhand",
    "footer.copyright": "© 2024 Jharkhand Tourism. Empowering tribal communities through sustainable tourism.",

    // Common
    "common.learnMore": "Learn More",
    "common.bookNow": "Book Now",
    "common.getDirections": "Get Directions",
    "common.call": "Call",
    "common.apply": "Apply Now",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
  },

  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.destinations": "गंतव्य",
    "nav.tripPlanner": "यात्रा योजनाकार",
    "nav.guides": "गाइड",
    "nav.bookings": "बुकिंग",
    "nav.translate": "अनुवाद",
    "nav.login": "लॉगिन",
    "nav.signup": "साइन अप",
    "nav.dashboard": "डैशबोर्ड",
    "nav.logout": "लॉगआउट",

    // Homepage
    "home.title": "झारखंड की खोज करें",
    "home.subtitle": "आदिवासी विरासत, प्राचीन झरनों और घने जंगलों की अछूती सुंदरता का अनुभव करें",
    "home.exploreDestinations": "गंतव्यों का अन्वेषण करें",
    "home.planTrip": "अपनी यात्रा की योजना बनाएं",

    // Destinations
    "destinations.waterfalls": "प्राचीन झरने",
    "destinations.waterfalls.desc": "हरे-भरे जंगलों में छुपे मनमोहक झरनों की खोज करें",
    "destinations.heritage": "आदिवासी विरासत",
    "destinations.heritage.desc": "समृद्ध सांस्कृतिक परंपराओं और प्राचीन रीति-रिवाजों का अनुभव करें",
    "destinations.forests": "घने जंगल",
    "destinations.forests.desc": "वन्यजीव अभयारण्यों और जैव विविधता हॉटस्पॉट का अन्वेषण करें",
    "destinations.homestays": "प्रामाणिक होमस्टे",
    "destinations.homestays.desc": "स्थानीय परिवारों के साथ रहें और आदिवासी जीवनशैली का अनुभव करें",

    // Smart Tourism
    "smartTourism.title": "स्मार्ट पर्यटन सुविधाएं",
    "smartTourism.aiTripPlanner": "AI यात्रा योजनाकार",
    "smartTourism.planYourTrip": "अपनी यात्रा की योजना बनाएं",
    "smartTourism.languageTranslator": "भाषा अनुवादक",
    "smartTourism.startTranslating": "अनुवाद शुरू करें",
    "smartTourism.verifiedGuides": "सत्यापित गाइड",
    "smartTourism.findGuides": "गाइड खोजें",

    // Cuisines
    "cuisines.title": "पारंपरिक व्यंजन",
    "cuisines.subtitle": "झारखंड के प्रामाणिक स्वादों का स्वाद लें",
    "cuisines.dhuska": "धुस्का",
    "cuisines.dhuska.desc": "करी के साथ परोसे जाने वाले तले हुए चावल और दाल के पैनकेक",
    "cuisines.koinarDaal": "कोइनार दाल",
    "cuisines.koinarDaal.desc": "स्थानीय मसालों और जड़ी-बूटियों के साथ पकाई गई पारंपरिक अरहर दाल",
    "cuisines.pittha": "पिट्ठा",
    "cuisines.pittha.desc": "गुड़ और नारियल से भरे मीठे चावल के पकौड़े",
    "cuisines.rugra": "रुगड़ा",
    "cuisines.rugra.desc": "प्याज और स्थानीय मसालों के साथ पकाए गए जंगली मशरूम",
    "cuisines.handia": "हांडिया",
    "cuisines.handia.desc": "जड़ी-बूटियों के साथ किण्वित पारंपरिक चावल की बीयर",
    "cuisines.chilkaRoti": "चिल्का रोटी",
    "cuisines.chilkaRoti.desc": "मिट्टी के चूल्हे पर पकाई गई पतली, कुरकुरी चावल के आटे की रोटी",

    // Emergency
    "emergency.title": "आपातकालीन सेवाएं",
    "emergency.subtitle": "जब आपको सबसे ज्यादा जरूरत हो तो मदद तक त्वरित पहुंच",
    "emergency.police": "पुलिस",
    "emergency.medical": "चिकित्सा आपातकाल",
    "emergency.fire": "दमकल विभाग",
    "emergency.tourist": "पर्यटक हेल्पलाइन",

    // Employment
    "employment.title": "रोजगार के अवसर",
    "employment.subtitle": "सतत पर्यटन के माध्यम से आदिवासी समुदायों का समर्थन",
    "employment.tourismGuideTraining": "पर्यटन गाइड प्रशिक्षण",
    "employment.tourismGuideTraining.duration": "3 महीने का प्रमाणन कार्यक्रम",
    "employment.tourismGuideTraining.fee": "₹5,000 शुल्क",
    "employment.tourismGuideTraining.description": "स्थानीय इतिहास, भाषाएं और गाइडिंग कौशल सीखें",
    "employment.handicraftTraining": "हस्तशिल्प प्रशिक्षण",
    "employment.handicraftTraining.duration": "6 महीने का कौशल विकास",
    "employment.handicraftTraining.fee": "₹3,000 शुल्क",
    "employment.handicraftTraining.description": "पारंपरिक बांस का काम और आदिवासी कला",
    "employment.homestayManagement": "होमस्टे प्रबंधन",
    "employment.homestayManagement.duration": "2 महीने का आतिथ्य प्रशिक्षण",
    "employment.homestayManagement.fee": "₹4,000 शुल्क",
    "employment.homestayManagement.description": "आतिथ्य और व्यापार प्रबंधन कौशल",

    // Footer
    "footer.jharkhandTourism": "झारखंड पर्यटन",
    "footer.discover": "झारखंड की प्रामाणिक सुंदरता और समृद्ध आदिवासी विरासत की खोज करें।",
    "footer.explore": "अन्वेषण करें",
    "footer.tripPlanner": "यात्रा योजनाकार",
    "footer.guides": "गाइड",
    "footer.bookings": "बुकिंग",
    "footer.translate": "अनुवाद",
    "footer.pristineWaterfalls": "प्राचीन झरने",
    "footer.tribalHeritage": "आदिवासी विरासत",
    "footer.denseForests": "घने जंगल",
    "footer.authenticHomestays": "प्रामाणिक होमस्टे",
    "footer.services": "सेवाएं",
    "footer.aiTripPlanner": "AI यात्रा योजनाकार",
    "footer.languageTranslation": "भाषा अनुवाद",
    "footer.verifiedGuides": "सत्यापित गाइड",
    "footer.bookExperiences": "अनुभव बुक करें",
    "footer.contact": "संपर्क",
    "footer.touristHelpline": "पर्यटक हेल्पलाइन",
    "footer.location": "रांची, झारखंड",
    "footer.copyright": "© 2024 झारखंड पर्यटन। सतत पर्यटन के माध्यम से आदिवासी समुदायों को सशक्त बनाना।",

    // Common
    "common.learnMore": "और जानें",
    "common.bookNow": "अभी बुक करें",
    "common.getDirections": "दिशा-निर्देश प्राप्त करें",
    "common.call": "कॉल करें",
    "common.apply": "अभी आवेदन करें",
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हुआ",
  },

  sat: {
    // Navigation (Santali)
    "nav.home": "ᱚᱲᱟᱜ",
    "nav.destinations": "ᱥᱮᱱᱚᱜ ᱴᱷᱟᱶ",
    "nav.tripPlanner": "ᱫᱟᱲᱮ ᱯᱞᱟᱱ",
    "nav.guides": "ᱜᱟᱭᱤᱰ",
    "nav.bookings": "ᱵᱩᱠᱤᱝ",
    "nav.translate": "ᱛᱚᱨᱡᱚᱢᱟ",
    "nav.login": "ᱞᱚᱜᱤᱱ",
    "nav.signup": "ᱥᱟᱭᱤᱱ ᱟᱯ",
    "nav.dashboard": "ᱰᱮᱥᱵᱚᱨᱰ",
    "nav.logout": "ᱞᱚᱜᱟᱣᱴ",

    // Homepage
    "home.title": "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱧᱮᱞ ᱢᱮ",
    "home.subtitle": "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱞᱟᱠᱪᱟᱨ, ᱡᱷᱟᱨᱱᱟ ᱟᱨ ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱥᱩᱱᱫᱚᱨ ᱧᱮᱞ ᱢᱮ",
    "home.exploreDestinations": "ᱡᱟᱭᱜᱟ ᱠᱚ ᱧᱮᱞ ᱢᱮ",
    "home.planTrip": "ᱟᱢᱟᱜ ᱫᱟᱲᱮ ᱯᱞᱟᱱ ᱢᱮ",

    // Destinations
    "destinations.waterfalls": "ᱥᱟᱯᱷᱟ ᱡᱷᱟᱨᱱᱟ",
    "destinations.waterfalls.desc": "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱵᱤᱨ ᱨᱮ ᱩᱠᱩ ᱟᱠᱟᱱ ᱡᱷᱟᱨᱱᱟ ᱠᱚ ᱧᱮᱞ ᱢᱮ",
    "destinations.heritage": "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱞᱟᱠᱪᱟᱨ",
    "destinations.heritage.desc": "ᱢᱟᱨᱟᱝ ᱞᱟᱠᱪᱟᱨ ᱟᱨ ᱢᱟᱨᱮ ᱨᱤᱛ ᱠᱚ ᱵᱟᱰᱟᱭ ᱢᱮ",
    "destinations.forests": "ᱜᱷᱩᱸᱴ ᱵᱤᱨ",
    "destinations.forests.desc": "ᱡᱤᱵᱽ ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨᱠᱷᱟ ᱴᱷᱟᱶ ᱠᱚ ᱧᱮᱞ ᱢᱮ",
    "destinations.homestays": "ᱥᱟᱹᱨᱤ ᱚᱲᱟᱜ ᱛᱟᱦᱮᱸᱱ",
    "destinations.homestays.desc": "ᱚᱲᱟᱜ ᱦᱚᱲ ᱥᱟᱶ ᱛᱟᱦᱮᱸᱱ ᱟᱨ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱡᱤᱭᱚᱱ ᱵᱟᱰᱟᱭ ᱢᱮ",

    // Smart Tourism
    "smartTourism.title": "ᱱᱟᱶᱟ ᱦᱚᱨ ᱫᱟᱲᱮ",
    "smartTourism.aiTripPlanner": "AI ᱫᱟᱲᱮ ᱯᱞᱟᱱ",
    "smartTourism.planYourTrip": "ᱟᱢᱟᱜ ᱫᱟᱲᱮ ᱯᱞᱟᱱ ᱢᱮ",
    "smartTourism.languageTranslator": "ᱯᱟᱹᱨᱥᱤ ᱛᱚᱨᱡᱚᱢᱟ",
    "smartTourism.startTranslating": "ᱛᱚᱨᱡᱚᱢᱟ ᱮᱛᱦᱚᱵ ᱢᱮ",
    "smartTourism.verifiedGuides": "ᱯᱚᱨᱠᱷᱟᱣ ᱟᱠᱟᱱ ᱜᱟᱭᱤᱰ",
    "smartTourism.findGuides": "ᱜᱟᱭᱤᱰ ᱯᱟᱱᱛᱮ ᱢᱮ",

    // Cuisines
    "cuisines.title": "ᱢᱟᱨᱮ ᱡᱚᱢ ᱧᱩ",
    "cuisines.subtitle": "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱥᱟᱹᱨᱤ ᱡᱚᱢ ᱧᱩ ᱵᱟᱰᱟᱭ ᱢᱮ",
    "cuisines.dhuska": "ᱫᱷᱩᱥᱠᱟ",
    "cuisines.dhuska.desc": "ᱩᱨᱩᱫ ᱪᱟᱣᱞᱮ ᱟᱨ ᱫᱟᱹᱞ ᱠᱷᱚᱱ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱ ᱯᱤᱴᱷᱟᱹ ᱠᱟᱹᱨᱤ ᱥᱟᱶ",
    "cuisines.koinarDaal": "ᱠᱚᱭᱱᱟᱨ ᱫᱟᱹᱞ",
    "cuisines.koinarDaal.desc": "ᱟᱨᱦᱟᱨ ᱫᱟᱹᱞ ᱫᱤᱥᱚᱢ ᱢᱚᱥᱟᱞᱟ ᱟᱨ ᱡᱚᱲᱤ ᱵᱩᱴᱤ ᱥᱟᱶ ᱠᱚ ᱵᱮᱱᱟᱣᱟ",
    "cuisines.pittha": "ᱯᱤᱴᱷᱟᱹ",
    "cuisines.pittha.desc": "ᱪᱤᱱᱤ ᱟᱨ ᱱᱟᱹᱲᱠᱮᱞ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱ ᱪᱟᱣᱞᱮ ᱨᱮᱱᱟᱜ ᱢᱤᱴᱷᱟᱹ",
    "cuisines.rugra": "ᱨᱩᱜᱲᱟ",
    "cuisines.rugra.desc": "ᱵᱤᱨ ᱨᱮ ᱧᱟᱢᱚᱜ ᱢᱟᱹᱥᱨᱩᱢ ᱯᱮᱭᱟᱡᱽ ᱟᱨ ᱫᱤᱥᱚᱢ ᱢᱚᱥᱟᱞᱟ ᱥᱟᱶ ᱠᱚ ᱵᱮᱱᱟᱣᱟ",
    "cuisines.handia": "ᱦᱟᱺᱰᱤᱭᱟ",
    "cuisines.handia.desc": "ᱢᱟᱨᱮ ᱪᱟᱣᱞᱮ ᱨᱮᱱᱟᱜ ᱵᱚᱛᱚᱞ ᱡᱟᱦᱟᱸ ᱫᱚ ᱡᱚᱲᱤ ᱵᱩᱴᱤ ᱥᱟᱶ ᱠᱚ ᱧᱩᱭᱟ",
    "cuisines.chilkaRoti": "ᱪᱷᱤᱞᱠᱟ ᱨᱚᱴᱤ",
    "cuisines.chilkaRoti.desc": "ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱪᱩᱞᱦᱟ ᱨᱮ ᱪᱟᱣᱞᱮ ᱨᱮᱱᱟᱜ ᱨᱚᱴᱤ ᱠᱚ ᱵᱮᱱᱟᱣᱟ",

    // Emergency
    "emergency.title": "ᱮᱢᱟᱨᱡᱮᱱᱥᱤ ᱥᱮᱵᱟ",
    "emergency.subtitle": "ᱡᱚᱠᱷᱚᱱ ᱟᱢ ᱡᱟᱹᱨᱩᱲ ᱠᱟᱱᱟ ᱩᱱ ᱚᱠᱛᱮ ᱜᱚᱲᱚᱜ ᱢᱮ",
    "emergency.police": "ᱯᱩᱞᱤᱥ",
    "emergency.medical": "ᱢᱮᱰᱤᱠᱟᱞ ᱮᱢᱟᱨᱡᱮᱱᱥᱤ",
    "emergency.fire": "ᱥᱮᱸᱜᱮᱞ ᱵᱤᱵᱷᱟᱜ",
    "emergency.tourist": "ᱫᱟᱲᱮᱜ ᱦᱚᱲ ᱜᱚᱲᱚᱜ ᱞᱟᱭᱤᱱ",

    // Employment
    "employment.title": "ᱪᱟᱹᱠᱨᱤ ᱧᱟᱢ ᱨᱮᱱᱟᱜ ᱫᱟᱣ",
    "employment.subtitle": "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱥᱟᱶᱛᱟ ᱫᱟᱲᱮ ᱦᱚᱛᱮᱛᱮ ᱠᱚ ᱜᱚᱲᱚᱜ ᱠᱟᱱᱟ",
    "employment.tourismGuideTraining": "ᱫᱟᱲᱮ ᱜᱟᱭᱤᱰ ᱴᱨᱮᱱᱤᱝ",
    "employment.tourismGuideTraining.duration": "᱓ ᱪᱟᱸᱫᱚ ᱨᱮᱱᱟᱜ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱯᱨᱚᱜᱨᱟᱢ",
    "employment.tourismGuideTraining.fee": "₹5,000 ᱯᱷᱤᱥ",
    "employment.tourismGuideTraining.description": "ᱫᱤᱥᱚᱢ ᱨᱮᱱᱟᱜ ᱱᱟᱜᱟᱢ, ᱯᱟᱹᱨᱥᱤ ᱟᱨ ᱜᱟᱭᱤᱰ ᱵᱟᱵᱚᱛ ᱥᱮᱬᱟᱭ ᱢᱮ",
    "employment.handicraftTraining": "ᱛᱤ ᱛᱮ ᱵᱮᱱᱟᱣ ᱥᱟᱢᱟᱱ ᱨᱮᱱᱟᱜ ᱴᱨᱮᱱᱤᱝ",
    "employment.handicraftTraining.duration": "᱖ ᱪᱟᱸᱫᱚ ᱨᱮᱱᱟᱜ ᱥᱠᱤᱞ ᱰᱮᱵᱞᱚᱯᱢᱮᱱᱴ",
    "employment.handicraftTraining.fee": "₹3,000 ᱯᱷᱤᱥ",
    "employment.handicraftTraining.description": "ᱢᱟᱨᱮ ᱵᱟᱸᱥ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ ᱟᱨ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱨᱴ",
    "employment.homestayManagement": "ᱚᱲᱟᱜ ᱛᱟᱦᱮᱸᱱ ᱨᱮᱱᱟᱜ ᱢᱮᱱᱮᱡᱽᱢᱮᱱᱴ",
    "employment.homestayManagement.duration": "᱒ ᱪᱟᱸᱫᱚ ᱨᱮᱱᱟᱜ ᱦᱚᱥᱯᱤᱴᱟᱞᱤᱴᱤ ᱴᱨᱮᱱᱤᱝ",
    "employment.homestayManagement.fee": "₹4,000 ᱯᱷᱤᱥ",
    "employment.homestayManagement.description": "ᱦᱚᱥᱯᱤᱴᱟᱞᱤᱴᱤ ᱟᱨ ᱵᱤᱡᱱᱮᱥ ᱢᱮᱱᱮᱡᱽᱢᱮᱱᱴ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ",

    // Footer
    "footer.jharkhandTourism": "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱫᱟᱲᱮ",
    "footer.discover": "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱥᱟᱹᱨᱤ ᱥᱚᱱᱫᱚᱨ ᱟᱨ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱞᱟᱠᱪᱟᱨ ᱧᱮᱞ ᱢᱮ",
    "footer.explore": "ᱧᱮᱞ ᱢᱮ",
    "footer.tripPlanner": "ᱫᱟᱲᱮ ᱯᱞᱟᱱ",
    "footer.guides": "ᱜᱟᱭᱤᱰ",
    "footer.bookings": "ᱵᱩᱠᱤᱝ",
    "footer.translate": "ᱛᱚᱨᱡᱚᱢᱟ",
    "footer.pristineWaterfalls": "ᱥᱟᱯᱷᱟ ᱡᱷᱟᱨᱱᱟ",
    "footer.tribalHeritage": "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱞᱟᱠᱪᱟᱨ",
    "footer.denseForests": "ᱜᱷᱩᱸᱴ ᱵᱤᱨ",
    "footer.authenticHomestays": "ᱥᱟᱹᱨᱤ ᱚᱲᱟᱜ ᱛᱟᱦᱮᱸᱱ",
    "footer.services": "ᱥᱮᱵᱟ",
    "footer.aiTripPlanner": "AI ᱫᱟᱲᱮ ᱯᱞᱟᱱ",
    "footer.languageTranslation": "ᱯᱟᱹᱨᱥᱤ ᱛᱚᱨᱡᱚᱢᱟ",
    "footer.verifiedGuides": "ᱯᱚᱨᱠᱷᱟᱣ ᱟᱠᱟᱱ ᱜᱟᱭᱤᱰ",
    "footer.bookExperiences": "ᱮᱠᱥᱯᱮᱨᱤᱭᱮᱱᱥ ᱵᱩᱠ ᱢᱮ",
    "footer.contact": "ᱥᱟᱹᱜᱟᱹᱭ ᱢᱮ",
    "footer.touristHelpline": "ᱫᱟᱲᱮᱜ ᱦᱚᱲ ᱜᱚᱲᱚᱜ ᱞᱟᱭᱤᱱ",
    "footer.location": "ᱨᱟᱺᱪᱤ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ",
    "footer.copyright": "© ᱒᱐᱒᱔ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱫᱟᱲᱮ. ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱥᱟᱶᱛᱟ ᱫᱟᱲᱮ ᱦᱚᱛᱮᱛᱮ ᱠᱚ ᱜᱚᱲᱚᱜ ᱠᱟᱱᱟ",

    // Common
    "common.learnMore": "ᱟᱨᱦᱚᱸ ᱵᱟᱰᱟᱭ ᱢᱮ",
    "common.bookNow": "ᱱᱤᱛ ᱜᱮ ᱵᱩᱠ ᱢᱮ",
    "common.getDirections": "ᱰᱟᱦᱟᱨ ᱧᱟᱢ ᱢᱮ",
    "common.call": "ᱠᱚᱞ ᱢᱮ",
    "common.apply": "ᱱᱤᱛ ᱜᱮ ᱮᱯᱞᱟᱭ ᱢᱮ",
    "common.loading": "ᱞᱚᱰᱤᱝ...",
    "common.error": "ᱠᱤᱪᱷᱩ ᱜᱟᱞᱟᱛ ᱜᱮᱭᱟ",
  },
}

interface TranslationProviderProps {
  children: ReactNode
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [currentLanguage, setLanguage] = useState<string>("en")

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", currentLanguage)
  }, [currentLanguage])

  const t = (key: string) => {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
      console.warn(`Translation not found for key: ${key} in language: ${currentLanguage}`)
      return key // Fallback to the key itself if translation is missing
    }
    return translations[currentLanguage][key] || key
  }

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" },
  ]

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
