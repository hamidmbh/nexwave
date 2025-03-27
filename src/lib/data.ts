export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  saleEnds?: string;
  isTopSelling?: boolean;
  isComingSoon?: boolean;
  releaseDate?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2342&auto=format&fit=crop',
    productCount: 12
  },
  {
    id: 'laptops',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2342&auto=format&fit=crop',
    productCount: 8
  },
  {
    id: 'tablets',
    name: 'Tablets',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=2340&auto=format&fit=crop',
    productCount: 5
  },
  {
    id: 'audio',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2265&auto=format&fit=crop',
    productCount: 10
  },
  {
    id: 'wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2344&auto=format&fit=crop',
    productCount: 7
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2281&auto=format&fit=crop',
    productCount: 15
  }
];

export const products: Product[] = [
  {
    id: 'nw-phone-pro',
    name: 'NexWave Phone Pro',
    category: 'smartphones',
    price: 999.99,
    oldPrice: 1099.99,
    description: "The most advanced smartphone we've ever created. With a stunning 6.7-inch Super Retina XDR display, incredible battery life, and the fastest chip ever in a smartphone.",
    features: [
      'A16 Bionic chip with 6-core CPU',
      '6.7-inch Super Retina XDR display',
      'Pro camera system (48MP main, 12MP ultra wide, 12MP telephoto)',
      'Up to 29 hours of video playback',
      'Face ID for secure authentication'
    ],
    specs: {
      'Display': '6.7-inch Super Retina XDR',
      'Processor': 'A16 Bionic chip',
      'Storage': '256GB',
      'RAM': '8GB',
      'Battery': '4,323mAh',
      'OS': 'NexOS 17',
      'Water Resistance': 'IP68'
    },
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2662&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475257-7e15a93a6341?q=80&w=2187&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=2336&auto=format&fit=crop'
    ],
    stock: 48,
    rating: 4.8,
    reviews: 458,
    isNew: true,
    isFeatured: true,
    isTopSelling: true
  },
  {
    id: 'ultrabook-x1',
    name: 'UltraBook X1',
    category: 'laptops',
    price: 1599.99,
    oldPrice: 1799.99,
    description: 'Incredibly light and powerful laptop with all-day battery life, featuring a stunning 14-inch Liquid Retina display and a powerful M2 chip.',
    features: [
      'M2 Pro chip with 10-core CPU',
      '14-inch Liquid Retina XDR display',
      'Up to 18 hours of battery life',
      '16GB unified memory',
      '512GB SSD storage'
    ],
    specs: {
      'Display': '14-inch Liquid Retina XDR',
      'Processor': 'M2 Pro chip',
      'Storage': '512GB SSD',
      'Memory': '16GB unified',
      'Battery': 'Up to 18 hours',
      'OS': 'NexOS Desktop',
      'Ports': '3 Thunderbolt 4, HDMI, MagSafe 3'
    },
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2342&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?q=80&w=2338&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2318&auto=format&fit=crop'
    ],
    stock: 23,
    rating: 4.9,
    reviews: 212,
    isFeatured: true,
    isTopSelling: true
  },
  {
    id: 'airbuds-pro',
    name: 'AirBuds Pro',
    category: 'audio',
    price: 249.99,
    description: 'Immersive sound with active noise cancellation and transparency mode. Comfortable design with customizable fit.',
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Spatial audio with dynamic head tracking',
      'Water and sweat resistant',
      'Up to 6 hours of listening time'
    ],
    specs: {
      'Chip': 'H2 headphone chip',
      'Battery': 'Up to a6 hours on a single charge',
      'Charging': 'MagSafe Charging Case',
      'Connectivity': 'Bluetooth 5.3',
      'Controls': 'Force sensor, motion detection'
    },
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=2178&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2340&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2265&auto=format&fit=crop'
    ],
    stock: 156,
    rating: 4.7,
    reviews: 328,
    isNew: true,
    isFeatured: true,
    isTopSelling: true
  },
  {
    id: 'smart-watch-se',
    name: 'Smart Watch SE',
    category: 'wearables',
    price: 249.99,
    oldPrice: 299.99,
    description: 'Advanced health monitoring and fitness tracking in an elegant design. Stay connected with cellular capabilities.',
    features: [
      'Always-On Retina LTPO OLED display',
      'Heart rate and ECG monitoring',
      'Fall and crash detection',
      'Water resistant to 50 meters',
      'Up to 18 hours of battery life'
    ],
    specs: {
      'Display': 'Retina LTPO OLED display',
      'Processor': 'S8 SiP',
      'Storage': '32GB',
      'Water Resistance': '50 meters',
      'Connectivity': 'Wi-Fi, Bluetooth 5.3, LTE',
      'Sensors': 'Accelerometer, gyro, heart rate, barometer'
    },
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2344&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627307873825-506345196659?q=80&w=2187&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550029402-226115b7c579?q=80&w=3001&auto=format&fit=crop'
    ],
    stock: 82,
    rating: 4.6,
    reviews: 175,
    isFeatured: true,
    isOnSale: true,
    saleEnds: '2023-12-31T23:59:59',
    isTopSelling: true
  },
  {
    id: 'tablet-air',
    name: 'Tablet Air',
    category: 'tablets',
    price: 599.99,
    description: 'Ultra-thin, lightweight design with a stunning display, powerful performance, and all-day battery life.',
    features: [
      '10.9-inch Liquid Retina display',
      'M1 chip with Neural Engine',
      'Up to 10 hours of battery life',
      'Compatible with Apple Pencil (2nd generation)',
      'Ultra Wide front camera with Center Stage'
    ],
    specs: {
      'Display': '10.9-inch Liquid Retina',
      'Processor': 'M1 chip',
      'Storage': '256GB',
      'RAM': '8GB',
      'Battery': 'Up to 10 hours',
      'OS': 'NexOS Tablet 16',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.0'
    },
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=2340&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=3096&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=2340&auto=format&fit=crop'
    ],
    stock: 36,
    rating: 4.7,
    reviews: 128,
    isFeatured: true
  },
  {
    id: 'power-bank-20k',
    name: 'PowerBank 20000mAh',
    category: 'accessories',
    price: 49.99,
    oldPrice: 69.99,
    description: 'High-capacity portable charger with fast charging capabilities for all your devices.',
    features: [
      '20,000mAh capacity',
      'USB-C Power Delivery up to 30W',
      'USB-A Quick Charge 3.0',
      'Charge up to 3 devices simultaneously',
      'LED battery indicator'
    ],
    specs: {
      'Capacity': '20,000mAh',
      'Input': 'USB-C PD (20W)',
      'Output': 'USB-C PD (30W), USB-A QC 3.0 (18W)',
      'Dimensions': '5.9 x 2.9 x 0.8 inches',
      'Weight': '12 oz',
      'Recharge Time': '4 hours with 20W charger'
    },
    images: [
      'https://images.unsplash.com/photo-1604671368394-2240d0b1bb36?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1659302178574-ede8c0cd91a2?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=2340&auto=format&fit=crop'
    ],
    stock: 215,
    rating: 4.5,
    reviews: 342,
    isOnSale: true,
    saleEnds: '2023-11-30T23:59:59'
  },
  {
    id: 'vr-headset-pro',
    name: 'VR Headset Pro',
    category: 'wearables',
    price: 499.99,
    description: 'Immersive virtual reality experience with high-resolution displays and precise motion tracking.',
    features: [
      'High-resolution OLED displays',
      'Wide 120° field of view',
      'Integrated audio with spatial sound',
      'External cameras for mixed reality',
      'Comfortable design for extended sessions'
    ],
    specs: {
      'Display': 'Dual 2.1" OLED screens, 2560 x 2560 per eye',
      'Refresh Rate': '120Hz',
      'Field of View': '120°',
      'Tracking': '6DoF inside-out tracking',
      'Audio': 'Integrated spatial audio',
      'Connectivity': 'USB-C, Bluetooth 5.2, Wi-Fi 6'
    },
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525850283137-06a1a6c2c4f6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=2070&auto=format&fit=crop'
    ],
    stock: 18,
    rating: 4.7,
    reviews: 86,
    isNew: true
  },
  {
    id: 'wireless-charger',
    name: 'MagSafe Wireless Charger',
    category: 'accessories',
    price: 39.99,
    description: 'Fast, efficient wireless charging with perfect alignment every time thanks to magnets.',
    features: [
      'MagSafe compatible with iPhone 12 and newer',
      'Up to 15W wireless charging',
      'Perfect alignment with magnets',
      'Compact, minimalist design',
      'Compatible with Qi-enabled devices'
    ],
    specs: {
      'Charging Speed': 'Up to 15W with MagSafe, 7.5W with Qi',
      'Input': 'USB-C',
      'Dimensions': '3.2" diameter x 0.29" height',
      'Cable Length': '1m',
      'Compatibility': 'MagSafe iPhones, Qi-enabled devices'
    },
    images: [
      'https://images.unsplash.com/photo-1659429351100-19aa3564d305?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?q=80&w=1996&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629131530328-48628a377284?q=80&w=1974&auto=format&fit=crop'
    ],
    stock: 74,
    rating: 4.6,
    reviews: 142
  },
  {
    id: 'nexwave-glasses',
    name: 'NexWave AR Glasses',
    category: 'wearables',
    price: 1299.99,
    description: 'The future of augmented reality in an elegant and lightweight design. Experience digital content like never before.',
    features: [
      'Advanced AR display with 120° field of view',
      'Spatial mapping and hand tracking',
      'Voice control and gesture recognition',
      'All-day battery life',
      'Seamless smartphone integration'
    ],
    specs: {
      'Display': 'Dual 4K micro-OLED',
      'Processor': 'NexChip AR1',
      'Memory': '8GB LPDDR5',
      'Storage': '128GB',
      'Battery': 'Up to 8 hours',
      'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, 5G',
      'Weight': '68g'
    },
    images: [
      'https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?q=80&w=2342&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598295888219-70c920f1ca65?q=80&w=2274&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?q=80&w=2340&auto=format&fit=crop'
    ],
    stock: 0,
    rating: 0,
    reviews: 0,
    isNew: false,
    isComingSoon: true,
    releaseDate: '2024-12-15T00:00:00'
  },
  {
    id: 'nexwave-foldable',
    name: 'NexWave Fold Ultra',
    category: 'smartphones',
    price: 1899.99,
    description: 'Our most innovative smartphone yet featuring a revolutionary folding display that transforms from phone to tablet in an instant.',
    features: [
      'Foldable 7.6-inch Dynamic AMOLED 2X main display',
      'A17 Pro chip with 8-core CPU',
      'Triple camera system with 108MP main sensor',
      'IPX8 water resistance',
      'S Pen compatibility'
    ],
    specs: {
      'Main Display': '7.6-inch Dynamic AMOLED 2X, 120Hz',
      'Cover Display': '6.2-inch Dynamic AMOLED 2X, 120Hz',
      'Processor': 'A17 Pro chip',
      'RAM': '12GB',
      'Storage': '512GB',
      'Battery': '4,400mAh dual battery',
      'OS': 'NexOS 17'
    },
    images: [
      'https://images.unsplash.com/photo-1635011058753-30416f1030ef?q=80&w=2344&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1644501652792-9f437f5298ad?q=80&w=2344&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628815114272-9c3627222f17?q=80&w=2574&auto=format&fit=crop'
    ],
    stock: 0,
    rating: 0,
    reviews: 0,
    isComingSoon: true,
    releaseDate: '2024-10-20T00:00:00'
  },
  {
    id: 'nexwave-robot',
    name: 'NexWave Home Robot',
    category: 'accessories',
    price: 999.99,
    description: 'A revolutionary home assistant robot that combines AI intelligence with mobility to help with everyday tasks.',
    features: [
      'Advanced AI with natural language processing',
      'Autonomous navigation with obstacle avoidance',
      'Built-in voice assistant integration',
      'Remote monitoring and control via app',
      'Face and voice recognition'
    ],
    specs: {
      'Processor': 'NexBrain Neural Core',
      'Cameras': '360° vision with depth sensing',
      'Battery': 'Up to 8 hours of active use',
      'Height': '12 inches',
      'Weight': '6.5 lbs',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.2',
      'Compatibility': 'Works with most smart home systems'
    },
    images: [
      'https://images.unsplash.com/photo-1665866241673-557fd4568420?q=80&w=2340&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=2340&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092921461-7d05e8abc3ae?q=80&w=2340&auto=format&fit=crop'
    ],
    stock: 0,
    rating: 0,
    reviews: 0,
    isComingSoon: true,
    releaseDate: '2025-01-15T00:00:00'
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, count: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, count);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getTopSellingProducts = (): Product[] => {
  return products.filter(product => product.isTopSelling);
};

export const getComingSoonProducts = (): Product[] => {
  return products.filter(product => product.isComingSoon);
};
