Cypress._.times(5, function(){
    it("testa a página a política de privacidade de forma independente", function(){
        cy.visit("./src/privacy.html")
        cy.contains("Talking About Testing").should("be.visible")
    })
})