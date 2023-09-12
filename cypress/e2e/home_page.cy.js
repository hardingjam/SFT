describe('The Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('successfully loads', () => {
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
})