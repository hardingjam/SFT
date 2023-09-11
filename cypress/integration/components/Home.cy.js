import Home from '../../../src/routes/Home.svelte'
import tokensData from '../../fixtures/tokens.json'
describe('Stepper', () => {
    it('mounts', () => {
        // see: https://on.cypress.io/mounting-svelte
        cy.mount(Home)
    })
    it('renders $tokens', () => {
        // Load the component with the data
        cy.mount(Home, { props: { allTokens: tokensData.tokens } })
        cy.get('.content').should('exist');

        cy.get('.content').then(($el) => {
            console.log($el);
        });
    });
})