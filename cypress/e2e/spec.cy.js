import {cborDecode, encodeCBOR, bytesToMeta, cborEncodeHashList} from "../../src/scripts/helpers.js"
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

describe('Stepper', () => {
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
                "displayName": "bb",
                "schema": schema
            }

        let hash = "QmVtXGgqpATBjp2NgC3vrPHUJSETtqSs5phnELTioVxE18"

        let exampleMeta = "0xff0a89c674ee7874a40058bb789c7d8fcb0ac2301045ff65d67e41b7e2c2850f50702112a6c9a8236913932956a4ff6e520b5a11b3bcf79ccccc030c476ff1bec48aa080b28409447da60aa17880dc7d4e5d79212da909746d389081620f9e49690ac247d628945a1f9c6952a46e682d655e9ca05551bb90fb0a5be5bcb0ab231c7adc679f621ef52dbfa747095c9ff26f2c3607eb01ddbdc86e3ce78fb8cdd8a6a7baf13a7fa405b6ab814ad2f7d53f44322c2ea4a4f1d6a1f95c7c3e9b7eb85d7a4f7ac287c4011bffa8e8a9b9cf4a3102706170706c69636174696f6e2f6a736f6e03676465666c617465a200583181782e516d567458476771704154426a70324e67433376725048554a534554747153733570686e454c54696f5678453138011bff9fae3cc645f463"

        let excludeRainMeta = exampleMeta.replace("0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase(), "")

        let cborDecoded = cborDecode(excludeRainMeta)

        let schemaJson = cborDecoded[0]
        let hashList = cborDecoded[1]

        //check magic numbers
        expect(schemaJson.get(1)).to.equal(MAGIC_NUMBERS.OA_SCHEMA)
        expect(hashList.get(1)).to.equal(MAGIC_NUMBERS.OA_HASH_LIST)

        //check data
        let schemaData = bytesToMeta(schemaJson.get(0), "json");
        let hashListData = bytesToMeta(hashList.get(0))

        expect(JSON.stringify(schemaInformation)).to.equal(JSON.stringify(schemaData))
        expect(hash).to.equal(hashListData)

    })
    it('checks decode output of whole meta for mint', () => {
        let exampleStructure = {
            "origin": "11",
            "gia_report": "QmXyewyJGuUs1wxRwVJm3uBiJiaB3ofjfj3nGYQWQD7XrB"
        }
        let schemaHash = "QmeuHzbTyW7SQeyWoMJkn1r8Ec6A4Wb48FHXL4rpzmCPYM"

        let decodedMeta = cborDecode("a5005854789cab56ca2fca4ccfcc53b252323454d2514acf4c8c2f4a2dc82f2a018a04e64654a696577ab99786161b965704958779e51a973a657a65263a19e7a765a56519e7b947068607ba9847143929d50200f0f31a13011bffc47a6299e8a91102706170706c69636174696f6e2f6a736f6e03676465666c6174651bffa8e8a9b9cf4a31782e516d6575487a625479573753516579576f4d4a6b6e3172384563364134576234384648584c3472707a6d4350594da200586182782e516d58796577794a477555733177785277564a6d337542694a696142336f666a666a336e47595157514437587242782e516d5271734552703651324d5a3263614e724762377461393133717657613256566370653143474879327676616a011bff9fae3cc645f463")


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