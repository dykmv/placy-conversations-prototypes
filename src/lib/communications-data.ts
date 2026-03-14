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

// 4 communications with realistic data based on real dialog examples
export const communications: Communication[] = [
  // 1. Natallia Sharkova — Rent, WhatsApp from Bazaraki + follow-up call
  {
    id: "comm_natallia",
    clientName: "Natallia Sharkova",
    clientPhone: "+357 96 318 204",
    clientEmail: null,
    language: "English",
    intent: "rent",
    propertyType: "apartment",
    location: "Limassol",
    price: "€1,200/mo",
    dialogs: [
      {
        id: "conv_natallia_02",
        date: "Mar 13, 2026",
        time: "10:18 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 13,
        summary: "Interested in 3-bedroom apartment #14316 from Bazaraki. Family of 4 (husband + 2 sons), no pets. Available for viewing tomorrow (free all day except 13:00-13:30). Flexible on move-in date — not rushing but open to moving right away. Requested agent follow-up for viewing confirmation.",
        source: "Bazaraki",
        humanNeeded: true,
        leadCreated: {
          intent: "rent",
          propertyType: "apartment",
          location: "Limassol",
          price: "€1,200/mo",
          leadId: "lead_9901",
        },
        messages: [
          { sender: "client", time: "10:18 PM", text: "Hi, I am interested in your advert on Bazaraki.\nLink: bazaraki.com/adv/6130465\n#14316" },
          { sender: "assistant", time: "10:19 PM", text: "Good evening, Natallia! Thank you for reaching out to us at 4 Buy and Sell! Who will be living in the property, and do you have any special requirements?" },
          { sender: "client", time: "10:20 PM", text: "Hi, we are considering it for ourselves: me, my husband and our 2 sons. Is it possible to view it somewhere tomorrow?" },
          { sender: "assistant", time: "10:21 PM", text: "Thank you for sharing, Natallia! 🏡 Could you also let me know if you have any pets?" },
          { sender: "client", time: "10:21 PM", text: "No" },
          { sender: "assistant", time: "10:21 PM", text: "Great, thanks for confirming! What time would you prefer to view the apartment tomorrow? Please note that the agent will reach out to confirm the exact date and time." },
          { sender: "client", time: "10:22 PM", text: "I am only busy from 13 to 13:30. The rest is free" },
          { sender: "assistant", time: "10:22 PM", text: "Perfect, I'll note your availability. Just to finalize, when do you plan to move in if everything goes well with the viewing?" },
          { sender: "client", time: "10:24 PM", text: "It depends. We can do it right away. But we are not rushing either. We have a place to live, but are looking for changing it" },
          { sender: "assistant", time: "10:24 PM", text: "Thanks for letting me know, Natallia. Can you please provide your surname so I can ensure all the details are complete for the agent?" },
          { sender: "client", time: "10:24 PM", text: "Sharkova" },
          { sender: "assistant", time: "10:25 PM", text: "Thank you, Natallia Sharkova! I will now pass on your details to the support team. An agent will reach out to you to confirm the viewing time and discuss any further details." },
          { sender: "client", time: "10:25 PM", text: "Thank you, and have a great evening!" },
        ],
      },
      {
        id: "conv_natallia_01",
        date: "Mar 12, 2026",
        time: "3:45 PM",
        channel: "phone",
        duration: "1:15",
        messageCount: null,
        summary: "Initial call. Asked about rental apartments in Limassol area. Mentioned needing 3 bedrooms for a family. Did not provide specific property reference. Said she would check listings on Bazaraki and contact back.",
        source: "Bazaraki",
        humanNeeded: false,
        leadCreated: {
          intent: "rent",
          propertyType: "apartment",
          location: "Limassol",
          price: "—",
          leadId: "lead_9900",
        },
        messages: [
          { sender: "assistant", time: "3:45 PM", text: "Hello, you've reached 4 Buy and Sell. How can I help you?" },
          { sender: "client", time: "3:45 PM", text: "Hi, do you have any 3-bedroom apartments for rent in Limassol?" },
          { sender: "assistant", time: "3:46 PM", text: "Yes, we have several options. Could you tell me your budget range and any specific area preferences?" },
          { sender: "client", time: "3:46 PM", text: "Around 1,000 to 1,200 euros. I'll check your Bazaraki listings and message you about a specific one." },
          { sender: "assistant", time: "3:46 PM", text: "Perfect! Feel free to reach out anytime. We're here to help." },
        ],
      },
    ],
  },

  // 2. Anastasia Rasputina — Rent, Phone call (house in Arcapas)
  {
    id: "comm_anastasia",
    clientName: "Anastasia Rasputina",
    clientPhone: "+357 97 492 374",
    clientEmail: null,
    language: "English",
    intent: "rent",
    propertyType: "house",
    location: "Kapedes, Arcapas",
    price: "€1,000/mo",
    dialogs: [
      {
        id: "conv_anastasia_01",
        date: "Mar 14, 2026",
        time: "8:03 AM",
        channel: "phone",
        duration: "3:42",
        messageCount: null,
        summary: "Inquired about 4-bedroom house for rent in Arcapas, ref #13-939, €1,000/mo. Initially spoke English, then switched to Russian. Wants to schedule viewing today after lunch. Agent will contact to confirm viewing time.",
        source: "Bazaraki",
        humanNeeded: true,
        leadCreated: {
          intent: "rent",
          propertyType: "house",
          location: "Kapedes, Arcapas",
          price: "€1,000/mo",
          leadId: "lead_10201",
        },
        messages: [
          { sender: "assistant", time: "8:03 AM", text: "Hello, you've reached 4 Buy and Sell. Our office is currently closed. How can I help you?" },
          { sender: "client", time: "8:03 AM", text: "Hello, sorry, do you speak English?" },
          { sender: "assistant", time: "8:03 AM", text: "Yes, I do. How may I help you?" },
          { sender: "client", time: "8:04 AM", text: "Okay, I see a rental house in Arcapas for a bedroom. Is this available?" },
          { sender: "assistant", time: "8:04 AM", text: "I can check that for you. First, may I have your full name, please?" },
          { sender: "client", time: "8:04 AM", text: "My name is Anastasia." },
          { sender: "assistant", time: "8:05 AM", text: "Thank you, Anastasia. And your surname, please?" },
          { sender: "client", time: "8:05 AM", text: "Rasputina." },
          { sender: "assistant", time: "8:05 AM", text: "Do you have the reference number for the property?" },
          { sender: "client", time: "8:06 AM", text: "Yes. 13-939." },
          { sender: "assistant", time: "8:06 AM", text: "Excellent. I have noted the reference number: 13-939. Would you like to schedule a viewing?" },
          { sender: "client", time: "8:06 AM", text: "Yes, I want to schedule a viewing. Can it be today, after lunch?" },
          { sender: "assistant", time: "8:07 AM", text: "Today after lunch, got it. An agent will contact you shortly to confirm the viewing. Have a good day!" },
        ],
      },
    ],
  },

  // 3. Belal Almasry — Rent, WhatsApp (detached house) + earlier email form
  {
    id: "comm_belal",
    clientName: "Belal Almasry",
    clientPhone: "+357 94 332 969",
    clientEmail: "belal.almasry@gmail.com",
    language: "English",
    intent: "rent",
    propertyType: "house",
    location: "Nicosia, Tseri",
    price: "€950/mo",
    dialogs: [
      {
        id: "conv_belal_02",
        date: "Mar 12, 2026",
        time: "7:11 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 17,
        summary: "Interested in 2-bedroom detached house #14670 from Bazaraki. Couple (him and wife), no pets. Wants viewing tomorrow after 16:30 or on the weekend. Planning to move in April 1st. Agent will confirm viewing.",
        source: "Bazaraki",
        humanNeeded: true,
        leadCreated: {
          intent: "rent",
          propertyType: "house",
          location: "Nicosia, Tseri",
          price: "€950/mo",
          leadId: "lead_10102",
        },
        messages: [
          { sender: "client", time: "7:11 PM", text: "Hi, I am interested in your advert on Bazaraki.\nLink: bazaraki.com/adv/6351892\n#14670" },
          { sender: "assistant", time: "7:12 PM", text: "Good evening, Belal! Thank you for reaching out to us at 4 Buy and Sell! Could you please tell me who will be living in the property, how many people, and if you have any special requirements?" },
          { sender: "client", time: "7:12 PM", text: "Hi, is it available?" },
          { sender: "assistant", time: "7:12 PM", text: "Yes, the property is available. Could you please let me know who will be living in the property?" },
          { sender: "client", time: "7:13 PM", text: "We are two, me and my wife" },
          { sender: "assistant", time: "7:13 PM", text: "Thank you for letting me know! Do you have any pets?" },
          { sender: "client", time: "7:13 PM", text: "No pets" },
          { sender: "assistant", time: "7:14 PM", text: "Great, thanks for confirming! When would you like to schedule a viewing?" },
          { sender: "client", time: "7:16 PM", text: "Tomorrow after 16:30" },
          { sender: "assistant", time: "7:16 PM", text: "Thank you. An agent will reach out to confirm. When are you planning to move in?" },
          { sender: "client", time: "7:16 PM", text: "Or in the weekend" },
          { sender: "assistant", time: "7:16 PM", text: "Got it. When are you planning to move into the property?" },
          { sender: "client", time: "7:17 PM", text: "1st of April" },
          { sender: "assistant", time: "7:17 PM", text: "Thanks! Could you please provide your full name and surname?" },
          { sender: "client", time: "7:17 PM", text: "Belal Almasry" },
          { sender: "assistant", time: "7:18 PM", text: "Thank you, Belal Almasry! An agent will reach out to you to finalize the viewing. If you have any more questions, feel free to ask!" },
          { sender: "client", time: "7:18 PM", text: "Thank you" },
        ],
      },
      {
        id: "conv_belal_01",
        date: "Mar 10, 2026",
        time: "11:20 AM",
        channel: "email",
        duration: null,
        messageCount: null,
        summary: "Lead form from Bazaraki. Interested in rental properties in Nicosia area. Left email and phone number. No specific property reference provided.",
        source: "Bazaraki",
        humanNeeded: false,
        leadCreated: {
          intent: "rent",
          propertyType: null,
          location: "Nicosia",
          price: "—",
          leadId: "lead_10101",
        },
        messages: [],
      },
    ],
  },

  // 4. Elena Petrova — Buy, WhatsApp + Phone (investment property) — humanNeeded on latest
  {
    id: "comm_elena",
    clientName: "Elena Petrova",
    clientPhone: "+357 96 555 123",
    clientEmail: "elena.p@yandex.ru",
    language: "Russian",
    intent: "buy",
    propertyType: "apartment",
    location: "Limassol",
    price: "€150,000–200,000",
    dialogs: [
      {
        id: "conv_elena_03",
        date: "Mar 13, 2026",
        time: "7:30 PM",
        channel: "whatsapp",
        duration: null,
        messageCount: 18,
        summary: "Follow-up on investment apartments. Narrowed down to 1-2 bedroom in tourist area. Wants rental yield projections and property management options. Asked to speak with agent who specializes in investment properties.",
        source: "Bazaraki",
        humanNeeded: true,
        leadCreated: {
          intent: "buy",
          propertyType: "apartment",
          location: "Limassol, Tourist Area",
          price: "€150,000–200,000",
          leadId: "lead_8835",
        },
        messages: [
          { sender: "client", time: "7:30 PM", text: "Hi, I messaged before about investment apartments. I've been thinking — I want something in the tourist area specifically." },
          { sender: "assistant", time: "7:30 PM", text: "Hello Elena! Yes, I remember. The tourist area in Limassol has excellent rental potential. Are you still looking at 1-2 bedrooms?" },
          { sender: "client", time: "7:31 PM", text: "Yes, 1-2 bedrooms. But I need to understand the rental yield. What can I expect?" },
          { sender: "assistant", time: "7:31 PM", text: "Typical yields in the tourist area range from 5-7% for long-term and up to 10% for short-term. Would you like specific projections for properties in your budget?" },
          { sender: "client", time: "7:32 PM", text: "Yes, and also I need to know about property management. I won't be living in Cyprus." },
          { sender: "assistant", time: "7:33 PM", text: "We work with several property management companies. I can connect you with our investment specialist who can provide detailed projections and management options." },
          { sender: "client", time: "7:33 PM", text: "Yes please, I'd like to speak with someone who specializes in this." },
        ],
      },
      {
        id: "conv_elena_02",
        date: "Mar 11, 2026",
        time: "4:10 PM",
        channel: "phone",
        duration: "2:35",
        messageCount: null,
        summary: "Called to discuss investment options. Confirmed budget €150-200K. Interested in Limassol apartments for Airbnb. Asked about legal requirements for foreign buyers. Mentioned she's based in Moscow.",
        source: "Direct",
        humanNeeded: false,
        leadCreated: {
          intent: "buy",
          propertyType: "apartment",
          location: "Limassol",
          price: "€150,000–200,000",
          leadId: "lead_8834",
        },
        messages: [
          { sender: "assistant", time: "4:10 PM", text: "Hello! How can I help you today?" },
          { sender: "client", time: "4:10 PM", text: "Hi, I'm looking to buy an apartment in Limassol as an investment. For Airbnb." },
          { sender: "assistant", time: "4:11 PM", text: "That's a popular choice. What's your budget?" },
          { sender: "client", time: "4:11 PM", text: "Between 150 and 200 thousand euros." },
          { sender: "assistant", time: "4:12 PM", text: "We have several options in that range. Are you based in Cyprus?" },
          { sender: "client", time: "4:12 PM", text: "No, I'm in Moscow. I need to understand what documents I need as a foreign buyer." },
        ],
      },
      {
        id: "conv_elena_01",
        date: "Mar 9, 2026",
        time: "10:05 AM",
        channel: "whatsapp",
        duration: null,
        messageCount: 6,
        summary: "Initial inquiry. Saw listings on Bazaraki. Asked general questions about buying property in Cyprus as a Russian citizen. Mentioned interest in investment apartments.",
        source: "Bazaraki",
        humanNeeded: false,
        leadCreated: null,
        messages: [
          { sender: "client", time: "10:05 AM", text: "Hello, I'm interested in buying an apartment in Cyprus. Is it possible for Russian citizens?" },
          { sender: "assistant", time: "10:05 AM", text: "Hello! Yes, absolutely. Foreign nationals can purchase property in Cyprus. What area are you interested in?" },
          { sender: "client", time: "10:06 AM", text: "Limassol. Something for investment, maybe Airbnb." },
          { sender: "assistant", time: "10:06 AM", text: "Great choice! What's your approximate budget?" },
          { sender: "client", time: "10:08 AM", text: "I need to think about it. I'll call you later." },
          { sender: "assistant", time: "10:08 AM", text: "Of course! Feel free to reach out anytime. We're here to help." },
        ],
      },
    ],
  },
];

// Map conversation IDs to communications for the demo
export const panelDemoConversationIds = [
  "conv_natallia_02",   // Natallia - Rent (WhatsApp)
  "conv_anastasia_01",  // Anastasia - Rent (Phone)
  "conv_belal_02",      // Belal - Rent (WhatsApp)
  "conv_elena_03",      // Elena - Buy (WhatsApp)
];
