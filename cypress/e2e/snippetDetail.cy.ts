import {AUTH0_PASSWORD, AUTH0_USERNAME, BACKEND_URL} from "../../src/utils/constants";

describe('Add snippet tests', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )

    cy.intercept('GET', BACKEND_URL+"/snippets/*", {
      statusCode: 200,
      body: snippet,
    }).as("getSnippetById")

    cy.intercept('GET', BACKEND_URL + "/snippets/user*", {
      statusCode: 200,
      body: {
        page: 1,
        page_size: 1,
        count: 1,
        snippets: [ snippet ]
      },
    }).as("getSnippets");

    cy.intercept('GET', BACKEND_URL + "/user/", {
        statusCode: 200,
        body: {
            page: 1,
            page_size: 1,
            count: 1,
            users: [ { id: "1", email: "nachochevallier@gmail.com" } ]
        },
    })

    cy.visit("/")
    cy.wait(5000)

    cy.wait("@getSnippets")
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click();
  })

  it('Can share a snippet ', () => {
    cy.get('[aria-label="Share"]').click();
    cy.get('button[aria-label="Open"]').click();
    cy.get('[role="listbox"] li:nth-child(1)').click();
    cy.get('.css-1yuhvjn > .MuiBox-root > .MuiButton-contained').click();
    cy.wait(2000)
  })

  it('Can run snippets', function() {
    cy.get('button[aria-label="Test"]').click();
    cy.get('.css-1hpabnv > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').should("have.length.greaterThan",0);
  });

  it('Can format snippets', function() {
    cy.get('[data-testid="ReadMoreIcon"] > path').click();
  });

  it('Can save snippets', function() {
    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').click();
    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').type("Some new line");
    cy.get('[data-testid="SaveIcon"] > path').click();
  });

  it('Can delete snippets', function() {
    cy.get('[data-testid="DeleteIcon"] > path').click();
  });
})

const snippet = {
  id: "1",
  name: "Test name",
  content: "print(1);",
  language: "printscript",
  extension: 'ps',
  compliance: 'pending',
  author: 'nachochevamusica@gmail.com',
  owner: 'nachochevamusica@gmail.com',
}