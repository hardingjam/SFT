describe('The Home Page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/')
        cy.get(`#launch-button`).click();
        cy.get(`#token-name-Jefo`).click();
    })
    it('IPFS sign in should be visible if not logged in or navigate to mint', () => {
        cy.get(`.path-mint`).click();
        cy.window().its('localStorage').then((localStorage) => {
            // Now you can access localStorage variables
            let ipfsUsername = localStorage.getItem('ipfsUsername');
            let ipfsPassword = localStorage.getItem('ipfsPassword');
            console.log(111, ipfsUsername, ipfsPassword)

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
})