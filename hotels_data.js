const hotelsData = [
    {
        "id": 1,
        "name": "The Oberoi Grand",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.9,
        "stars": 5,
        "price": 22000,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Luxury located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 2,
        "name": "Taj Bengal",
        "location": "Alipore",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 5,
        "price": 26000,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Resort located in Alipore. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 3,
        "name": "ITC Sonar, a Luxury Collection Hotel",
        "location": "Tangra",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 5,
        "price": 19000,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Palace located in Tangra. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 4,
        "name": "JW Marriott Hotel Kolkata",
        "location": "Tangra",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 21000,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Heritage located in Tangra. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 5,
        "name": "Hyatt Regency Kolkata",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 5,
        "price": 17500,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Palace located in Salt Lake. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 6,
        "name": "The Lalit Great Eastern, Kolkata",
        "location": "BBD Bagh",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 5,
        "price": 16000,
        "amenities": [
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Pool",
            "Gym",
            "Bar"
        ],
        "badges": [],
        "description": "A 5-Star Beach Resort located in BBD Bagh. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 7,
        "name": "Novotel Kolkata Hotel & Residences",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 5,
        "price": 15500,
        "amenities": [
            "Pool",
            "Wifi",
            "Parking",
            "Restaurant",
            "Spa",
            "Gym",
            "Bar"
        ],
        "badges": [],
        "description": "A 5-Star Palace located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 8,
        "name": "Swissotel Kolkata Neotia Vista",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 5,
        "price": 16200,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [],
        "description": "A 5-Star Iconic located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 9,
        "name": "The Westin Kolkata Rajarhat",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 5,
        "price": 18500,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Heritage located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 10,
        "name": "Fairfield by Marriott Kolkata",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 5,
        "price": 12500,
        "amenities": [
            "Pool",
            "Wifi",
            "Parking",
            "Restaurant",
            "Spa",
            "Gym",
            "Bar"
        ],
        "badges": [],
        "description": "A 5-Star Mountain Resort located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 11,
        "name": "Hotel Hindusthan International (HHI), Kolkata",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.0,
        "stars": 5,
        "price": 30000,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Luxury located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 12,
        "name": "The Park Kolkata",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.0,
        "stars": 5,
        "price": 9500,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 13,
        "name": "Vivanta Kolkata, EM Bypass",
        "location": "EM Bypass",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.0,
        "stars": 5,
        "price": 8500,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Business located in EM Bypass. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 14,
        "name": "Taj Taal Kutir",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.0,
        "stars": 5,
        "price": 9500,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Resort located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 15,
        "name": "The Amaya Resort Kolkata NH6",
        "location": "NH6",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.0,
        "stars": 5,
        "price": 5500,
        "amenities": [
            "Pool",
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Top Rated",
            "Relaxing"
        ],
        "description": "A 5-Star Resort located in NH6. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 16,
        "name": "ITC Royal Bengal",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 25000,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Luxury located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 17,
        "name": "Hyatt Centric Ballygunge Kolkata",
        "location": "Ballygunge",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 10.0,
        "stars": 5,
        "price": 18000,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Boutique located in Ballygunge. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 18,
        "name": "Taj City Centre New Town Kolkata",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 10.0,
        "stars": 5,
        "price": 20000,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 5-Star Business located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 19,
        "name": "The Peerless Inn, Kolkata",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 4,
        "price": 9000,
        "amenities": [
            "Pool",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym"
        ],
        "badges": [],
        "description": "A 4-Star Spa Resort located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 20,
        "name": "Kenilworth Hotel, Kolkata",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 4,
        "price": 8500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Beach Resort located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 21,
        "name": "ibis Kolkata Rajarhat - An Accor Brand",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 4,
        "price": 15000,
        "amenities": [
            "Pool",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Business located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 22,
        "name": "Polo Floatel, Kolkata",
        "location": "Strand Road",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 4,
        "price": 5000,
        "amenities": [
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Floating Hotel located in Strand Road. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 23,
        "name": "Hotel Senses",
        "location": "Ballygunge",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 4,
        "price": 4800,
        "amenities": [
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Boutique located in Ballygunge. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 24,
        "name": "Howard Johnson by Wyndham, Kolkata Airport",
        "location": "Near Airport",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 4,
        "price": 4700,
        "amenities": [
            "Pool",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Business located in Near Airport. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 25,
        "name": "Golden Tulip Salt Lake City Kolkata",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 4,
        "price": 4600,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Business located in Salt Lake. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 26,
        "name": "Aristocrat Hotel",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.4,
        "stars": 4,
        "price": 4400,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 27,
        "name": "AIRPORT CITY HOTEL",
        "location": "Near Airport",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 4,
        "price": 4300,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Business located in Near Airport. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 28,
        "name": "The Firangipani Suites",
        "location": "Ballygunge",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 4,
        "price": 4200,
        "amenities": [
            "Spa",
            "Wifi",
            "Parking",
            "Restaurant",
            "Gym"
        ],
        "badges": [],
        "description": "A 4-Star Boutique located in Ballygunge. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 29,
        "name": "RA VISTA",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 4,
        "price": 4100,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 30,
        "name": "De Sovrani",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 4,
        "price": 3800,
        "amenities": [
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 4-Star Boutique located in Salt Lake. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 31,
        "name": "Pipal Tree Hotel",
        "location": "Camac Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 4,
        "price": 3500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 4-Star Boutique located in Camac Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 32,
        "name": "Vedic Village Spa Resort",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 4,
        "price": 6000,
        "amenities": [
            "Pool",
            "Spa",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Relaxing"
        ],
        "description": "A 4-Star Resort located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 33,
        "name": "Aauris Kolkata",
        "location": "Alipore",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 4,
        "price": 5000,
        "amenities": [
            "Pool",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Boutique located in Alipore. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 34,
        "name": "Zone By The Park, Kolkata",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.6,
        "stars": 4,
        "price": 4000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [],
        "description": "A 4-Star Business located in New Town. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 35,
        "name": "Revaa Hotels",
        "location": "Camac Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.7,
        "stars": 4,
        "price": 3800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 4-Star Boutique located in Camac Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 36,
        "name": "Transitel - A Boutique Hotel",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.5,
        "stars": 4,
        "price": 3600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 4-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 37,
        "name": "NORTHIN Kolkata Airport",
        "location": "Near Airport",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 3500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 4-Star Business located in Near Airport. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 38,
        "name": "Hotel Kanan Inn",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 4,
        "price": 3400,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 4-Star Business located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 39,
        "name": "Treebo Asl Prime, Gariahat",
        "location": "Gariahat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.0,
        "stars": 3,
        "price": 2800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 3-Star Business located in Gariahat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 40,
        "name": "Astoria Hotel",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 5.6,
        "stars": 3,
        "price": 2200,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 3-Star Business located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 41,
        "name": "ibis Kolkata Rajarhat Hotel",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 42,
        "name": "The Astor Kolkata",
        "location": "Shakespeare Sarani",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Heritage located in Shakespeare Sarani. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 43,
        "name": "Fortune Park Panchwati (Member ITC Hotels' Group)",
        "location": "Barrackpore",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2800,
        "amenities": [
            "Pool",
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Resort located in Barrackpore. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 44,
        "name": "Hotel VIP International",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2400,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 45,
        "name": "Regenta Orko's Kolkata",
        "location": "Camac Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Camac Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 46,
        "name": "Hotel Park Victoria",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2300,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 47,
        "name": "Polo Floatel Kolkata (Alternative Listing)",
        "location": "Strand Road",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Floating located in Strand Road. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 48,
        "name": "Fabhotel Gulshan International",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Budget located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 49,
        "name": "Treebo Premium Tahoora International",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2100,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 50,
        "name": "Hotel Kempton",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1900,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Budget located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 51,
        "name": "Ethnotel, Kolkata Airport",
        "location": "Near Airport",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2200,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Near Airport. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 52,
        "name": "Hotel Casa Fortuna",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 53,
        "name": "The Samilton",
        "location": "Camac Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Camac Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 54,
        "name": "Babul Hotel (Also listed in 2-Star)",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 6.4,
        "stars": 3,
        "price": 1400,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 3-Star Budget located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 55,
        "name": "Treebo Hoops - Airport, VIP Road",
        "location": "VIP Road",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1700,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Budget located in VIP Road. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 56,
        "name": "Best Inn By BookMeriHotel",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Budget located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 57,
        "name": "Pallavi International Hotel",
        "location": "Chowringhee",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Business located in Chowringhee. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 58,
        "name": "Visitel - A Boutique Hotel",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1900,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 3-Star Boutique located in Park Street. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 59,
        "name": "FabHotel City Star",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 10.0,
        "stars": 2,
        "price": 800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 60,
        "name": "Hotel Seventy Seven",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 10.0,
        "stars": 2,
        "price": 1700,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 61,
        "name": "Urvi Banquets & Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 9.3,
        "stars": 2,
        "price": 3200,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 62,
        "name": "Ashray Living Entity",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 9.0,
        "stars": 2,
        "price": 0,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 63,
        "name": "Red Arrow Residency",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.7,
        "stars": 2,
        "price": 0,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 64,
        "name": "Vinayak Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.6,
        "stars": 2,
        "price": 900,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 65,
        "name": "Hotel Ichamati",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.4,
        "stars": 2,
        "price": 1100,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 66,
        "name": "Hotel 21",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.3,
        "stars": 2,
        "price": 1100,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 67,
        "name": "Eco Corporate Inn 2 Rajarhat",
        "location": "Rajarhat",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.3,
        "stars": 2,
        "price": 1900,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Business located in Rajarhat. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 68,
        "name": "SHRISTI HEIGHT",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.3,
        "stars": 2,
        "price": 800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 69,
        "name": "Hotel Air View",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.2,
        "stars": 2,
        "price": 800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 70,
        "name": "Basera Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.1,
        "stars": 2,
        "price": 900,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 71,
        "name": "Janata Hotel",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.0,
        "stars": 2,
        "price": 600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 72,
        "name": "Astana Inn",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 8.0,
        "stars": 2,
        "price": 1000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 73,
        "name": "Sonar Bangla Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 7.9,
        "stars": 2,
        "price": 1600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 74,
        "name": "Ashreen Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 7.1,
        "stars": 2,
        "price": 1000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 75,
        "name": "Shaw Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 7.1,
        "stars": 2,
        "price": 600,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 76,
        "name": "Pallavi International",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 6.5,
        "stars": 2,
        "price": 4300,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 77,
        "name": "Babul Hotel",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 6.2,
        "stars": 2,
        "price": 1400,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 78,
        "name": "Sadia Guest House",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 6.0,
        "stars": 2,
        "price": 800,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Top Rated",
            "Best Value"
        ],
        "description": "A 2-Star Guest House located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 79,
        "name": "Hotel Sefali Delux",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 2,
        "price": 1200,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 80,
        "name": "Hotel Royal Crowne near Kolkata Airport",
        "location": "Near Airport",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.6,
        "stars": 2,
        "price": 1500,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Near Airport. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 81,
        "name": "HOTEL SREE DURGA",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 2,
        "price": 1000,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 82,
        "name": "La Cresta Inn",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.7,
        "stars": 2,
        "price": 1300,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 83,
        "name": "HOTEL STEAM",
        "location": "Central Kolkata",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 2,
        "price": 1100,
        "amenities": [
            "Gym",
            "Wifi",
            "Parking",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "A 2-Star Budget located in Central Kolkata. Perfect for your stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // --- MOCK DATA FOR NEW LOCATIONS ---
    {
        "id": 101,
        "name": "Sea Hawk, Digha",
        "location": "New Digha",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 2500,
        "amenities": ["Wifi", "Restaurant", "Pool", "Parking"],
        "badges": ["Best Value"],
        "description": "A popular choice near the beach in New Digha.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 102,
        "name": "Mayfair Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 12000,
        "amenities": ["Wifi", "Spa", "Restaurant", "Heating", "Gym"],
        "badges": ["Top Rated", "Heritage"],
        "description": "Exquisite heritage hotel in the hills of Darjeeling.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 103,
        "name": "Sonar Bangla Mandarmani",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 5500,
        "amenities": ["Wifi", "Pool", "Restaurant", "Beach Access"],
        "badges": [],
        "description": "Beachfront luxury in Mandarmani.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 104,
        "name": "Sundarban Gateway Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3000,
        "amenities": ["Wifi", "Restaurant", "Boat Service"],
        "badges": [],
        "description": "Gateway to the mangroves.",
        "freeCancellation": false,
        "type": "Resort"
    },
    {
        "id": 105,
        "name": "Nivritti Ishana, Mayapur",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 2800,
        "amenities": ["Wifi", "Restaurant", "Parking"],
        "badges": ["Spiritual"],
        "description": "Peaceful stay near ISKCON temple.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 106,
        "name": "Hotel Sonar Bangla Tarapith",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3500,
        "amenities": ["Wifi", "Restaurant", "Pool"],
        "badges": [],
        "description": "Comfortable stay for pilgrims in Tarapith.",
        "freeCancellation": true,
        "type": "Hotel"
    }
    ,

    {
        "id": 201,
        "name": "Abhyagama Hotel, Digha",
        "location": "New Digha",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 2500,
        "amenities": [
            "Wifi",
            "Pool",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "Luxury 4-star hotel in New Digha with modern amenities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 202,
        "name": "Hotel Dolphin",
        "location": "Old Digha",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 1800,
        "amenities": [
            "Wifi",
            "Restaurant",
            "Parking"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "Budget-friendly stay near Old Digha beach.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 203,
        "name": "Le Roi Digha",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 2200,
        "amenities": [
            "Wifi",
            "Restaurant",
            "Bar"
        ],
        "badges": [],
        "description": "Contemporary hotel close to the railway station.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 210,
        "name": "Taj Chia Kutir Resort & Spa",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.9,
        "stars": 5,
        "price": 24000,
        "amenities": [
            "Wifi",
            "Spa",
            "Pool",
            "Restaurant",
            "Gym",
            "Bar"
        ],
        "badges": [
            "Luxury",
            "Top Rated"
        ],
        "description": "Luxurious retreat in Makaibari Tea Estate.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 211,
        "name": "The Elgin, Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 5,
        "price": 10000,
        "amenities": [
            "Wifi",
            "Spa",
            "Restaurant",
            "Bar",
            "Heating"
        ],
        "badges": [
            "Heritage"
        ],
        "description": "A celebration of the elegance of the colonial era.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 212,
        "name": "Summit Hermon Hotel",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 4000,
        "amenities": [
            "Wifi",
            "Restaurant",
            "Spa"
        ],
        "badges": [],
        "description": "Offers incredible views of Kanchenjunga.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 213,
        "name": "Happy Valley Homestay",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 2,
        "price": 1500,
        "amenities": [
            "Wifi",
            "Home Cooked Food"
        ],
        "badges": [
            "Cozy"
        ],
        "description": "Authentic homestay experience near tea gardens.",
        "freeCancellation": false,
        "type": "Homestay"
    },
    {
        "id": 220,
        "name": "Viceroy Beach & Spa Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 9000,
        "amenities": [
            "Wifi",
            "Pool",
            "Spa",
            "Restaurant",
            "Bar"
        ],
        "badges": [
            "Beachfront"
        ],
        "description": "Premium beach resort with direct sea access.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 221,
        "name": "Sher E Bengal Beach Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 3500,
        "amenities": [
            "Wifi",
            "Pool",
            "Restaurant"
        ],
        "badges": [],
        "description": "Family friendly resort with pool.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 230,
        "name": "Sundarban Tiger Camp",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 5500,
        "amenities": [
            "Restaurant",
            "Boat Service",
            "Guide"
        ],
        "badges": [
            "Eco Friendly"
        ],
        "description": "Wildlife retreat in Dayapur island.",
        "freeCancellation": false,
        "type": "Resort"
    },
    {
        "id": 231,
        "name": "Hotel Sonar Bangla Sundarban",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 7000,
        "amenities": [
            "Wifi",
            "Pool",
            "Restaurant",
            "Spa"
        ],
        "badges": [
            "Luxury"
        ],
        "description": "Luxury stay with riverside views.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 240,
        "name": "Hotel Sonar Bangla Mayapur",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 6500,
        "amenities": [
            "Wifi",
            "Pool",
            "Restaurant"
        ],
        "badges": [
            "Top Rated"
        ],
        "description": "Premium stay for pilgrims.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 241,
        "name": "ISKCON Gada Bhavan",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 2,
        "price": 1000,
        "amenities": [
            "Restaurant",
            "AC"
        ],
        "badges": [
            "Temple Guest House"
        ],
        "description": "Stay within the temple complex.",
        "freeCancellation": false,
        "type": "Guesthouse"
    },
    {
        "id": 250,
        "name": "Hotel Sonar Bangla Tarapith",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 3900,
        "amenities": [
            "Wifi",
            "Pool",
            "Restaurant"
        ],
        "badges": [],
        "description": "Comfortable stay with swimming pool.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 251,
        "name": "Hotel Yashoda International",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1500,
        "amenities": [
            "Wifi",
            "Restaurant"
        ],
        "badges": [
            "Best Value"
        ],
        "description": "Peaceful ambience near the temple.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // KOLKATA BATCH (IDs 252-261)
    {
        "id": 252,
        "name": "The Westin Kolkata Rajarhat",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 9500,
        "amenities": ["Pool", "Spa", "Wifi", "Gym", "Bar", "Restaurant"],
        "badges": ["Luxury"],
        "description": "Premium high-rise hotel with panoramic city views and infinity pool.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 253,
        "name": "Novotel Kolkata Hotel and Residences",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 5,
        "price": 8500,
        "amenities": ["Pool", "Spa", "Wifi", "Pet Friendly", "Gym"],
        "badges": ["Family Friendly"],
        "description": "Contemporary hotel with large apartments and extensive dining options.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 254,
        "name": "The Lalit Great Eastern Kolkata",
        "location": "Dalhousie",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 5,
        "price": 10500,
        "amenities": ["Spa", "Wifi", "Bakery", "Gym", "Heritage"],
        "badges": ["Heritage"],
        "description": "Historic luxury hotel blending Victorian architecture with modern amenities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 255,
        "name": "The Park Kolkata",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 5,
        "price": 11000,
        "amenities": ["Nightclub", "Pool", "Spa", "Wifi", "Gym"],
        "badges": ["Nightlife"],
        "description": "Chic boutique hotel in the heart of the party district.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 256,
        "name": "Kenilworth Hotel, Kolkata",
        "location": "Park Street",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 7500,
        "amenities": ["Spa", "Garden", "Wifi", "Restaurant"],
        "badges": ["Classic"],
        "description": "Elegant colonial-style hotel with lush lawns and timeless charm.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 257,
        "name": "Raajkutir - IHCL SeleQtions",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.9,
        "stars": 5,
        "price": 12500,
        "amenities": ["Heritage", "Courtyard", "Wifi", "Restaurant"],
        "badges": ["Boutique"],
        "description": "An immersive heritage experience recreating a 19th-century Zamindar house.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 258,
        "name": "Fairfield by Marriott Kolkata",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 6500,
        "amenities": ["Pool", "Gym", "Wifi", "Restaurant"],
        "badges": ["Business"],
        "description": "Modern business hotel located right across the Convention Center.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 259,
        "name": "Holiday Inn Kolkata Airport",
        "location": "Airport",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 5500,
        "amenities": ["Transit", "Wifi", "Gym", "Restaurant"],
        "badges": ["Airport"],
        "description": "Convenient upscale stay just minutes from the international airport.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 260,
        "name": "Swissotel Kolkata Neotia Vista",
        "location": "New Town",
        "image": "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 5,
        "price": 9000,
        "amenities": ["Infinity Pool", "Mall Access", "Wifi", "Gym"],
        "badges": ["Luxury"],
        "description": "Luxury Swiss hospitality attached to a major shopping mall.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 261,
        "name": "The Peerless Inn",
        "location": "Esplanade",
        "image": "https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 4,
        "price": 6000,
        "amenities": ["Restaurant", "Wifi", "Gym"],
        "badges": ["Central"],
        "description": "Classic hotel in the city center famous for its Bengali cuisine.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // DIGHA BATCH (IDs 262-271)
    {
        "id": 262,
        "name": "Hotel Sea Hawk",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 2500,
        "amenities": ["Beach Access", "Restaurant", "Wifi"],
        "badges": ["Popular"],
        "description": "Budget-friendly hotel located very close to the sea beach.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 263,
        "name": "Hotel Dolphin",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3000,
        "amenities": ["Pool", "Restaurant", "Wifi"],
        "badges": ["Family"],
        "description": "One of the oldest and most trusted hotels in Digha with a swimming pool.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 264,
        "name": "Le Roi Digha",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 4500,
        "amenities": ["Restaurant", "Wifi", "Bar", "Parking"],
        "badges": ["Premium"],
        "description": "Modern hotel near Digha Flag Station offering comfortable stays.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 265,
        "name": "Hotel Coral Digha",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 3500,
        "amenities": ["Pool", "Restaurant", "Wifi"],
        "badges": ["Best Value"],
        "description": "Theme-based hotel with a unique pool and garden area.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 266,
        "name": "Cygnett Inn Sea View",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 5000,
        "amenities": ["Sea View", "Restaurant", "Wifi", "Gym"],
        "badges": ["Luxury"],
        "description": "Upscale hotel offering rooms with stunning views of the Bay of Bengal.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 267,
        "name": "Hotel Rupsagar",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 2,
        "price": 1200,
        "amenities": ["Restaurant", "Wifi"],
        "badges": ["Budget"],
        "description": "Simple and clean accommodation for budget travelers.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    {
        "id": 268,
        "name": "Hotel Gitanjali",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 2,
        "price": 1800,
        "amenities": ["Parking", "Restaurant"],
        "badges": ["Standard"],
        "description": "Reliable choice for families visiting New Digha.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 269,
        "name": "Hotel Seagull",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 3200,
        "amenities": ["Restaurant", "Wifi", "Conference"],
        "badges": ["Business"],
        "description": "Good for both leisure and corporate outings in Digha.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 270,
        "name": "Owlett Resort",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 2800,
        "amenities": ["Garden", "Restaurant", "Wifi"],
        "badges": ["Nature"],
        "description": "Resort style stay with open spaces and greenery.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 271,
        "name": "Hotel Purnima Digha",
        "location": "Digha",
        "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.7,
        "stars": 2,
        "price": 1000,
        "amenities": ["Wifi"],
        "badges": ["Saver"],
        "description": "Economical stay option near the market area.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    // DARJEELING BATCH (IDs 272-281)
    {
        "id": 272,
        "name": "The Elgin Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 14000,
        "amenities": ["Heritage", "Spa", "Garden", "Wifi", "Fireplace"],
        "badges": ["Heritage", "Luxury"],
        "description": "A 125-year-old heritage hotel offering royal luxury in the Himalayas.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 273,
        "name": "Windamere Hotel",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 4,
        "price": 16000,
        "amenities": ["Heritage", "History", "Restaurant", "Wifi"],
        "badges": ["Colonial"],
        "description": "Famous colonial hotel known for its history and afternoon tea.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 274,
        "name": "Mayfair Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.9,
        "stars": 5,
        "price": 18000,
        "amenities": ["Spa", "Gym", "Library", "Wifi", "Buffet"],
        "badges": ["Top Rated"],
        "description": "Exquisite resort facing the Governor's House with distinct charm.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 275,
        "name": "Cedar Inn",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 4,
        "price": 11000,
        "amenities": ["View", "Restaurant", "Wifi", "Terrace"],
        "badges": ["Scenic"],
        "description": "Known for its stunning views of Kanchenjunga from the rooms.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 276,
        "name": "Sinclairs Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 3,
        "price": 6500,
        "amenities": ["Mount View", "Game Room", "Restaurant"],
        "badges": ["Classic"],
        "description": "Comfortable stay with excellent views of the mountains and town.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 277,
        "name": "Summit Swiss Heritage Hotel",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 5500,
        "amenities": ["Heritage", "Lawns", "Wifi"],
        "badges": ["Cosy"],
        "description": "A quaint heritage property with rich wooden interiors.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 278,
        "name": "Sterling Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 8000,
        "amenities": ["Activities", "Kids Club", "Restaurant", "Wifi"],
        "badges": ["Family"],
        "description": "Located in Ghoom, offering a peaceful retreat away from the crowd.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 279,
        "name": "Ramada by Wyndham Darjeeling",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 4,
        "price": 9500,
        "amenities": ["Pool", "Gym", "Central", "Wifi"],
        "badges": ["Modern"],
        "description": "Modern hotel in Gandhi Road with all contemporary facilities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 280,
        "name": "Hotel Little Tibet",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 4800,
        "amenities": ["Tibetan", "Restaurant", "Wifi"],
        "badges": ["Culture"],
        "description": "Experience authentic Tibetan hospitality and decor.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 281,
        "name": "Shangri-La Regency",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 5200,
        "amenities": ["Rooftop", "View", "Wifi"],
        "badges": ["View"],
        "description": "Offers a spectacular rooftop lounge with mountain views.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // SUNDARBAN BATCH (IDs 282-291)
    {
        "id": 282,
        "name": "Sundarban Gateway Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 3,
        "price": 4000,
        "amenities": ["Safari", "Restaurant", "Wifi"],
        "badges": ["Eco"],
        "description": "Eco-friendly resort located at the gateway of the majestic Sundarbans.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 283,
        "name": "Sundarban Tiger Camp",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 3,
        "price": 5500,
        "amenities": ["Boat Safari", "Garden", "Restaurant"],
        "badges": ["Wild"],
        "description": "Premium wildlife resort offering thrilling jungle experiences.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 284,
        "name": "Sunderban Mangrove Retreat",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 3800,
        "amenities": ["Pool", "Restaurant", "Guide"],
        "badges": ["Nature"],
        "description": "Nestled in nature, perfect for bird watchers and peace/nature lovers.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 285,
        "name": "Banani Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 2,
        "price": 2500,
        "amenities": ["Restaurant", "Garden"],
        "badges": ["Budget"],
        "description": "Affordable stay with basic amenities in Pakhiralay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 286,
        "name": "Jhore Jole Jungle Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 3,
        "price": 4200,
        "amenities": ["Mud Cottages", "Cultural Program", "Restaurant"],
        "badges": ["Tribal"],
        "description": "Experience authentic village life in eco-friendly mud cottages.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 287,
        "name": "Solitary Nook Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 3500,
        "amenities": ["Cycle", "Fishing", "Restaurant"],
        "badges": ["Quiet"],
        "description": "A quiet getaway spot ideal for relaxation and fishing.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 288,
        "name": "Royal Sundarban Wild Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3000,
        "amenities": ["Restaurant", "Guide", "Wifi"],
        "badges": ["Activities"],
        "description": "Offers guided tours and comfortable rooms near the forest.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 289,
        "name": "Sundarban Residency",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 2,
        "price": 2000,
        "amenities": ["Restaurant", "Backup Power"],
        "badges": ["Standard"],
        "description": "Standard accommodation for tourists on a budget.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 290,
        "name": "Tiger Roar Resort",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 3,
        "price": 4800,
        "amenities": ["Bonfire", "Restaurant", "BBQ"],
        "badges": ["Fun"],
        "description": "Famous for its evening bonfires and BBQ dinners.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 291,
        "name": "Sundarban Riverside Holiday",
        "location": "Sundarban",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 3600,
        "amenities": ["River View", "Restaurant", "Wifi"],
        "badges": ["Scenic"],
        "description": "Stay right by the river and watch the sunset over the delta.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // MANDARMANI BATCH (IDs 292-301)
    {
        "id": 292,
        "name": "Hotel Sonar Bangla Mandarmani",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 5500,
        "amenities": ["Pool", "Beach Access", "Restaurant", "Wifi"],
        "badges": ["Premium"],
        "description": "Luxurious beachfront property with a massive swimming pool.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 293,
        "name": "The Sana Beach Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 4500,
        "amenities": ["Private Beach", "Spa", "Restaurant"],
        "badges": ["Relax"],
        "description": "Sprawling resort with cottages and private beach area.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 294,
        "name": "Sher E Punjab",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 4,
        "price": 6000,
        "amenities": ["Pool", "Punjabi Dhaba", "Wifi"],
        "badges": ["Foodie"],
        "description": "Famous for its authentic Punjabi cuisine and luxury rooms.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 295,
        "name": "Rose Valley Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3500,
        "amenities": ["Pool", "Park", "Restaurant"],
        "badges": ["Family"],
        "description": "Theme park style resort with water slides and fun activities.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 296,
        "name": "Viceroy Beach Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 5000,
        "amenities": ["Sea View", "Bar", "Restaurant", "Wifi"],
        "badges": ["Couple"],
        "description": "Romantic resort perfect for couples with sea-facing balconies.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 297,
        "name": "Masara Beach Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 3200,
        "amenities": ["Garden", "Restaurant", "Parking"],
        "badges": ["Budget Luxury"],
        "description": "Comfortable stay with well-maintained gardens and rooms.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 298,
        "name": "Hotel Kings Crown",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 4000,
        "amenities": ["Pool", "Restaurant", "Wifi"],
        "badges": ["Standard"],
        "description": "Reliable hotel chain with standard amenities and good service.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 299,
        "name": "Sun City Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 3,
        "price": 3000,
        "amenities": ["Large Pool", "Restaurant", "Game Zone"],
        "badges": ["Group"],
        "description": "Huge property ideal for large groups and corporate events.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 300,
        "name": "Digante Resort",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 2,
        "price": 2200,
        "amenities": ["Cottage", "Restaurant"],
        "badges": ["Secluded"],
        "description": "Located at the far end of the beach for ultimate privacy.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 301,
        "name": "Liv Sea Valley",
        "location": "Mandarmani",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 3800,
        "amenities": ["Modern", "Pool", "Wifi"],
        "badges": ["New"],
        "description": "Newly built property with modern architecture and facilities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // MAYAPUR BATCH (IDs 302-311)
    {
        "id": 302,
        "name": "Jagannath Guest House",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 2,
        "price": 1000,
        "amenities": ["AC", "Wifi"],
        "badges": ["Pilgrim"],
        "description": "Clean and affordable stay for devotees near the temple.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 303,
        "name": "Gouranga Kutir",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 3,
        "price": 2000,
        "amenities": ["Garden", "AC", "Restaurant"],
        "badges": ["Peaceful"],
        "description": "Serene environment perfect for meditation and relaxation.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 304,
        "name": "Mayapur Yatri Nivas",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 2,
        "price": 800,
        "amenities": ["Basic", "Canteen"],
        "badges": ["Budget"],
        "description": "Official guest house offering simple rooms at very low cost.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    {
        "id": 305,
        "name": "Hotel Haveli",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 2500,
        "amenities": ["AC", "Restaurant", "Wifi"],
        "badges": ["Comfort"],
        "description": "Modern amenities with traditional hospitality.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 306,
        "name": "Gada Bhavan",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 3,
        "price": 3000,
        "amenities": ["AC", "Garden", "Library"],
        "badges": ["Spiritual"],
        "description": "Located within the ISKCON complex, very convenient for darshan.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 307,
        "name": "Vamsi Bhavan",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 2,
        "price": 1200,
        "amenities": ["Fan", "Clean"],
        "badges": ["Standard"],
        "description": "Decent rooms for families visiting for festivals.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 308,
        "name": "Nityananda Kutir",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 3,
        "price": 2200,
        "amenities": ["AC", "Wifi", "Kitchen"],
        "badges": ["Self-Service"],
        "description": "Offers apartment-style rooms with kitchenette facilities.",
        "freeCancellation": true,
        "type": "Homestay"
    },
    {
        "id": 309,
        "name": "Gita Bhavan",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 2,
        "price": 1500,
        "amenities": ["Restaurant", "Parking"],
        "badges": ["Group"],
        "description": "Large complex suitable for groups and bus tours.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 310,
        "name": "Hotel Jalangi",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 2800,
        "amenities": ["River View", "Restaurant"],
        "badges": ["View"],
        "description": "Overlooking the Jalangi river, offers scenic views.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 311,
        "name": "Sri Chaitanya Gaudiya Math Guest House",
        "location": "Mayapur",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 2,
        "price": 500,
        "amenities": ["Temple", "Vegetarian Food"],
        "badges": ["Donation"],
        "description": "Run by the Math, offers spiritual atmosphere and satvik food.",
        "freeCancellation": false,
        "type": "Guest House"
    },
    // TARAPITH BATCH (IDs 312-321)
    {
        "id": 312,
        "name": "Hotel Sonar Bangla Tarapith",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 4000,
        "amenities": ["Pool", "Restaurant", "Wifi", "AC"],
        "badges": ["Premium"],
        "description": "Luxury hotel with swimming pool and modern facilities in Tarapith.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 313,
        "name": "Hotel Shantinivas",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 1800,
        "amenities": ["Restaurant", "AC"],
        "badges": ["Standard"],
        "description": "Comfortable hotel located very close to the temple.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 314,
        "name": "Hotel Yashoda International",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 3,
        "price": 1500,
        "amenities": ["Parking", "Restaurant"],
        "badges": ["Budget"],
        "description": "Good choice for budget travelers with parking facility.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 315,
        "name": "Hotel Tara",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 2200,
        "amenities": ["AC", "Wifi", "Restaurant"],
        "badges": ["Clean"],
        "description": "Known for its cleanliness and good staff behavior.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 316,
        "name": "Hotel Binapani",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.7,
        "stars": 2,
        "price": 1200,
        "amenities": ["Basic"],
        "badges": ["Economy"],
        "description": "Basic lodge for quick darshan trips.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    {
        "id": 317,
        "name": "Larica Hotel",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 3,
        "price": 3000,
        "amenities": ["Garden", "Restaurant", "AC"],
        "badges": ["Peaceful"],
        "description": "Surrounded by greenery, offers a peaceful stay.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 318,
        "name": "Hotel Swagatam",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 3,
        "price": 2500,
        "amenities": ["Wifi", "AC", "Room Service"],
        "badges": ["Family"],
        "description": "Family-friendly hotel with spacious rooms.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 319,
        "name": "Kaukavyam",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 2,
        "price": 1600,
        "amenities": ["Restaurant", "Parking"],
        "badges": ["Standard"],
        "description": "Decent hotel with all necessary amenities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 320,
        "name": "Hotel Bam Tara",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.6,
        "stars": 2,
        "price": 1000,
        "amenities": ["Basic"],
        "badges": ["Saver"],
        "description": "Very close to the bus stand and railway station.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    {
        "id": 321,
        "name": "Amantran Hotel",
        "location": "Tarapith",
        "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 3,
        "price": 3200,
        "amenities": ["Banquet", "Restaurant", "AC"],
        "badges": ["Events"],
        "description": "Good for marriage parties and events.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // HOWRAH BATCH (IDs 322-331)
    {
        "id": 322,
        "name": "Country Roads Resort",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 5500,
        "amenities": ["Pool", "Garden", "Sports"],
        "badges": ["Resort"],
        "description": "Sprawling resort with lush greenery, perfect for weekend getaways.",
        "freeCancellation": true,
        "type": "Resort"
    },
    {
        "id": 323,
        "name": "Hotel The Sojourn",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 3,
        "price": 3800,
        "amenities": ["Restaurant", "Banquet", "Wifi"],
        "badges": ["Business"],
        "description": "Located near the stadium, ideal for business travelers and events.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 324,
        "name": "Fortune Park Panchwati",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 4500,
        "amenities": ["Pool", "Tennis", "Restaurant"],
        "badges": ["Comfort"],
        "description": "Excellent connectivity to the city with resort-like facilities.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 325,
        "name": "The Fern Residency",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "stars": 4,
        "price": 5000,
        "amenities": ["Eco-friendly", "Restaurant", "Wifi"],
        "badges": ["Eco"],
        "description": "Eco-friendly boutique hotel in the IT hub.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 326,
        "name": "Kiaann",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 2800,
        "amenities": ["Modern", "Wifi", "Restaurant"],
        "badges": ["New"],
        "description": "Stylish budget hotel with modern interiors.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 327,
        "name": "Hotel M M International",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.8,
        "stars": 2,
        "price": 1500,
        "amenities": ["Transit", "Wifi"],
        "badges": ["Station"],
        "description": "Located right opposite Howrah Railway Station.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 328,
        "name": "Purnima Hotel",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 2,
        "price": 1200,
        "amenities": ["Restaurant", "Clean"],
        "badges": ["Value"],
        "description": "Reliable budget option for train travelers.",
        "freeCancellation": false,
        "type": "Hotel"
    },
    {
        "id": 329,
        "name": "Somani Residency",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 2500,
        "amenities": ["AC", "Wifi", "Restaurant"],
        "badges": ["Family"],
        "description": "Good family hotel in the Salkia area.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 330,
        "name": "Polo Floatel",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 4,
        "price": 6500,
        "amenities": ["River View", "Bar", "Floating"],
        "badges": ["Unique"],
        "description": "India's first floating hotel on the Ganges with stunning views.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 331,
        "name": "De Sovrani",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 5500,
        "amenities": ["Pool", "Rooftop", "Restaurant"],
        "badges": ["City"],
        "description": "Upscale accommodation in the heart of Salt Lake City.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    // SALT LAKE BATCH (IDs 332-341) - Mixed above, adding pure Salt Lake
    {
        "id": 332,
        "name": "Senses Hotel",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "stars": 4,
        "price": 5200,
        "amenities": ["Rooftop Pool", "Bar", "Wifi"],
        "badges": ["Modern"],
        "description": "Stylish hotel with a vibrant rooftop bar.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 333,
        "name": "Monotel",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 4800,
        "amenities": ["Gym", "Restaurant", "Wifi"],
        "badges": ["Business"],
        "description": "Premium business hotel in Sector V.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 334,
        "name": "AltAir Boutique Hotel",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.8,
        "stars": 5,
        "price": 7500,
        "amenities": ["Sky Bar", "Infinity Pool", "Jacuzzi"],
        "badges": ["Luxury"],
        "description": "Luxury boutique hotel on the top floors with skyline views.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 335,
        "name": "The Sonnet",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "stars": 4,
        "price": 4500,
        "amenities": ["Pool", "Gym", "Restaurant"],
        "badges": ["Classic"],
        "description": "Elegant hotel with lush green surroundings.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 336,
        "name": "Indismart Hotel",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1571896349842-1e74f35e07a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.0,
        "stars": 3,
        "price": 3500,
        "amenities": ["Conference", "Restaurant", "Wifi"],
        "badges": ["Corporate"],
        "description": "Ideal for corporate meetings and stays.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 337,
        "name": "Hotel O2 Oxygen",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1580263271354-2ff4852de3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "stars": 3,
        "price": 3000,
        "amenities": ["Banquet", "Restaurant"],
        "badges": ["Event"],
        "description": "Popular venue for weddings and parties near the airport.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 338,
        "name": "Regenta Orkos",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "stars": 4,
        "price": 5000,
        "amenities": ["Rooftop", "Pool", "Spa"],
        "badges": ["Relax"],
        "description": "Urban retreat in Kasba/Salt Lake connector area.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 339,
        "name": "Coral Residency",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 3.9,
        "stars": 3,
        "price": 2500,
        "amenities": ["Wifi", "Kitchen", "Homelike"],
        "badges": ["Comfort"],
        "description": "Apartment style residency for long stays.",
        "freeCancellation": true,
        "type": "Guest House"
    },
    {
        "id": 340,
        "name": "Hyatt Regency Kolkata",
        "location": "Salt Lake",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.7,
        "stars": 5,
        "price": 9000,
        "amenities": ["Luxury Spa", "Tennis", "Pool"],
        "badges": ["Iconic"],
        "description": "One of the most iconic 5-star properties in the city.",
        "freeCancellation": true,
        "type": "Hotel"
    },
    {
        "id": 341,
        "name": "Ibiza The Fern Resort",
        "location": "Howrah",
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "stars": 4,
        "price": 6000,
        "amenities": ["Nightclub", "Pool", "Activities"],
        "badges": ["Party"],
        "description": "Famous for its party atmosphere and sprawling grounds.",
        "freeCancellation": true,
        "type": "Resort"
    }
];
