"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface MessageItem {
  id: string;
  sender: "user" | "client";
  text: string;
  time: string;
  date: string;
  isRead?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  lastMessageTime: string;
  lastMessagePreview: string;
  propertyTag: string;
  unreadCount: number;
  isStarred: boolean;
  category: "buyers" | "sellers" | "other";
  folder: "inbox" | "starred" | "unanswered" | "archived" | "trash";
  about: {
    preApproved: string;
    lookingFor: string;
    priceRange: string;
    timeline: string;
  };
  propertyOfInterest: {
    title: string;
    cityZip: string;
    price: string;
    specs: string;
    imageUrl: string;
  };
  messages: MessageItem[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "jessica-martinez",
    name: "Jessica Martinez",
    role: "Buyer",
    location: "Austin, TX",
    email: "jessica.martinez@email.com",
    phone: "(512) 555-0134",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "10:24 AM",
    lastMessagePreview: "Hi Olivia! I'd love to schedule a tour this week.",
    propertyTag: "310 Bowie St, #2205",
    unreadCount: 1,
    isStarred: false,
    category: "buyers",
    folder: "inbox",
    about: {
      preApproved: "Yes",
      lookingFor: "Condo or Townhome",
      priceRange: "$500K - $700K",
      timeline: "Within 1-3 months",
    },
    propertyOfInterest: {
      title: "310 Bowie St, #2205",
      cityZip: "Austin, TX 78703",
      price: "$620,000",
      specs: "2 bd • 2 ba • 1,145 sqft",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Hi Olivia! I'm really interested in this condo. Do you have any availability this week for a tour?",
        time: "10:15 AM",
        date: "May 13, 2024",
      },
      {
        id: "m2",
        sender: "user",
        text: "Hi Jessica! Yes, I'd be happy to show you the property. What days or times work best for you?",
        time: "10:16 AM",
        date: "May 13, 2024",
        isRead: true,
      },
      {
        id: "m3",
        sender: "client",
        text: "How about Tuesday or Wednesday late morning?",
        time: "10:18 AM",
        date: "May 13, 2024",
      },
      {
        id: "m4",
        sender: "user",
        text: "Tuesday at 11:00 AM works great. I'll send over the details.",
        time: "10:19 AM",
        date: "May 13, 2024",
        isRead: true,
      },
      {
        id: "m5",
        sender: "client",
        text: "Perfect! Thank you so much.",
        time: "10:20 AM",
        date: "May 13, 2024",
      },
    ],
  },
  {
    id: "ryan-anderson",
    name: "Ryan Anderson",
    role: "Renter",
    location: "Austin, TX",
    email: "ryan.anderson@email.com",
    phone: "(512) 555-0188",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "9:18 AM",
    lastMessagePreview: "Thanks for the info! Is the HOA fee included in the rent?",
    propertyTag: "2600 Wooten Dr, #431",
    unreadCount: 2,
    isStarred: false,
    category: "buyers",
    folder: "inbox",
    about: {
      preApproved: "Yes",
      lookingFor: "Luxury Apartment",
      priceRange: "$2,500 - $3,200/mo",
      timeline: "Within 30 days",
    },
    propertyOfInterest: {
      title: "2600 Wooten Dr, #431",
      cityZip: "Austin, TX 78757",
      price: "$2,850/mo",
      specs: "2 bd • 2 ba • 980 sqft",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "ra1",
        sender: "client",
        text: "Hello! I saw the listing on Wooten Dr and wanted to check lease terms.",
        time: "9:10 AM",
        date: "May 13, 2024",
      },
      {
        id: "ra2",
        sender: "client",
        text: "Thanks for the info! Is the HOA fee included in the rent?",
        time: "9:18 AM",
        date: "May 13, 2024",
      },
    ],
  },
  {
    id: "amanda-lee",
    name: "Amanda Lee",
    role: "Buyer",
    location: "Austin, TX",
    email: "amanda.lee@email.com",
    phone: "(512) 555-0245",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "Yesterday",
    lastMessagePreview: "That sounds great. What's the next step?",
    propertyTag: "8809 Summit Oaks Ln",
    unreadCount: 0,
    isStarred: false,
    category: "buyers",
    folder: "inbox",
    about: {
      preApproved: "Yes",
      lookingFor: "Townhouse",
      priceRange: "$520K - $600K",
      timeline: "1-2 months",
    },
    propertyOfInterest: {
      title: "8809 Summit Oaks Ln",
      cityZip: "Austin, TX 78759",
      price: "$545,000",
      specs: "3 bd • 2.5 ba • 1,780 sqft",
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "al1",
        sender: "user",
        text: "Hi Amanda, the seller has reviewed disclosures and is ready for offers.",
        time: "3:00 PM",
        date: "May 12, 2024",
        isRead: true,
      },
      {
        id: "al2",
        sender: "client",
        text: "That sounds great. What's the next step?",
        time: "3:30 PM",
        date: "May 12, 2024",
      },
    ],
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Buyer",
    location: "West Lake Hills, TX",
    email: "michael.b@email.com",
    phone: "(512) 555-0391",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "May 11",
    lastMessagePreview: "I'm interested in putting in an offer.",
    propertyTag: "1234 Maple Ridge Dr",
    unreadCount: 0,
    isStarred: true,
    category: "buyers",
    folder: "starred",
    about: {
      preApproved: "Yes",
      lookingFor: "Single Family Home",
      priceRange: "$800K - $1.2M",
      timeline: "Immediate",
    },
    propertyOfInterest: {
      title: "1234 Maple Ridge Dr",
      cityZip: "Austin, TX 78746",
      price: "$825,000",
      specs: "4 bd • 3.5 ba • 2,850 sqft",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "mb1",
        sender: "client",
        text: "Hi Olivia, we checked out the open house over the weekend and fell in love with it.",
        time: "11:20 AM",
        date: "May 11, 2024",
      },
      {
        id: "mb2",
        sender: "client",
        text: "I'm interested in putting in an offer.",
        time: "11:22 AM",
        date: "May 11, 2024",
      },
    ],
  },
  {
    id: "taylor-family",
    name: "Taylor Family",
    role: "Renter",
    location: "Austin, TX",
    email: "the.taylors@email.com",
    phone: "(512) 555-0489",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "May 10",
    lastMessagePreview: "Do you have any 3-bedroom options in Central Austin?",
    propertyTag: "Homes for Rent in Central Austin",
    unreadCount: 3,
    isStarred: false,
    category: "buyers",
    folder: "inbox",
    about: {
      preApproved: "Yes",
      lookingFor: "3-4 Bed House",
      priceRange: "$3,500 - $4,500/mo",
      timeline: "Within 2 months",
    },
    propertyOfInterest: {
      title: "6701 Westview Dr",
      cityZip: "Austin, TX 78731",
      price: "$1,195,000",
      specs: "4 bd • 3 ba • 2,950 sqft",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "tf1",
        sender: "client",
        text: "Hi Olivia! We are searching for places near good school districts.",
        time: "10:00 AM",
        date: "May 10, 2024",
      },
      {
        id: "tf2",
        sender: "client",
        text: "Do you have any 3-bedroom options in Central Austin?",
        time: "10:02 AM",
        date: "May 10, 2024",
      },
    ],
  },
  {
    id: "chris-davis",
    name: "Chris Davis",
    role: "Seller",
    location: "Austin, TX",
    email: "chris.davis@email.com",
    phone: "(512) 555-0512",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "May 8",
    lastMessagePreview: "Can you send over more photos of the kitchen?",
    propertyTag: "310 Bowie St, #2205",
    unreadCount: 0,
    isStarred: false,
    category: "sellers",
    folder: "inbox",
    about: {
      preApproved: "N/A - Seller",
      lookingFor: "Listing Consultation",
      priceRange: "$600K - $650K",
      timeline: "Summer 2024",
    },
    propertyOfInterest: {
      title: "310 Bowie St, #2205",
      cityZip: "Austin, TX 78703",
      price: "$620,000",
      specs: "2 bd • 2 ba • 1,145 sqft",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "cd1",
        sender: "client",
        text: "Can you send over more photos of the kitchen?",
        time: "4:15 PM",
        date: "May 8, 2024",
      },
    ],
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    role: "Buyer",
    location: "Austin, TX",
    email: "priya.patel@email.com",
    phone: "(512) 555-0678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    lastMessageTime: "May 7",
    lastMessagePreview: "Thanks for your help!",
    propertyTag: "2600 Wooten Dr, #431",
    unreadCount: 0,
    isStarred: false,
    category: "other",
    folder: "inbox",
    about: {
      preApproved: "Yes",
      lookingFor: "Commercial / Office",
      priceRange: "$400K - $550K",
      timeline: "3-6 months",
    },
    propertyOfInterest: {
      title: "2600 Wooten Dr, #431",
      cityZip: "Austin, TX 78757",
      price: "$2,850/mo",
      specs: "2 bd • 2 ba • 980 sqft",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    },
    messages: [
      {
        id: "pp1",
        sender: "client",
        text: "Thanks for your help!",
        time: "1:20 PM",
        date: "May 7, 2024",
      },
    ],
  },
];

