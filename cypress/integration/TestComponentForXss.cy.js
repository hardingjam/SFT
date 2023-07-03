import naughtyStrings from '../../src/scripts/blns.json'
import TestComponentForXss from '../../src/test/TestComponentForXss.svelte'


describe('Test naughty strings', () => {

    beforeEach(() => {
        cy.mount(TestComponentForXss, {props: {items: naughtyStrings}});
    });

    naughtyStrings.forEach((naughtyString) => {
        it(`renders properly with string: ${naughtyString}`, () => {
            // Assert that the component renders the naughty string
            if (naughtyString) {
                cy.contains(naughtyString.trim()).should('be.visible');
            } else {
                cy.get('li').should('contain', '');
            }
        });

    });
});