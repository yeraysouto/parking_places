export const unavailableDates = [
    "2025-06-25",
    "2025-06-26",
    "2025-07-10",
    "2025-07-11",
    "2025-08-01",
    "2025-08-02",
    "2025-08-03"
];

export const parkingSpotDimensions = {
    length: 5.0,
    width: 2.5,
    height: 2.0
};

export const vehicleModels = [
    { model: 'Seat León', dimensions: { length: 4.37, width: 1.80, height: 1.46 } },
    { model: 'Toyota Corolla', dimensions: { length: 4.63, width: 1.78, height: 1.44 } },
    { model: 'Renault Clio', dimensions: { length: 4.05, width: 1.80, height: 1.44 } },
    { model: 'Volkswagen Golf', dimensions: { length: 4.28, width: 1.79, height: 1.49 } },
    { model: 'Hyundai Tucson', dimensions: { length: 4.50, width: 1.87, height: 1.65 } },
    { model: 'Peugeot 208', dimensions: { length: 4.06, width: 1.75, height: 1.43 } },
    { model: 'Nissan Qashqai', dimensions: { length: 4.43, width: 1.84, height: 1.62 } },
    { model: 'Ford Puma', dimensions: { length: 4.19, width: 1.81, height: 1.54 } },
    { model: 'Dacia Sandero', dimensions: { length: 4.09, width: 1.85, height: 1.50 } },
    { model: 'Tesla Model 3', dimensions: { length: 4.69, width: 1.85, height: 1.44 } },
    { model: 'Audi Q5', dimensions: { length: 4.68, width: 1.89, height: 1.66 } },
    { model: 'BMW X5', dimensions: { length: 4.92, width: 2.00, height: 1.75 } },
    { model: 'Mercedes-Benz GLC', dimensions: { length: 4.72, width: 1.89, height: 1.64 } },
    { model: 'Ford Transit Custom', dimensions: { length: 5.34, width: 2.28, height: 2.10 } }
];

export const nearbyParkings = [
    {
        id: 1,
        name: 'Parking Central Barcelona',
        address: 'Carrer de Pelai, 30, Barcelona',
        distance: 150,
        pricePerDay: 25.00,
        availableSpots: 12,
        rating: 4.5
    },
    {
        id: 2,
        name: 'Aparcament Plaça Catalunya',
        address: 'Plaça de Catalunya, 9, Barcelona',
        distance: 280,
        pricePerDay: 28.50,
        availableSpots: 8,
        rating: 4.3
    },
    {
        id: 3,
        name: 'Parking Ramblas',
        address: 'La Rambla, 85, Barcelona',
        distance: 320,
        pricePerDay: 24.00,
        availableSpots: 15,
        rating: 4.1
    },
    {
        id: 4,
        name: 'BSM Boqueria',
        address: 'Carrer de la Boqueria, 16, Barcelona',
        distance: 400,
        pricePerDay: 26.75,
        availableSpots: 6,
        rating: 4.4
    },
    {
        id: 5,
        name: 'Parking Gòtic',
        address: 'Carrer de Avinyó, 28, Barcelona',
        distance: 450,
        pricePerDay: 23.50,
        availableSpots: 9,
        rating: 4.0
    },
    {
        id: 6,
        name: 'SABA Portal del Ángel',
        address: 'Portal de l\'Àngel, 42, Barcelona',
        distance: 220,
        pricePerDay: 29.00,
        availableSpots: 11,
        rating: 4.6
    }
];
