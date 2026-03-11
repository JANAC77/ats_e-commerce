// src/data/products.js
export const products = [
  {
    id: 3,
    name: "Excelus Office Desk Name Plate - IAS / Government Officer",
    collection: "Excelus",
    price: 999,
    description: "Our Excelus range of office desk name plates is the true mark of the business professional. Each personalised desk sign comprises of an acrylic plate and a base made from ecologically harvested teak wood - one of the highest grade woods used in furniture in India.\n\nThese solid wood signs will not crack or warp as the years roll by. They are made to last until you retire or finally get that promotion. As always, these are backed with our 100% love-it guarantee.",
    category: "desk-nameplates",
    subCategory: "professional",
    image: "/images/products/image11.jpg",
    images: [
      "/images/products/image11.jpg",
      "/images/products/image12.jpg",
      "/images/products/image13.jpg",
      "/images/products/image14.jpg"
    ],
    hasVideo: false,
    popular: true,
    reviews: {
      count: 1039,
      rating: 4.7,
      questions: 26,
      distribution: {
        5: 825,
        4: 166,
        3: 16,
        2: 9,
        1: 23
      }
    },
    aiSummary: "Office desk nameplate highly praised for its premium and elegant appearance, with customers calling it 'superb look' and 'exclusive look.' Customers appreciate the quality and timely delivery, though some concerns exist about pricing, sizing consistency, and occasional quality control issues like scratches on acrylic or uneven slots causing slant positioning.",
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Ecologically Harvested Teak Wood",
      "Will not crack or warp over time",
      "100% Love-it Guarantee",
      "FREE Vastu Shastra Guide Included",
      "Bulk Order Requests Accepted"
    ],
    specifications: {
      primaryMaterial: "Acrylic Plate with Teak Wood Base",
      dimensions: "Small: 8 inch × 2½ inch × 2 inch | Large: 10 inch × 3 inch × 2 inch",
      careInstructions: "Wipe with dry cloth. Avoid water and chemicals.",
      freeVastuGuide: "Included with every purchase",
      bulkOrders: "Available on request"
    },
    note: "For those choosing a Black Plate with Gold Lettering:\nThe live preview shows the lettering in a uniform colour but we actually use a gradient as shown in the sample image. Also, the golden appearance of the letter is achieved using a gradient and not through any kind of metallic print.",
    variants: {
      sizes: [
        { 
          id: "small", 
          name: "Small", 
          dimensions: "8 inch × 2½ inch × 2 inch", 
          price: 999 
        },
        { 
          id: "large", 
          name: "Large", 
          dimensions: "10 inch × 3 inch × 2 inch", 
          price: 1299 
        }
      ],
      styles: [
        { 
          id: "white-black", 
          name: "Frosted White Plate with Black Lettering", 
          image: "/images/products/image11.jpg",
          preview: "/images/products/image11.jpg"
        },
        { 
          id: "black-gold", 
          name: "Black Plate with Gold Lettering", 
          image: "/images/products/image12.jpg",
          preview: "/images/products/image12.jpg",
          note: "The golden appearance is achieved using a gradient, not metallic print"
        }
      ]
    },
    customization: {
      name: {
        label: "Name",
        placeholder: "Dr. C. P. Somanath",
        maxLength: 25,
        defaultValue: "Dr. C. P. Somanath"
      },
      designation: {
        label: "Designation",
        placeholder: "SECRETARY, DEPARTMENT OF SPACE",
        maxLength: 50,
        defaultValue: "SECRETARY, DEPARTMENT OF SPACE"
      }
    },
    shipping: {
      ordered: "Mar 09",
      processing: "Mar 10 - Mar 14",
      delivery: "Mar 16 - Mar 17",
      freeShipping: true,
      internationalShipping: "Fees apply for shipping outside India",
      taxInfo: "Taxes included"
    }
  },
  {
    id: 4,
    name: "Excelus Office Desk Name Plate - Doctor",
    collection: "Excelus",
    price: 999,
    description: "Professional desk name plate for doctors and medical professionals. Features elegant design suitable for clinics and hospitals.",
    category: "desk-nameplates",
    subCategory: "medical",
    image: "/images/products/image12.jpg",
    images: [
      "/images/products/image12.jpg",
      "/images/products/image11.jpg",
      "/images/products/image13.jpg",
      "/images/products/image15.jpg"
    ],
    popular: true,
    reviews: {
      count: 845,
      rating: 4.8,
      questions: 18
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Medical Symbol Available",
      "Ecologically Harvested Teak Wood",
      "100% Love-it Guarantee",
      "FREE Vastu Shastra Guide",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches",
      careInstructions: "Wipe with dry cloth"
    },
    variants: {
      sizes: [
        { id: "small", name: "Small", dimensions: "8 inch × 2½ inch × 2 inch", price: 999 },
        { id: "large", name: "Large", dimensions: "10 inch × 3 inch × 2 inch", price: 1299 }
      ]
    },
    customization: {
      name: {
        label: "Name",
        placeholder: "Dr. Smith",
        maxLength: 25
      },
      designation: {
        label: "Specialization",
        placeholder: "CARDIOLOGIST",
        maxLength: 50
      }
    }
  },
  {
    id: 7,
    name: "Excelus Office Desk Name Plate - Classic",
    collection: "Excelus",
    price: 999,
    description: "Classic professional desk name plate suitable for all professionals. Timeless design that complements any office decor.",
    category: "desk-nameplates",
    subCategory: "classic",
    image: "/images/products/image13.jpg",
    images: [
      "/images/products/image13.jpg",
      "/images/products/image11.jpg",
      "/images/products/image12.jpg"
    ],
    popular: true,
    reviews: {
      count: 825,
      rating: 4.6
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Classic Design",
      "Multiple Finish Options",
      "Professional Look",
      "5 Year Warranty",
      "Free Vastu Guide"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches",
      careInstructions: "Wipe with dry cloth"
    }
  },
  {
    id: 9,
    name: "Excelus Office Desk Name Plate - Chartered Accountant",
    collection: "Excelus",
    price: 999,
    description: "Professional desk name plate for Chartered Accountants with CA logo option. Perfect for your office desk.",
    category: "desk-nameplates",
    subCategory: "professional",
    image: "/images/products/image14.jpg",
    images: [
      "/images/products/image14.jpg",
      "/images/products/image11.jpg",
      "/images/products/image13.jpg"
    ],
    popular: true,
    reviews: {
      count: 567,
      rating: 4.7
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "CA Logo Available",
      "Elegant Design",
      "Professional Look",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches"
    }
  },
  {
    id: 10,
    name: "Excelus Office Desk Name Plate - School Principal",
    collection: "Excelus",
    price: 999,
    description: "Distinguished desk name plate for school principals and educational leaders. Adds prestige to your office.",
    category: "desk-nameplates",
    subCategory: "educational",
    image: "/images/products/image15.jpg",
    images: [
      "/images/products/image15.jpg",
      "/images/products/image11.jpg",
      "/images/products/image13.jpg"
    ],
    popular: true,
    reviews: {
      count: 423,
      rating: 4.8
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Educational Theme",
      "Elegant Design",
      "School Logo Option",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches"
    }
  },
  {
    id: 11,
    name: "Excelus Office Desk Name Plate - Orthopaedic",
    collection: "Excelus",
    price: 999,
    description: "Specialized desk name plate for orthopaedic doctors with medical symbols. Perfect for orthopaedic clinics.",
    category: "desk-nameplates",
    subCategory: "medical",
    image: "/images/products/image16.jpg",
    images: [
      "/images/products/image16.jpg",
      "/images/products/image12.jpg",
      "/images/products/image15.jpg"
    ],
    popular: true,
    reviews: {
      count: 312,
      rating: 4.7
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Orthopaedic Symbols",
      "Medical Theme",
      "Clinic Ready",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches"
    }
  },
  {
    id: 12,
    name: "Excelus Office Desk Name Plate with Photo",
    collection: "Excelus",
    price: 1299,
    description: "Premium desk name plate with photo insert option for personalized touch. Perfect for displaying your professional photo.",
    category: "desk-nameplates",
    subCategory: "premium",
    image: "/images/products/image17.jpg",
    images: [
      "/images/products/image17.jpg",
      "/images/products/image11.jpg",
      "/images/products/image13.jpg"
    ],
    popular: true,
    reviews: {
      count: 456,
      rating: 4.8
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "Photo Insert Option",
      "Personalized Design",
      "Elegant Finish",
      "5 Year Warranty",
      "Replaceable Photo"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "10 x 4 inches",
      photoSize: "2 x 2 inches",
      careInstructions: "Wipe with dry cloth"
    }
  },
  {
    id: 13,
    name: "Excelus Office Desk Name Plate - CBIC Officers",
    collection: "Excelus",
    price: 999,
    description: "Official desk name plate for CBIC and customs officers. Government standard design with official logo options.",
    category: "desk-nameplates",
    subCategory: "government",
    image: "/images/products/image18.jpg",
    images: [
      "/images/products/image18.jpg",
      "/images/products/image11.jpg",
      "/images/products/image13.jpg"
    ],
    popular: true,
    reviews: {
      count: 234,
      rating: 4.6
    },
    features: [
      "Premium Acrylic Plate with Teak Wood Base",
      "CBIC Logo Available",
      "Official Design",
      "Government Standard",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Acrylic with Teak Wood",
      dimensions: "8 x 3 inches"
    }
  },
  {
    id: 1,
    name: "Futura (Matte Black) - House Name Plate",
    collection: "Futura",
    price: 549,
    description: "Contemporary house name plate with elegant matte black finish. Modern design that complements any home exterior.",
    category: "house-nameplates",
    subCategory: "modern",
    image: "/images/products/image1.jpg",
    images: [
      "/images/products/image1.jpg",
      "/images/products/image2.jpg",
      "/images/products/image3.jpg",
      "/images/products/image4.jpg"
    ],
    popular: true,
    reviews: {
      count: 1245,
      rating: 4.8
    },
    features: [
      "Premium Matte Black Finish",
      "Grade 304 Stainless Steel",
      "Weather Resistant",
      "Easy Installation",
      "5 Year Warranty",
      "UV Protected"
    ],
    specifications: {
      primaryMaterial: "Stainless Steel",
      dimensions: "12 x 4 inches",
      careInstructions: "Wipe with dry cloth",
      warranty: "5 Years"
    }
  },
  {
    id: 2,
    name: "Golden Portoro - House Name Plate",
    collection: "Portoro",
    price: 649,
    description: "Luxury house name plate with golden Portoro marble design. Adds a touch of elegance to your home entrance.",
    category: "house-nameplates",
    subCategory: "luxury",
    image: "/images/products/image2.jpg",
    images: [
      "/images/products/image2.jpg",
      "/images/products/image1.jpg",
      "/images/products/image3.jpg"
    ],
    popular: true,
    reviews: {
      count: 892,
      rating: 4.7
    },
    features: [
      "Premium Marble Finish",
      "Gold Accents",
      "Weather Resistant",
      "UV Protected",
      "5 Year Warranty",
      "Scratch Resistant"
    ],
    specifications: {
      primaryMaterial: "PVC with Marble Effect",
      dimensions: "12 x 4 inches",
      careInstructions: "Wipe with soft cloth"
    }
  },
  {
    id: 5,
    name: "Futura (Gold Stainless Steel) - House Name Plate",
    collection: "Futura",
    price: 1099,
    description: "Premium gold finish stainless steel house name plate. Luxurious look with durable construction.",
    category: "house-nameplates",
    subCategory: "premium",
    image: "/images/products/image3.jpg",
    images: [
      "/images/products/image3.jpg",
      "/images/products/image1.jpg",
      "/images/products/image5.jpg"
    ],
    popular: true,
    reviews: {
      count: 756,
      rating: 4.9
    },
    features: [
      "Premium Gold Finish",
      "Grade 304 Stainless Steel",
      "Weather Resistant",
      "Anti-rust Coating",
      "5 Year Warranty",
      "Mirror Polish"
    ],
    specifications: {
      primaryMaterial: "Stainless Steel",
      dimensions: "12 x 4 inches",
      careInstructions: "Wipe with dry cloth"
    }
  },
  {
    id: 6,
    name: "Futura (Matte White) - House Name Plate",
    collection: "Futura",
    price: 549,
    description: "Clean and modern house name plate with matte white finish. Minimalist design for contemporary homes.",
    category: "house-nameplates",
    subCategory: "modern",
    image: "/images/products/image4.jpg",
    images: [
      "/images/products/image4.jpg",
      "/images/products/image1.jpg",
      "/images/products/image6.jpg"
    ],
    popular: true,
    reviews: {
      count: 678,
      rating: 4.6
    },
    features: [
      "Premium Matte White Finish",
      "Grade 304 Stainless Steel",
      "Weather Resistant",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Stainless Steel",
      dimensions: "12 x 4 inches"
    }
  },
  {
    id: 8,
    name: "Barlow GST Board",
    collection: "Barlow",
    price: 899,
    description: "Professional GST registration board for businesses. Compliant design with space for all required details.",
    category: "house-nameplates",
    subCategory: "business",
    image: "/images/products/image5.jpg",
    images: [
      "/images/products/image5.jpg",
      "/images/products/image6.jpg",
      "/images/products/image8.jpg"
    ],
    popular: true,
    reviews: {
      count: 445,
      rating: 4.5
    },
    features: [
      "Premium Quality",
      "GST Number Space",
      "Business Details",
      "Weather Resistant",
      "3 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "PVC",
      dimensions: "12 x 8 inches",
      careInstructions: "Wipe with dry cloth"
    }
  },
  {
    id: 14,
    name: "Impasto Contemporary",
    collection: "Impasto",
    price: 649,
    description: "Contemporary house name plate with textured impasto finish. Artistic design for unique homes.",
    category: "house-nameplates",
    subCategory: "contemporary",
    image: "/images/products/image6.jpg",
    images: [
      "/images/products/image6.jpg",
      "/images/products/image1.jpg",
      "/images/products/image4.jpg"
    ],
    popular: true,
    reviews: {
      count: 389,
      rating: 4.6
    },
    features: [
      "Textured Finish",
      "Contemporary Design",
      "Weather Resistant",
      "UV Protected",
      "3 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "PVC",
      dimensions: "12 x 4 inches"
    }
  },
  {
    id: 15,
    name: "Teddy on the Moon",
    collection: "Kids",
    price: 799,
    description: "Playful kids room name plate with teddy bear and moon design. Perfect for nurseries and children's rooms.",
    category: "house-nameplates",
    subCategory: "kids",
    image: "/images/products/image7.jpg",
    images: [
      "/images/products/image7.jpg",
      "/images/products/image6.jpg",
      "/images/products/image8.jpg"
    ],
    popular: false,
    reviews: {
      count: 234,
      rating: 4.9
    },
    features: [
      "Cute Teddy Design",
      "Moon Shape",
      "Kids Friendly",
      "Colorful Print",
      "2 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "PVC",
      dimensions: "10 x 8 inches",
      careInstructions: "Wipe with dry cloth"
    }
  },
  {
    id: 16,
    name: "Sameeksha Wooden",
    collection: "Wooden",
    price: 899,
    description: "Elegant wooden finish name plate for a natural look. Brings warmth to your home entrance.",
    category: "house-nameplates",
    subCategory: "wooden",
    image: "/images/products/image8.jpg",
    images: [
      "/images/products/image8.jpg",
      "/images/products/image1.jpg",
      "/images/products/image10.jpg"
    ],
    popular: false,
    reviews: {
      count: 178,
      rating: 4.7
    },
    features: [
      "Wooden Finish",
      "Natural Look",
      "Elegant Design",
      "Weather Protected",
      "3 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "PVC with Wood Effect",
      dimensions: "12 x 4 inches"
    }
  },
  {
    id: 18,
    name: "Walnut Contemporary",
    collection: "Walnut",
    price: 699,
    description: "Modern name plate with elegant walnut finish. Sophisticated design for modern homes.",
    category: "house-nameplates",
    subCategory: "contemporary",
    image: "/images/products/image10.jpg",
    images: [
      "/images/products/image10.jpg",
      "/images/products/image1.jpg",
      "/images/products/image6.jpg"
    ],
    popular: false,
    reviews: {
      count: 145,
      rating: 4.5
    },
    features: [
      "Walnut Finish",
      "Contemporary Design",
      "Weather Resistant",
      "Easy Installation",
      "3 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "PVC",
      dimensions: "12 x 4 inches"
    }
  },
  {
    id: 21,
    name: "Spectrum Birch Clock",
    collection: "Spectrum",
    price: 2499,
    description: "Wallpaper with integrated birch clock design. Functional and decorative for your living room.",
    category: "wallpapers",
    subCategory: "clocks",
    image: "/images/products/image1.jpg",
    images: [
      "/images/products/image1.jpg",
      "/images/products/image2.jpg",
      "/images/products/image3.jpg"
    ],
    popular: true,
    reviews: {
      count: 89,
      rating: 4.6
    },
    features: [
      "Integrated Clock",
      "Birch Design",
      "Premium Quality",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Vinyl",
      dimensions: "10 feet x 12 feet",
      coverage: "120 sq ft"
    }
  },
  {
    id: 22,
    name: "Modern Geometric",
    collection: "Geometric",
    price: 1999,
    description: "Contemporary geometric pattern wallpaper. Perfect for accent walls and modern interiors.",
    category: "wallpapers",
    subCategory: "geometric",
    image: "/images/products/image2.jpg",
    images: [
      "/images/products/image2.jpg",
      "/images/products/image1.jpg",
      "/images/products/image3.jpg"
    ],
    popular: false,
    reviews: {
      count: 67,
      rating: 4.4
    },
    features: [
      "Geometric Design",
      "Modern Look",
      "Premium Quality",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Vinyl",
      dimensions: "10 feet x 12 feet"
    }
  },
  {
    id: 23,
    name: "Floral Pattern",
    collection: "Floral",
    price: 1799,
    description: "Beautiful floral design wallpaper for elegant interiors. Brings nature indoors.",
    category: "wallpapers",
    subCategory: "floral",
    image: "/images/products/image3.jpg",
    images: [
      "/images/products/image3.jpg",
      "/images/products/image1.jpg",
      "/images/products/image4.jpg"
    ],
    popular: false,
    reviews: {
      count: 56,
      rating: 4.5
    },
    features: [
      "Floral Design",
      "Elegant Look",
      "Premium Quality",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Vinyl",
      dimensions: "10 feet x 12 feet"
    }
  },
  {
    id: 24,
    name: "Textured Brick",
    collection: "Texture",
    price: 2199,
    description: "Realistic brick texture wallpaper for industrial look. Creates a rustic, urban feel.",
    category: "wallpapers",
    subCategory: "textured",
    image: "/images/products/image4.jpg",
    images: [
      "/images/products/image4.jpg",
      "/images/products/image2.jpg",
      "/images/products/image5.jpg"
    ],
    popular: false,
    reviews: {
      count: 78,
      rating: 4.7
    },
    features: [
      "Brick Texture",
      "Industrial Look",
      "3D Effect",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Vinyl",
      dimensions: "10 feet x 12 feet"
    }
  },
  {
    id: 25,
    name: "Wooden Finish",
    collection: "Wood",
    price: 1899,
    description: "Natural wood effect wallpaper for warm interiors. Adds warmth without the maintenance.",
    category: "wallpapers",
    subCategory: "wooden",
    image: "/images/products/image5.jpg",
    images: [
      "/images/products/image5.jpg",
      "/images/products/image1.jpg",
      "/images/products/image3.jpg"
    ],
    popular: false,
    reviews: {
      count: 92,
      rating: 4.6
    },
    features: [
      "Wood Effect",
      "Natural Look",
      "Premium Quality",
      "Easy Installation",
      "5 Year Warranty"
    ],
    specifications: {
      primaryMaterial: "Vinyl",
      dimensions: "10 feet x 12 feet"
    }
  }
];

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Helper function to get related products
export const getRelatedProducts = (product, limit = 4) => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Helper function to get popular products
export const getPopularProducts = (limit = 8) => {
  return products.filter(product => product.popular).slice(0, limit);
};