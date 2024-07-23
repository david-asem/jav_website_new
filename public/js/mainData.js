document.addEventListener('alpine:init', () => {
    Alpine.data('mainData', () => ({
        playerOpened: false,
        comingSoonOpened: false,
        waitListOpened: false,
        supportOpened: false,
        selectedLang: 'EN',
        dropdownOpened: false,
        langs: {
            'EN': { lang_code: 'EN', image: 'usflag.png' },
            'FR': { lang_code: 'FR', image: 'frflag.png' }
        },
        language: {
            'EN': {
                'Client Log-In': 'Client Log-In',
                'Who We Are': 'Who We Are',
                'Solutions': 'Solutions',
                'Our Tech': 'Our Tech',
                'JAV Finance': 'JAV Finance',
                'Agri-Tech': 'Agri-Tech',
                'About us': 'About us',
                'Support': 'Support',
                'focusMessage': 'At JAVOLIN we focus on combining the digital and physical worlds. We impact industries with our tech by accelerating efficiencies in payments, inventory management, logistics tracking and owned commodities.',
                'ourTechHeading': 'OUR TECHNOLOGY',
                'KYCheading': 'Digital KYC',
            },
            'FR': {
                'Client Log-In': 'Connecter',
                'Who We Are': 'Qui Nous Sommes',
                'Solutions': 'Solutions',
                'Our Tech': 'Notre Technologie',
                'JAV Finance': 'JAV Finance',
                'Agri-Tech': 'Agri-Tech',
                'About us': 'À propos de nous',
                'Support': 'Soutien',
                'focusMessage': 'Chez JAVOLIN, nous nous attachons à combiner les mondes numérique et physique. Nous influençons les industries grâce à notre technologie en accélérant l\'efficacité des paiements, de la gestion des stocks, du suivi logistique et des marchandises détenues.',
                'ourTechHeading': 'NOTRE TECHNOLOGIE',
                'KYCheading': 'KYC numérique',
            }
        },
        updateTranslations() {
            const lang = this.selectedLang;
            const translations = this.language[lang];
            for (const key in translations) {
                if (translations.hasOwnProperty(key)) {
                    const elements = document.querySelectorAll(`[data-translate='${key}']`);
                    elements.forEach(element => {
                        element.textContent = translations[key];
                    });
                }
            }
        },
        changeLanguage(lang) {
            this.selectedLang = lang;
            this.updateTranslations();
        },
        toggleDropdown() {
            this.dropdownOpened = !this.dropdownOpened;
        }
    }));
});
