// Slider elements
const antallBrukere = document.getElementById('antallBrukere');
const besokPerUke = document.getElementById('besokPerUke');
const tidPerBesok = document.getElementById('tidPerBesok');
const digitaliseringsgrad = document.getElementById('digitaliseringsgrad');
const timekostnad = document.getElementById('timekostnad');

// Editable value inputs (synced with sliders)
const antallBrukereValue = document.getElementById('antallBrukereValue');
const besokPerUkeValue = document.getElementById('besokPerUkeValue');
const tidPerBesokValue = document.getElementById('tidPerBesokValue');
const digitaliseringsgradValue = document.getElementById('digitaliseringsgradValue');

// Slider-input pairs for bidirectional sync
const sliderPairs = [
    { slider: antallBrukere, input: antallBrukereValue },
    { slider: besokPerUke, input: besokPerUkeValue },
    { slider: tidPerBesok, input: tidPerBesokValue },
    { slider: digitaliseringsgrad, input: digitaliseringsgradValue }
];

// Result elements
const erstattedeBesok = document.getElementById('erstattedeBesok');
const frigjorteTimer = document.getElementById('frigjorteTimer');
const ukentligVerdi = document.getElementById('ukentligVerdi');
const arligGevinst = document.getElementById('arligGevinst');

// Email form
const emailForm = document.getElementById('emailForm');
const emailMessage = document.getElementById('emailMessage');

// Format number with space as thousand separator (Norwegian format)
function formatNumber(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Update slider progress visual
function updateSliderProgress(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const progress = ((value - min) / (max - min)) * 100;
    slider.style.setProperty('--progress', `${progress}%`);
}

// Sync slider value to input field
function syncSliderToInput(slider, input) {
    input.value = slider.value;
    updateSliderProgress(slider);
}

// Sync input field value to slider (with clamping)
function syncInputToSlider(input, slider) {
    let value = parseInt(input.value) || parseInt(slider.min);
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);

    // Clamp value to valid range
    value = Math.max(min, Math.min(max, value));

    slider.value = value;
    input.value = value;
    updateSliderProgress(slider);
}

// Calculate and update all results
function calculate() {
    const brukere = parseInt(antallBrukere.value);
    const besok = parseInt(besokPerUke.value);
    const tid = parseInt(tidPerBesok.value);
    const grad = parseInt(digitaliseringsgrad.value) / 100;
    const kostnad = parseFloat(timekostnad.value) || 600;

    // Calculate results
    const totaleBesokPerUke = brukere * besok;
    const erstattede = Math.round(totaleBesokPerUke * grad);
    const frigjortTimer = (erstattede * tid) / 60;
    const ukentlig = frigjortTimer * kostnad;
    const arlig = ukentlig * 52;

    // Update results with animation
    animateValue(erstattedeBesok, erstattede);
    animateValue(frigjorteTimer, Math.round(frigjortTimer * 10) / 10);
    ukentligVerdi.textContent = formatNumber(ukentlig);
    arligGevinst.textContent = formatNumber(arlig);

    // Update slider visuals
    updateSliderProgress(antallBrukere);
    updateSliderProgress(besokPerUke);
    updateSliderProgress(tidPerBesok);
    updateSliderProgress(digitaliseringsgrad);
}

// Simple animation for result values
function animateValue(element, newValue) {
    element.textContent = typeof newValue === 'number' && !Number.isInteger(newValue)
        ? newValue.toFixed(1).replace('.', ',')
        : newValue;
}

// Event listeners for sliders (update input fields and calculate)
sliderPairs.forEach(({ slider, input }) => {
    slider.addEventListener('input', () => {
        syncSliderToInput(slider, input);
        calculate();
    });

    // Event listeners for editable inputs (update sliders and calculate)
    input.addEventListener('input', () => {
        syncInputToSlider(input, slider);
        calculate();
    });

    // Clamp value on blur (when user leaves the field)
    input.addEventListener('blur', () => {
        syncInputToSlider(input, slider);
    });
});

// Event listener for timekostnad (number input only)
timekostnad.addEventListener('input', calculate);

// Email form handler
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const results = {
        brukere: antallBrukere.value,
        besokPerUke: besokPerUke.value,
        tidPerBesok: tidPerBesok.value,
        digitaliseringsgrad: digitaliseringsgrad.value,
        timekostnad: timekostnad.value,
        erstattedeBesok: erstattedeBesok.textContent,
        frigjorteTimer: frigjorteTimer.textContent,
        ukentligVerdi: ukentligVerdi.textContent,
        arligGevinst: arligGevinst.textContent
    };

    // In a real application, you would send this to a server
    // For now, we'll just show a success message
    console.log('Email:', email, 'Results:', results);

    emailMessage.textContent = 'Resultatene ville blitt sendt til ' + email + ' (demo-modus)';
    emailMessage.classList.remove('error');

    // Clear message after 5 seconds
    setTimeout(() => {
        emailMessage.textContent = '';
    }, 5000);
});

// Initialize on page load
function init() {
    // Sync all slider-input pairs
    sliderPairs.forEach(({ slider, input }) => {
        syncSliderToInput(slider, input);
    });
    // Run initial calculation
    calculate();
}

document.addEventListener('DOMContentLoaded', init);

// Also run immediately in case DOM is already loaded
init();
