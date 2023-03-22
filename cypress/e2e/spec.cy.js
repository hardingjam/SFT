import {cborDecode, encodeCBOR, bytesToMeta} from "../../src/scripts/helpers.js"
import {it} from "mocha";
import {expect} from "chai";


describe('Stepper', () => {
    it('checks output after encode and decode where data is schema', () => {
        let schema = {
            "type": "object",
            "required": [
                "pie_certificate",
                "producer_wallet",
                "total_score",
                "max_options"
            ],
            "properties": {
                "producer_wallet": {
                    "type": "string",
                    "title": "Producer Wallet"
                },
                "total_score": {
                    "type": "string",
                    "title": "Total Score"
                },
                "max_options": {
                    "type": "string",
                    "title": "Max Options"
                },
                "pie_certificate": {
                    "type": "string",
                    "editor": "upload",
                    "title": "PIE Certificate"
                }
            }
        }

        let cborEncodedSchema = encodeCBOR(schema)
        let cborDecodedData = cborDecode(cborEncodedSchema)
        let bytes = cborDecodedData[0][0][1]

        let _meta = bytesToMeta(bytes)

        expect(JSON.stringify(schema)).to.equal(JSON.stringify(_meta));
    })
    it('checks output after encode and decode where data is string', () => {
            let string = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa"

            let cborEncoded = encodeCBOR(string)
            let cborDecodedData = cborDecode(cborEncoded)
            let bytes = cborDecodedData[0][0][1]

            let _meta = bytesToMeta(bytes)

            expect(string).to.equal(_meta);
        })
})