describe('Landing page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/#')
    })
    it('should show landing page', () => {
        cy.get(`.landing-container`).should('exist');
    });
    it('should navigate to sft list page', () => {
        cy.get(`#launch-button`).click();
        cy.url().should('include', '/#list')
    })
    it('should navigate to sft list page with other launch button', () => {
        cy.get(`#launch-button-1`).click();
        cy.url().should('include', '/#list')
    })
    it('should navigate to sft list page with third launch button', () => {
        cy.get(`#launch-button-2`).click();
        cy.url().should('include', '/#list')
    })
})