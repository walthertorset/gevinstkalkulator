// Slider elements
const antallBrukere = document.getElementById('antallBrukere');
const besokPerUke = document.getElementById('besokPerUke');
const tidPerBesok = document.getElementById('tidPerBesok');
const tidPerDigitaltBesok = document.getElementById('tidPerDigitaltBesok');
const digitaliseringsgrad = document.getElementById('digitaliseringsgrad');
const timekostnad = document.getElementById('timekostnad');

// Hjemmebesøk-specific elements
const reisetidSlider = document.getElementById('reisetid');
const reisetidValueInput = document.getElementById('reisetidValue');

// Hjemmeboende-specific elements
const kjoretidSlider = document.getElementById('kjoretid');
const kjoretidValueInput = document.getElementById('kjoretidValue');

// Editable value inputs (synced with sliders)
const antallBrukereValue = document.getElementById('antallBrukereValue');
const besokPerUkeValue = document.getElementById('besokPerUkeValue');
const tidPerBesokValue = document.getElementById('tidPerBesokValue');
const tidPerDigitaltBesokValue = document.getElementById('tidPerDigitaltBesokValue');
const digitaliseringsgradValue = document.getElementById('digitaliseringsgradValue');

// Slider-input pairs for bidirectional sync
const sliderPairs = [];
if (antallBrukere && antallBrukereValue) sliderPairs.push({ slider: antallBrukere, input: antallBrukereValue });
if (besokPerUke && besokPerUkeValue) sliderPairs.push({ slider: besokPerUke, input: besokPerUkeValue });
if (tidPerBesok && tidPerBesokValue) sliderPairs.push({ slider: tidPerBesok, input: tidPerBesokValue });
if (tidPerDigitaltBesok && tidPerDigitaltBesokValue) sliderPairs.push({ slider: tidPerDigitaltBesok, input: tidPerDigitaltBesokValue });
if (digitaliseringsgrad && digitaliseringsgradValue) sliderPairs.push({ slider: digitaliseringsgrad, input: digitaliseringsgradValue });


// Add reisetid slider pair if present (hjemmebesøk page)
if (reisetidSlider && reisetidValueInput) {
    sliderPairs.push({ slider: reisetidSlider, input: reisetidValueInput });
}

// Add kjoretid slider pair if present (hjemmeboende page)
if (kjoretidSlider && kjoretidValueInput) {
    sliderPairs.push({ slider: kjoretidSlider, input: kjoretidValueInput });
}

// Cost input elements (sykehjem only)
const lisensPerKamera = document.getElementById('lisensPerKamera');
const investeringPerKamera = document.getElementById('investeringPerKamera');

// Cost input elements (hjemmebesøk only)
const lisensPerBruker = document.getElementById('lisensPerBruker');
const investeringPerBruker = document.getElementById('investeringPerBruker');

// Result elements (some may be null depending on page)
const navaerendeTid = document.getElementById('navaerendeTid');
const frigjorteTimer = document.getElementById('frigjorteTimer');
const ukentligVerdi = document.getElementById('ukentligVerdi');
const arligGevinst = document.getElementById('arligGevinst');


