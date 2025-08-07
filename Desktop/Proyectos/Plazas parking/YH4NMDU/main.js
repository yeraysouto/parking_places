import * as ui from './ui_controller.js';
import * as flow from './booking_flow.js';
import { addBooking } from './database.js';
import { vehicleModels, unavailableDates } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {
    const state = {
        startDate: null,
        endDate: null,
        days: 0,
        carModel: null,
        isCompatible: false,
        price: 0,
        licensePlate: null,
        paymentMethod: null,
        selectedParkings: []
    };

    ui.populateCarModelDatalist(vehicleModels);
    ui.setDateInputRestrictions(unavailableDates);

    const checkFinalStepValidity = () => {
        const isPlateValid = state.licensePlate && state.licensePlate.trim().length > 3;
        if (!isPlateValid || !state.paymentMethod) {
            ui.toggleButton(ui.elements.reviewBookingBtn, false);
            return;
        }

        let isPaymentInfoValid = false;
        if (state.paymentMethod === 'Tarjeta') {
            const cardName = ui.elements.cardNameInput.value.trim();
            const cardNumber = ui.elements.cardNumberInput.value.replace(/\s/g, '');
            const cardExpiry = ui.elements.cardExpiryInput.value.trim();
            const cardCvc = ui.elements.cardCvcInput.value.trim();
            
            const expiryRegex = new RegExp('^(0[1-9]|1[0-2])\\s*\\/\\s*([0-9]{2})$');
            const expiryMatch = cardExpiry.match(expiryRegex);
            let isExpiryValid = false;

            if (expiryMatch) {
                const month = parseInt(expiryMatch[1], 10);
                const year = parseInt(expiryMatch[2], 10) + 2000;
                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();
                if (year > currentYear || (year === currentYear && month >= currentMonth)) {
                    isExpiryValid = true;
                }
            }

            isPaymentInfoValid = cardName.length > 2 &&
                                  new RegExp('^[0-9]{13,19}$').test(cardNumber) &&
                                  isExpiryValid &&
                                  new RegExp('^[0-9]{3,4}$').test(cardCvc);

            if (ui.elements.cardNameInput.value || ui.elements.cardNumberInput.value || ui.elements.cardExpiryInput.value || ui.elements.cardCvcInput.value) {
                if (!isPaymentInfoValid) {
                    ui.displayCardError('Por favor, completa correctamente los datos de la tarjeta.');
                } else {
                    ui.displayCardError('');
                }
            } else {
                ui.displayCardError('');
            }
        } else {
            isPaymentInfoValid = true;
            ui.displayCardError('');
        }
        
        ui.toggleButton(ui.elements.reviewBookingBtn, isPlateValid && isPaymentInfoValid);
    };

    const handleDateChange = () => {
        const { startDate, endDate } = ui.getDates();
        state.startDate = startDate;
        state.endDate = endDate;
        
        const validation = flow.validateDateRange(state.startDate, state.endDate, unavailableDates);
        ui.displayDateError(validation.error);
        ui.toggleButton(ui.elements.toStep2Btn, validation.isValid);
        
        if (validation.isValid) {
            ui.elements.toStep2Btn.textContent = 'Buscar Parking';
        } else {
            ui.elements.toStep2Btn.textContent = 'Verificar Coche';
        }
    };

    const handleCarModelChange = () => {
        state.carModel = ui.elements.carModelInput.value;
        if (!state.carModel) {
            ui.displayVehicleCheckResult({ isCompatible: false, message: '' });
            ui.toggleButton(ui.elements.toStep3Btn, false);
            return;
        }

        const result = flow.verifyVehicle(state.carModel);
        state.isCompatible = result.isCompatible;
        ui.displayVehicleCheckResult(result);
        ui.toggleButton(ui.elements.toStep3Btn, result.isCompatible);
    };

    const handleLicensePlateInput = () => {
        state.licensePlate = ui.elements.licensePlateInput.value;
        checkFinalStepValidity();
    };

    const handlePaymentSelection = (event) => {
        const selectedOption = event.target.closest('.payment-option');
        if (!selectedOption) return;

        state.paymentMethod = selectedOption.dataset.method;
        ui.updatePaymentSelection(selectedOption, state.paymentMethod);
        checkFinalStepValidity();
    };

    const showBookingSummary = () => {
        checkFinalStepValidity();
        if (ui.elements.reviewBookingBtn.disabled) {
            return;
        }
        ui.showSummaryModal({ ...state });
    };
    
    const confirmAndPay = () => {
        ui.hideSummaryModal();
        ui.showLoadingOverlay();

        setTimeout(() => {
            const bookingDetails = {
                startDate: state.startDate,
                endDate: state.endDate,
                licensePlate: state.licensePlate,
                price: state.price,
                paymentMethod: state.paymentMethod
            };
            addBooking(bookingDetails);
            ui.hideLoadingOverlay();
            ui.showConfirmation(bookingDetails);
            ui.updateStepIndicator(4);
        }, 2000);
    };

    const searchParkings = () => {
        if (!state.startDate || !state.endDate) {
            ui.displayDateError('Por favor, selecciona ambas fechas para buscar parkings.');
            return;
        }

        const searchResults = flow.searchNearbyParkings(state.startDate, state.endDate);
        state.selectedParkings = searchResults;
        
        ui.displaySearchResults(searchResults);
        
        setTimeout(() => {
            navigateToStep2();
        }, 500);
    };

    const navigateToStep1 = () => {
        ui.showStep(1);
        ui.updateStepIndicator(1);
    };
    
    const navigateToStep2 = () => {
        ui.showStep(2);
        ui.updateStepIndicator(2);
    };

    const navigateToStep3 = () => {
        const { price, days } = flow.calculatePrice(state.startDate, state.endDate);
        state.price = price;
        state.days = days;
        ui.updateSummary({
            startDate: state.startDate,
            endDate: state.endDate,
            days: state.days,
            price: state.price
        });
        ui.showStep(3);
        ui.updateStepIndicator(3);
    };

    const resetBooking = () => {
        Object.assign(state, {
            startDate: null, endDate: null, days: 0, carModel: null, 
            isCompatible: false, price: 0, licensePlate: null, paymentMethod: null,
            selectedParkings: []
        });
        ui.resetUI();
        ui.updateStepIndicator(1);
        handleDateChange();
    };

    ui.elements.startDateInput.addEventListener('change', handleDateChange);
    ui.elements.endDateInput.addEventListener('change', handleDateChange);
    
    ui.elements.toStep2Btn.addEventListener('click', searchParkings);

    ui.elements.backToStep1Btn.addEventListener('click', navigateToStep1);
    ui.elements.carModelInput.addEventListener('input', handleCarModelChange);

    ui.elements.toStep3Btn.addEventListener('click', navigateToStep3);

    ui.elements.backToStep2Btn.addEventListener('click', navigateToStep2);
    ui.elements.licensePlateInput.addEventListener('input', handleLicensePlateInput);
    ui.elements.paymentOptions.addEventListener('click', handlePaymentSelection);
    
    ui.elements.reviewBookingBtn.addEventListener('click', showBookingSummary);
    ui.elements.modalBackBtn.addEventListener('click', ui.hideSummaryModal);
    ui.elements.modalConfirmBtn.addEventListener('click', confirmAndPay);
    
    ui.elements.cardNameInput.addEventListener('input', checkFinalStepValidity);
    ui.elements.cardNumberInput.addEventListener('input', checkFinalStepValidity);
    ui.elements.cardExpiryInput.addEventListener('input', checkFinalStepValidity);
    ui.elements.cardCvcInput.addEventListener('input', checkFinalStepValidity);
    
    ui.elements.newBookingBtn.addEventListener('click', resetBooking);
}
