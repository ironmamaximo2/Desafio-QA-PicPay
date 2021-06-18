
Cypress.Commands.add('create_users_api', (url_api, token, name, email, gender, status) => {
    cy.request({
        method: 'POST',
        url: url_api + 'users',
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {
            "name": name,
            "email": email,
            "gender": gender,
            "status": status
        },
        resp: []
    })
})




Cypress.Commands.add('list_all_users_api', (url_api, token, pages) => {
    cy.request({
        method: 'GET',
        url: url_api + 'users?page=' + pages,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {
        },
        resp: []
    })
})




Cypress.Commands.add('edit_user_data_api', (url_api, id, token, name/*, email, gender, status, created_at, updated_at*/) => {
    cy.request({
        method: 'PUT',
        url: url_api + 'users/' + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {
            "name": name,
            /*"email": email,
            "gender": gender,
            "status": status,
            "created_at": created_at,
            "updated_at":  */
        },
        resp: []
    })
})

Cypress.Commands.add('del_user_api', (url_api, id, token) => {
    cy.request({
        method: 'DELETE',
        url: url_api + 'users/' + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {

        },

        resp: []
    })
})

Cypress.Commands.add('list_one_user_api', (url_api, token, id) => {
    cy.request({
        method: 'GET',
        url: url_api + 'users/' + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {

        },
        resp: []
    })
})


