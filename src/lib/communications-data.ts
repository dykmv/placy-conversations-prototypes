// Multi-dialog communication data for panel prototypes
import type { Channel, Intent, PropertyType } from "./conversations-data";

export interface ChatMessage {
  sender: "assistant" | "client";
  text: string;
  time: string;
}

export interface LeadCreated {
  intent: Intent;
  propertyType: PropertyType;
  location: string;
  price: string;
  leadId: string;
}

export interface Dialog {
  id: string;
  date: string;
  time: string;
  channel: Channel;
  duration: string | null;
  messageCount: number | null;
  summary: string;
  source: string;
  humanNeeded: boolean;
  leadCreated: LeadCreated | null;
  messages: ChatMessage[];
}

export interface Communication {
  id: string;
  clientName: string | null;
  clientPhone: string;
  clientEmail: string | null;
  language: string;
  intent: Intent;
  propertyType: PropertyType;
  location: string | null;
  price: string | null;
  dialogs: Dialog[];
}

// 4 communications with different intents and multi-dialog history
export const communications: Communication[] = [
  // 1. Andreas Papadopoulos — Rent (phone + earlier WhatsApp)
  {
    id: "comm_andreas",
    clientName: "Andreas Papadopoulos",
    clientPhone: "+357 96 482 731",
    clientEmail: null,
    language: "Greek",
    intent: "rent",
    propertyType: "apartment",
    location: "Limassol, Agios Dimitrios",
    price: "€1,200/mo",
    dialogs: [
      {
        id: "conv_5701khpeww4x",
        date: "Mar 13, 2026",
        time: "7:38 PM",
        channel: "phone",
        duration: "2:02",
        messageCount: null,
        summary: "Follow-up call. Confirmed budget up to €1,200/month. Prefers ground floor because of dog. Wants to schedule viewing this weekend.",
        source: "Bazaraki",
        humanNeeded: false,
        leadCreated: {
          intent: "rent",
          propertyType: "apartment",
          location: "Limassol, Agios Dimitrios",
          price: "€1,200/mo",
          leadId: "lead_8821",
        },
        messages: [
          { sender: "assistant", time: "7:38 PM", text: "Hello! Thank you for calling. I see you contacted us earlier about apartments in Limassol. How can I help?" },
          { sender: "client", time: "7:38 PM", text: "Yes, I want a 2-bedroom apartment near the sea. My budget is up to 1,200 euros per month." },
          { sender: "assistant", time: "7:39 PM", text: "Perfect. Do you have any specific requirements for the apartment?" },
          { sender: "client", time: "7:39 PM", text: "I have a dog, so I need a ground floor or a place with a garden. And it should be in Agios Dimitrios area." },
          { sender: "assistant", time: "7:40 PM", text: "Got it. I have a few options that might work. Would you like to schedule a viewing?" },
          { sender: "client", time: "7:40 PM", text: "Yes, this weekend if possible." },
        ],
      },
      {
        id: "conv_5701prev01",
        date: "Mar 12, 2026",
        time: "4:15 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 8,
        summary: "Initial inquiry about 2-bedroom apartments in Limassol. Mentioned having a dog. Asked about pet-friendly options.",
        source: "Bazaraki",
        humanNeeded: false,
        leadCreated: null,
        messages: [
          { sender: "client", time: "4:15 PM", text: "Hi, I saw your listing for apartments in Limassol. Do you have anything pet-friendly?" },
          { sender: "assistant", time: "4:15 PM", text: "Hello! Yes, we have several pet-friendly apartments available. What area are you looking at?" },
          { sender: "client", time: "4:16 PM", text: "Agios Dimitrios or nearby. 2 bedrooms." },
          { sender: "assistant", time: "4:16 PM", text: "Great! What is your budget range?" },
          { sender: "client", time: "4:18 PM", text: "Around 1000-1200 per month." },
          { sender: "assistant", time: "4:18 PM", text: "I have a few options. Would you like me to send you some listings, or would you prefer to discuss over a call?" },
          { sender: "client", time: "4:20 PM", text: "Send me some listings first, I'll call tomorrow." },
          { sender: "assistant", time: "4:20 PM", text: "Perfect! I'll prepare a selection for you. You can reach us anytime." },
        ],
      },
    ],
  },

  // 2. Maria Ioannou — Buy (WhatsApp + phone + email form) — humanNeeded
  {
    id: "comm_maria",
    clientName: "Maria Ioannou",
    clientPhone: "+30 211 016 8800",
    clientEmail: "maria.ioannou@gmail.com",
    language: "English",
    intent: "buy",
    propertyType: "house",
    location: "Paphos, Kato Paphos",
    price: "€300,000+",
    dialogs: [
      {
        id: "conv_8392mfke12ab",
        date: "Mar 13, 2026",
        time: "7:34 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 15,
        summary: "Detailed discussion about family house in Paphos. 3 bedrooms, garden, near international school. Moving in September. Budget around €300K. Requested human agent for viewing arrangements.",
        source: "Spitogatos",
        humanNeeded: true,
        leadCreated: {
          intent: "buy",
          propertyType: "house",
          location: "Paphos, Kato Paphos",
          price: "€300,000+",
          leadId: "lead_9934",
        },
        messages: [
          { sender: "assistant", time: "7:34 PM", text: "Hello Maria! Thank you for reaching out. How can I help you today?" },
          { sender: "client", time: "7:34 PM", text: "Hi! I'm looking for a family house in Paphos. We're relocating from Greece." },
          { sender: "assistant", time: "7:35 PM", text: "Welcome! What are your main requirements for the house?" },
          { sender: "client", time: "7:35 PM", text: "3 bedrooms minimum, a garden for the kids, and it needs to be near an international school. We're planning to move in September." },
          { sender: "assistant", time: "7:36 PM", text: "That's helpful. What's your budget range?" },
          { sender: "client", time: "7:36 PM", text: "Around 300K euros. Can go a bit higher for the right place." },
          { sender: "assistant", time: "7:37 PM", text: "I have several properties in Kato Paphos that match your criteria. Would you like me to send details?" },
          { sender: "client", time: "7:37 PM", text: "Yes please! And can I speak to someone about arranging viewings? We're visiting Paphos next month." },
        ],
      },
      {
        id: "conv_8392prev02",
        date: "Mar 11, 2026",
        time: "2:20 PM",
        channel: "phone",
        duration: "1:45",
        messageCount: null,
        summary: "First call. Asked about buying property in Cyprus. General questions about the market and prices in Paphos. Mentioned relocating from Greece.",
        source: "Spitogatos",
        humanNeeded: false,
        leadCreated: null,
        messages: [
          { sender: "assistant", time: "2:20 PM", text: "Hello! Thank you for calling. How can I help you?" },
          { sender: "client", time: "2:20 PM", text: "Hi, I'm interested in buying a house in Cyprus, specifically in Paphos." },
          { sender: "assistant", time: "2:21 PM", text: "Paphos is a great choice! Are you looking for a primary residence or an investment property?" },
          { sender: "client", time: "2:21 PM", text: "Primary residence. We're a family with two kids and we're thinking about relocating from Greece." },
        ],
      },
      {
        id: "conv_8392prev01",
        date: "Mar 10, 2026",
        time: "9:15 AM",
        channel: "email",
        duration: null,
        messageCount: null,
        summary: "Lead form submission from Spitogatos. Interested in houses in Paphos. Left email and phone number.",
        source: "Spitogatos",
        humanNeeded: false,
        leadCreated: null,
        messages: [],
      },
    ],
  },

  // 3. Nikos Georgiou — Irrelevant (single short call)
  {
    id: "comm_nikos",
    clientName: "Nikos Georgiou",
    clientPhone: "+357 97 654 321",
    clientEmail: null,
    language: "Greek",
    intent: "irrelevant",
    propertyType: null,
    location: null,
    price: null,
    dialogs: [
      {
        id: "conv_3391bncx55kp",
        date: "Mar 13, 2026",
        time: "7:28 PM",
        channel: "phone",
        duration: "0:45",
        messageCount: null,
        summary: "Called about a listing but wrong number. Not interested in property. Wanted a car rental agency.",
        source: "Direct",
        humanNeeded: false,
        leadCreated: null,
        messages: [
          { sender: "assistant", time: "7:28 PM", text: "Hello! Thank you for calling. How can I help you?" },
          { sender: "client", time: "7:28 PM", text: "Hi, is this the car rental place?" },
          { sender: "assistant", time: "7:28 PM", text: "No, this is a real estate agency. We help with buying and renting properties." },
          { sender: "client", time: "7:29 PM", text: "Oh sorry, wrong number. Goodbye." },
        ],
      },
    ],
  },

  // 4. Dimitris Constantinou — Sell (2 WhatsApp conversations) — humanNeeded
  {
    id: "comm_dimitris",
    clientName: "Dimitris Constantinou",
    clientPhone: "+357 99 888 777",
    clientEmail: "dim.const@gmail.com",
    language: "Greek",
    intent: "sell",
    propertyType: "apartment",
    location: "Nicosia, Strovolos",
    price: "€240,000",
    dialogs: [
      {
        id: "conv_5501kkqw22mx",
        date: "Mar 13, 2026",
        time: "6:56 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 21,
        summary: "Wants to sell his 3-bedroom apartment in Strovolos. Asking €240K. Bought 5 years ago. Needs quick sale due to relocation. Requested agent to discuss valuation.",
        source: "Direct",
        humanNeeded: true,
        leadCreated: {
          intent: "sell",
          propertyType: "apartment",
          location: "Nicosia, Strovolos",
          price: "€240,000",
          leadId: "lead_7712",
        },
        messages: [
          { sender: "client", time: "6:56 PM", text: "Hello, I want to sell my apartment. Can you help?" },
          { sender: "assistant", time: "6:56 PM", text: "Hello Dimitris! Of course. Can you tell me about the property?" },
          { sender: "client", time: "6:57 PM", text: "It's a 3-bedroom apartment in Strovolos, Nicosia. About 120 square meters." },
          { sender: "assistant", time: "6:57 PM", text: "That sounds great. What price are you looking for?" },
          { sender: "client", time: "6:58 PM", text: "I'm asking 240,000 euros. I bought it 5 years ago for 195K and renovated it." },
          { sender: "assistant", time: "6:58 PM", text: "I understand. Is there a timeline for the sale?" },
          { sender: "client", time: "6:59 PM", text: "Yes, I'm relocating abroad in 3 months. I need a quick sale. Can I speak to an agent about a proper valuation?" },
          { sender: "assistant", time: "6:59 PM", text: "Absolutely. I'll have one of our agents contact you to discuss valuation and listing strategy." },
        ],
      },
      {
        id: "conv_5501prev01",
        date: "Mar 11, 2026",
        time: "10:30 AM",
        channel: "whatsapp",
        duration: null,
        messageCount: 5,
        summary: "First contact. Asked if agency handles property sales. Briefly mentioned wanting to sell an apartment in Nicosia.",
        source: "Direct",
        humanNeeded: false,
        leadCreated: null,
        messages: [
          { sender: "client", time: "10:30 AM", text: "Hi, do you help with selling apartments?" },
          { sender: "assistant", time: "10:30 AM", text: "Hello! Yes, we help property owners sell their homes. Would you like to tell me about your property?" },
          { sender: "client", time: "10:32 AM", text: "It's in Strovolos. I'll send more details later." },
          { sender: "assistant", time: "10:32 AM", text: "Of course! Feel free to reach out anytime. We're here to help." },
          { sender: "client", time: "10:33 AM", text: "Thanks, I'll write back soon." },
        ],
      },
    ],
  },
];

// Get the subset of conversations for the panel demo (matching the 4 communications)
export const panelDemoConversationIds = [
  "conv_5701khpeww4x", // Andreas - Rent
  "conv_8392mfke12ab", // Maria - Buy
  "conv_3391bncx55kp", // Nikos - Irrelevant
  "conv_5501kkqw22mx", // Dimitris - Sell
];
