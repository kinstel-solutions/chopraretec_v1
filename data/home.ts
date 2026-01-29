import { RefreshCw, Ruler, Activity, ShieldCheck, Truck, BookOpen, Factory, Globe, Cpu, Plane } from 'lucide-react';

export const homeData = {
  hero: {
    heading: "Precision Molded Rubber & Rubber-to-Metal Bonded Components",
    subHeading: "Chopra Retec: Trusted for Reliability",
    industries: ['Automotive', 'Industrial', 'Healthcare', 'Defence', 'Material Handling'],
    cta: "Request a Quote",
    description: "Chopra Retec: Trusted for Reliability" // Added as per Hero.tsx
  },
  industries: {
    heading: "Engineered for Multiple Industries & Applications",
    subHeading: "Industries We Serve",
    description: "Chopra Retec partners with customers across diverse sectors, delivering engineered rubber and rubber-to-metal bonded components designed for extreme conditions.",
    items: [
      {
        title: 'Automotive',
        slug: 'automotive',
        description: 'High-performance rubber components for passenger and commercial vehicles.',
        image: '/images/industries/industries-basic-1200w.webp'
      },
      {
        title: 'Defence',
        slug: 'defence',
        description: 'Mission-critical components meeting global standards.',
        image: '/images/facility/facility-side-view-1200w.webp'
      },
      {
        title: 'Engineering & Industrial',
        slug: 'engineering-industrial',
        description: 'Durable solutions for machinery, engineering and industrial applications.',
        image: '/images/industries/industries-advanced-1200w.webp'
      },
      {
        title: 'Material Handling',
        slug: 'material-handling',
        description: 'Robust components for logistics and material transport equipment.',
        image: '/images/facility/facility-side-view-1200w.webp'
      },
      {
        title: 'Healthcare & Medical',
        slug: 'healthcare-medical',
        description: 'Hygienic and precision molded parts for medical and healthcare applications.',
        image: '/images/facility/facility-side-view-1200w.webp'
      }
    ]
  },
  products: {
    heading: "Components That Perform Under Adverse Conditions",
    subHeading: "Products Snapshot",
    description: "We manufacture a wide range of molded rubber and rubber-to-metal bonded components, engineered for consistent performance and long service life with focus on Noise, Vibration and Harshness (NVH).",
    items: [
      {
        id: 'exhaust',
        title: 'Exhaust Suspension Components',
        description: 'High Performance hangers and mounts.',
        image: '/images/products/engine-mount-v2-1200w.webp',
      },
      {
        id: 'bushes',
        title: 'Ride Control Parts',
        description: 'Suspension & steering parts including stabiliser bar bushes, trailer arm bushes, control arm bushings, End links, bellows, strut mount kits & chassis parts.',
        image: '/images/products/rubber-metal-components-v2-1200w.webp',
      },
      {
        id: 'anti-vibration',
        title: 'Anti-Vibration Mounts',
        description: 'Controll Arm Bushing, Trailer Arm Bushings, Silent Block.',
        image: '/images/products/rubber-metal-components-v1-1200w.webp',
      },
      {
        id: 'bonded',
        title: 'Rubber-to-Metal Bonded Components',
        description: 'Designed for structural integrity.',
        image: '/images/bonding-process/bonding-stage3-1200w.webp',
      },
      {
        id: 'custom',
        title: 'Custom-Designed Components',
        description: 'End-to-End Bespoke solutions. From conceptualising to design, mould making, moulding and processing to meet customer needs.',
        image: '/images/industries/industries-basic-1200w.webp',
      },
    ]
  },
  whyUs: {
    heading: "The Chopra Retec Advantage",
    subHeading: "Why Choose Us",
    capabilities: [
      "Real-Time, Top Notch Communication",
      "Comprehensive Range of Products",
      "100% Fill Rates",
      "On-Time Deliveries, Always",
      "In-House Capability of Research, Design & Development, sets us apart from our others",
      "Customised Packaging",
      "Competitive Pricing",
    ],
    image: "/images/facility/facility-side-view-1200w.webp"
  },
  capabilities: {
    heading: "End-to-End Manufacturing Solutions",
    subHeading: "Manufacturing Facilities",
    description: "From compound selection to molding, bonding and validation — we offer end-to-end rubber component manufacturing capabilities.",
    items: [
      "Conceptualizing and R&D",
      "Component Design",
      "Mould Design & Making",
      "Compound Design",
      "Moulding using multiple processes: Compression, Transfer, Vacuum & Injection moulding",
      "In-House Testing & Quality Assurance",
      "Customised Packaging"
    ],
    video: "/videos/industrial-components.mp4"
  },
  awards: {
    heading: "Certified Excellence",
    subHeading: "Recognitions & Certifications",
    images: [
      '/images/awards/ecovadis.png',
      '/images/awards/nqa-logo.png',
      '/images/awards/ic1.png',
      '/images/awards/ic2.png',
      '/images/awards/ic3.png',
      '/images/awards/ic4.png',
      '/images/awards/ic5.png',
    ]
  },
  quality: {
    heading: "Quality You Can Depend On",
    subHeading: "Quality & Reliability",
    features: [
      {
        icon: RefreshCw,
        title: 'Robust Process Controls',
        description: 'Our systems are designed for repeatability, ensuring consistent quality output for every batch.',
      },
      {
        icon: Ruler,
        title: 'Inspection & Validation',
        description: 'Rigorous validation standards and dimensional checks at every stage of production.',
      },
      {
        icon: Activity,
        title: 'Durability & Performance',
        description: 'We focus on creating parts that withstand stress, heat, and vibration over long service lives.',
      },
      {
        icon: ShieldCheck,
        title: 'Continuous Improvement',
        description: 'A commitment to refining our processes and adopting best practices for global supply requirements.',
      },
    ]
  },
  globalReach: {
    heading: "SILENCING THE NEEDS OF GLOBAL INDUSTRIES",
    subHeading: "Global Presence",
    description: "From our state-of-the-art facility in Lucknow to companies in Europe and the Americas, Chopra Retec ensures precision goes global.",
    stats: [
      { icon: Truck, value: 98, suffix: '%', label: 'On-Time Delivery', description: 'Reliable logistics' },
      { icon: BookOpen, value: 5000, suffix: '+', label: 'Parts Developed', description: 'Extensive product portfolio' },
    ],
    timeline: [
        {
          year: '1990s',
          title: 'Local Roots',
          description: 'Started as a modest manufacturing unit in Lucknow, focusing on quality basics.',
          icon: Factory,
        },
        {
          year: '2000s',
          title: 'Global Expansion',
          description: 'Broke into international markets, establishing trust in Europe and the Americas.',
          icon: Globe,
        },
        {
          year: '2010s',
          title: 'Modernization',
          description: 'Invested heavily in automation and CNC machining to ensure zero-defect production.',
          icon: Cpu,
        },
        {
          year: '2020s',
          title: 'Aerospace Precision',
          description: 'Achieved certification for aerospace components, marking a new era of precision.',
          icon: Plane,
        },
      ]
  },
  cta: {
    heading: "Looking for a reliable rubber components manufacturing partner?",
    text: "Partner with us for precision engineering, global standards, and consistent quality.",
    button: "Send Your RFQ / Drawing"
  }
};
