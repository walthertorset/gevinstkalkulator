// Slider elements
const antallBrukere = document.getElementById('antallBrukere');
const besokPerUke = document.getElementById('besokPerUke');
const tidPerBesok = document.getElementById('tidPerBesok');
const tidPerDigitaltBesok = document.getElementById('tidPerDigitaltBesok');
const digitaliseringsgrad = document.getElementById('digitaliseringsgrad');
const timekostnad = document.getElementById('timekostnad');

// Editable value inputs (synced with sliders)
const antallBrukereValue = document.getElementById('antallBrukereValue');
const besokPerUkeValue = document.getElementById('besokPerUkeValue');
const tidPerBesokValue = document.getElementById('tidPerBesokValue');
const tidPerDigitaltBesokValue = document.getElementById('tidPerDigitaltBesokValue');
const digitaliseringsgradValue = document.getElementById('digitaliseringsgradValue');

// Slider-input pairs for bidirectional sync
const sliderPairs = [
    { slider: antallBrukere, input: antallBrukereValue },
    { slider: besokPerUke, input: besokPerUkeValue },
    { slider: tidPerBesok, input: tidPerBesokValue },
    { slider: tidPerDigitaltBesok, input: tidPerDigitaltBesokValue },
    { slider: digitaliseringsgrad, input: digitaliseringsgradValue }
];

// Cost input elements (sykehjem only)
const lisensPerKamera = document.getElementById('lisensPerKamera');
const investeringPerKamera = document.getElementById('investeringPerKamera');

// Result elements (some may be null depending on page)
const navaerendeTid = document.getElementById('navaerendeTid');
const frigjorteTimer = document.getElementById('frigjorteTimer');
const ukentligVerdi = document.getElementById('ukentligVerdi');
const arligGevinst = document.getElementById('arligGevinst');


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

// Detect page type
const pageType = document.body.dataset.page;
const isSykehjem = pageType === 'sykehjem';
const isHjemmeboende = pageType === 'hjemmeboende';
const isDailyModel = isSykehjem || isHjemmeboende;

