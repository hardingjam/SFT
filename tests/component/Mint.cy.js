import Mint from '../../src/routes/Mint.svelte'
import {sanitizeJson} from "../../src/scripts/helpers.js";
import jQuery from "jquery";

describe('New asset class', () => {
    it('mounts Mint component', () => {
        cy.mount(Mint)
    })
    it('should sanitize if a JSON object is vulnerable to XSS attacks', () => {
        // Create the JSON object with user input
        cy.mount(Mint)

        const json = {"car":"<script>alert('XSS attack!');</script>","train":"sdf"};
        // Serialize the JSON object into a string
        const sanitizedJson = sanitizeJson(json)

        // Use a DOM parser to create an HTML document from the string
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(sanitizedJson, 'text/html');

        // Check if the HTML document contains any script tags
        const scripts = htmlDoc.getElementsByTagName('script');

        // Use Cypress assertions to check if the JSON object is vulnerable to XSS attacks
        expect(scripts.length).to.equal(0, 'JSON object is vulnerable from XSS attack!');
    });
    it('should sanitize Json on body onload', () => {
        // Create the JSON object with user input
        cy.mount(Mint)

        const json = {"car":"<body onload=alert('something')>;","train":"sdf"};
        // Serialize the JSON object into a string
        let sanitizedJson = sanitizeJson(json)

        sanitizedJson = JSON.stringify(sanitizedJson)

        // Use Cypress assertions to check if the JSON object is vulnerable to XSS attacks
        expect(sanitizedJson).to.not.contain('<body', 'JSON object is vulnerable from XSS attack!');
    });
})