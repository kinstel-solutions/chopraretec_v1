import { Camera, Briefcase, User } from 'lucide-react';

export type ServiceItem = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
};

export type ServiceCategory = {
  title: string;
  slug: string;
  iconName: 'camera' | 'briefcase' | 'user';
  description: string;
  services: ServiceItem[];
};

export const servicesData: ServiceCategory[] = [
  {
    title: 'Wedding & Events',
    slug: 'wedding-events',
    iconName: 'camera',
    description: 'Capturing the essence of your celebration while you live the moment.',
    services: [
      {
        title: 'Pre-Wedding Shoot',
        slug: 'pre-wedding-shoot',
        description: 'Atmospheric couple portraits before the big day.',
        longDescription: 'Our pre-wedding shoots are designed to tell your unique love story. We choose scenic locations in Lucknow and beyond to create cinematic, romantic portraits that you will cherish forever. Whether you prefer a traditional vibe or a modern aesthetic, we tailor the session to your personality.',
        image: '/portfolio-wedding.png' // Utilizing existing placeholders for now
      },
      {
        title: 'Engagement / Ring Ceremony',
        slug: 'engagement',
        description: 'Coverage of your ring exchange and engagement festivities.',
        longDescription: 'The beginning of your official journey together. We document the emotions, the rituals, and the candid moments of joy shared with family and friends during your engagement ceremony.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Haldi / Mehndi / Sangeet Coverage',
        slug: 'haldi-mehndi-sangeet',
        description: 'Vibrant and colorful coverage of pre-wedding rituals.',
        longDescription: 'Indian weddings are a festival of colors. We capture the fun, the dance, and the traditions of Haldi, Mehndi, and Sangeet with an artistic touch, ensuring every splash of turmeric and every henna design is immortalized.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Destination Wedding',
        slug: 'destination-wedding',
        description: 'Comprehensive coverage for weddings across India and globe.',
        longDescription: 'Planning a wedding away from home? Our team is experienced in travel logistics and destination photography. We capture the grandeur of the location alongside the intimacy of your wedding moments.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Candid Photography',
        slug: 'candid-photography',
        description: 'Unposed, natural moments captured artistically.',
        longDescription: 'The best moments are often the unplanned ones. Our candid photography looks for the stolen glances, the teary eyes, and the hearty laughs that happen in between the rituals.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Traditional Photography',
        slug: 'traditional-photography',
        description: 'Classic formal portraits and ritual documentation.',
        longDescription: 'We understand the importance of documenting every ritual and every family member. Our traditional photography ensures that no guest is missed and every ceremony is recorded with clarity and respect.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Wedding Cinematic Video',
        slug: 'wedding-cinematic-video',
        description: 'High-quality storytelling wedding films.',
        longDescription: 'Your wedding story told like a movie. We use cinema-grade cameras and editing techniques to weave together the sights and sounds of your wedding into a breathtaking film.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Wedding Teaser / Highlight Film',
        slug: 'wedding-teaser',
        description: 'Short, punchy highlights for social media.',
        longDescription: 'A fast-paced, music-driven summary of your wedding celebrations. Perfect for sharing on Instagram and with friends who want to relive the excitement quickly.',
        image: '/portfolio-wedding.png'
      },
      {
        title: 'Drone Wedding Shoot',
        slug: 'drone-wedding-shoot',
        description: 'Aerial perspectives of your venue and events.',
        longDescription: 'Add a grand perspective to your wedding album with our drone photography and videography. Perfect for outdoor venues and large processions (Baraat).',
        image: '/portfolio-wedding.png'
      }
    ]
  },
  {
    title: 'Commercial & Corporate',
    slug: 'commercial-corporate',
    iconName: 'briefcase',
    description: 'Visual storytelling that elevates your brand identity and business presence.',
    services: [
      {
        title: 'E-commerce Shoot',
        slug: 'e-commerce-shoot',
        description: 'Clean, crisp product photography for online stores.',
        longDescription: 'Increase your conversion rates with professional e-commerce photography. We provide high-resolution images on white backgrounds or styled settings that make your products shine.',
        image: '/portfolio-commercial.png'
      },
      {
        title: 'Restaurant / Hotel Photography',
        slug: 'restaurant-hotel',
        description: 'Appetizing food shots and inviting interior photos.',
        longDescription: 'We help hospitality businesses attract more guests through mouth-watering food photography and architectural shots that showcase the ambiance of your property.',
        image: '/portfolio-commercial.png'
      },
      {
        title: 'Real Estate Photography',
        slug: 'real-estate',
        description: 'Wide-angle interior and exterior property shots.',
        longDescription: 'Sell properties faster with high-end real estate photography. We use professional lighting and wide-angle lenses to show spaces at their best.',
        image: '/portfolio-commercial.png'
      },
      {
        title: 'Factory / Industrial Shoot',
        slug: 'factory-industrial',
        description: 'Documenting industrial processes and infrastructure.',
        longDescription: 'Showcase your manufacturing capabilities and infrastructure. We capture the scale and precision of your industrial operations for brochures, websites, and annual reports.',
        image: '/portfolio-commercial.png'
      },
      {
        title: 'Corporate Event Photography',
        slug: 'corporate-event',
        description: 'Coverage of conferences, launches, and meetings.',
        longDescription: 'Professional coverage for your corporate milestones. Whether it is a product launch, an award ceremony, or a conference, we document the key moments professionally.',
        image: '/portfolio-commercial.png'
      },
      {
        title: 'Office Profile Shoot',
        slug: 'office-profile',
        description: 'Team headshots and workplace culture photography.',
        longDescription: 'Humanize your brand with professional headshots of your leadership and candid shots of your team at work. Perfect for "About Us" pages and LinkedIn profiles.',
        image: '/portfolio-commercial.png'
      }
    ]
  },
  {
    title: 'Fashion & Portfolios',
    slug: 'fashion-portfolios',
    iconName: 'user',
    description: 'High-end editorials and portfolios designed to launch careers.',
    services: [
      {
        title: 'Model Portfolio Shoot',
        slug: 'model-portfolio',
        description: 'Professional book building for aspiring models.',
        longDescription: 'Kickstart or update your modeling career with a versatile portfolio. We guide you through poses and looks that agencies are looking for.',
        image: '/portfolio-fashion.png'
      },
      {
        title: 'Actor / Actress Portfolio',
        slug: 'actor-portfolio',
        description: 'Expressive headshots and full-body shots for casting.',
        longDescription: 'For actors, your face is your fortune. We capture expressive, dramatic, and natural headshots that help you stand out to casting directors.',
        image: '/portfolio-fashion.png'
      },
      {
        title: 'Influencer Content Shoot',
        slug: 'influencer-content',
        description: 'Styled shoots for social media content creation.',
        longDescription: 'Batch create high-quality content for your social channels. We work with influencers to create a month\'s worth of aesthetic content in a single shoot.',
        image: '/portfolio-fashion.png'
      },
      {
        title: 'Fashion Photography',
        slug: 'fashion-photography',
        description: 'Editorial and catalog shoots for designer labels.',
        longDescription: 'We collaborate with designers and brands to create high-fashion imagery for lookbooks, ad campaigns, and editorials.',
        image: '/portfolio-fashion.png'
      },
      {
        title: 'Lookbook Shoot',
        slug: 'lookbook-shoot',
        description: 'Collection showcasing for fashion brands.',
        longDescription: 'Clean, consistent, and stylish photography to showcase your latest season\'s collection to buyers and customers.',
        image: '/portfolio-fashion.png'
      }
    ]
  }
];
