const translations = {
    no: {
        // Shared
        "back_to_overview": "← Tilbake til tjenesteoversikt",
        "back_to_service_selection": "← Tilbake til tjenestevalg",
        "footer_text": "Kalkulatoren gir et estimat basert på oppgitte verdier. Faktiske besparelser kan variere.",
        "calculated_gain": "Beregnet gevinst",
        "yearly_net_gain": "Årlig netto gevinst",
        "yearly_net_gain_tooltip_hjemmebesok": "Total estimert besparelse per år minus årlig lisenskostnad",
        "yearly_net_gain_tooltip_tilsyn": "Brutto besparelse minus årlig kostnad for løsningen (lisens, hardware, drift)",
        "currency_nok": "NOK",
        "months": "måneder",
        "hours": "timer",
        "visits": "besøk",
        "fte": "FTE",
        "users": "brukere",
        "residents": "beboere",
        "checks": "tilsyn",
        "more_users": "flere brukere",
        "more_residents": "flere beboere",
        "minutes": "min",
        "percent": "%",
        
        // Formula
        "formula_avoided_checks": "Unngåtte tilsyn/dag",
        "formula_hours_saved": "Timer spart/år",
        "formula_gross_saving": "Årlig brutto besparelse",
        "formula_net_gain": "Årlig netto gevinst",
        "formula_payback": "Payback-tid",
        "formula_fte": "Frigjorte årsverk",
        "formula_total_visits_week": "Totale besøk per uke",
        "formula_replaced_visits_week": "Erstattede besøk per uke",
        "formula_saved_travel_year": "Spart reisetid per år",
        "formula_total_time_saved_year": "Total tid spart per år",
        
        "formula_avoided_checks_eq": "Brukere × Tilsyn/dag × Digitaliseringsgrad",
        "formula_avoided_checks_eq_sykehjem": "Beboere × Tilsyn/dag × Digitaliseringsgrad",
        "formula_hours_saved_eq_hjemmeboende": "Unngåtte tilsyn/dag × (Fysisk tid + Kjøretid − Digital tid) / 60 × 365",
        "formula_hours_saved_eq_sykehjem": "Unngåtte tilsyn/dag × (Fysisk − Digital tid) / 60 × 365",
        "formula_total_visits_week_eq": "Brukere × Besøk per uke",
        "formula_replaced_visits_week_eq": "Totale besøk × Digitaliseringsgrad",
        "formula_saved_travel_year_eq": "Erstattede besøk/uke × Reisetid / 60 × 52",
        "formula_total_time_saved_year_eq": "Erstattede besøk/uke × (Tid hos bruker + Reisetid − Digital tid) / 60 × 52",
        "formula_gross_saving_eq": "Timer spart/år × Timekostnad",
        "formula_net_gain_eq": "Brutto − (Brukere × Lisens × 12)",
        "formula_payback_eq": "Investering / Månedlig netto gevinst",
        "formula_fte_eq": "Timer spart/år / 1 695 arbeidstimer",
        
        // Economy
        "economy": "Økonomi",
        "payback_time": "Payback-tid",
        "payback_time_tooltip": "Tid før investeringen er tjent inn (investering / månedlig netto gevinst)",
        "five_year_gain": "5-års netto gevinst",
        "five_year_gain_tooltip": "Total netto gevinst over 5 år minus initial investering",
        
        // Operational Benefit
        "operational_benefit": "Operasjonell nytte",
        "total_hours_saved": "Totale timer spart per år",
        "total_hours_saved_tooltip": "Sum av spart reisetid og spart besøkstid per år",
        "saved_travel_time": "Spart reisetid per år",
        "saved_travel_time_tooltip": "Total reisetid spart ved å erstatte fysiske besøk med digitale",
        "replaced_physical_visits": "Erstattede fysiske besøk per år",
        "replaced_physical_visits_tooltip": "Antall fysiske besøk som erstattes av digitale besøk per år",
        "freed_fte": "Frigjorte årsverk",
        "freed_fte_tooltip": "Antall hele årsverk frigjort (timer spart per år / 1 695 arbeidstimer)",
        
        // Capacity
        "capacity": "Kapasitet",
        "increased_capacity": "Økt kapasitet",
        "increased_capacity_tooltip_users": "Antall ekstra brukere samme bemanning kan håndtere med frigjort tid",
        "increased_capacity_tooltip_residents": "Antall ekstra beboere samme bemanning kan håndtere med frigjort tid",
        
        // Activity
        "activity": "Aktivitet",
        "hours_saved_car": "Timer spart i bil per år",
        "hours_saved_car_tooltip": "Antall timer spart på kjøring per år ved digitalisering av tilsyn",
        "hours_saved_year": "Timer spart per år",
        "hours_saved_year_tooltip": "Totalt antall timer spart per år ved digitalisering",
        "avoided_physical_checks": "Unngåtte fysiske tilsyn per år",
        "avoided_physical_checks_tooltip": "Totalt antall fysiske tilsyn unngått per år (per dag × 365)",
        
        // Inputs
        "your_assumptions": "Dine forutsetninger",
        "volume": "Volum",
        "number_of_users": "Antall brukere som mottar tjenesten",
        "number_of_users_tooltip_hjemmebesok": "Totalt antall brukere/pasienter som mottar hjemmetjenester",
        "number_of_users_tooltip_hjemmeboende": "Totalt antall hjemmeboende brukere som mottar tilsyn",
        "number_of_users_tooltip_sykehjem": "Totalt antall beboere som mottar tilsyn",
        "visits_per_week": "Antall besøk per bruker per uke",
        "visits_per_week_tooltip": "Gjennomsnittlig antall hjemmebesøk hver bruker får per uke",
        "checks_per_day_hjemmeboende": "Antall tilsyn per bruker per døgn",
        "checks_per_day_hjemmeboende_tooltip": "Gjennomsnittlig antall tilsyn hver bruker får per døgn",
        "checks_per_day_sykehjem": "Antall tilsyn per beboer per dag",
        "checks_per_day_sykehjem_tooltip": "Gjennomsnittlig antall tilsyn hver beboer får per dag",
        
        "digitalization_degree": "Digitaliseringsgrad",
        "share_visits_digitalized": "Andel besøk som digitaliseres",
        "share_visits_digitalized_tooltip": "Andel av besøkene som kan erstattes med digitale løsninger",
        "share_checks_digitalized": "Andel tilsyn som digitaliseres",
        "share_checks_digitalized_tooltip": "Andel av tilsynene som kan erstattes med digitale løsninger",
        
        "time_usage": "Tidsbruk",
        "time_per_visit": "Tid hos bruker per besøk (minutter)",
        "time_per_visit_tooltip": "Gjennomsnittlig tid tilbrakt hjemme hos bruker per fysisk besøk",
        "time_per_physical_check": "Tidsbruk per fysisk tilsyn (minutter)",
        "time_per_physical_check_tooltip": "Gjennomsnittlig tid brukt på hvert fysiske tilsyn",
        "time_per_physical_check_tooltip_hjemmeboende": "Gjennomsnittlig tid brukt på hvert fysiske tilsyn, inkludert reisetid",
        "travel_time_roundtrip": "Reisetid tur/retur per besøk (minutter)",
        "travel_time_roundtrip_tooltip": "Gjennomsnittlig reisetid tur/retur til bruker per fysisk besøk",
        "driving_time_roundtrip": "Kjøretid per fysisk tilsyn (minutter)",
        "driving_time_roundtrip_tooltip": "Gjennomsnittlig kjøretid tur/retur for hvert fysiske tilsyn",
        "time_per_digital_visit": "Tidsbruk per digitalt besøk (minutter)",
        "time_per_digital_visit_tooltip": "Gjennomsnittlig tid brukt på hvert digitale besøk (videokonsultasjon e.l.)",
        "time_per_digital_check": "Tidsbruk per digitalt tilsyn (minutter)",
        "time_per_digital_check_tooltip": "Gjennomsnittlig tid brukt på hvert digitale tilsyn",
        
        // Advanced Inputs
        "show_economic_details": "Vis økonomiske detaljer",
        "hide_economic_details": "Skjul økonomiske detaljer",
        "municipal_hourly_rate": "Kommunal timekostnad",
        "municipal_hourly_rate_tooltip": "Gjennomsnittlig timekostnad for kommunalt ansatte inkludert alle kostnader",
        "monthly_license_per_user": "Månedlig lisens per bruker",
        "monthly_license_per_user_tooltip": "Månedlig lisenskostnad per bruker for den digitale løsningen. Veiledende pris – kan variere avhengig av avtale og kontraktstype",
        "investment_per_user": "Investering per bruker",
        "investment_per_user_tooltip": "Engangsinvestering per bruker (nettbrett, oppsett, opplæring). Veiledende pris – kan variere avhengig av avtale og kontraktstype",
        "monthly_license_per_camera": "Månedlig lisens per kamera",
        "monthly_license_per_camera_tooltip": "Månedlig lisenskostnad per kamera/enhet for den digitale løsningen. Veiledende pris – kan variere avhengig av avtale og kontraktstype",
        "investment_per_camera": "Investering per kamera",
        "investment_per_camera_tooltip": "Engangsinvestering per kamera/enhet (hardware, installasjon). Veiledende pris – kan variere avhengig av avtale og kontraktstype",
        
        // Actions
        "download_pdf": "Last ned som PDF",
        "generating_pdf": "Genererer PDF...",
        "share_calculation": "Del beregning",
        "link_copied": "Lenke kopiert!",
        
        // Formula toggle
        "show_formula": "Vis beregningsformel",
        
        // User selection overlay
        "how_many_users": "Hvor mange brukere mottar tjenesten?",
        "choose_user_count": "Velg antall brukere for å starte beregningen",
        "custom": "Egendefinert",
        "enter_amount": "Skriv inn antall...",
        "confirm": "Bekreft",
        
        // Index & Tilsyn pages
        "index_title": "Tellus Gevinstkalkulator",
        "index_subtitle": "Velg hvilken tjeneste du vil beregne gevinstpotensialet for",
        "tilsyn_title": "TelluVision - digitalt tilsyn",
        "tilsyn_desc": "Beregn besparelser ved å erstatte fysisk tilsyn med digitalt tilsyn",
        "hjemmebesok_title": "TelluVisit - digitale hjemmebesøk",
        "hjemmebesok_desc": "Beregn besparelser ved å erstatte fysiske hjemmebesøk med digitale besøk",
        
        "tilsyn_page_title": "TelluVision - digitalt tilsyn",
        "tilsyn_page_subtitle": "Velg hvilken bosituasjon du vil beregne gevinstpotensialet for",
        "sykehjem_title": "Sykehjem og omsorgsbolig",
        "sykehjem_desc": "Beboere som har heldøgns omsorg i institusjon eller bemannet omsorgsbolig",
        "hjemmeboende_title": "Hjemmeboende",
        "hjemmeboende_desc": "Brukere som bor i eget hjem og mottar tilsynstjenester fra kommunen",
        
        // Specific titles
        "calc_hjemmebesok_title": "Gevinstkalkulator for digitale hjemmebesøk",
        "calc_hjemmeboende_title": "Gevinstkalkulator for digitalt tilsyn for hjemmeboende",
        "calc_sykehjem_title": "Gevinstkalkulator for digitalt tilsyn ved sykehjem og omsorgsboliger",
        
        // PDF Strings
        "pdf_subtitle": "Lønnsomhetskalkulator - Resultat"
    },
    en: {
        // Shared
        "back_to_overview": "← Back to service overview",
        "back_to_service_selection": "← Back to service selection",
        "footer_text": "The calculator provides an estimate based on the provided values. Actual savings may vary.",
        "calculated_gain": "Calculated Gain",
        "yearly_net_gain": "Yearly Net Gain",
        "yearly_net_gain_tooltip_hjemmebesok": "Total estimated savings per year minus annual license cost",
        "yearly_net_gain_tooltip_tilsyn": "Gross savings minus annual cost for the solution (license, hardware, operations)",
        "currency_nok": "GBP",
        "months": "months",
        "hours": "hours",
        "visits": "visits",
        "fte": "FTE",
        "users": "users",
        "residents": "residents",
        "checks": "checks",
        "more_users": "more users",
        "more_residents": "more residents",
        "minutes": "min",
        "percent": "%",

        // Formula
        "formula_avoided_checks": "Avoided checks/day",
        "formula_hours_saved": "Hours saved/year",
        "formula_gross_saving": "Annual gross savings",
        "formula_net_gain": "Annual net gain",
        "formula_payback": "Payback time",
        "formula_fte": "Freed FTEs",
        "formula_total_visits_week": "Total visits per week",
        "formula_replaced_visits_week": "Replaced visits per week",
        "formula_saved_travel_year": "Saved travel time per year",
        "formula_total_time_saved_year": "Total time saved per year",

        "formula_avoided_checks_eq": "Users × Checks/day × Digitalization degree",
        "formula_avoided_checks_eq_sykehjem": "Residents × Checks/day × Digitalization degree",
        "formula_hours_saved_eq_hjemmeboende": "Avoided checks/day × (Physical time + Driving time − Digital time) / 60 × 365",
        "formula_hours_saved_eq_sykehjem": "Avoided checks/day × (Physical − Digital time) / 60 × 365",
        "formula_total_visits_week_eq": "Users × Visits per week",
        "formula_replaced_visits_week_eq": "Total visits × Digitalization degree",
        "formula_saved_travel_year_eq": "Replaced visits/week × Travel time / 60 × 52",
        "formula_total_time_saved_year_eq": "Replaced visits/week × (Time with user + Travel time − Digital time) / 60 × 52",
        "formula_gross_saving_eq": "Hours saved/year × Hourly rate",
        "formula_net_gain_eq": "Gross − (Users × License × 12)",
        "formula_payback_eq": "Investment / Monthly net gain",
        "formula_fte_eq": "Hours saved/year / 1,695 working hours",
        
        // Economy
        "economy": "Economy",
        "payback_time": "Payback Time",
        "payback_time_tooltip": "Time before the investment is recovered (investment / monthly net gain)",
        "five_year_gain": "5-Year Net Gain",
        "five_year_gain_tooltip": "Total net gain over 5 years minus initial investment",
        
        // Operational Benefit
        "operational_benefit": "Operational Benefit",
        "total_hours_saved": "Total hours saved per year",
        "total_hours_saved_tooltip": "Sum of saved travel time and saved visit time per year",
        "saved_travel_time": "Saved travel time per year",
        "saved_travel_time_tooltip": "Total travel time saved by replacing physical visits with digital ones",
        "replaced_physical_visits": "Replaced physical visits per year",
        "replaced_physical_visits_tooltip": "Number of physical visits replaced by digital visits per year",
        "freed_fte": "Freed FTEs",
        "freed_fte_tooltip": "Number of full-time equivalents freed (hours saved per year / 1,695 working hours)",
        
        // Capacity
        "capacity": "Capacity",
        "increased_capacity": "Increased Capacity",
        "increased_capacity_tooltip_users": "Number of extra users the same staff can handle with the freed time",
        "increased_capacity_tooltip_residents": "Number of extra residents the same staff can handle with the freed time",
        
        // Activity
        "activity": "Activity",
        "hours_saved_car": "Hours saved in car per year",
        "hours_saved_car_tooltip": "Number of driving hours saved per year by digitalizing checks",
        "hours_saved_year": "Hours saved per year",
        "hours_saved_year_tooltip": "Total number of hours saved per year by digitalizing",
        "avoided_physical_checks": "Avoided physical checks per year",
        "avoided_physical_checks_tooltip": "Total number of physical checks avoided per year (per day × 365)",
        
        // Inputs
        "your_assumptions": "Your Assumptions",
        "volume": "Volume",
        "number_of_users": "Number of users receiving the service",
        "number_of_users_tooltip_hjemmebesok": "Total number of users/patients receiving home services",
        "number_of_users_tooltip_hjemmeboende": "Total number of home-dwelling users receiving checks",
        "number_of_users_tooltip_sykehjem": "Total number of residents receiving checks",
        "visits_per_week": "Number of visits per user per week",
        "visits_per_week_tooltip": "Average number of home visits each user gets per week",
        "checks_per_day_hjemmeboende": "Number of checks per user per day",
        "checks_per_day_hjemmeboende_tooltip": "Average number of checks each user gets per day",
        "checks_per_day_sykehjem": "Number of checks per resident per day",
        "checks_per_day_sykehjem_tooltip": "Average number of checks each resident gets per day",
        
        "digitalization_degree": "Degree of Digitalization",
        "share_visits_digitalized": "Share of visits digitalized",
        "share_visits_digitalized_tooltip": "Share of visits that can be replaced with digital solutions",
        "share_checks_digitalized": "Share of checks digitalized",
        "share_checks_digitalized_tooltip": "Share of checks that can be replaced with digital solutions",
        
        "time_usage": "Time Usage",
        "time_per_visit": "Time with user per visit (minutes)",
        "time_per_visit_tooltip": "Average time spent at the user's home per physical visit",
        "time_per_physical_check": "Time per physical check (minutes)",
        "time_per_physical_check_tooltip": "Average time spent on each physical check",
        "time_per_physical_check_tooltip_hjemmeboende": "Average time spent on each physical check, including travel time",
        "travel_time_roundtrip": "Travel time roundtrip per visit (minutes)",
        "travel_time_roundtrip_tooltip": "Average travel time roundtrip to the user per physical visit",
        "driving_time_roundtrip": "Driving time per physical check (minutes)",
        "driving_time_roundtrip_tooltip": "Average driving time roundtrip for each physical check",
        "time_per_digital_visit": "Time per digital visit (minutes)",
        "time_per_digital_visit_tooltip": "Average time spent on each digital visit (video consultation, etc.)",
        "time_per_digital_check": "Time per digital check (minutes)",
        "time_per_digital_check_tooltip": "Average time spent on each digital check",
        
        // Advanced Inputs
        "show_economic_details": "Show Economic Details",
        "hide_economic_details": "Hide Economic Details",
        "municipal_hourly_rate": "Municipal hourly rate",
        "municipal_hourly_rate_tooltip": "Average hourly cost for municipal employees including all expenses",
        "monthly_license_per_user": "Monthly license per user",
        "monthly_license_per_user_tooltip": "Monthly license cost per user for the digital solution. Guideline price – may vary depending on agreement and contract type",
        "investment_per_user": "Investment per user",
        "investment_per_user_tooltip": "One-time investment per user (tablet, setup, training). Guideline price – may vary depending on agreement and contract type",
        "monthly_license_per_camera": "Monthly license per camera",
        "monthly_license_per_camera_tooltip": "Monthly license cost per camera/device for the digital solution. Guideline price – may vary depending on agreement and contract type",
        "investment_per_camera": "Investment per camera",
        "investment_per_camera_tooltip": "One-time investment per camera/device (hardware, installation). Guideline price – may vary depending on agreement and contract type",
        
        // Actions
        "download_pdf": "Download as PDF",
        "generating_pdf": "Generating PDF...",
        "share_calculation": "Share calculation",
        "link_copied": "Link copied!",
        
        // Formula toggle
        "show_formula": "Show calculation formula",
        
        // User selection overlay
        "how_many_users": "How many users receive the service?",
        "choose_user_count": "Select the number of users to start the calculation",
        "custom": "Custom",
        "enter_amount": "Enter amount...",
        "confirm": "Confirm",
        
        // Index & Tilsyn pages
        "index_title": "Tellus ROI Calculator",
        "index_subtitle": "Choose the service to calculate ROI potential",
        "tilsyn_title": "TelluVision - digital checks",
        "tilsyn_desc": "Calculate savings by replacing physical checks with digital checks",
        "hjemmebesok_title": "TelluVisit - digital home visits",
        "hjemmebesok_desc": "Calculate savings by replacing physical home visits with digital visits",
        
        "tilsyn_page_title": "TelluVision - digital checks",
        "tilsyn_page_subtitle": "Choose the living situation to calculate ROI potential",
        "sykehjem_title": "Nursing homes and assisted living",
        "sykehjem_desc": "Residents with 24-hour care in institutions or staffed assisted living",
        "hjemmeboende_title": "Home-dwelling",
        "hjemmeboende_desc": "Users living in their own home and receiving check services from the municipality",
        
        // Specific titles
        "calc_hjemmebesok_title": "ROI Calculator for digital home visits",
        "calc_hjemmeboende_title": "ROI Calculator for digital checks for home-dwelling users",
        "calc_sykehjem_title": "ROI Calculator for digital checks at nursing homes",
        
        // PDF Strings
        "pdf_subtitle": "ROI Calculator - Results"
    },
    sv: {
        // Shared
        "back_to_overview": "← Tillbaka till tjänsteöversikt",
        "back_to_service_selection": "← Tillbaka till tjänsteval",
        "footer_text": "Kalkylatorn ger en uppskattning baserad på angivna värden. Faktiska besparingar kan variera.",
        "calculated_gain": "Beräknad Vinst",
        "yearly_net_gain": "Årlig nettovinst",
        "yearly_net_gain_tooltip_hjemmebesok": "Total uppskattad besparing per år minus årlig licenskostnad",
        "yearly_net_gain_tooltip_tilsyn": "Bruttobesparing minus årlig kostnad för lösningen (licens, hårdvara, drift)",
        "currency_nok": "SEK",
        "months": "månader",
        "hours": "timmar",
        "visits": "besök",
        "fte": "Heltidstjänster",
        "users": "användare",
        "residents": "boende",
        "checks": "tillsyn",
        "more_users": "fler användare",
        "more_residents": "fler boende",
        "minutes": "min",
        "percent": "%",

        // Formula
        "formula_avoided_checks": "Undvikna tillsyn/dag",
        "formula_hours_saved": "Timmar sparade/år",
        "formula_gross_saving": "Årlig bruttobesparing",
        "formula_net_gain": "Årlig nettovinst",
        "formula_payback": "Återbetalningstid",
        "formula_fte": "Frigjorda heltidstjänster",
        "formula_total_visits_week": "Totalt antal besök per vecka",
        "formula_replaced_visits_week": "Ersatta besök per vecka",
        "formula_saved_travel_year": "Sparad restid per år",
        "formula_total_time_saved_year": "Total sparad tid per år",

        "formula_avoided_checks_eq": "Användare × Tillsyn/dag × Digitaliseringsgrad",
        "formula_avoided_checks_eq_sykehjem": "Boende × Tillsyn/dag × Digitaliseringsgrad",
        "formula_hours_saved_eq_hjemmeboende": "Undvikna tillsyn/dag × (Fysisk tid + Körtid − Digital tid) / 60 × 365",
        "formula_hours_saved_eq_sykehjem": "Undvikna tillsyn/dag × (Fysisk − Digital tid) / 60 × 365",
        "formula_total_visits_week_eq": "Användare × Besök per vecka",
        "formula_replaced_visits_week_eq": "Totalt antal besök × Digitaliseringsgrad",
        "formula_saved_travel_year_eq": "Ersatta besök/vecka × Restid / 60 × 52",
        "formula_total_time_saved_year_eq": "Ersatta besök/vecka × (Tid hos användare + Restid − Digital tid) / 60 × 52",
        "formula_gross_saving_eq": "Timmar sparade/år × Timkostnad",
        "formula_net_gain_eq": "Brutto − (Användare × Licens × 12)",
        "formula_payback_eq": "Investering / Månatlig nettovinst",
        "formula_fte_eq": "Timmar sparade/år / 1 695 arbetstimmar",
        
        // Economy
        "economy": "Ekonomi",
        "payback_time": "Återbetalningstid",
        "payback_time_tooltip": "Tid innan investeringen är intjänad (investering / månatlig nettovinst)",
        "five_year_gain": "5-års nettovinst",
        "five_year_gain_tooltip": "Total nettovinst över 5 år minus initial investering",
        
        // Operational Benefit
        "operational_benefit": "Operationell Nytta",
        "total_hours_saved": "Totalt sparade timmar per år",
        "total_hours_saved_tooltip": "Summan av sparad restid och sparad besökstid per år",
        "saved_travel_time": "Sparad restid per år",
        "saved_travel_time_tooltip": "Total restid sparad genom att ersätta fysiska besök med digitala",
        "replaced_physical_visits": "Ersatta fysiska besök per år",
        "replaced_physical_visits_tooltip": "Antal fysiska besök som ersätts av digitala besök per år",
        "freed_fte": "Frigjorda heltidstjänster",
        "freed_fte_tooltip": "Antal hela årsarbeten frigjorda (timmar sparade per år / 1 695 arbetstimmar)",
        
        // Capacity
        "capacity": "Kapacitet",
        "increased_capacity": "Ökad kapacitet",
        "increased_capacity_tooltip_users": "Antal extra användare samma personal kan hantera med den frigjorda tiden",
        "increased_capacity_tooltip_residents": "Antal extra boende samma personal kan hantera med den frigjorda tiden",
        
        // Activity
        "activity": "Aktivitet",
        "hours_saved_car": "Timmar sparade i bil per år",
        "hours_saved_car_tooltip": "Antal timmar sparade på körning per år vid digitalisering av tillsyn",
        "hours_saved_year": "Timmar sparade per år",
        "hours_saved_year_tooltip": "Totalt antal timmar sparade per år vid digitalisering",
        "avoided_physical_checks": "Undvikna fysiska tillsyn per år",
        "avoided_physical_checks_tooltip": "Totalt antal fysiska tillsyn undvikna per år (per dag × 365)",
        
        // Inputs
        "your_assumptions": "Dina Förutsättningar",
        "volume": "Volym",
        "number_of_users": "Antal användare som får tjänsten",
        "number_of_users_tooltip_hjemmebesok": "Totalt antal användare/patienter som får hemtjänst",
        "number_of_users_tooltip_hjemmeboende": "Totalt antal hemmaboende användare som får tillsyn",
        "number_of_users_tooltip_sykehjem": "Totalt antal boende som får tillsyn",
        "visits_per_week": "Antal besök per användare per vecka",
        "visits_per_week_tooltip": "Genomsnittligt antal hembesök varje användare får per vecka",
        "checks_per_day_hjemmeboende": "Antal tillsyn per användare per dygn",
        "checks_per_day_hjemmeboende_tooltip": "Genomsnittligt antal tillsyn varje användare får per dygn",
        "checks_per_day_sykehjem": "Antal tillsyn per boende per dag",
        "checks_per_day_sykehjem_tooltip": "Genomsnittligt antal tillsyn varje boende får per dag",
        
        "digitalization_degree": "Digitaliseringsgrad",
        "share_visits_digitalized": "Andel besök som digitaliseras",
        "share_visits_digitalized_tooltip": "Andel av besöken som kan ersättas med digitala lösningar",
        "share_checks_digitalized": "Andel tillsyn som digitaliseras",
        "share_checks_digitalized_tooltip": "Andel av tillsynen som kan ersättas med digitala lösningar",
        
        "time_usage": "Tidsåtgång",
        "time_per_visit": "Tid hos användare per besök (minuter)",
        "time_per_visit_tooltip": "Genomsnittlig tid spenderad hemma hos användaren per fysiskt besök",
        "time_per_physical_check": "Tidsåtgång per fysisk tillsyn (minuter)",
        "time_per_physical_check_tooltip": "Genomsnittlig tid lagd på varje fysisk tillsyn",
        "time_per_physical_check_tooltip_hjemmeboende": "Genomsnittlig tid lagd på varje fysisk tillsyn, inklusive restid",
        "travel_time_roundtrip": "Restid tur/retur per besök (minuter)",
        "travel_time_roundtrip_tooltip": "Genomsnittlig restid tur/retur till användare per fysiskt besök",
        "driving_time_roundtrip": "Körtid per fysisk tillsyn (minuter)",
        "driving_time_roundtrip_tooltip": "Genomsnittlig körtid tur/retur för varje fysisk tillsyn",
        "time_per_digital_visit": "Tidsåtgång per digitalt besök (minuter)",
        "time_per_digital_visit_tooltip": "Genomsnittlig tid lagd på varje digitalt besök (videokonsultation etc.)",
        "time_per_digital_check": "Tidsåtgång per digital tillsyn (minuter)",
        "time_per_digital_check_tooltip": "Genomsnittlig tid lagd på varje digital tillsyn",
        
        // Advanced Inputs
        "show_economic_details": "Visa ekonomiska detaljer",
        "hide_economic_details": "Dölj ekonomiska detaljer",
        "municipal_hourly_rate": "Kommunal timkostnad",
        "municipal_hourly_rate_tooltip": "Genomsnittlig timkostnad för kommunanställda inklusive alla kostnader",
        "monthly_license_per_user": "Månatlig licens per användare",
        "monthly_license_per_user_tooltip": "Månatlig licenskostnad per användare för den digitala lösningen. Riktpris – kan variera beroende på avtal og kontraktstyp",
        "investment_per_user": "Investering per användare",
        "investment_per_user_tooltip": "Engångsinvestering per användare (surfplatta, installation, utbildning). Riktpris – kan variera beroende på avtal og kontraktstyp",
        "monthly_license_per_camera": "Månatlig licens per kamera",
        "monthly_license_per_camera_tooltip": "Månatlig licenskostnad per kamera/enhet för den digitala lösningen. Riktpris – kan variera beroende på avtal og kontraktstyp",
        "investment_per_camera": "Investering per kamera",
        "investment_per_camera_tooltip": "Engångsinvestering per kamera/enhet (hårdvara, installation). Riktpris – kan variera beroende på avtal og kontraktstyp",
        
        // Actions
        "download_pdf": "Ladda ner som PDF",
        "generating_pdf": "Skapar PDF...",
        "share_calculation": "Dela beräkning",
        "link_copied": "Länk kopierad!",
        
        // Formula toggle
        "show_formula": "Visa beräkningsformel",
        
        // User selection overlay
        "how_many_users": "Hur många användare får tjänsten?",
        "choose_user_count": "Välj antal användare för att starte beräkningen",
        "custom": "Anpassad",
        "enter_amount": "Ange antal...",
        "confirm": "Bekräfta",
        
        // Index & Tilsyn pages
        "index_title": "Tellus Vinstkalkylator",
        "index_subtitle": "Välj tjänst för att beräkna vinstpotential",
        "tilsyn_title": "TelluVision - digital tillsyn",
        "tilsyn_desc": "Beräkna besparingar genom att ersätta fysisk tillsyn med digital tillsyn",
        "hjemmebesok_title": "TelluVisit - digitala hembesök",
        "hjemmebesok_desc": "Beräkna besparingar genom att ersätta fysiska hembesök med digitala besök",
        
        "tilsyn_page_title": "TelluVision - digital tillsyn",
        "tilsyn_page_subtitle": "Välj boendesituation för att beräkna vinstpotential",
        "sykehjem_title": "Särskilt boende och vårdhem",
        "sykehjem_desc": "Boende med heldygnsomsorg på institution eller bemannat äldreboende",
        "hjemmeboende_title": "Hemmaboende",
        "hjemmeboende_desc": "Användare som bor i eget hem och får tillsynstjänster från kommunen",
        
        // Specific titles
        "calc_hjemmebesok_title": "Vinstkalkylator för digitala hembesök",
        "calc_hjemmeboende_title": "Vinstkalkylator för digital tillsyn av hemmaboende",
        "calc_sykehjem_title": "Vinstkalkylator för digital tillsyn på särskilt boende",
        
        // PDF Strings
        "pdf_subtitle": "Vinstkalkylator - Resultat"
    }
};

function getTranslation(lang, key) {
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    // Fallback to Norwegian
    if (translations['no'] && translations['no'][key]) {
        return translations['no'][key];
    }
    return key;
}
