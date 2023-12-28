import TransactionInProgressBanner from '../../../src/components/TransactionInProgressBanner.svelte'


describe('Roles', () => {

    beforeEach(() => {
        cy.mount(TransactionInProgressBanner);
    });

    it(`Shows info text`, () => {
        cy.get('.contract-address').should('contain', 'View contract address');
        cy.get('.copy-icon').should('exist');
    });

});