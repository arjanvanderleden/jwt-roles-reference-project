const users = [
    {  
        id: 1,
        name: "Arjan Sales",
        email: "arjan-sales@reclamefolder.nl",
        password: "--xx--",
        roles : "sales",
        retailerid:48
    }, {
        id: 2,
        name: "Arjan A. Heijn",
        email: "arjan-retailer@example.com",
        password: "--xx--",
        roles : "retailer",
        retailerid:49        
    },
    {  
        id: 3,
        name: "Arjan Admin",
        email: "arjan-owner@reclamefolder.nl",
        password: "--xx--",
        roles : "owner"
    },
    {  
        id: 4,
        name: "Arjan Developer",
        email: "arjan-developer@reclamefolder.nl",
        password: "--xx--",
        roles : "developer"
    },{  
        id: 5,
        name: "Arjan Mixed",
        email: "arjan-mixed@reclamefolder.nl",
        password: "--xx--",
        roles : "sales;premium-retailer",
        retailerid:48
    }, {
        id: 6,
        name: "Arjan A. Heijn",
        email: "arjan-premium-retailer@example.com",
        password: "--xx--",
        roles : "retailer",
        retailerid:49        
    }
];

module.exports = users;