/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })

    it("preenche os campos obrigatórios e envia o formulário e envia o formulário", function(){
        const longTest = "Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste "
        cy.get('#firstName').type("Messias")
        cy.get('#lastName').type("Oliveira")
        cy.get('#email').type("teste@teste.com.br")
        cy.get('#open-text-area').type(longTest, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("exibe message de erro ao submeter o formulário com email errado", function(){
        const longTest = "Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste "
        cy.get('#firstName').type("Messias")
        cy.get('#lastName').type("Oliveira")
        cy.get('#email').type("teste@teste")
        cy.get('#open-text-area').type(longTest, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
    })

    it("Campo telefone continua vazio quando não for numero", function(){
        cy.get('#phone')
        .type("abcdefghi").should("have.value", "")
    })

    it("exibe message de erro ao submeter ", function(){
        cy.get('#firstName').type("Messias")
        cy.get('#lastName').type("Oliveira")
        cy.get('#email').type("teste@teste.com.br")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("teste", { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get(".error").should("be.visible")
    })

    it("Limpa os campos do formulário", function(){
        cy.get('#firstName').type("Messias").should("have.value", "Messias").clear().should("have.value", "")
        cy.get('#lastName').type("Oliveira").should("have.value", "Oliveira").clear().should("have.value", "")
        cy.get('#email').type("teste@teste.com.br").should("have.value", "teste@teste.com.br").clear().should("have.value", "")
        cy.get('#open-text-area').type("teste").should("have.value", "teste").clear().should("have.value", "")
        cy.get('button[type="submit"]').click()
        cy.get(".error").should("be.visible")
    })

    it("exibe mensagem de erro ao submeter formulário sem os campos obrigatórios", function(){
        cy.get('button[type="submit"]').click()
        cy.get(".error").should("be.visible")
    })

    it("exibe mensagem de erro ao submeter formulário sem os campos obrigatórios", function(){
        cy.get('button[type="submit"]').click()
        cy.get(".error").should("be.visible")
    })

    it("comando customizado", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Selecionando um produto por seu valor", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#product').select("Mentoria").should("have.value", "mentoria")

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Selecionando um produto por seu index", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#product').select(3).should("have.value", "mentoria")

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Selecionando check radio", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=radio][value=feedback]').check().should("have.value", "feedback")

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Selecionando check box", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=checkbox][value=email]').check().should("have.value", "email")

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Selecionando todos os check box", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=checkbox]').check().should("have.value", "email")

        cy.get('button[type="submit"]').click()
        cy.get(".error").should("be.visible")
    })

    it("Desselenionando check box", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=checkbox]').check().last().uncheck().should("not.be.checked")

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("SelectFiles adicionar anexo", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#file-upload')
            .should("not.be.value")
            .selectFile("cypress/fixtures/example.json")
            .should(function(inputs){
                expect(inputs[0].files[0].name).equal("example.json")
            })

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("SelectFiles adicionar anexo como drag-drop", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#file-upload')
            .should("not.be.value")
            .selectFile("cypress/fixtures/example.json", { action: 'drag-drop'})
            .should(function(inputs){
                expect(inputs[0].files[0].name).equal("example.json")
            })

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("SelectFiles adicionar anexo como fixture ", function(){
        cy.fixture("example.json").as("sampleFile")

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#file-upload')
            .should("not.be.value")
            .selectFile("@sampleFile")
            .should(function(inputs){
                expect(inputs[0].files[0].name).equal("example.json")
            })

        cy.get('button[type="submit"]').click()
        cy.get(".success").should("be.visible")
    })

    it("Abrir politica de privacidade na mesma aba", function(){
        cy.get('#privacy a')
        .should("have.attr", "target", "_blank")
        .invoke("removeAttr", 'target')
        .click()

        cy.contains("Talking About Testing").should("be.visible")
    })
})
  