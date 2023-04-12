describe('connect wallet spec', () => {

    before(() => {
        cy.visit('/');
    });

    it('should connect wallet with success', () => {
        cy.get('#connectButton').wait(300000).click();
        cy.acceptMetamaskAccess();
        cy.get('#accounts').should(
            'have.text',
            '0x8058ad7c22fdc8788fe4cb1dac15d6e976127324',
        );
    });


});