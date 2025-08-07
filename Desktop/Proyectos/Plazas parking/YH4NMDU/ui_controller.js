export const elements = {
    step1: document.getElementById('step-1-dates'),
    step2: document.getElementById('step-2-vehicle'),
    step3: document.getElementById('step-3-payment'),
    confirmation: document.getElementById('confirmation-message'),
    
    startDateInput: document.getElementById('start-date'),
    endDateInput: document.getElementById('end-date'),
    carModelInput: document.getElementById('car-model'),
    carModelsDatalist: document.getElementById('car-models-list'),
    licensePlateInput: document.getElementById('license-plate'),

    toStep2Btn: document.getElementById('to-step-2-btn'),
    toStep3Btn: document.getElementById('to-step-3-btn'),
    backToStep1Btn: document.getElementById('back-to-step-1-btn'),
    backToStep2Btn: document.getElementById('back-to-step-2-btn'),
    reviewBookingBtn: document.getElementById('review-booking-btn'),
    newBookingBtn: document.getElementById('new-booking-btn'),

    dateError: document.getElementById('date-error'),
    vehicleFeedback: document.getElementById('vehicle-feedback'),
    plateError: document.getElementById('plate-error'),
    cardError: document.getElementById('card-error'),
    summaryDates: document.querySelector('#summary-dates span'),
    summaryPrice: document.querySelector('#summary-price span'),
    totalPriceDisplay: document.getElementById('total-price-display'),
    confirmationText: document.getElementById('confirmation-text'),
    
    paymentOptions: document.getElementById('payment-options'),
    paymentDetails: document.getElementById('payment-details'),
    creditCardForm: document.getElementById('credit-card-form'),
    bizumInstructions: document.getElementById('bizum-instructions'),
    cashInstructions: document.getElementById('cash-instructions'),
    cardNameInput: document.getElementById('card-name'),
    cardNumberInput: document.getElementById('card-number'),
    cardExpiryInput: document.getElementById('card-expiry'),
    cardCvcInput: document.getElementById('card-cvc'),

    stepIndicators: document.querySelectorAll('.step-indicator'),

    summaryModal: document.getElementById('summary-modal'),
    summaryModalContent: document.getElementById('summary-modal-content'),
    modalBackBtn: document.getElementById('modal-back-btn'),
    modalConfirmBtn: document.getElementById('modal-confirm-btn'),
    summaryModalDates: document.getElementById('summary-modal-dates'),
    summaryModalVehicle: document.getElementById('summary-modal-vehicle'),
    summaryModalPlate: document.getElementById('summary-modal-plate'),
    summaryModalPayment: document.getElementById('summary-modal-payment'),
    summaryModalPriceBreakdown: document.getElementById('summary-modal-price-breakdown'),
    loadingOverlay: document.getElementById('loading-overlay'),
};

export function showStep(stepNumber) {
    [elements.step1, elements.step2, elements.step3, elements.confirmation].forEach(step => {
        step.classList.add('hidden');
    });

    switch (stepNumber) {
        case 1: elements.step1.classList.remove('hidden'); break;
        case 2: elements.step2.classList.remove('hidden'); break;
        case 3: elements.step3.classList.remove('hidden'); break;
        case 4: elements.confirmation.classList.remove('hidden'); break;
    }
}

export function updateStepIndicator(activeStep) {
    elements.stepIndicators.forEach(indicator => {
        const step = parseInt(indicator.dataset.step, 10);
        if (step <= activeStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

export function getDates() {
    return {
        startDate: elements.startDateInput.value,
        endDate: elements.endDateInput.value
    };
}

export function displayDateError(message) {
    elements.dateError.textContent = message || '';
}

export function displayPlateError(message) {
    elements.plateError.textContent = message || '';
}

export function displayCardError(message) {
    elements.cardError.textContent = message || '';
}

export function toggleButton(button, isEnabled) {
    button.disabled = !isEnabled;
}

export function populateCarModelDatalist(models) {
    elements.carModelsDatalist.innerHTML = '';
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.model;
        elements.carModelsDatalist.appendChild(option);
    });
}

export function displayVehicleCheckResult({ isCompatible, message }) {
    const feedbackEl = elements.vehicleFeedback;
    feedbackEl.textContent = message;
    if (message) {
        feedbackEl.className = `mt-4 text-center h-10 font-semibold ${isCompatible ? 'text-green-600' : 'text-red-600'}`;
    } else {
        feedbackEl.className = 'mt-4 text-center h-10';
    }
}

export function displaySearchResults(parkings) {
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.className = 'mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200';
    resultsContainer.innerHTML = `
        <h3 class="font-bold text-lg mb-3 text-brand-dark">Parkings Encontrados</h3>
        <div class="text-sm text-gray-600 mb-3">Se encontraron ${parkings.length} parkings disponibles para tus fechas:</div>
        <div class="space-y-2">
            ${parkings.map(parking => `
                <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <div>
                        <div class="font-semibold">${parking.name}</div>
                        <div class="text-sm text-gray-500">${parking.address}</div>
                        <div class="text-sm text-gray-500">${parking.distance}m del centro</div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-brand-primary">${parking.pricePerDay}€/día</div>
                        <div class="text-xs text-gray-500">${parking.availableSpots} plazas libres</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }

    elements.step1.querySelector('.text-center').insertAdjacentElement('beforebegin', resultsContainer);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('es-ES', options);
}

export function updateSummary({ startDate, endDate, days, price }) {
    elements.summaryDates.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    elements.summaryPrice.innerHTML = `Total por ${days} día(s): <strong class="ml-2">${price.toFixed(2)} €</strong>`;
    elements.totalPriceDisplay.textContent = `${price.toFixed(2)} €`;
}

export function showPaymentDetails(method) {
    const details = [elements.creditCardForm, elements.bizumInstructions, elements.cashInstructions];
    details.forEach(d => d.classList.add('hidden'));

    switch (method) {
        case 'Tarjeta':
            elements.creditCardForm.classList.remove('hidden');
            break;
        case 'Bizum':
            elements.bizumInstructions.classList.remove('hidden');
            break;
        case 'Efectivo':
            elements.cashInstructions.classList.remove('hidden');
            break;
    }
}

export function updatePaymentSelection(selectedOption, method) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    showPaymentDetails(method);
}

