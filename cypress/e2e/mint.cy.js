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
        cy.wait(1000)
        cy.get(`.path-mint`).click();
        cy.url().should('include', '/#mint')
    })
    it('Navigates to new-asset-class', () => {
        cy.get(`.new-asset-class`).click();
        cy.wait(1000)
        cy.url().should('include', '/#new-asset-class')
    });
    it('Navigates to asset-class-list', () => {
        cy.get(`.asset-class-list`).click();
        cy.wait(1000)
        cy.url().should('include', '/#asset-classes')
    });
    it('Navigates to audit-history', () => {
        cy.get(`.audit-history`).click();
        cy.wait(1000)
        cy.url().should('include', '/#audit-history')
    });
})