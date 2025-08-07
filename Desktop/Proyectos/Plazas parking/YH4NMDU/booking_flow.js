import { vehicleModels, parkingSpotDimensions, nearbyParkings } from './data.js';

const PRICE_PER_DAY = 25.00;

export function validateDateRange(startStr, endStr, unavailableDates) {
    if (!startStr || !endStr) {
        return { isValid: false, error: 'Por favor, selecciona ambas fechas.' };
    }

    const startDate = new Date(`${startStr}T00:00:00`);
    const endDate = new Date(`${endStr}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
        return { isValid: false, error: 'La fecha de inicio no puede ser en el pasado.' };
    }

    if (endDate <= startDate) {
        return { isValid: false, error: 'La fecha de salida debe ser posterior a la de entrada.' };
    }
    
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        if (unavailableDates.includes(dateString)) {
            return { isValid: false, error: `El día ${dateString} no está disponible.` };
        }
    }
    
    return { isValid: true, error: null };
}

export function calculatePrice(startStr, endStr) {
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const days = diffDays <= 0 ? 1 : diffDays;
    const price = days * PRICE_PER_DAY;

    return { price, days };
}

export function verifyVehicle(modelName) {
    const vehicle = vehicleModels.find(v => v.model.toLowerCase() === modelName.toLowerCase().trim());

    if (!vehicle) {
        return { isCompatible: false, message: 'Modelo no encontrado. Por favor, elige uno de la lista.' };
    }

    const { dimensions } = vehicle;
    const spot = parkingSpotDimensions;

    if (dimensions.length <= spot.length && dimensions.width <= spot.width && dimensions.height <= spot.height) {
        return { isCompatible: true, message: '¡Perfecto! Tu coche es compatible.' };
    } else {
        return { isCompatible: false, message: 'Lo sentimos, tu vehículo excede las dimensiones de la plaza.' };
    }
}

export function searchNearbyParkings(startDate, endDate) {
    const availableParkings = nearbyParkings.filter(parking => {
        return parking.availableSpots > 0;
    });

    return availableParkings.map(parking => ({
        ...parking,
        searchDate: new Date().toISOString(),
        requestedDates: { start: startDate, end: endDate }
    }));
}
