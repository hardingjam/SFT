describe('connect wallet spec', () => {
    before(() => {
        cy.visit('/');
    });

    it('should connect wallet with success', () => {
        cy.get('#connectButton').click();
        cy.acceptMetamaskAccess();
        cy.get('#accounts').should(
            'have.text',
            '0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324',
        );
    });


});