describe('The Home Page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/#')
        cy.get(`#launch-button`).click();
        cy.get(`#token-name-Jefo`).click();
    })
    it('IPFS sign in should be visible if not logged in or navigate to mint', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            // Now you can access localStorage variables
            let ipfsUsername = localStorage.getItem('ipfsUsername');
            let ipfsPassword = localStorage.getItem('ipfsPassword');
            if (!ipfsPassword || !ipfsUsername) {
                cy.url().should('include', '/#ipfs')
                cy.get('.ipfs-username').type('gildlab1')
                cy.get('.ipfs-password').type('twet.gral.yew.phai')
                localStorage.setItem('ipfsUsername', 'gildlab1');
                localStorage.setItem('ipfsPassword', 'twet.gral.yew.phai');
            } else {
                cy.url().should('include', '/#mint')
            }
        });

    });
    it('Should visit mint after setting ipfs credentials', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            localStorage.setItem('ipfsUsername', 'gildlab1');
            localStorage.setItem('ipfsPassword', 'twet.gral.yew.phai');
        });

        cy.get('.path-mint').click()
        cy.url().should('include', '/#mint')
    });
    it('Mint button should be disabled if no mint amount and asset class', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            localStorage.setItem('ipfsUsername', 'gildlab1');
            localStorage.setItem('ipfsPassword', 'twet.gral.yew.phai');
        });

        cy.get('.path-mint').click()
        cy.get('.mint-btn').should('be.disabled')
    });
    it('Mint button should be disabled if no asset class', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            localStorage.setItem('ipfsUsername', 'gildlab1');
            localStorage.setItem('ipfsPassword', 'twet.gral.yew.phai');
        });

        cy.get('.path-mint').click()
        cy.get(`#mint-amount`).type('0.01');
        cy.get('.mint-btn').should('be.disabled')
    });
    it('Should Mint', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            localStorage.setItem('ipfsUsername', 'gildlab1');
            localStorage.setItem('ipfsPassword', 'twet.gral.yew.phai');
        });

        cy.get('.path-mint').click()
        cy.url().should('include', '/#mint')
        cy.get('.select-label').click()
        cy.get('#QmP8zfxTaEYH129qjbqFawB1CsGDnJgyhycH5WhoJ9U7B3').click()
        cy.get('#name').type('test Name')
        cy.get('#wallet').type('test Wallet')
        cy.get('#title').type('test Title')
        cy.get('.mint-btn').should('be.disabled')

    });
})