// Shared mock data for all conversation prototypes

export type Channel = "phone" | "whatsapp" | "email";
export type Intent = "buy" | "rent" | "sell" | "rent_out" | null;
export type Status = "new" | "contacted" | "qualified" | "irrelevant";
export type PropertyType = "apartment" | "house" | "villa" | "studio" | "office" | "land" | null;

export interface Conversation {
  id: string;
  date: string;
  time: string;
  channel: Channel;
  clientName: string | null;
  clientPhone: string;
  clientEmail: string | null;
  summary: string;
  intent: Intent;
  propertyType: PropertyType;
  source: string;
  refNumber: string | null;
  location: string | null;
  price: string | null;
  duration: string | null; // for calls: "2:02"
  messageCount: number | null; // for chats
  status: Status;
  leadLevel: number; // 1-5
  language: string;
  humanNeeded: boolean;
  providesName: boolean;
  providesBudget: boolean;
  providesPhone: boolean;
  providesLocation: boolean;
}

export const conversations: Conversation[] = [
  {
    id: "conv_5701khpeww4x",
    date: "Mar 13, 2026",
    time: "7:38 PM",
    channel: "phone",
    clientName: "Andreas Papadopoulos",
    clientPhone: "+357 96 482 731",
    clientEmail: null,
    summary: "Wants to rent a 2-bedroom apartment in Limassol near the sea. Has a dog. Budget up to €1,200/month. Prefers ground floor.",
    intent: "rent",
    propertyType: "apartment",
    source: "Bazaraki",
    refNumber: "1205741",
    location: "Limassol, Agios Dimitrios",
    price: "€999,999+",
    duration: "2:02",
    messageCount: null,
    status: "contacted",
    leadLevel: 3,
    language: "Greek",
    humanNeeded: false,
    providesName: true,
    providesBudget: true,
    providesPhone: true,
    providesLocation: true,
  },
  {
    id: "conv_8392mfke12ab",
    date: "Mar 13, 2026",
    time: "7:34 PM",
    channel: "whatsapp",
    clientName: "Maria Ioannou",
    clientPhone: "+30 211 016 8800",
    clientEmail: "maria.ioannou@gmail.com",
    summary: "Looking for a family house in Paphos. 3 bedrooms, garden, near international school. Moving in September. Budget around €300K.",
    intent: "buy",
    propertyType: "house",
    source: "Spitogatos",
    refNumber: "10284",
    location: "Paphos, Kato Paphos",
    price: "€300,000+",
    duration: null,
    messageCount: 15,
    status: "new",
    leadLevel: 4,
    language: "English",
    humanNeeded: true,
    providesName: true,
    providesBudget: true,
    providesPhone: false,
    providesLocation: true,
  },
  {
    id: "conv_1029xkwp39vm",
    date: "Mar 13, 2026",
    time: "7:31 PM",
    channel: "phone",
    clientName: null,
    clientPhone: "+357 99 123 456",
    clientEmail: null,
    summary: "Asked about property #D-4195 in Agios Dometios. Wants to schedule a viewing this weekend. Speaks only Greek.",
    intent: "buy",
    propertyType: "apartment",
    source: "Direct",
    refNumber: "D-4195",
    location: "Nicosia, Agios Dometios",
    price: null,
    duration: "1:26",
    messageCount: null,
    status: "new",
    leadLevel: 3,
    language: "Greek",
    humanNeeded: true,
    providesName: false,
    providesBudget: false,
    providesPhone: false,
    providesLocation: false,
  },
  {
    id: "conv_4820nflw82qx",
    date: "Mar 13, 2026",
    time: "7:30 PM",
    channel: "whatsapp",
    clientName: "Elena Petrova",
    clientPhone: "+7 916 555 1234",
    clientEmail: "elena.p@yandex.ru",
    summary: "Russian-speaking buyer. Interested in investment property in Limassol. 1-2 bedroom apartments, budget €150-200K. Wants rental yield info.",
    intent: "buy",
    propertyType: "apartment",
    source: "Bazaraki",
    refNumber: null,
    location: "Limassol",
    price: "€150,000–200,000",
    duration: null,
    messageCount: 18,
    status: "qualified",
    leadLevel: 5,
    language: "Russian",
    humanNeeded: false,
    providesName: true,
    providesBudget: true,
    providesPhone: true,
    providesLocation: true,
  },
  {
    id: "conv_7743kqpw19zx",
    date: "Mar 13, 2026",
    time: "7:29 PM",
    channel: "phone",
    clientName: "James Wilson",
    clientPhone: "+44 7911 123456",
    clientEmail: null,
    summary: "UK buyer relocating to Cyprus. Looking for a villa in Paphos with pool. Budget £400K. Planning to visit in April.",
    intent: "buy",
    propertyType: "villa",
    source: "Rightmove",
    refNumber: null,
    location: "Paphos, Coral Bay",
    price: "€460,000+",
    duration: "1:59",
    messageCount: null,
    status: "qualified",
    leadLevel: 5,
    language: "English",
    humanNeeded: true,
    providesName: true,
    providesBudget: true,
    providesPhone: false,
    providesLocation: true,
  },
  {
    id: "conv_3391bncx55kp",
    date: "Mar 13, 2026",
    time: "7:28 PM",
    channel: "phone",
    clientName: "Nikos Georgiou",
    clientPhone: "+357 97 654 321",
    clientEmail: null,
    summary: "Called about a listing but wrong number. Not interested in property. Wanted a car rental agency.",
    intent: null,
    propertyType: null,
    source: "Direct",
    refNumber: null,
    location: null,
    price: null,
    duration: "0:45",
    messageCount: null,
    status: "irrelevant",
    leadLevel: 1,
    language: "Greek",
    humanNeeded: false,
    providesName: true,
    providesBudget: false,
    providesPhone: false,
    providesLocation: false,
  },
  {
    id: "conv_6620xmwq84fb",
    date: "Mar 13, 2026",
    time: "7:26 PM",
    channel: "whatsapp",
    clientName: "Svetlana Kozlova",
    clientPhone: "+357 96 777 888",
    clientEmail: null,
    summary: "Looking to rent a furnished studio or 1-bed in Limassol for 6 months. Budget €600-800/month. Needs parking. Arriving next month.",
    intent: "rent",
    propertyType: "studio",
    source: "Bazaraki",
    refNumber: "BR-9921",
    location: "Limassol, City Center",
    price: "€600–800/mo",
    duration: null,
    messageCount: 14,
    status: "contacted",
    leadLevel: 3,
    language: "Russian",
    humanNeeded: false,
    providesName: true,
    providesBudget: true,
    providesPhone: false,
    providesLocation: true,
  },
  {
    id: "conv_9912lpqz37dn",
    date: "Mar 13, 2026",
    time: "7:09 PM",
    channel: "email",
    clientName: "John Smith",
    clientPhone: "+1 555 012 3456",
    clientEmail: "john.smith@outlook.com",
    summary: "Lead form from Bazaraki. Interested in 1-bed studio in Limassol center for short-term rental investment.",
    intent: "buy",
    propertyType: "studio",
    source: "Bazaraki",
    refNumber: "1205988",
    location: "Limassol, City Center",
    price: "€90,000+",
    duration: null,
    messageCount: null,
    status: "new",
    leadLevel: 2,
    language: "English",
    humanNeeded: false,
    providesName: true,
    providesBudget: false,
    providesPhone: false,
    providesLocation: true,
  },
  {
    id: "conv_2238nnxp66rt",
    date: "Mar 13, 2026",
    time: "7:05 PM",
    channel: "phone",
    clientName: null,
    clientPhone: "+357 22 123 456",
    clientEmail: null,
    summary: "Very short call, no conversation. Caller hung up immediately.",
    intent: null,
    propertyType: null,
    source: "Direct",
    refNumber: null,
    location: null,
    price: null,
    duration: "0:11",
    messageCount: null,
    status: "irrelevant",
    leadLevel: 1,
    language: "Unknown",
    humanNeeded: false,
    providesName: false,
    providesBudget: false,
    providesPhone: false,
    providesLocation: false,
  },
  {
    id: "conv_5501kkqw22mx",
    date: "Mar 13, 2026",
    time: "6:56 PM",
    channel: "whatsapp",
    clientName: "Dimitris Constantinou",
    clientPhone: "+357 99 888 777",
    clientEmail: "dim.const@gmail.com",
    summary: "Wants to sell his 3-bedroom apartment in Strovolos. Asking €240K. Bought 5 years ago. Needs quick sale due to relocation.",
    intent: "sell",
    propertyType: "apartment",
    source: "Direct",
    refNumber: null,
    location: "Nicosia, Strovolos",
    price: "€240,000",
    duration: null,
    messageCount: 21,
    status: "new",
    leadLevel: 4,
    language: "Greek",
    humanNeeded: true,
    providesName: true,
    providesBudget: true,
    providesPhone: true,
    providesLocation: true,
  },
  {
    id: "conv_7789ppzx11ww",
    date: "Mar 12, 2026",
    time: "6:30 PM",
    channel: "email",
    clientName: "Sophie Martin",
    clientPhone: "+33 6 12 34 56 78",
    clientEmail: "sophie.martin@free.fr",
    summary: "French buyer looking for retirement home in Paphos. Wants 2 bedrooms, sea view, quiet neighborhood. Budget €250-350K.",
    intent: "buy",
    propertyType: "house",
    source: "Spitogatos",
    refNumber: null,
    location: "Paphos",
    price: "€250,000–350,000",
    duration: null,
    messageCount: null,
    status: "new",
    leadLevel: 3,
    language: "English",
    humanNeeded: false,
    providesName: true,
    providesBudget: true,
    providesPhone: false,
    providesLocation: true,
  },
  {
    id: "conv_1100mmzx44bb",
    date: "Mar 12, 2026",
    time: "5:15 PM",
    channel: "phone",
    clientName: "Ahmed Al-Rashid",
    clientPhone: "+971 50 123 4567",
    clientEmail: null,
    summary: "UAE investor. Wants 3-4 apartments in Limassol for Airbnb portfolio. Budget up to €800K total. Visiting Cyprus in 2 weeks.",
    intent: "buy",
    propertyType: "apartment",
    source: "Direct",
    refNumber: null,
    location: "Limassol",
    price: "€800,000",
    duration: "2:06",
    messageCount: null,
    status: "qualified",
    leadLevel: 5,
    language: "English",
    humanNeeded: true,
    providesName: true,
    providesBudget: true,
    providesPhone: true,
    providesLocation: true,
  },
];

// Helpers
export function getChannelIcon(channel: Channel): string {
  switch (channel) {
    case "phone": return "📞";
    case "whatsapp": return "💬";
    case "email": return "📧";
  }
}

export function getChannelLabel(channel: Channel): string {
  switch (channel) {
    case "phone": return "Phone";
    case "whatsapp": return "WhatsApp";
    case "email": return "Email";
  }
}

export function getIntentColor(intent: Intent): string {
  switch (intent) {
    case "buy": return "bg-emerald-100 text-emerald-700";
    case "rent": return "bg-blue-100 text-blue-700";
    case "sell": return "bg-orange-100 text-orange-700";
    case "rent_out": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-500";
  }
}

export function getStatusColor(status: Status): string {
  switch (status) {
    case "new": return "bg-amber-100 text-amber-700";
    case "contacted": return "bg-green-100 text-green-700";
    case "qualified": return "bg-emerald-100 text-emerald-800";
    case "irrelevant": return "bg-gray-100 text-gray-500";
  }
}

export function getDurationOrMessages(conv: Conversation): string {
  if (conv.duration) return conv.duration;
  if (conv.messageCount) return `${conv.messageCount} msgs`;
  return "—";
}
