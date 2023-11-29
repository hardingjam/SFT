describe('transparency page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/#')
    })
    it('should show landing page and navigate to transparency', () => {
        cy.get(`.landing-container`).should('exist');
        cy.get(`.transparency-button`).click();
        cy.url().should('include', '/#transparency')
    });

})