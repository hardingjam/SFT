import Home from '../../../src/routes/Home.svelte'
import tokensData from '../../fixtures/tokens.json'

describe('Stepper', () => {
    it('mounts', () => {
        // see: https://on.cypress.io/mounting-svelte
        cy.mount(Home)
    })
    it('renders $tokens', () => {
        // Load the component with the data
        cy.mount(Home, {props: {allTokens: tokensData.tokens}})
        cy.get('.content').should('exist');

    });
    it('Should change view to list', () => {
        cy.mount(Home, {props: {allTokens: tokensData.tokens}})
        cy.get('.list-view-button').click();
        cy.get('.list-view').should('exist');

        cy.get('.tile-view-button').click();
        cy.get('.tile-view').should('exist');
    });

})