// Format number based on language
function formatNumber(num) {
    const separator = currentLang === 'en' ? ',' : ' ';
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

// Format decimal based on language
function formatDecimal(num) {
    const decimalSeparator = currentLang === 'en' ? '.' : ',';
    return (Math.round(num * 10) / 10).toString().replace('.', decimalSeparator);
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
const isHjemmebesok = pageType === 'hjemmebesok';
const isDailyModel = isSykehjem || isHjemmeboende;

// Calculate and update all results
function calculate() {
    if (!antallBrukere) return; // Skip if inputs don't exist on this page

    const brukere = parseInt(antallBrukere.value);
    const besok = parseInt(besokPerUke.value);
    const fysiskTid = parseInt(tidPerBesok.value);
    const digitalTid = parseInt(tidPerDigitaltBesok.value);
    const grad = parseInt(digitaliseringsgrad.value) / 100;
    const kostnad = parseFloat(timekostnad.value) || 600;

    if (isHjemmebesok) {
        // === HJEMMEBESØK MODEL (weekly-based, with travel time) ===
        const reise = parseInt(reisetidSlider.value);
        const totaleBesokPerUke = brukere * besok;
        const digitaleBesokPerUke = totaleBesokPerUke * grad;

        // === AKTIVITET ===
        const erstattedeBesokAar = Math.round(digitaleBesokPerUke * 52);
        const spartReisetidAar = digitaleBesokPerUke * reise / 60 * 52;
        const totalTimerSpartAar = digitaleBesokPerUke * (fysiskTid + reise - digitalTid) / 60 * 52;

        // === ØKONOMI ===
        const bruttoBesparelse = totalTimerSpartAar * kostnad;
        const lisens = lisensPerBruker ? (parseFloat(lisensPerBruker.value) || 0) : 0;
        const investering = investeringPerBruker ? (parseFloat(investeringPerBruker.value) || 0) : 0;
        const arligKostnad = brukere * lisens * 12;
        const totalInvestering = brukere * investering;
        const nettoGevinst = bruttoBesparelse - arligKostnad;
        const maanedligNetto = nettoGevinst / 12;
        const paybackMnd = maanedligNetto > 0 ? totalInvestering / maanedligNetto : 0;
        const femAarsNetto = (nettoGevinst * 5) - totalInvestering;

        // === KAPASITET ===
        const aarsverk = totalTimerSpartAar / 1695;

        // Update Økonomi
        arligGevinst.textContent = formatNumber(nettoGevinst);
        const paybackEl = document.getElementById('paybackTid');
        if (paybackEl) paybackEl.textContent = paybackMnd > 0 ? formatDecimal(paybackMnd) : '—';
        const femAarsEl = document.getElementById('femAarsGevinst');
        if (femAarsEl) femAarsEl.textContent = formatNumber(femAarsNetto);

        // Update Kapasitet
        const aarsverkEl = document.getElementById('frigjorteAarsverk');
        if (aarsverkEl) aarsverkEl.textContent = formatDecimal(aarsverk);

        // Update Operasjonell nytte
        const erstattedEl = document.getElementById('erstattedeBesokAar');
        if (erstattedEl) erstattedEl.textContent = formatNumber(erstattedeBesokAar);
        const reisetidEl = document.getElementById('spartReisetidAar');
        if (reisetidEl) reisetidEl.textContent = formatNumber(Math.round(spartReisetidAar));
        const timerEl = document.getElementById('timerSpartAar');
        if (timerEl) timerEl.textContent = formatNumber(Math.round(totalTimerSpartAar));

    } else if (isDailyModel) {
        // === SYKEHJEM / HJEMMEBOENDE MODEL (daily-based) ===
        const kjoretid = kjoretidSlider ? parseInt(kjoretidSlider.value) : 0;
        const unngaatteDag = brukere * besok * grad;
        const unngaatteAar = unngaatteDag * 365;
        const tidSpartMinPerDag = isHjemmeboende
            ? unngaatteDag * (fysiskTid + kjoretid - digitalTid)
            : unngaatteDag * (fysiskTid - digitalTid);
        const timerSpartAar = (tidSpartMinPerDag * 365) / 60;
        const timerSpartBilAar = isHjemmeboende ? (unngaatteDag * kjoretid / 60 * 365) : 0;

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
        const tidPerBeboerAar = isHjemmeboende
            ? besok * (fysiskTid + kjoretid) / 60 * 365
            : besok * fysiskTid / 60 * 365;
        const ekstraBeboere = tidPerBeboerAar > 0 ? timerSpartAar / tidPerBeboerAar : 0;

        // Update Økonomi
        arligGevinst.textContent = formatNumber(nettoGevinst);
        const paybackEl = document.getElementById('paybackTid');
        if (paybackEl) paybackEl.textContent = paybackMnd > 0 ? formatDecimal(paybackMnd) : '—';
        const femAarsEl = document.getElementById('femAarsGevinst');
        if (femAarsEl) femAarsEl.textContent = formatNumber(femAarsNetto);

        // Update Kapasitet
        const aarsverkEl = document.getElementById('frigjorteAarsverk');
        if (aarsverkEl) aarsverkEl.textContent = formatDecimal(aarsverk);
        const kapasitetEl = document.getElementById('ekstraKapasitet');
        if (kapasitetEl) kapasitetEl.textContent = formatNumber(ekstraBeboere);

        // Update Aktivitet
        const tilsynAarEl = document.getElementById('unngaatteTilsynAar');
        if (tilsynAarEl) tilsynAarEl.textContent = formatNumber(unngaatteAar);
        const timerBilEl = document.getElementById('timerSpartBilAar');
        if (timerBilEl) timerBilEl.textContent = formatNumber(Math.round(timerSpartBilAar));
        const timerEl = document.getElementById('timerSpartAar');
        if (timerEl) timerEl.textContent = formatNumber(Math.round(timerSpartAar));
    }

    // Update slider visuals
    updateSliderProgress(antallBrukere);
    updateSliderProgress(besokPerUke);
    updateSliderProgress(tidPerBesok);
    updateSliderProgress(tidPerDigitaltBesok);
    updateSliderProgress(digitaliseringsgrad);
    if (reisetidSlider) updateSliderProgress(reisetidSlider);
    if (kjoretidSlider) updateSliderProgress(kjoretidSlider);
}

// Simple animation for result values
function animateValue(element, newValue) {
    if (typeof newValue === 'number') {
        element.textContent = Number.isInteger(newValue) ? formatNumber(newValue) : formatDecimal(newValue);
    } else {
        element.textContent = newValue;
    }
}

// Advanced toggle logic
function initAdvancedToggle() {
    const toggleBtn = document.getElementById('advancedToggle');
    const advancedInputs = document.getElementById('advancedInputs');
    if (!toggleBtn || !advancedInputs) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = advancedInputs.style.display !== 'none';
        advancedInputs.style.display = isOpen ? 'none' : 'block';
        toggleBtn.classList.toggle('open', !isOpen);
        toggleBtn.querySelector('span:first-child').textContent = isOpen ? t('show_economic_details') : t('hide_economic_details');
    });
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
if (timekostnad) timekostnad.addEventListener('input', calculate);

// Event listeners for cost inputs (sykehjem only)
if (lisensPerKamera) lisensPerKamera.addEventListener('input', calculate);
if (investeringPerKamera) investeringPerKamera.addEventListener('input', calculate);

// Event listeners for cost inputs (hjemmebesøk only)
if (lisensPerBruker) lisensPerBruker.addEventListener('input', calculate);
if (investeringPerBruker) investeringPerBruker.addEventListener('input', calculate);


// Share functionality - generate URL with current values
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) shareBtn.addEventListener('click', function() {
    const btn = this;
    const paramObj = {
        brukere: antallBrukere.value,
        besok: besokPerUke.value,
        fysisk: tidPerBesok.value,
        digital: tidPerDigitaltBesok.value,
        grad: digitaliseringsgrad.value,
        kostnad: timekostnad.value
    };
    if (reisetidSlider) paramObj.reisetid = reisetidSlider.value;
    if (kjoretidSlider) paramObj.kjoretid = kjoretidSlider.value;
    if (lisensPerKamera) paramObj.lisens = lisensPerKamera.value;
    if (investeringPerKamera) paramObj.investering = investeringPerKamera.value;
    if (lisensPerBruker) paramObj.lisens = lisensPerBruker.value;
    if (investeringPerBruker) paramObj.investering = investeringPerBruker.value;
    const params = new URLSearchParams(paramObj);
    const url = window.location.origin + window.location.pathname + '?' + params.toString();

    navigator.clipboard.writeText(url).then(() => {
        btn.innerHTML = `<span class="btn-icon">✅</span> <span data-i18n="link_copied">${typeof t === 'function' ? t('link_copied') : 'Lenke kopiert!'}</span>`;
        setTimeout(() => {
            btn.innerHTML = `<span class="btn-icon">🔗</span> <span data-i18n="share_calculation">${typeof t === 'function' ? t('share_calculation') : 'Del beregning'}</span>`;
        }, 2000);
    });
});

