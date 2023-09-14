describe('The Home Page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    beforeEach(() => {
        cy.visit('/')
    })
    it('renders $tokens', () => {
        // Load the component with the data
        cy.get('.content').should('exist');
    });
    it('Should change view to list', () => {
        cy.get('.list-view-button').click();
        cy.get('.list-view').should('exist');

        cy.get('.tile-view-button').click();
        cy.get('.tile-view').should('exist');
    });
    it('Should not show token name if token not set', () => {
        cy.get('.sft-name-navigation-header').should('not.exist');
    });
    it('Navigates to manual', () => {
        cy.get(`.path-manual`).click();
        cy.url().should('include', '/#manual')
    });
    it('Should set token and navigate to token overview', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.url().should('include', '/#token-overview')
        cy.get('#token-overview').should('exist');
        cy.get('.navigation-token-icon').should('exist');
    });
    it('Navigates to mint', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-mint`).click();
        cy.url().should('include', '/#mint')
    });
    it('Navigates to asset-classes', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-asset-classes`).click();
        cy.url().should('include', '/#asset-classes')
    });
    it('Navigates to members', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-members`).click();
        cy.url().should('include', '/#members')
    });
    it('Navigates to roles', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-roles`).click();
        cy.url().should('include', '/#roles')
    });
    it('Navigates to audit-history', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-audit-history`).click();
        cy.url().should('include', '/#audit-history')
    });
    it('Navigates to asset-register', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-asset-register`).click();
        cy.url().should('include', '/#asset-register')
    });
    it('Navigates to ipfs', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-ipfs`).click();
        cy.url().should('include', '/#ipfs')
    });
    it('Navigates to setup', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-setup`).click();
        cy.url().should('include', '/#setup')
    });
    it('Navigates to home', () => {
        cy.get(`#token-name-Jefo`).click();
        cy.get(`.path-`).click();
        cy.url().should('include', '/#')
    });
})