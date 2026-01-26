
# This simulates the future MongoDB collection
MOCK_PROVIDERS = [
    {
        "id": 1,
        "name": "Kamal Perera",
        "category": "Electrician",
        "description": "Expert in household wiring and light fittings.",
        "tags": ["Wiring", "Lights", "Domestic"],
        "rating": 4.5
    },
    {
        "id": 2,
        "name": "Sunil Electrics",
        "category": "Electrician",
        "description": "Specialized in hot water systems, geysers, and industrial wiring.",
        "tags": ["Geyser", "Industrial", "Heating", "Wiring"],
        "rating": 4.2
    },
    {
        "id": 3,
        "name": "Nimal Plumbers",
        "category": "Plumber",
        "description": "Experienced in fixing leaks, pipe replacements, and bathroom fittings.",
        "tags": ["Leaks", "Pipes", "Bathroom", "Repairs"],
        "rating": 4.4
    },
    {
        "id": 4,
        "name": "TechFix AC",
        "category": "AC Repair",
        "description": "Professional air conditioner servicing, repair, and gas refilling.",
        "tags": ["Cooling", "AC", "Gas Refill", "Maintenance"],
        "rating": 4.3
    },
    {
        "id": 5,
        "name": "SOMEONE Electrics",
        "category": "Electrician",
        "description": "Reliable electrical solutions for homes and small businesses.",
        "tags": ["Geyser", "Industrial", "Heating", "Wiring"],
        "rating": 4.0
    },
    {
        "id": 6,
        "name": "Banuka Studios",
        "category": "Photographer",
        "description": "Capturing weddings, birthdays, and special events with a creative touch.",
        "tags": ["Wedding Photography", "Events", "Portraits"],
        "rating": 4.6
    },
    {
        "id": 7,
        "name": "DJ Pulse Lanka",
        "category": "DJ",
        "description": "Professional DJ services for parties, weddings, and corporate events.",
        "tags": ["Music", "Parties", "Weddings", "Sound System"],
        "rating": 4.5
    },
    {
        "id": 8,
        "name": "CleanCare Solutions",
        "category": "Cleaning Service",
        "description": "Home and office cleaning with eco-friendly products.",
        "tags": ["House Cleaning", "Office Cleaning", "Deep Clean"],
        "rating": 4.1
    },
    {
        "id": 9,
        "name": "GreenScape Gardeners",
        "category": "Gardening",
        "description": "Garden maintenance, lawn care, and landscaping services.",
        "tags": ["Landscaping", "Lawn Care", "Plants"],
        "rating": 4.3
    },
    {
        "id": 10,
        "name": "SecureTech CCTV",
        "category": "Security Systems",
        "description": "Installation and maintenance of CCTV and home security systems.",
        "tags": ["CCTV", "Security", "Surveillance", "Installation"],
        "rating": 4.4
    },
    {
        "id": 11,
        "name": "QuickFix Carpenters",
        "category": "Carpenter",
        "description": "Custom furniture, repairs, and wooden fittings for homes.",
        "tags": ["Furniture", "Woodwork", "Repairs"],
        "rating": 4.2
    },
    {
        "id": 12,
        "name": "AutoCare Mobile",
        "category": "Vehicle Repair",
        "description": "On-site vehicle repairs and regular maintenance services.",
        "tags": ["Car Repair", "Maintenance", "Mobile Service"],
        "rating": 4.1
    },

    {
        "id": 13,
        "name": "Kandy Nrithya Kala Mandalaya",
        "category": "Traditional Kandyan Dancer",
        "description": "Professional Kandyan dance performances for weddings, peraheras, and cultural events.",
        "tags": ["Kandyan Dance", "Traditional", "Cultural Events"],
        "rating": 4.8
    },
    {
        "id": 14,
        "name": "Jayamangala Gatha Kandayama",
        "category": "Jayamangala Gatha Group",
        "description": "Traditional Jayamangala Gatha chanting for weddings, funerals, and religious ceremonies.",
        "tags": ["Jayamangala Gatha", "Traditional", "Religious Events"],
        "rating": 4.7
    },
    {
        "id": 15,
        "name": "Serendib Poruwa Creations",
        "category": "Poruwa Ceremony Services",
        "description": "Complete Sri Lankan poruwa ceremony setup with traditional rituals.",
        "tags": ["Poruwa", "Weddings", "Traditional"],
        "rating": 4.6
    },
    {
        "id": 16,
        "name": "Lakpura Event Caterers",
        "category": "Catering Service",
        "description": "Authentic Sri Lankan catering for weddings, alms-giving, and events.",
        "tags": ["Sri Lankan Food", "Buffet", "Alms Giving"],
        "rating": 4.5
    },
    {
        "id": 17,
        "name": "Saman Villa Florists",
        "category": "Flower Decoration",
        "description": "Floral decorations for weddings, funerals, and religious functions.",
        "tags": ["Flowers", "Decorations", "Events"],
        "rating": 4.4
    },
    {
        "id": 18,
        "name": "Ravana Drum Beats",
        "category": "Traditional Drummers",
        "description": "Traditional drum performances including geta bera and yak bera.",
        "tags": ["Drumming", "Traditional Music", "Events"],
        "rating": 4.7
    },
    {
        "id": 19,
        "name": "White Lotus Funeral Services",
        "category": "Funeral Services",
        "description": "Complete funeral arrangement services with dignity and care.",
        "tags": ["Funeral", "Rituals", "Support"],
        "rating": 4.3
    },
    {
        "id": 20,
        "name": "Golden Chair Hirers",
        "category": "Event Equipment Rental",
        "description": "Chair, table, tent, and stage rentals for events of all sizes.",
        "tags": ["Chairs", "Tents", "Event Setup"],
        "rating": 4.2
    },
    {
        "id": 21,
        "name": "Lanka Sound & Lights",
        "category": "Sound and Lighting",
        "description": "Professional sound systems and lighting for weddings and concerts.",
        "tags": ["Sound", "Lighting", "Stage"],
        "rating": 4.5
    },
    {
        "id": 22,
        "name": "Seth Sevana Alms Giving Services",
        "category": "Alms Giving Organizer",
        "description": "Organizing alms-giving ceremonies including monks coordination and catering.",
        "tags": ["Alms Giving", "Religious", "Ceremonies"],
        "rating": 4.6
    },
    {
        "id": 23,
        "name": "Heritage Wedding Attires",
        "category": "Wedding Attire Rental",
        "description": "Traditional Kandyan and Nilame wedding outfits for brides and grooms.",
        "tags": ["Wedding Dress", "Traditional Attire"],
        "rating": 4.4
    },
    {
        "id": 24,
        "name": "CityShuttle Vans",
        "category": "Event Transportation",
        "description": "Van and bus transport services for weddings and group events.",
        "tags": ["Transport", "Events", "Group Travel"],
        "rating": 4.1
    },
    {
        "id": 25,
        "name": "Kolam Mask Creations",
        "category": "Cultural Props",
        "description": "Handcrafted kolam masks and decorations for cultural events.",
        "tags": ["Kolam", "Masks", "Traditional"],
        "rating": 4.6
    },
    {
        "id": 26,
        "name": "Elegant Wedding Planners",
        "category": "Event Planner",
        "description": "Full-service wedding and event planning solutions.",
        "tags": ["Planning", "Weddings", "Coordination"],
        "rating": 4.5
    },
    {
        "id": 27,
        "name": "Temple View Pavilions",
        "category": "Event Venue",
        "description": "Traditional-style halls for weddings, pirith ceremonies, and gatherings.",
        "tags": ["Venue", "Ceremonies", "Halls"],
        "rating": 4.3
    },
    {
        "id": 28,
        "name": "Pirith Mandapaya Services",
        "category": "Pirith Ceremony Setup",
        "description": "Complete pirith mandapaya setup with decorations and lighting.",
        "tags": ["Pirith", "Religious", "Setup"],
        "rating": 4.7
    },
    {
        "id": 29,
        "name": "Sweet Kalu Dodol Makers",
        "category": "Traditional Sweets",
        "description": "Preparation of traditional Sri Lankan sweets for events.",
        "tags": ["Kalu Dodol", "Sweets", "Traditional Food"],
        "rating": 4.6
    },
    {
        "id": 30,
        "name": "Lanka Wedding Astrologer",
        "category": "Astrology Services",
        "description": "Wedding astrology, nekath matching, and auspicious time selection.",
        "tags": ["Astrology", "Nekath", "Weddings"],
        "rating": 4.4
    },
    {
        "id": 31,
        "name": "Perera Paint Works",
        "category": "Painter",
        "description": "Interior and exterior house painting with quality finishes.",
        "tags": ["Painting", "Interior", "Exterior"],
        "rating": 3.9
    },
    {
        "id": 32,
        "name": "Sampath Tile Fixers",
        "category": "Tiler",
        "description": "Floor and wall tile installation for homes and shops.",
        "tags": ["Tiling", "Flooring", "Bathrooms"],
        "rating": 4.2
    },
    {
        "id": 33,
        "name": "QuickNet Lanka",
        "category": "Internet Technician",
        "description": "Home internet setup, router configuration, and cable management.",
        "tags": ["WiFi", "Routers", "Networking"],
        "rating": 4.0
    },
    {
        "id": 34,
        "name": "HomeFix Handyman",
        "category": "Handyman",
        "description": "Small household repairs including fixtures, shelves, and fittings.",
        "tags": ["Repairs", "Household", "Maintenance"],
        "rating": 3.8
    },
    {
        "id": 35,
        "name": "CoolZone Refrigeration",
        "category": "Refrigerator Repair",
        "description": "Repair and servicing of refrigerators and freezers.",
        "tags": ["Fridge Repair", "Cooling", "Appliances"],
        "rating": 4.3
    },
    {
        "id": 36,
        "name": "SafeGas Lanka",
        "category": "Gas Technician",
        "description": "Gas cooker repairs, leak checks, and regulator replacements.",
        "tags": ["Gas Cooker", "Safety", "Repairs"],
        "rating": 4.1
    },
    {
        "id": 37,
        "name": "Ayesh Roof Solutions",
        "category": "Roofing",
        "description": "Roof leak repairs, asbestos roofing, and sheet replacements.",
        "tags": ["Roof Repair", "Leaks", "Asbestos"],
        "rating": 3.7
    },
    {
        "id": 38,
        "name": "BrightWash Laundry",
        "category": "Laundry Service",
        "description": "Washing, ironing, and dry-cleaning services for households.",
        "tags": ["Laundry", "Dry Cleaning", "Ironing"],
        "rating": 4.4
    },
    {
        "id": 39,
        "name": "SmartHome Electric",
        "category": "Electrician",
        "description": "Smart switches, CCTV wiring, and modern home electrical upgrades.",
        "tags": ["Smart Home", "Electrical", "CCTV Wiring"],
        "rating": 4.6
    },
    {
        "id": 40,
        "name": "Urban Pest Control",
        "category": "Pest Control",
        "description": "Cockroach, termite, and mosquito control for homes and offices.",
        "tags": ["Pest Control", "Termites", "Mosquitoes"],
        "rating": 3.6
    }
]
