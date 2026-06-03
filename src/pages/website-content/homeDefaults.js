export const HOME_SECTIONS = [
  { key: "about", label: "About Us", description: "Company intro, paragraphs, achievements" },
  { key: "mission", label: "Our Mission", description: "Mission statement and mission cards" },
  { key: "quickServices", label: "Quick Services", description: "Three highlight cards in the banner" },
  { key: "services", label: "Services", description: "Detailed service offerings with bullet points" },
  { key: "environmentalBenefits", label: "Environmental Benefits", description: "Eco-impact cards and banner text" },
  { key: "wasteToEnergy", label: "Waste to Energy", description: "Project showcase items" },
  { key: "whyChoose", label: "Why Choose Us", description: "Reasons list and progress bars" },
  { key: "philosophy", label: "Our Philosophy", description: "Philosophy quote and tagline" },
  { key: "faqs", label: "FAQs", description: "Frequently asked questions" },
];

export const HOME_DEFAULTS = {
  about: {
    subtitle: "About Us",
    title: "ESHA Enterprises",
    heading: "Your Trusted Waste Management Partner",
    paragraphs: [
      "ESHA Enterprises has extensive expertise managing municipal waste, including RDF, non-recyclable plastic waste, and environmentally safe disposal into the cement industry.",
      "We strive to enhance sustainability in every aspect of our activities.",
    ],
    image: "/img/thumbs/truck.svg",
    achievements: [
      { icon: "fa-light fa-badge-check", value: "PCB", label: "Pollution Control Board" },
      { icon: "fa-light fa-shield-check", value: "CPCB", label: "Central Pollution Control" },
      { icon: "fa-light fa-certificate", value: "SPCB", label: "State Pollution Control" },
      { icon: "fa-light fa-leaf", value: "100%", label: "Eco-Friendly Process" },
    ],
  },
  mission: {
    subtitle: "Our Mission",
    title: "Conserve and Sustain a Clean & Green Environment",
    description: "We commit to Conserve and Sustain clean and green environment.",
    cards: [
      { title: "Waste Segregation", icon: "fa-light fa-filter", description: "Promote proper waste segregation." },
      { title: "Reduce Landfill", icon: "fa-light fa-trash-can-slash", description: "Reduce landfill dependency." },
    ],
  },
  quickServices: [
    { title: "PCB Compliant", icon: "fa-light fa-badge-check", description: "Pollution Control Board certified operations." },
    { title: "Waste to Energy", icon: "fa-light fa-bolt", description: "Converting non-recyclable waste into RDF." },
    { title: "Eco-Friendly", icon: "fa-light fa-leaf", description: "Sustainable processes that protect the environment." },
  ],
  services: {
    subtitle: "Our Services",
    title: "Complete Waste Management Solutions",
    details: [
      {
        icon: "fa-light fa-truck-fast",
        title: "Collection & Transportation",
        items: ["Segregated combustible waste collection from Municipalities", "Transportation to Cement Industry"],
      },
    ],
  },
  environmentalBenefits: {
    subtitle: "Environmental Benefits",
    title: "Creating a Sustainable Future",
    cards: [
      { icon: "fa-light fa-seedling", title: "Safe & ECO Friendly Disposal", description: "Reduces landfill burden." },
      { icon: "fa-light fa-fire-flame-curved", title: "Fossil Fuel Conservation", description: "Reduces fossil fuel dependency." },
      { icon: "fa-light fa-cloud", title: "Reduction of CO₂ Emission", description: "Lower carbon footprint." },
    ],
    banner: "Clean and Green Environment in and around us",
  },
  wasteToEnergy: {
    subtitle: "Waste to Energy",
    title: "Transforming Waste into Opportunity",
    items: [
      {
        number: "01",
        image: "/img/thumbs/thumb-90.webp",
        category: "RDF Production",
        title: "Refuse Derived Fuel for Industrial Applications",
        description: "Through co-processing and waste-to-energy initiatives, we convert non-recyclable waste.",
        buttonText: "Learn More",
        buttonLink: "/contact",
      },
    ],
  },
  whyChoose: {
    title: "Why Choose ESHA Enterprises?",
    reasons: [
      { icon: "fa-light fa-gears", title: "Integrated Solutions", description: "We efficiently handle every stage." },
      { icon: "fa-light fa-leaf", title: "Environmental Commitment", description: "Clean and green operations." },
    ],
    progressBars: [
      { label: "Waste Processing Efficiency", value: 98 },
      { label: "Client Satisfaction", value: 100 },
    ],
  },
  philosophy: {
    subtitle: "Our Philosophy",
    quote: "Waste is not a problem — it is a resource in the wrong place.",
    tagline: "My Earth, My Responsibility.",
  },
  faqs: [
    {
      question: "What types of waste does ESHA Enterprises handle?",
      answer: "We specialize in municipal non-recyclable plastic waste, industrial plastic waste, and mixed solid waste.",
    },
  ],
};