// Apply URL parameters if present
function applyUrlParams() {
    if (!antallBrukere) return false;
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
        if (!isNaN(val) && slider) {
            slider.value = val;
        }
    }

    const kostnad = parseInt(params.get('kostnad'));
    if (!isNaN(kostnad)) {
        timekostnad.value = kostnad;
    }

    if (reisetidSlider && params.has('reisetid')) {
        const val = parseInt(params.get('reisetid'));
        if (!isNaN(val)) reisetidSlider.value = val;
    }

    if (kjoretidSlider && params.has('kjoretid')) {
        const val = parseInt(params.get('kjoretid'));
        if (!isNaN(val)) kjoretidSlider.value = val;
    }

    if (lisensPerKamera && params.has('lisens')) {
        const val = parseInt(params.get('lisens'));
        if (!isNaN(val)) lisensPerKamera.value = val;
    }
    if (investeringPerKamera && params.has('investering')) {
        const val = parseInt(params.get('investering'));
        if (!isNaN(val)) investeringPerKamera.value = val;
    }
    if (lisensPerBruker && params.has('lisens')) {
        const val = parseInt(params.get('lisens'));
        if (!isNaN(val)) lisensPerBruker.value = val;
    }
    if (investeringPerBruker && params.has('investering')) {
        const val = parseInt(params.get('investering'));
        if (!isNaN(val)) investeringPerBruker.value = val;
    }
    
    return true;
}

   // PDF Export functionality
