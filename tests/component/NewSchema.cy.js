import NewSchema from '../../src/routes/NewSchema.svelte'

describe('New asset class', () => {
    it('mounts NewSchema component', () => {
        cy.mount(NewSchema)
    })
    it('should not have XSS vulnerabilities in JSON data', async () => {
        cy.request('https://ipfs.io/ipfs/QmXw93e5TaiYfnqvtGSc7BTJiVTfa9QZHbk49uviQnvhTV')
            .its('body')
            .then((response) => {
                // Check if response contains XSS vulnerabilities
                const xssRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
                const responseString = JSON.stringify(response);
                expect(responseString).not.to.match(xssRegex);
            });
        })
})