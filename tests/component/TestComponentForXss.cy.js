import TestComponentForXss from '../../src/routes/TestComponentForXss.svelte'
import naughtyStrings from 'big-list-of-naughty-strings'

describe('Test naughty strings', () => {
    it('Mounts TestComponentForXss component', () => {
        let data = naughtyStrings;

        data.map(d => {
            cy.mount(TestComponentForXss, {props: {data: d}});

        })

    })
})