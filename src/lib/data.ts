import {
  Heart,
  Users,
  Gem,
  BriefcaseBusiness,
  BadgeCheck,
  Route,
  Headphones,
  ShieldCheck,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/india", label: "India" },
  { href: "/international", label: "International" },
  { href: "/hotels", label: "Hotels & Resorts" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export const heroStats = [
  { target: 40, suffix: "+", label: "Destinations" },
  { target: 120, suffix: "+", label: "Curated Stays" },
  { target: 24, suffix: "/7", label: "Travel Support" },
];

export const hotels = [
  {
    img: "/images/destinations/udaipur.jpg",
    alt: "Palace-style luxury hotel in Udaipur",
    label: "Heritage icon",
    location: "Udaipur, India",
    title: "Taj Lake Palace",
    text: "A celebrated palace hotel offering an atmospheric lake setting and royal-inspired hospitality.",
  },
  {
    img: "/images/destinations/dubai.jpg",
    alt: "Luxury hotel and skyline in Dubai",
    label: "Dubai landmark",
    location: "Dubai, UAE",
    title: "Burj Al Arab",
    text: "An internationally recognised luxury address known for bold design, service and sea views.",
  },
  {
    img: "/images/destinations/singapore.jpg",
    alt: "Marina Bay skyline in Singapore",
    label: "Skyline experience",
    location: "Singapore",
    title: "Marina Bay Sands",
    text: "A spectacular urban stay combining panoramic views, dining, shopping and entertainment.",
  },
  {
    img: "/images/destinations/oberoi-udaivilas.jpg",
    alt: "Palatial garden hotel in Udaipur",
    label: "Royal retreat",
    location: "Udaipur, India",
    title: "The Oberoi Udaivilas",
    text: "Palatial architecture, landscaped gardens and tranquil lake-facing suites.",
  },
  {
    img: "/images/destinations/switzerland.jpg",
    alt: "Alpine luxury hotel in Switzerland",
    label: "Alpine icon",
    location: "Zermatt, Switzerland",
    title: "The Omnia",
    text: "Panoramic mountain views, refined alpine design and an exclusive spa retreat.",
  },
  {
    img: "/images/destinations/mauritius.jpg",
    alt: "Beachfront luxury hotel in Mauritius",
    label: "Island retreat",
    location: "Mauritius",
    title: "One&Only Le Saint Géran",
    text: "A private peninsula setting with white-sand beaches and elevated island hospitality.",
  },
];

export const resortTabs = [
  "Beach Resorts",
  "Mountain Retreats",
  "Wellness & Spa",
  "Family Resorts",
  "Private Villas",
];

export const resorts = [
  {
    img: "/images/destinations/maldives.jpg",
    alt: "Overwater luxury resort in the Maldives",
    label: "Private island",
    location: "Maldives",
    tag: "Honeymoon",
    title: "Soneva Jani",
    text: "Expansive overwater living, private pools and a secluded lagoon setting.",
  },
  {
    img: "/images/destinations/oberoi-udaivilas.jpg",
    alt: "Indian palace and garden architecture",
    label: "Royal retreat",
    location: "Udaipur, India",
    tag: "Luxury",
    title: "The Oberoi Udaivilas",
    text: "Palatial architecture, landscaped gardens and tranquil views across the lake.",
  },
  {
    img: "/images/destinations/atlantis-palm.jpg",
    alt: "Luxury tropical beach resort with pool",
    label: "Family favourite",
    location: "Dubai, UAE",
    tag: "Resort",
    title: "Atlantis The Palm",
    text: "A vibrant resort experience combining rooms, dining, attractions and family entertainment.",
  },
];

export const packages = [
  {
    icon: Heart,
    title: "Honeymoon Escapes",
    text: "Romantic villas, private dining, spa experiences and memorable island or mountain settings.",
    cta: "Plan a romantic holiday →",
  },
  {
    icon: Users,
    title: "Family Holidays",
    text: "Comfortable stays, child-friendly attractions and balanced itineraries for every generation.",
    cta: "Plan a family holiday →",
  },
  {
    icon: Gem,
    title: "Luxury Escapes",
    text: "Iconic hotels, premium transfers, private experiences and personalised travel assistance.",
    cta: "Create a luxury escape →",
  },
  {
    icon: BriefcaseBusiness,
    title: "Corporate Retreats",
    text: "Resort venues, group accommodation, meeting support and team-building experiences.",
    cta: "Discuss a group retreat →",
  },
];

export const benefits = [
  {
    icon: BadgeCheck,
    title: "Curated Properties",
    text: "Stays selected for location, experience, facilities and traveller suitability.",
  },
  {
    icon: Route,
    title: "Custom Itineraries",
    text: "Travel plans shaped around your duration, budget and preferred holiday style.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Helpful assistance from the first enquiry through your completed journey.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Information",
    text: "Transparent inclusions, practical guidance and availability-based recommendations.",
  },
];

export const testimonials = [
  {
    quote:
      "Our Maldives holiday felt effortless. The resort recommendation matched exactly what we wanted for our honeymoon.",
    initials: "AK",
    name: "Aarav & Kiara",
    trip: "Maldives honeymoon",
  },
  {
    quote:
      "The Udaipur stay, transfers and experiences were coordinated beautifully for our family celebration.",
    initials: "MS",
    name: "Mehta Family",
    trip: "Udaipur escape",
  },
  {
    quote:
      "Planning our corporate retreat was simple with clear package options and prompt support throughout.",
    initials: "RP",
    name: "Riya Patel",
    trip: "Corporate retreat",
  },
];

export const blogPosts = [
  {
    img: "/images/destinations/maldives.jpg",
    alt: "Maldives resort booking guide",
    label: "Honeymoon guide",
    title: "How to Choose the Right Maldives Resort",
    text: "Compare villa types, transfers, meal plans and island experiences before making your decision.",
  },
  {
    img: "/images/destinations/goa.jpg",
    alt: "Luxury resorts in Goa for family holidays",
    label: "India travel",
    title: "Best Resort Areas in Goa for Every Traveller",
    text: "Discover where to stay for beaches, nightlife, family comfort or a quieter coastal holiday.",
  },
  {
    img: "/images/destinations/switzerland.jpg",
    alt: "Alpine hotel and lakeside town in Switzerland",
    label: "International travel",
    title: "Planning a First-Time Trip to Switzerland",
    text: "Understand the best regions, travel seasons and stay options for a smooth alpine holiday.",
  },
];

export const membershipTiers = [
  {
    name: "Explorer",
    price: "Free",
    tagline: "For travellers just getting started",
    perks: [
      "Member-only fares on select hotels",
      "Birthday travel voucher",
      "Priority customer support",
    ],
  },
  {
    name: "Voyager",
    price: "₹4,999/yr",
    tagline: "For frequent domestic & international travellers",
    perks: [
      "Everything in Explorer",
      "Complimentary room upgrades (subject to availability)",
      "Late checkout at partner hotels",
      "Dedicated travel concierge",
    ],
    featured: true,
  },
  {
    name: "Elite",
    price: "₹12,999/yr",
    tagline: "For the discerning luxury traveller",
    perks: [
      "Everything in Voyager",
      "Complimentary airport transfers",
      "Exclusive access to private-island resorts",
      "Personalised itinerary planning",
      "24/7 emergency travel assistance",
    ],
  },
];