// Calculate and update all results
function calculate() {
    const brukere = parseInt(antallBrukere.value);
    const besok = parseInt(besokPerUke.value);
    const fysiskTid = parseInt(tidPerBesok.value);
    const digitalTid = parseInt(tidPerDigitaltBesok.value);
    const grad = parseInt(digitaliseringsgrad.value) / 100;
    const kostnad = parseFloat(timekostnad.value) || 600;

    if (isDailyModel) {
        // === AKTIVITET ===
        const unngaatteDag = brukere * besok * grad;
        const unngaatteAar = unngaatteDag * 365;
        const tidSpartMinPerDag = unngaatteDag * (fysiskTid - digitalTid);
        const timerSpartAar = (tidSpartMinPerDag * 365) / 60;

        // === ØKONOMI ===
        const bruttoBesparelse = timerSpartAar * kostnad;
        const lisens = lisensPerKamera ? (parseFloat(lisensPerKamera.value) || 0) : 0;
        const investering = investeringPerKamera ? (parseFloat(investeringPerKamera.value) || 0) : 0;
        const arligKostnad = brukere * lisens * 12;
        const totalInvestering = brukere * investering;
        const nettoGevinst = bruttoBesparelse - arligKostnad;
        const maanedligNetto = nettoGevinst / 12;
        const paybackMnd = maanedligNetto > 0 ? totalInvestering / maanedligNetto : 0;
        const femAarsNetto = (nettoGevinst * 5) - totalInvestering;

        // === KAPASITET ===
        const aarsverk = timerSpartAar / 1695;
        const stillingsprosent = aarsverk * 100;
        const tidPerBeboerAar = besok * fysiskTid / 60 * 365;
        const ekstraBeboere = tidPerBeboerAar > 0 ? timerSpartAar / tidPerBeboerAar : 0;

        // Update Økonomi
        arligGevinst.textContent = formatNumber(nettoGevinst);
        const paybackEl = document.getElementById('paybackTid');
        if (paybackEl) paybackEl.textContent = paybackMnd > 0 ? (Math.round(paybackMnd * 10) / 10).toString().replace('.', ',') : '—';
        const femAarsEl = document.getElementById('femAarsGevinst');
        if (femAarsEl) femAarsEl.textContent = formatNumber(femAarsNetto);

        // Update Kapasitet
        const aarsverkEl = document.getElementById('frigjorteAarsverk');
        if (aarsverkEl) aarsverkEl.textContent = (Math.round(aarsverk * 10) / 10).toString().replace('.', ',');
        const kapasitetEl = document.getElementById('ekstraKapasitet');
        if (kapasitetEl) kapasitetEl.textContent = Math.round(ekstraBeboere);

        // Update Aktivitet
        const tilsynAarEl = document.getElementById('unngaatteTilsynAar');
        if (tilsynAarEl) tilsynAarEl.textContent = formatNumber(unngaatteAar);
        const timerEl = document.getElementById('timerSpartAar');
        if (timerEl) timerEl.textContent = formatNumber(Math.round(timerSpartAar));
    } else {
        // Default formula for hjemmebesøk and hjemmeboende tilsyn
        const totaleBesokPerUke = brukere * besok;
        const fysiskeBesok = totaleBesokPerUke * (1 - grad);
        const digitaleBesok = totaleBesokPerUke * grad;

        const navaerende = (totaleBesokPerUke * fysiskTid) / 60;
        const optimalisert = (fysiskeBesok * fysiskTid + digitaleBesok * digitalTid) / 60;
        const frigjort = navaerende - optimalisert;

        const ukentlig = frigjort * kostnad;
        const arlig = ukentlig * 52;

        animateValue(navaerendeTid, Math.round(navaerende * 10) / 10);
        animateValue(frigjorteTimer, Math.round(frigjort * 10) / 10);
        ukentligVerdi.textContent = formatNumber(ukentlig);
        arligGevinst.textContent = formatNumber(arlig);
    }

    // Update slider visuals
    updateSliderProgress(antallBrukere);
    updateSliderProgress(besokPerUke);
    updateSliderProgress(tidPerBesok);
    updateSliderProgress(tidPerDigitaltBesok);
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

// Event listeners for cost inputs (sykehjem only)
if (lisensPerKamera) lisensPerKamera.addEventListener('input', calculate);
if (investeringPerKamera) investeringPerKamera.addEventListener('input', calculate);


// Share functionality - generate URL with current values
document.getElementById('shareBtn').addEventListener('click', function() {
    const btn = this;
    const paramObj = {
        brukere: antallBrukere.value,
        besok: besokPerUke.value,
        fysisk: tidPerBesok.value,
        digital: tidPerDigitaltBesok.value,
        grad: digitaliseringsgrad.value,
        kostnad: timekostnad.value
    };
    if (lisensPerKamera) paramObj.lisens = lisensPerKamera.value;
    if (investeringPerKamera) paramObj.investering = investeringPerKamera.value;
    const params = new URLSearchParams(paramObj);
    const url = window.location.origin + window.location.pathname + '?' + params.toString();

    navigator.clipboard.writeText(url).then(() => {
        btn.innerHTML = '<span class="btn-icon">✅</span> Lenke kopiert!';
        setTimeout(() => {
            btn.innerHTML = '<span class="btn-icon">🔗</span> Del beregning';
        }, 2000);
    });
});

// Apply URL parameters if present
function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('brukere')) return false;

    const mapping = {
        brukere: antallBrukere,
        besok: besokPerUke,
        fysisk: tidPerBesok,
        digital: tidPerDigitaltBesok,
        grad: digitaliseringsgrad
    };

    for (const [key, slider] of Object.entries(mapping)) {
        const val = parseInt(params.get(key));
        if (!isNaN(val)) {
            slider.value = val;
        }
    }

    const kostnad = parseInt(params.get('kostnad'));
    if (!isNaN(kostnad)) {
        timekostnad.value = kostnad;
    }

    if (lisensPerKamera && params.has('lisens')) {
        const val = parseInt(params.get('lisens'));
        if (!isNaN(val)) lisensPerKamera.value = val;
    }
    if (investeringPerKamera && params.has('investering')) {
        const val = parseInt(params.get('investering'));
        if (!isNaN(val)) investeringPerKamera.value = val;
    }

    return true;
}

