describe('Página principal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/assets/price?symbol=BTC', {
      statusCode: 200,
      body: { price: 61234.56 }, // podés ajustar el valor simulado
    }).as('getBTC');
  });

  it('debería mostrar el título Invest Alerts en el header', () => {
    cy.visit('/');
    cy.contains('Invest Alerts');
    cy.get('h1.text-2xl.font-semibold').should('be.visible');
  });
});