const QUICK_REPLIES = [
  "Thanks for your interest! What days/times work best for you?",
  "I'd be happy to show you the property. Are you available this week?",
  "Here are the details for the upcoming tour.",
  "Feel free to reach out if you have any questions!",
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>("jessica-martinez");
  const [activeFolder, setActiveFolder] = useState<string>("inbox");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [composerMode, setComposerMode] = useState<"message" | "note">("message");
  const [messageInput, setMessageInput] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState<boolean>(false);
  const [newRecipient, setNewRecipient] = useState<string>("");
  const [newMsgText, setNewMsgText] = useState<string>("");
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [tourDate, setTourDate] = useState<string>("2024-05-14");
  const [tourTime, setTourTime] = useState<string>("11:00 AM");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || conversations[0];
  }, [conversations, selectedId]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Folder filter
      if (activeFolder === "starred" && !c.isStarred) return false;
      if (activeFolder === "unanswered" && c.unreadCount === 0) return false;
      if (activeFolder === "archived" && c.folder !== "archived") return false;
      if (activeFolder === "trash" && c.folder !== "trash") return false;

      // Category filter
      if (activeCategoryFilter === "buyers" && c.category !== "buyers") return false;
      if (activeCategoryFilter === "sellers" && c.category !== "sellers") return false;
      if (activeCategoryFilter === "other" && c.category !== "other") return false;

      // Tab filter
      if (activeTab === "unread" && c.unreadCount === 0) return false;
      if (activeTab === "favorites" && !c.isStarred) return false;

      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(query);
        const matchTag = c.propertyTag.toLowerCase().includes(query);
        const matchLast = c.lastMessagePreview.toLowerCase().includes(query);
        if (!matchName && !matchTag && !matchLast) return false;
      }

      return true;
    });
  }, [conversations, activeFolder, activeCategoryFilter, activeTab, searchQuery]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: composerMode === "note" ? "user" : "user",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "May 13, 2024",
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === selectedId) {
          return {
            ...c,
            lastMessagePreview: messageInput,
            lastMessageTime: newMsg.time,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text: string) => {
    setMessageInput(text);
  };

  const handleToggleStar = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isStarred: !c.isStarred } : c))
    );
  };

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleCreateNewConversation = () => {
    if (!newRecipient.trim() || !newMsgText.trim()) return;
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      name: newRecipient,
      role: "Client",
      location: "Austin, TX",
      email: `${newRecipient.toLowerCase().replace(/\s+/g, ".")}@email.com`,
      phone: "(512) 555-0199",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      lastMessageTime: "Just now",
      lastMessagePreview: newMsgText,
      propertyTag: "General Inquiry",
      unreadCount: 0,
      isStarred: false,
      category: "buyers",
      folder: "inbox",
      about: {
        preApproved: "Pending",
        lookingFor: "Property Inquiry",
        priceRange: "Flexible",
        timeline: "Immediate",
      },
      propertyOfInterest: {
        title: "310 Bowie St, #2205",
        cityZip: "Austin, TX 78703",
        price: "$620,000",
        specs: "2 bd • 2 ba • 1,145 sqft",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
      },
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: newMsgText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: "May 13, 2024",
          isRead: true,
        },
      ],
    };

    setConversations([newConv, ...conversations]);
    setSelectedId(newId);
    setNewRecipient("");
    setNewMsgText("");
    setIsNewMessageModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Main Navbar */}
      <Navbar showSearch={true} searchPlaceholder="Search properties, clients, or messages..." />

      {/* Main Messages Workspace: 4 Columns Container */}
      <main className="flex-1 flex overflow-hidden max-w-[1920px] w-full mx-auto bg-white border-b border-slate-200">
        
        {/* ========================================================= */}
        {/* COLUMN 1: LEFT NAVIGATION & FOLDERS (w-64) */}
        {/* ========================================================= */}
        <aside className="w-64 lg:w-72 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between p-5 hidden md:flex select-none">
          <div className="space-y-6">
            {/* Header & New Message Button */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0B244A] mb-4">
                Messages
              </h1>
              <button
                type="button"
                onClick={() => setIsNewMessageModalOpen(true)}
                className="w-full bg-[#0B244A] hover:bg-[#071933] text-white text-sm font-semibold py-2.5 px-4 rounded-md flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>New Message</span>
              </button>
            </div>

            {/* Main Folders Nav */}
            <nav className="space-y-1">
              {/* Inbox */}
              <button
                type="button"
                onClick={() => { setActiveFolder("inbox"); setActiveCategoryFilter("all"); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition cursor-pointer ${
                  activeFolder === "inbox" && activeCategoryFilter === "all"
                    ? "bg-[#0B244A] text-white font-semibold"
                    : "text-[#0B244A] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeFolder === "inbox" && activeCategoryFilter === "all" ? "text-white stroke-white" : "text-[#0B244A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span>Inbox</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                  activeFolder === "inbox" && activeCategoryFilter === "all"
                    ? "bg-white/20 text-white"
                    : "bg-[#FAF0E4] text-[#0B244A]"
                }`}>
                  12
                </span>
              </button>

              {/* Starred */}
              <button
                type="button"
                onClick={() => setActiveFolder("starred")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition cursor-pointer ${
                  activeFolder === "starred"
                    ? "bg-[#0B244A] text-white font-semibold"
                    : "text-[#0B244A] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeFolder === "starred" ? "text-white stroke-white" : "text-[#0B244A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Starred</span>
                </div>
              </button>

              {/* Unanswered */}
              <button
                type="button"
                onClick={() => setActiveFolder("unanswered")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition cursor-pointer ${
                  activeFolder === "unanswered"
                    ? "bg-[#0B244A] text-white font-semibold"
                    : "text-[#0B244A] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeFolder === "unanswered" ? "text-white stroke-white" : "text-[#0B244A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Unanswered</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                  activeFolder === "unanswered"
                    ? "bg-white/20 text-white"
                    : "bg-[#FAF0E4] text-[#0B244A]"
                }`}>
                  3
                </span>
              </button>

              {/* Archived */}
              <button
                type="button"
                onClick={() => setActiveFolder("archived")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition cursor-pointer ${
                  activeFolder === "archived"
                    ? "bg-[#0B244A] text-white font-semibold"
                    : "text-[#0B244A] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeFolder === "archived" ? "text-white stroke-white" : "text-[#0B244A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Archived</span>
                </div>
              </button>

              {/* Trash */}
              <button
                type="button"
                onClick={() => setActiveFolder("trash")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm transition cursor-pointer ${
                  activeFolder === "trash"
                    ? "bg-[#0B244A] text-white font-semibold"
                    : "text-[#0B244A] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeFolder === "trash" ? "text-white stroke-white" : "text-[#0B244A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Trash</span>
                </div>
              </button>
            </nav>

            {/* FILTERS Section */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-1">
                FILTERS
              </p>
              <div className="space-y-1">
                {/* All Conversations */}
                <button
                  type="button"
                  onClick={() => { setActiveCategoryFilter("all"); setActiveFolder("inbox"); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-md text-sm transition cursor-pointer ${
                    activeCategoryFilter === "all"
                      ? "bg-[#0B244A] text-white font-semibold"
                      : "text-[#0B244A] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>All Conversations</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    activeCategoryFilter === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-[#0B244A]"
                  }`}>
                    12
                  </span>
                </button>

                {/* Buyers / Renters */}
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("buyers")}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-md text-sm transition cursor-pointer ${
                    activeCategoryFilter === "buyers"
                      ? "bg-[#0B244A] text-white font-semibold"
                      : "text-[#0B244A] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>Buyers / Renters</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    activeCategoryFilter === "buyers" ? "bg-white/20 text-white" : "bg-slate-100 text-[#0B244A]"
                  }`}>
                    9
                  </span>
                </button>

                {/* Sellers */}
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("sellers")}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-md text-sm transition cursor-pointer ${
                    activeCategoryFilter === "sellers"
                      ? "bg-[#0B244A] text-white font-semibold"
                      : "text-[#0B244A] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>Sellers</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    activeCategoryFilter === "sellers" ? "bg-white/20 text-white" : "bg-slate-100 text-[#0B244A]"
                  }`}>
                    2
                  </span>
                </button>

                {/* Other */}
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("other")}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-md text-sm transition cursor-pointer ${
                    activeCategoryFilter === "other"
                      ? "bg-[#0B244A] text-white font-semibold"
                      : "text-[#0B244A] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>Other</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    activeCategoryFilter === "other" ? "bg-white/20 text-white" : "bg-slate-100 text-[#0B244A]"
                  }`}>
                    1
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Card: Stay connected on the go */}
          <div className="mt-6 pt-4">
            <div className="bg-[#FCF9F5] border border-[#F5EBD9] rounded-md p-3.5 text-left relative shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#FBEEDD] flex items-center justify-center flex-shrink-0 text-[#0B244A]">
                  <svg className="w-4 h-4 text-[#0B244A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B244A] leading-snug">
                    Stay connected on the go
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Get real-time message alerts in the HOMIQ app.
                  </p>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="mt-3.5 space-y-1.5">
                {/* App Store */}
                <button
                  type="button"
                  className="w-full bg-black hover:bg-zinc-900 text-white rounded-md px-2.5 py-1.5 flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.3 26.1 2 52.1-13.6 69.5-33.7z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase tracking-wider block text-zinc-400">Download on the</span>
                    <span className="text-[11px] font-semibold tracking-tight">App Store</span>
                  </div>
                </button>

                {/* Google Play */}
                <button
                  type="button"
                  className="w-full bg-black hover:bg-zinc-900 text-white rounded-md px-2.5 py-1.5 flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 512 512">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 24 20.6 24 37v438c0 16.4 10 30.2 23 37l244.6-244.6L47 0zm395.2 214.7l-48.4-27.8-69.7 69.7 69.7 69.7 48.7-27.9c14.7-8.4 23.5-23.7 23.5-40.6s-8.8-32.2-23.8-40.9zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase tracking-wider block text-zinc-400">GET IT ON</span>
                    <span className="text-[11px] font-semibold tracking-tight">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* COLUMN 2: CONVERSATION LIST (w-80 / 340px) */}
        {/* ========================================================= */}
        <section className="w-full md:w-80 lg:w-[340px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
          {/* Top Search & Filter icon */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition"
              />
              <button
                type="button"
                className="absolute right-3 text-slate-400 hover:text-slate-600 transition"
                aria-label="Filter options"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>

            {/* Filter Tabs: All, Unread (12), Favorites */}
            <div className="flex items-center gap-6 border-b border-slate-100 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`text-xs pb-2 font-medium relative transition cursor-pointer ${
                  activeTab === "all" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                All
                {activeTab === "all" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`text-xs pb-2 font-medium relative transition cursor-pointer ${
                  activeTab === "unread" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Unread (12)
                {activeTab === "unread" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`text-xs pb-2 font-medium relative transition cursor-pointer ${
                  activeTab === "favorites" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Favorites
                {activeTab === "favorites" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Conversation List Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No conversations found matching your search.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedId;

                return (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition relative group ${
                      isSelected
                        ? "bg-slate-50/80 border-l-3 border-[#d99738]"
                        : "hover:bg-slate-50/50"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                      <Image
                        src={conv.avatar}
                        alt={conv.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h3 className="text-xs font-bold text-[#0B244A] truncate">
                          {conv.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 flex-shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-slate-600 truncate leading-snug">
                          {conv.lastMessagePreview}
                        </p>
                        {conv.unreadCount > 0 ? (
                          <span className="w-4.5 h-4.5 rounded-full bg-[#0B244A] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {conv.unreadCount}
                          </span>
                        ) : conv.isStarred ? (
                          <span className="text-amber-500 flex-shrink-0">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                        ) : null}
                      </div>

                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        {conv.propertyTag}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* List Footer */}
          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 text-center select-none">
            1-7 of 12 conversations
          </div>
        </section>

        {/* ========================================================= */}
        {/* COLUMN 3: ACTIVE CHAT THREAD (Flex-1) */}
        {/* ========================================================= */}
        <section className="flex-1 flex flex-col h-full bg-[#fafbfc] min-w-0">
          {/* Chat Header */}
          <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                <Image
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0B244A] leading-snug">
                  {activeConversation.name}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeConversation.role} • {activeConversation.location}
                </p>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 text-slate-500">
              {/* Star Button */}
              <button
                type="button"
                onClick={() => handleToggleStar(activeConversation.id)}
                className={`p-2 rounded-md hover:bg-slate-100 transition cursor-pointer ${
                  activeConversation.isStarred ? "text-amber-500" : "text-slate-500"
                }`}
                title={activeConversation.isStarred ? "Unstar conversation" : "Star conversation"}
              >
                <svg className="w-5 h-5" fill={activeConversation.isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              {/* Info Details Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className={`p-2 rounded-md hover:bg-slate-100 transition cursor-pointer ${
                  isDetailsOpen ? "text-[#0B244A] bg-slate-100" : "text-slate-500"
                }`}
                title="Toggle details panel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* More Actions Dropdown */}
              <button
                type="button"
                className="p-2 rounded-md hover:bg-slate-100 transition cursor-pointer text-slate-500"
                title="More options"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Property Pin Card */}
            {activeConversation.propertyOfInterest && (
              <div className="bg-white border border-slate-200/90 rounded-md p-3.5 flex items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image
                      src={activeConversation.propertyOfInterest.imageUrl}
                      alt={activeConversation.propertyOfInterest.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B244A] truncate">
                      {activeConversation.propertyOfInterest.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activeConversation.propertyOfInterest.cityZip}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <span className="font-semibold text-slate-800">
                        {activeConversation.propertyOfInterest.price}
                      </span>{" "}
                      • {activeConversation.propertyOfInterest.specs}
                    </p>
                  </div>
                </div>

                <Link
                  href="/house-detail"
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-md transition flex-shrink-0 whitespace-nowrap shadow-2xs"
                >
                  View Property
                </Link>
              </div>
            )}

            {/* Date Separator */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-[#fafbfc] text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                May 13, 2024
              </span>
            </div>

            {/* Messages Thread */}
            <div className="space-y-4">
              {activeConversation.messages.map((msg) => {
                const isUser = msg.sender === "user";

                if (isUser) {
                  return (
                    <div key={msg.id} className="flex flex-col items-end">
                      <div className="bg-[#0B244A] text-white rounded-md rounded-tr-xs px-4 py-3 text-xs sm:text-sm max-w-[80%] md:max-w-md shadow-2xs leading-relaxed">
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                        <span>{msg.time}</span>
                        {/* Blue double tick */}
                        <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 mt-1">
                      <Image
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start max-w-[80%] md:max-w-md">
                      <div className="bg-white border border-slate-100 text-slate-800 rounded-md rounded-tl-xs px-4 py-3 text-xs sm:text-sm shadow-2xs leading-relaxed">
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 ml-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message / Note Composer Box */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2">
            {/* Tabs: Message / Note */}
            <div className="flex items-center gap-6 border-b border-slate-100 pb-2 px-1">
              <button
                type="button"
                onClick={() => setComposerMode("message")}
                className={`text-xs font-semibold relative transition cursor-pointer ${
                  composerMode === "message" ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Message
                {composerMode === "message" && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setComposerMode("note")}
                className={`text-xs font-semibold relative transition cursor-pointer ${
                  composerMode === "note" ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Note
                {composerMode === "note" && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#d99738] rounded-full" />
                )}
              </button>
            </div>

            {/* Main Input Box Card */}
            <div className="border border-slate-200 rounded-md p-3 bg-white focus-within:border-slate-400 transition">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={composerMode === "message" ? "Type your message..." : "Add an internal note about this client..."}
                rows={2}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none outline-none leading-relaxed bg-transparent"
              />

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                {/* Left Attachment Buttons */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                  {/* Attach File */}
                  <label className="flex items-center gap-1.5 hover:text-[#0B244A] transition cursor-pointer">
                    <input type="file" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setMessageInput((prev) => `${prev} [Attachment: ${e.target.files![0].name}]`);
                      }
                    }} />
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>Attach</span>
                  </label>

                  {/* Image */}
                  <label className="flex items-center gap-1.5 hover:text-[#0B244A] transition cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setMessageInput((prev) => `${prev} [Image: ${e.target.files![0].name}]`);
                      }
                    }} />
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Image</span>
                  </label>

                  {/* Schedule */}
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(true)}
                    className="flex items-center gap-1.5 hover:text-[#0B244A] transition cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Schedule</span>
                  </button>
                </div>

                {/* Right Send Button */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-[#0B244A] hover:bg-[#071933] text-white px-4 py-2 rounded-l-md text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current transform rotate-45" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span>Send</span>
                  </button>
                  <button
                    type="button"
                    className="bg-[#081b37] hover:bg-[#051124] text-white px-2 py-2 rounded-r-md border-l border-slate-700 text-xs transition cursor-pointer"
                    title="Send options"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* COLUMN 4: CONVERSATION DETAILS & QUICK REPLIES (w-80) */}
        {/* ========================================================= */}
        {isDetailsOpen && (
          <aside className="w-80 lg:w-[340px] flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-5 space-y-6 hidden xl:block">
            {/* Header: Conversation Details */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#0B244A]">
                Conversation Details
              </h3>
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title="Collapse details"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>

            {/* User Profile Card */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                  <Image
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#0B244A] truncate">
                    {activeConversation.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {activeConversation.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{activeConversation.phone}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{activeConversation.location}</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-[#0B244A]">
                About {activeConversation.name.split(" ")[0]}
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pre-approved:</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#047857] font-semibold text-[11px]">
                    {activeConversation.about.preApproved}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Looking for:</span>
                  <span className="font-medium text-slate-800">
                    {activeConversation.about.lookingFor}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Price Range:</span>
                  <span className="font-semibold text-slate-800">
                    {activeConversation.about.priceRange}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Timeline:</span>
                  <span className="font-medium text-slate-800">
                    {activeConversation.about.timeline}
                  </span>
                </div>
              </div>
            </div>

            {/* Property of Interest */}
            {activeConversation.propertyOfInterest && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-[#0B244A]">
                  Property of Interest
                </h4>

                <div className="flex items-start gap-3">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image
                      src={activeConversation.propertyOfInterest.imageUrl}
                      alt={activeConversation.propertyOfInterest.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#0B244A] truncate">
                      {activeConversation.propertyOfInterest.title}
                    </h5>
                    <p className="text-sm font-bold text-[#0B244A] mt-0.5">
                      {activeConversation.propertyOfInterest.price}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {activeConversation.propertyOfInterest.specs}
                    </p>
                    <Link
                      href="/house-detail"
                      className="text-xs text-blue-600 font-semibold hover:underline block mt-1"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0B244A]">
                  Quick Replies
                </h4>
                <button
                  type="button"
                  onClick={() => setMessageInput("Thanks for reaching out! Let me know if you have any questions.")}
                  className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  title="Add quick reply"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {QUICK_REPLIES.map((reply, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left p-2.5 rounded-md border border-slate-100 bg-slate-50/70 hover:bg-slate-100/90 transition cursor-pointer flex items-start gap-2.5 group"
                  >
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-xs text-slate-700 leading-snug">
                      {reply}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => alert("Manage Templates Modal: You can create, edit, or customize reusable message templates here.")}
                  className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Manage Templates
                </button>
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* New Message Modal */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B244A]">
                Compose New Message
              </h3>
              <button
                type="button"
                onClick={() => setIsNewMessageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Recipient Name / Client
                </label>
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  placeholder="e.g. Sarah Jenkins or (512) 555-0199"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Initial Message
                </label>
                <textarea
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewMessageModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateNewConversation}
                className="px-4 py-2 bg-[#0B244A] hover:bg-[#071933] text-white text-xs font-semibold rounded-md transition cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Tour / Message Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B244A]">
                Schedule Tour with {activeConversation.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tour Date
                </label>
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={tourTime}
                  onChange={(e) => setTourTime(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-slate-400"
                >
                  <option value="10:00 AM">10:00 AM - Morning</option>
                  <option value="11:00 AM">11:00 AM - Late Morning</option>
                  <option value="2:00 PM">2:00 PM - Afternoon</option>
                  <option value="4:30 PM">4:30 PM - Late Afternoon</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setMessageInput(`I've scheduled a tour for ${tourDate} at ${tourTime} at ${activeConversation.propertyOfInterest?.title || "the property"}. Looking forward to seeing you!`);
                  setShowScheduleModal(false);
                }}
                className="px-4 py-2 bg-[#0B244A] hover:bg-[#071933] text-white text-xs font-semibold rounded-md transition cursor-pointer"
              >
                Insert Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