// PDF Export functionality
document.getElementById('exportPdf').addEventListener('click', function() {
    const btn = this;
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> Genererer PDF...';

    // Create a clean version for PDF
    const pdfContent = document.createElement('div');

    const pdfInputRows = isDailyModel
        ? `<tr><td style="padding: 8px 0; color: #666;">Antall ${isSykehjem ? 'beboere' : 'brukere'}</td><td style="text-align: right; font-weight: 600;">${antallBrukere.value} ${isSykehjem ? 'beboere' : 'brukere'}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Tilsyn per ${isSykehjem ? 'beboer' : 'bruker'} per dag</td><td style="text-align: right; font-weight: 600;">${besokPerUke.value} tilsyn</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Tid per fysisk tilsyn</td><td style="text-align: right; font-weight: 600;">${tidPerBesok.value} minutter</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Tid per digitalt tilsyn</td><td style="text-align: right; font-weight: 600;">${tidPerDigitaltBesok.value} minutter</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Digitaliseringsgrad</td><td style="text-align: right; font-weight: 600;">${digitaliseringsgrad.value}%</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Kommunal timekostnad</td><td style="text-align: right; font-weight: 600;">${timekostnad.value} NOK</td></tr>
           ${lisensPerKamera ? `<tr><td style="padding: 8px 0; color: #666;">Månedlig lisens per kamera</td><td style="text-align: right; font-weight: 600;">${lisensPerKamera.value} NOK</td></tr>` : ''}
           ${investeringPerKamera ? `<tr><td style="padding: 8px 0; color: #666;">Investering per kamera</td><td style="text-align: right; font-weight: 600;">${formatNumber(investeringPerKamera.value)} NOK</td></tr>` : ''}`
        : `<tr><td style="padding: 8px 0; color: #666;">Antall brukere</td><td style="text-align: right; font-weight: 600;">${antallBrukere.value} brukere</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Besøk per bruker per uke</td><td style="text-align: right; font-weight: 600;">${besokPerUke.value} besøk</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Tid per fysisk besøk</td><td style="text-align: right; font-weight: 600;">${tidPerBesok.value} minutter</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Tid per digitalt besøk</td><td style="text-align: right; font-weight: 600;">${tidPerDigitaltBesok.value} minutter</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Digitaliseringsgrad</td><td style="text-align: right; font-weight: 600;">${digitaliseringsgrad.value}%</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">Kommunal timekostnad</td><td style="text-align: right; font-weight: 600;">${timekostnad.value} NOK</td></tr>`;

    const getVal = (id) => { const el = document.getElementById(id); return el ? el.textContent : '0'; };
    const pdfResultRows = isDailyModel
        ? `<tr style="border-bottom: 1px solid rgba(255,255,255,0.3);"><td style="padding: 15px 0; font-size: 18px;">Årlig netto gevinst</td><td style="text-align: right; font-weight: 700; font-size: 28px;">${arligGevinst.textContent} NOK</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">Økonomi</td></tr>
           <tr><td style="padding: 8px 0;">Payback-tid</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('paybackTid')} mnd</td></tr>
           <tr><td style="padding: 8px 0;">5-års netto gevinst</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('femAarsGevinst')} NOK</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">Kapasitet</td></tr>
           <tr><td style="padding: 8px 0;">Frigjorte årsverk</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('frigjorteAarsverk')} FTE</td></tr>
           <tr><td style="padding: 8px 0;">Økt kapasitet</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('ekstraKapasitet')} flere beboere</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">Aktivitet</td></tr>
           <tr><td style="padding: 8px 0;">Unngåtte fysiske tilsyn per år</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('unngaatteTilsynAar')} tilsyn</td></tr>
           <tr><td style="padding: 8px 0;">Timer spart per år</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('timerSpartAar')} timer</td></tr>`
        : `<tr><td style="padding: 10px 0;">Nåværende tidsbruk per uke</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${navaerendeTid.textContent} timer</td></tr>
           <tr><td style="padding: 10px 0;">Frigjorte timer per uke</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${frigjorteTimer.textContent} timer</td></tr>
           <tr><td style="padding: 10px 0;">Ukentlig besparelse</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${ukentligVerdi.textContent} NOK</td></tr>
           <tr style="border-top: 1px solid rgba(255,255,255,0.3);"><td style="padding: 15px 0; font-size: 18px;">Årlig økonomisk gevinst</td><td style="text-align: right; font-weight: 700; font-size: 28px;">${arligGevinst.textContent} NOK</td></tr>`;

    pdfContent.innerHTML = `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 40px; max-width: 800px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #4ECDC4; margin: 0;">${document.querySelector('header h1').textContent}</h1>
                <p style="color: #666; margin: 5px 0;">Lønnsomhetskalkulator - Resultat</p>
                <p style="color: #999; font-size: 12px;">${new Date().toLocaleDateString('no-NO')}</p>
            </div>

            <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #2c3e50; font-size: 16px; margin: 0 0 15px 0;">Dine forutsetninger</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${pdfInputRows}
                </table>
            </div>

            <div style="background: linear-gradient(135deg, #4ECDC4, #3DB8B0); padding: 25px; border-radius: 8px; color: white;">
                <h2 style="font-size: 16px; margin: 0 0 15px 0;">Beregnet gevinst</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${pdfResultRows}
                </table>
            </div>

            <p style="text-align: center; color: #999; font-size: 11px; margin-top: 30px;">
                Kalkulatoren gir et estimat basert på oppgitte verdier. Faktiske besparelser kan variere.
            </p>
        </div>
    `;

    const opt = {
        margin: 10,
        filename: 'gevinstkalkulator-resultat.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(pdfContent).save().then(() => {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">📄</span> Last ned som PDF';
    });
});

