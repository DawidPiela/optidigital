import { waitForCmp, checkConsent } from './cmpInit.js';

function setConsent(consent) {
    localStorage.setItem('userConsent', consent);
    document.getElementById('cmp-banner').style.display = 'none';
    if (consent) {
        import('./adDisplay.js').then(({ initAdDisplay }) => {
            initAdDisplay();
            import('./prebidConfig.js').then(({ configurePrebid }) => {
                const adUnits = [{
                    code: 'ad-slot-1',
                    mediaTypes: {
                        banner: {
                            sizes: [[300, 250]]
                        }
                    },
                    bids: [
                        {
                            bidder: 'appnexus',
                            params: {
                                placementId: '10433394'
                            }
                        }
                    ]
                }];
                configurePrebid(adUnits);
                import('./amazonTAM.js').then(({ initAmazonTAM }) => {
                    initAmazonTAM();
                });
            });
        });
    }
}

function checkConsentStatus() {
    const userConsent = localStorage.getItem('userConsent');
    if (userConsent === null) {
        document.getElementById('cmp-banner').style.display = 'block';
    } else if (userConsent === 'true') {
        setConsent(true);
    } else {
        setConsent(false);
    }
}

document.getElementById('cmp-accept').addEventListener('click', () => setConsent(true));
document.getElementById('cmp-decline').addEventListener('click', () => setConsent(false));

waitForCmp(() => {
    checkConsent(tcData => {
        if (tcData && tcData.purpose.consents[1]) { // Purpose 1 is storage and access of information
            setConsent(true);
        } else {
            setConsent(false);
        }
    });
});

checkConsentStatus();
