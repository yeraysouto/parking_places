const bookings = [];

export function addBooking(bookingDetails) {
    const newBooking = {
        id: `PN-${Date.now()}`,
        ...bookingDetails,
        createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    console.log("New booking added:", newBooking);
    console.log("All bookings:", bookings);
}


export function getAllBookings() {
    return bookings;
}
