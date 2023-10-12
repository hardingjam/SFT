describe('Asset register page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/')
        cy.get(`#token-name-Jefo`).click();
        cy.wait(1000)
        cy.get(`.path-asset-register`).click();
    })
    it('should be navigated to asset-register', () => {
        cy.url().should('include', '/#asset-register')
    });
    it('Asset class cell should not be empty', () => {
        cy.get('tr.tb-row .asset-class-cell').each(($td) => {
            cy.wait(1000)
            cy.wrap($td).should('not.be.empty');
        })
    });
})