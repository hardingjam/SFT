import {describe, it} from 'mocha';
import {expect} from 'chai';
import {deflateJson, cborDecode, cborEncode, encodeCBORSchema} from '../src/scripts/helpers.js';
import pako from "pako/dist/pako.esm.mjs";

describe('Encode', () => {
    describe('Encode', () => {
        it('checks output after encode and decode', () => {

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
            // let output = decode(encode(foo))

            let cborEncodedSchema = encodeCBORSchema(schema)

            let cborDecodedData = cborDecode(cborEncodedSchema)

            let bytes = cborDecodedData[0][0][1]

            const _meta = pako.inflate(bytes,{ to: 'string' })
            console.log(JSON.parse(_meta))


            // assertEq(foo, output)

            // expect(myScript.addNumbers(2, 3)).to.equal(5);
            // expect(myScript.addNumbers(-5, 10)).to.equal(5);
        });
    });
});