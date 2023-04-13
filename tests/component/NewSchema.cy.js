import NewSchema from '../../src/routes/NewSchema.svelte'

describe('New asset class', () => {
    it('mounts NewSchema component', () => {
        cy.mount(NewSchema)
    })
})