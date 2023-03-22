import {describe, it} from 'mocha';
import {expect} from 'chai';
import {cborDecode, encodeCBORSchema, bytesToMeta} from '../src/scripts/helpers.js';

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

            let cborEncodedSchema = encodeCBORSchema(schema)
            let cborDecodedData = cborDecode(cborEncodedSchema)
            let bytes = cborDecodedData[0][0][1]

            const _meta = bytesToMeta(bytes)

            expect(JSON.stringify(schema)).to.equal(JSON.stringify(_meta));
        });
    });
});