export function showConfirmation({ licensePlate, paymentMethod, price }) {
    showStep(4);
    let paymentMessage = `Se ha procesado un pago de ${price.toFixed(2)} € mediante ${paymentMethod}.`;
    if (paymentMethod === 'Efectivo') {
        paymentMessage = `El pago de ${price.toFixed(2)} € se realizará en efectivo en el parking.`;
    }
    elements.confirmationText.textContent = `Tu plaza para el vehículo con matrícula ${licensePlate.toUpperCase()} está reservada. ${paymentMessage} Recibirás un email con los detalles.`;
}

export function resetUI() {
    elements.startDateInput.value = '';
    elements.endDateInput.value = '';
    elements.carModelInput.value = '';
    elements.licensePlateInput.value = '';
    elements.creditCardForm.reset();
    
    displayDateError('');
    displayVehicleCheckResult({ isCompatible: false, message: '' });
    displayPlateError('');
    displayCardError('');
    
    updatePaymentSelection(null, null);
    
    toggleButton(elements.toStep2Btn, false);
    toggleButton(elements.toStep3Btn, false);
    toggleButton(elements.reviewBookingBtn, false);

    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    hideSummaryModal();
    hideLoadingOverlay();

    elements.toStep2Btn.textContent = 'Verificar Coche';
    elements.reviewBookingBtn.textContent = 'Revisar y Continuar';

    showStep(1);
}

export function setDateInputRestrictions(unavailableDates) {
    const today = new Date().toISOString().split('T')[0];
    elements.startDateInput.setAttribute('min', today);
    elements.endDateInput.setAttribute('min', today);

    const applyDateRestrictions = (dateInput) => {
        const originalValue = dateInput.value;
        
        dateInput.addEventListener('input', (e) => {
            const selectedDate = e.target.value;
            if (unavailableDates.includes(selectedDate)) {
                e.target.value = originalValue;
                displayDateError(`La fecha ${selectedDate} no está disponible. Por favor, elige otra fecha.`);
                setTimeout(() => {
                    displayDateError('');
                }, 3000);
            }
        });
    };

    applyDateRestrictions(elements.startDateInput);
    applyDateRestrictions(elements.endDateInput);

    elements.startDateInput.addEventListener('change', () => {
        if (elements.startDateInput.value) {
            elements.endDateInput.min = elements.startDateInput.value;
        }
    });
}

export function showSummaryModal({ startDate, endDate, days, carModel, licensePlate, paymentMethod, price }) {
    elements.summaryModalDates.textContent = `${formatDate(startDate)} al ${formatDate(endDate)}`;
    elements.summaryModalVehicle.textContent = carModel;
    elements.summaryModalPlate.textContent = licensePlate.toUpperCase();
    elements.summaryModalPayment.textContent = paymentMethod;
    const pricePerDay = days > 0 ? price / days : 0;
    elements.summaryModalPriceBreakdown.innerHTML = `
        <div class="flex justify-between"><span>Tarifa por día:</span> <span>${pricePerDay.toFixed(2)} €</span></div>
        <div class="flex justify-between"><span>Número de días:</span> <span>${days}</span></div>
        <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200"><span>TOTAL:</span> <span>${price.toFixed(2)} €</span></div>
    `;

    elements.summaryModal.classList.remove('hidden');
    setTimeout(() => {
        elements.summaryModal.classList.remove('opacity-0');
        elements.summaryModalContent.classList.remove('opacity-0', 'scale-95');
    }, 10);
    lucide.createIcons();
}

export function hideSummaryModal() {
    elements.summaryModal.classList.add('opacity-0');
    elements.summaryModalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        elements.summaryModal.classList.add('hidden');
    }, 300);
}

export function showLoadingOverlay() {
    elements.loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
        elements.loadingOverlay.classList.remove('opacity-0');
    }, 10);
}

export function hideLoadingOverlay() {
    elements.loadingOverlay.classList.add('opacity-0');
    setTimeout(() => {
        elements.loadingOverlay.classList.add('hidden');
    }, 300);
}
