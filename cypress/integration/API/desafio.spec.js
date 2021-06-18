/// <reference types="Cypress" />

//Cypress._.times(12, () => {
describe('Desafio QA PicPay - Endpoints de Usuários', () => {

    const token = 'Bearer 2275e2cbbf8dc1d113b25fb018cdb2e07e088b35bb5f7b7c13ca160ed96a82ba';
    const faker = require('faker-br');
    let opGender = ["Male", "Female"];
    let gender = opGender[Math.floor(Math.random() * opGender.length)];
    let opStatus = ["Active", "Inactive"];
    let status = opStatus[Math.floor(Math.random() * opStatus.length)];
    let id;
    let pages = "";


    before(() => {

        Cypress._.times(2, () => {

            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            let email = faker.internet.email();
            

            cy.create_users_api(Cypress.env('url_api'), token, firstName + " " + lastName, email, gender, status).then((resp) => {

                expect(resp).property('status').to.equal(200);
                expect(resp).property('statusText').to.equal('OK');
                expect(resp.body).to.have.property('code');
                expect(resp.body.code).to.equal(201);
                expect(resp.body).to.have.property('data');
                expect(resp.body.data.name).to.equal(firstName + " " + lastName);
                expect(resp.body.data).to.have.property('created_at');
                return new Promise(resolve => {
                    id = resp.body.data['id'];
                    resolve(id);
                    //console.log("O id do novo registro é " + id)

                })


            })
        })

    });
    context('Pega número da última página da listagem de registros', () => {



        beforeEach(() => {



            cy.list_all_users_api(Cypress.env('url_api'), token, pages).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body.data).to.be.a('array');

                return new Promise(resolve => {
                    pages = resp.body.meta.pagination['pages'];
                    resolve(pages);
                    //console.log("pages: " + pages)

                })


            })


        })
        afterEach(() => {
            cy.screenshot({ capture: 'fullPage' });
        })



        it('Criação de novo usuário e validação de sua presença na listagem total', () => {
            cy.list_all_users_api(Cypress.env('url_api'), token, pages).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body.data).to.be.a('array');
                let bodyData = resp.body.data;
                let reverseBodyData = bodyData.reverse();
                expect(resp.body.data[0]).property('id').to.equal(id);
               


            });
        })


    });

    context('Alterar o nome do novo usuário', () => {
        let firstName2 = faker.name.firstName();
        let lastName2 = faker.name.lastName();

        beforeEach(() => {



            cy.edit_user_data_api(Cypress.env('url_api'), id, token, firstName2 + " " + lastName2).then((resp) => {
                expect(resp).property('status').to.equal(200);



            });


        })
        afterEach(() => {
            cy.screenshot({ capture: 'fullPage' });
        })


        it('Alteração de nome de usuário e validação da listagem deste registro', () => {
            cy.list_one_user_api(Cypress.env('url_api'), token, id).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body.data).property('id').to.equal(id);
                expect(resp.body.data.name).to.equal(firstName2 + " " + lastName2);



            });
        })

    })

    context('Excluir novo usuário e pega número da última página da listagem de registros', () => {

        beforeEach(() => {



            cy.del_user_api(Cypress.env('url_api'), id, token).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body).property('code').to.equal(204);


            });

            cy.list_all_users_api(Cypress.env('url_api'), token).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body.data).to.be.a('array');

                return new Promise(resolve => {
                    pages = resp.body.meta.pagination['pages'];
                    resolve(pages);
                    //console.log("pages: " + pages);

                })


            });


        })
        afterEach(() => {
            cy.screenshot({ capture: 'fullPage' });
        })

        it('Exclusão de usuário e validação da listagem total sem este registro', () => {
            cy.list_all_users_api(Cypress.env('url_api'), token, pages).then((resp) => {
                expect(resp).property('status').to.equal(200);
                expect(resp.body.data).to.be.a('array');
                let bodyData = resp.body.data;
                let reverseBodyData = bodyData.reverse();
                expect(resp.body.data[0]).property('id').to.equal(id - 1);

            });
        })
    });
})
//})
