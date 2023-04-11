import {cborDecode, encodeCBOR, bytesToMeta} from "../../src/scripts/helpers.js"
import {it} from "mocha";
import {expect} from "chai";
import {MAGIC_NUMBERS} from "../../src/scripts/consts.js";

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
            "title": "ProducerWallet"
        },
        "total_score": {
            "type": "string",
            "title": "TotalScore"
        },
        "max_options": {
            "type": "string",
            "title": "MaxOptions"
        },
        "pie_certificate": {
            "type": "string",
            "editor": "upload",
            "title": "PIECertificate"
        }
    }
}

describe('CBOR encode/decode', () => {
    it('checks output after encode and decode where data is schema', () => {

        let cborEncodedSchema = encodeCBOR(schema)
        let cborDecodedData = cborDecode(cborEncodedSchema)
        let bytes = cborDecodedData[0].get(0)

        let _meta = bytesToMeta(bytes, "json")

        expect(JSON.stringify(schema)).to.equal(JSON.stringify(_meta));
    })
    it('checks decode output of whole meta for schema', () => {

        let schemaInformation =
            {
                "displayName": "Schema_test2",
                "schema": {
                    "type": "object",
                    "required": [
                        "pie_certificate",
                        "producer_wallet"
                    ],
                    "properties": {
                        "producer_wallet": {
                            "type": "string",
                            "title": "Producer Wallet"
                        },
                        "pie_certificate": {
                            "type": "string",
                            "editor": "upload",
                            "title": "PIE Certificate"
                        }
                    }
                }
            }

        let hash = "QmVps8SiBXHAGYFbEJcgcGVDGfGTNWMwdvchqznCmPojXt"

        let exampleMeta = "0xff0a89c674ee7874a400589e789c6d8d310bc2301085ff4ab9b9936356717011c1c141a4a4c9a927a989c90529a5ffdd4b152cea6df7def7de1bc0520a4ef71bdd2128d8990b76ba614cbc801ad2f4821a80fb507cdf5ed1b03811ef99225a500708848dc1c87422a319c50dd1db2c52f3d0ce21c3719242613095ba6fe0b39038d2ed2c1d4cec8ab07da3d5fe858ef5cfe09f345a621f45c9c1796de77deb55b59c8547b927ee865cb6011bffa8e8a9b9cf4a3102706170706c69636174696f6e2f6a736f6e03676465666c617465a30081782e516d5670733853694258484147594662454a636763475644476647544e574d7764766368717a6e436d506f6a5874011bff9fae3cc645f46302706170706c69636174696f6e2f6a736f6e"

        let excludeRainMeta = exampleMeta.replace("0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase(), "")

        let cborDecoded = cborDecode(excludeRainMeta)

        let schemaJson = cborDecoded[0]
        let hashList = cborDecoded[1]

        //check magic numbers
        expect(schemaJson.get(1)).to.equal(MAGIC_NUMBERS.OA_SCHEMA)
        expect(hashList.get(1)).to.equal(MAGIC_NUMBERS.OA_HASH_LIST)

        //check data
        let schemaData = bytesToMeta(schemaJson.get(0), "json");
        let hashListData = hashList.get(0)[0]

        expect(JSON.stringify(schemaInformation)).to.equal(JSON.stringify(schemaData))
        expect(hash).to.equal(hashListData)

    })
    it('checks decode output of whole meta for mint', () => {
        let exampleStructure = {
            "origin": "11",
            "gia_report": "QmXyewyJGuUs1wxRwVJm3uBiJiaB3ofjfj3nGYQWQD7XrB"
        }
        let schemaHash = "QmeuHzbTyW7SQeyWoMJkn1r8Ec6A4Wb48FHXL4rpzmCPYM"

        let decodedMeta = cborDecode("a5005854789cab56ca2fca4ccfcc53b252323454d2514acf4c8c2f4a2dc82f2a018a04e64654a696577ab99786161b965704958779e51a973a657a65263a19e7a765a56519e7b947068607ba9847143929d50200f0f31a13011bffc47a6299e8a91102706170706c69636174696f6e2f6a736f6e03676465666c6174651bffa8e8a9b9cf4a31782e516d6575487a625479573753516579576f4d4a6b6e3172384563364134576234384648584c3472707a6d4350594da200785d516d58796577794a477555733177785277564a6d337542694a696142336f666a666a336e475951575144375872422c516d5271734552703651324d5a3263614e724762377461393133717657613256566370653143474879327676616a011bff9fae3cc645f463")


        let structure = decodedMeta[0].get(0)

        //check magic numbers
        expect(decodedMeta[0].get(1)).to.equal(MAGIC_NUMBERS.OA_STRUCTURE)
        expect(decodedMeta[1].get(1)).to.equal(MAGIC_NUMBERS.OA_HASH_LIST)
        expect(decodedMeta[0].get(MAGIC_NUMBERS.OA_SCHEMA)).to.equal(schemaHash)

        //check data
        let structureData = bytesToMeta(structure, "json")
        expect(JSON.stringify(exampleStructure)).to.equal(JSON.stringify(structureData))

    })
})
describe('XSS vulnerability', () => {
    it('checks asset class json', () => {
        cy.visit('https://example.cypress.io')
    })
})