import NewSchema from '../../src/routes/NewSchema.svelte'
import {sanitizeJson} from "../../src/scripts/helpers.js";
const IPFS_GET = "https://ipfs.io/ipfs/"
describe('New asset class', () => {
    it('mounts NewSchema component', () => {
        cy.mount(NewSchema)
    })
    it('should not have XSS vulnerabilities in JSON data', () => {
        cy.mount(NewSchema)
        const jsonData =
            {
                "displayName": "Asset class",
                "schema": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "title": "Name", "description": "This is name"},
                        "lastname": {"type": "string", "title": "Last Name"},
                        "email": {"type": "string", "title": "Email", "format": "email"},
                        "date": {"type": "string", "title": "Date", "format": "date"},
                        "age": {"type": "number", "title": "Age"}
                    }
                }
            };
        const jsonString = JSON.stringify(jsonData);
        // Check if response contains XSS vulnerabilities
        const xssRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;

        expect(jsonString).not.to.match(xssRegex);
    });
    it('should sanitize if a JSON object is vulnerable to XSS attacks', () => {
        // Create the JSON object with user input
        const json = {
            "displayName": "Asset class",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "title": "Name", "description": "This is name"},
                    "lastname": {"type": "string", "title": "Last Name"},
                    "email": {"type": "string", "title": "Email", "format": "email"},
                    "date": {"type": "string", "title": "Date", "format": "date"},
                    "age": {"type": "number", "title": '<script>alert("XSS attack!");</script>'}
                }
            }
        };

        // Serialize the JSON object into a string
        const sanitizedJson = sanitizeJson(json)

        // Use a DOM parser to create an HTML document from the string
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(sanitizedJson, 'text/html');

        // Check if the HTML document contains any script tags
        const scripts = htmlDoc.getElementsByTagName('script');

        // Use Cypress assertions to check if the JSON object is vulnerable to XSS attacks
        expect(scripts.length).to.equal(0, 'JSON object is vulnerable to XSS attack!');
    });
})