const exportPdfBtn = document.getElementById('exportPdf');
if (exportPdfBtn) exportPdfBtn.addEventListener('click', function() {
    const btn = this;
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-icon">⏳</span> <span data-i18n="generating_pdf">${typeof t === 'function' ? t('generating_pdf') : 'Genererer PDF...'}</span>`;

    // Create a clean version for PDF
    const pdfContent = document.createElement('div');

    let pdfInputRows;
    if (isHjemmebesok) {
        pdfInputRows = `<tr><td style="padding: 8px 0; color: #666;">${t('number_of_users')}</td><td style="text-align: right; font-weight: 600;">${antallBrukere.value} ${t('users')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('visits_per_week')}</td><td style="text-align: right; font-weight: 600;">${besokPerUke.value} ${t('visits')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('time_per_visit')}</td><td style="text-align: right; font-weight: 600;">${tidPerBesok.value} ${t('minutes')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('travel_time_roundtrip')}</td><td style="text-align: right; font-weight: 600;">${reisetidSlider.value} ${t('minutes')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('time_per_digital_visit')}</td><td style="text-align: right; font-weight: 600;">${tidPerDigitaltBesok.value} ${t('minutes')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('share_visits_digitalized')}</td><td style="text-align: right; font-weight: 600;">${digitaliseringsgrad.value}${t('percent')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('municipal_hourly_rate')}</td><td style="text-align: right; font-weight: 600;">${timekostnad.value} ${t('currency_nok')}</td></tr>
           ${lisensPerBruker ? `<tr><td style="padding: 8px 0; color: #666;">${t('monthly_license_per_user')}</td><td style="text-align: right; font-weight: 600;">${lisensPerBruker.value} ${t('currency_nok')}</td></tr>` : ''}
           ${investeringPerBruker ? `<tr><td style="padding: 8px 0; color: #666;">${t('investment_per_user')}</td><td style="text-align: right; font-weight: 600;">${formatNumber(investeringPerBruker.value)} ${t('currency_nok')}</td></tr>` : ''}`;
    } else if (isDailyModel) {
        const beboereText = isSykehjem ? t('residents') : t('users');
        const tilsynDagText = isSykehjem ? t('checks_per_day_sykehjem') : t('checks_per_day_hjemmeboende');
        
        pdfInputRows = `<tr><td style="padding: 8px 0; color: #666;">${t('number_of_users')}</td><td style="text-align: right; font-weight: 600;">${antallBrukere.value} ${beboereText}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${tilsynDagText}</td><td style="text-align: right; font-weight: 600;">${besokPerUke.value} ${t('checks')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('time_per_physical_check')}</td><td style="text-align: right; font-weight: 600;">${tidPerBesok.value} ${t('minutes')}</td></tr>
           ${kjoretidSlider ? `<tr><td style="padding: 8px 0; color: #666;">${t('driving_time_roundtrip')}</td><td style="text-align: right; font-weight: 600;">${kjoretidSlider.value} ${t('minutes')}</td></tr>` : ''}
           <tr><td style="padding: 8px 0; color: #666;">${t('time_per_digital_check')}</td><td style="text-align: right; font-weight: 600;">${tidPerDigitaltBesok.value} ${t('minutes')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('share_checks_digitalized')}</td><td style="text-align: right; font-weight: 600;">${digitaliseringsgrad.value}${t('percent')}</td></tr>
           <tr><td style="padding: 8px 0; color: #666;">${t('municipal_hourly_rate')}</td><td style="text-align: right; font-weight: 600;">${timekostnad.value} ${t('currency_nok')}</td></tr>
           ${lisensPerKamera ? `<tr><td style="padding: 8px 0; color: #666;">${t('monthly_license_per_camera')}</td><td style="text-align: right; font-weight: 600;">${lisensPerKamera.value} ${t('currency_nok')}</td></tr>` : ''}
           ${investeringPerKamera ? `<tr><td style="padding: 8px 0; color: #666;">${t('investment_per_camera')}</td><td style="text-align: right; font-weight: 600;">${formatNumber(investeringPerKamera.value)} ${t('currency_nok')}</td></tr>` : ''}`;
    }

    const getVal = (id) => { const el = document.getElementById(id); return el ? el.textContent : '0'; };

    let pdfResultRows;
    if (isHjemmebesok) {
        pdfResultRows = `<tr style="border-bottom: 1px solid rgba(255,255,255,0.3);"><td style="padding: 15px 0; font-size: 18px;">${t('yearly_net_gain')}</td><td style="text-align: right; font-weight: 700; font-size: 28px;">${arligGevinst.textContent} ${t('currency_nok')}</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('economy')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('payback_time')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('paybackTid')} ${t('months')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('five_year_gain')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('femAarsGevinst')} ${t('currency_nok')}</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('operational_benefit')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('total_hours_saved')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('timerSpartAar')} ${t('hours')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('saved_travel_time')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('spartReisetidAar')} ${t('hours')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('replaced_physical_visits')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('erstattedeBesokAar')} ${t('visits')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('freed_fte')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('frigjorteAarsverk')} ${t('fte')}</td></tr>`;
    } else if (isDailyModel) {
        pdfResultRows = `<tr style="border-bottom: 1px solid rgba(255,255,255,0.3);"><td style="padding: 15px 0; font-size: 18px;">${t('yearly_net_gain')}</td><td style="text-align: right; font-weight: 700; font-size: 28px;">${arligGevinst.textContent} ${t('currency_nok')}</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('economy')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('payback_time')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('paybackTid')} ${t('months')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('five_year_gain')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('femAarsGevinst')} ${t('currency_nok')}</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('capacity')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('freed_fte')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('frigjorteAarsverk')} ${t('fte')}</td></tr>
           <tr><td style="padding: 8px 0;">${t('increased_capacity')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('ekstraKapasitet')} ${isSykehjem ? t('more_residents') : t('more_users')}</td></tr>
           <tr><td colspan="2" style="padding: 14px 0 4px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('activity')}</td></tr>
           ${isHjemmeboende
               ? `<tr><td style="padding: 8px 0;">${t('hours_saved_car')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('timerSpartBilAar')} ${t('hours')}</td></tr>`
               : `<tr><td style="padding: 8px 0;">${t('avoided_physical_checks')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('unngaatteTilsynAar')} ${t('checks')}</td></tr>`}
           <tr><td style="padding: 8px 0;">${t('hours_saved_year')}</td><td style="text-align: right; font-weight: 700; font-size: 18px;">${getVal('timerSpartAar')} ${t('hours')}</td></tr>`;
    }

    pdfContent.innerHTML = `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 40px; max-width: 800px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #4ECDC4; margin: 0;">${document.querySelector('header h1') ? document.querySelector('header h1').textContent : t('calculated_gain')}</h1>
                <p style="color: #666; margin: 5px 0;">${t('pdf_subtitle')}</p>
                <p style="color: #999; font-size: 12px;">${new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : (currentLang === 'sv' ? 'sv-SE' : 'no-NO'))}</p>
            </div>

            <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #2c3e50; font-size: 16px; margin: 0 0 15px 0;">${t('your_assumptions')}</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${pdfInputRows}
                </table>
            </div>

            <div style="background: linear-gradient(135deg, #4ECDC4, #3DB8B0); padding: 25px; border-radius: 8px; color: white;">
                <h2 style="font-size: 16px; margin: 0 0 15px 0;">${t('calculated_gain')}</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${pdfResultRows}
                </table>
            </div>

            <p style="text-align: center; color: #999; font-size: 11px; margin-top: 30px;">
                ${t('footer_text')}
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
        btn.innerHTML = `<span class="btn-icon">📄</span> <span data-i18n="download_pdf">${typeof t === 'function' ? t('download_pdf') : 'Last ned som PDF'}</span>`;
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

    // Init hjemmebesøk-specific features
    initAdvancedToggle();
    
    // Initialize i18n
    initI18n();
}

// Internationalization (i18n) setup
let currentLang = localStorage.getItem('selectedLang') || 'no';

function t(key) {
    if (typeof getTranslation === 'function') {
        return getTranslation(currentLang, key);
    }
    return key;
}

function translatePage() {
    if (typeof translations === 'undefined') return;
    
    // Basic text translation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });

    // Tooltip translation
    document.querySelectorAll('[data-i18n-tooltip]').forEach(element => {
        const key = element.getAttribute('data-i18n-tooltip');
        element.setAttribute('data-tooltip', t(key));
    });

    // Placeholder translation
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.setAttribute('placeholder', t(key));
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Refresh calculation to update formatted numbers and currency
    calculate();
}

function setupCustomLanguageSelector() {
    const originalSelect = document.getElementById('langSelect');
    if (!originalSelect || originalSelect.dataset.customized) return;
    originalSelect.dataset.customized = 'true';

    // Hide original select
    originalSelect.style.display = 'none';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-lang-select';
    originalSelect.parentNode.insertBefore(wrapper, originalSelect);

    const selectedDiv = document.createElement('div');
    selectedDiv.className = 'lang-select-selected';
    
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'lang-select-items lang-select-hide';

    const flags = {
        'no': 'https://flagcdn.com/w20/no.png',
        'en': 'https://flagcdn.com/w20/gb.png',
        'sv': 'https://flagcdn.com/w20/se.png'
    };

    function updateSelected(value, text) {
        selectedDiv.innerHTML = `<img src="${flags[value]}" alt="${value}" class="lang-flag"> ${text}`;
    }

    // Populate items
    Array.from(originalSelect.options).forEach(option => {
        // Remove emoji from option text since we added them in HTML
        const cleanText = option.text.replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\s*/g, '').trim();
        
        const item = document.createElement('div');
        item.innerHTML = `<img src="${flags[option.value]}" alt="${option.value}" class="lang-flag"> ${cleanText}`;
        item.addEventListener('click', function(e) {
            originalSelect.value = option.value;
            updateSelected(option.value, cleanText);
            itemsDiv.classList.add('lang-select-hide');
            // Trigger change event manually
            originalSelect.dispatchEvent(new Event('change'));
        });
        itemsDiv.appendChild(item);
    });

    // Initial selected value
    const initialOption = originalSelect.options[originalSelect.selectedIndex];
    const initialCleanText = initialOption ? initialOption.text.replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\s*/g, '').trim() : 'Norsk';
    updateSelected(originalSelect.value || 'no', initialCleanText);

    wrapper.appendChild(selectedDiv);
    wrapper.appendChild(itemsDiv);

    // Toggle dropdown
    selectedDiv.addEventListener('click', function(e) {
        e.stopPropagation();
        itemsDiv.classList.toggle('lang-select-hide');
        selectedDiv.classList.toggle('lang-select-arrow-active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        itemsDiv.classList.add('lang-select-hide');
        selectedDiv.classList.remove('lang-select-arrow-active');
    });
}

function initI18n() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }
    setupCustomLanguageSelector();
    
    if (langSelect) {
        // Also update custom dropdown UI
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('selectedLang', currentLang);
            translatePage();
        });
    }
    translatePage();
}

// Run init when DOM is ready (only once)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