// User selection overlay logic
function initUserSelection() {
    const overlay = document.getElementById('userSelectionOverlay');
    if (!overlay) return;

    const presetButtons = overlay.querySelectorAll('.user-option-btn[data-value]');
    const customBtn = document.getElementById('customOptionBtn');
    const customRow = document.getElementById('customInputRow');
    const customInput = document.getElementById('customUserCount');
    const confirmBtn = document.getElementById('customConfirmBtn');

    function selectUserCount(value) {
        value = Math.max(1, Math.min(500, parseInt(value) || 50));
        antallBrukere.value = value;
        antallBrukereValue.value = value;
        updateSliderProgress(antallBrukere);
        overlay.classList.add('hidden');
        calculate();
    }

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => selectUserCount(btn.dataset.value));
    });

    customBtn.addEventListener('click', () => {
        customRow.style.display = 'flex';
        customInput.focus();
    });

    confirmBtn.addEventListener('click', () => {
        if (customInput.value) selectUserCount(customInput.value);
    });

    customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && customInput.value) selectUserCount(customInput.value);
    });
}

// Initialize on page load
function init() {
    // Apply shared URL params if present (skip overlay)
    const hasParams = applyUrlParams();

    // Sync all slider-input pairs
    sliderPairs.forEach(({ slider, input }) => {
        syncSliderToInput(slider, input);
    });
    // Run initial calculation
    calculate();

    // Init user selection overlay (hide if opened via shared link)
    if (hasParams) {
        const overlay = document.getElementById('userSelectionOverlay');
        if (overlay) overlay.classList.add('hidden');
    } else {
        initUserSelection();
    }
}

document.addEventListener('DOMContentLoaded', init);

// Also run immediately in case DOM is already loaded
init();
