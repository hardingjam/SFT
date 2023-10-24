describe('Members page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/')
        cy.get(`#token-name-Jefo`).click();
        cy.url().should('include', '/#token-overview')
    })
    it('should be navigated to members', () => {
        cy.get(`.path-members`).click();
        cy.url().should('include', '/#members')
    });
    // it('Asset class cell should not be empty', () => {
    //     cy.get('.asset-class-cell').each(($td) => {
    //         cy.wait(1000)
    //         cy.wrap($td).should('not.be.empty');
    //     })
    // });
    // it('Goes to asset information and sets correct asset class', () => {
    //     cy.wait(2000)
    //
    //     cy.get('.receipt-6').click()
    //     cy.url().should('include', '#asset-information/6')
    //     cy.get('.1232222').should('have.text', '1232222')
    // });
})