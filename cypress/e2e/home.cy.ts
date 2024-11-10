import {AUTH0_PASSWORD, AUTH0_USERNAME, BACKEND_URL, FRONTEND_URL} from "../../src/utils/constants";

describe('Home', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )
  })
  before(() => {
    process.env.FRONTEND_URL = Cypress.env("FRONTEND_URL");
    process.env.BACKEND_URL = Cypress.env("BACKEND_URL");
  })
  it('Renders home', () => {
    cy.visit(FRONTEND_URL)
    cy.wait(10000)
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiTypography-h6').should('have.text', 'Printscript');
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').should('be.visible');
    cy.get('.css-9jay18 > .MuiButton-root').should('be.visible');
    cy.get('.css-jie5ja').click();
    /* ==== End Cypress Studio ==== */
  })

  // You need to have at least 1 snippet in your DB for this test to pass
  it('Renders the first snippets', () => {
    cy.visit(FRONTEND_URL)

    cy.wait(4000)

    const first10Snippets = cy.get('[data-testid="snippet-row"]')

    first10Snippets.should('have.length.greaterThan', 0)

    first10Snippets.should('have.length.lessThan', 11)
  })

  it('Can creat snippet find snippets by name', () => {
    cy.visit(FRONTEND_URL)

    const snippetData = {
      name: "Test name",
      content: "print(1)",
      languageId: "4",
      owner: "nachochevamusica@gmail.com"
    }

    cy.intercept('GET', BACKEND_URL + "/snippets/user*", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');

    cy.wait(4000)

    cy.request({
      method: 'POST',
      url: BACKEND_URL + '/snippets/', // Adjust if you have a different base URL configured in Cypress
      body: snippetData,
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVyTjdBZndSS0JqZ0sxdWw1ci0xXyJ9.eyJpc3MiOiJodHRwczovL3N0dWRlbnRzLWluZ3Npcy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDAyMzE3Mjc1NzczMzU1NzQ4NzQiLCJhdWQiOlsiaHR0cHM6Ly9zdHVkZW50cy5pbmdzaXMuY29tL2FwaSIsImh0dHBzOi8vc3R1ZGVudHMtaW5nc2lzLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzExODc3MDksImV4cCI6MTczMTI3NDEwOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IkgzSTg2S3RpSFdPN1U4bmc5SmlmZHNrRkZSQ08wVVdJIiwicGVybWlzc2lvbnMiOltdfQ.buDHV21DSbuOKsE9Bdf6Ht6yZ4g0jkv71DiLauCx760HpIrL1A2H0SXZG5oPuJRNqtaZb25rJiNpW6oMXG-HfAEtB5EaKPsfF-x6m61J60lBZyfqBOACnJcL-TI31-2esI3aFGwMzG4Fmekr27V-GTLdQ46JM1i8jx4zVf2sObI2UxgO_-hThJQdVoaynxna3IUwKEiNhjrGfAI4Gasz_PW7jwCWXyfXakB35Ih-7_gJB3yi0brxDUToYc_UIDyiowWUdbZ4w_zCbEThRnxOfm0BwHOSdNaB47aHl-hovtnA5tYLafwfHZFqCvwsUem9lOQ96g1AZAETiEY7X_4xfw`
      },
      failOnStatusCode: false // Optional: set to true if you want the test to fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.name).to.eq(snippetData.name)
      expect(response.body.content).to.eq(snippetData.content)
      expect(response.body.language).to.eq("printscript")
      expect(response.body).to.haveOwnProperty("id")

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').clear();
      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').type(snippetData.name + "{enter}");

      cy.wait("@getSnippets")
      cy.contains(snippetData.name).should('exist');
    })
  })
})
