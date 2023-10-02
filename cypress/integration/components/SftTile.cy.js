import SftTile from '../../../src/components/SftTile.svelte'

describe('Sft tile', () => {
    it(`Should display "..." when sft name length is more than 20 characters`, () => {
        let sft =
            {
                "deployer": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
                "name": "Tranche 1 - Highest Quality - Vietname Corporate RECs",
                "address": "0x1125c842a51e89a1eb1f5077ce62e5612392634e",
                "symbol": "ntkn",
                "deployBlock": "32254470",
                "deployTimestamp": "1676970813",
                "totalShares": "1108770000000000000",
                "receiptContractAddress": "0x6fbf24d550c413911160d3801429323ba37fdd16",
                "tokenHolders": [
                    {
                        "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324",
                        "balance": "74620000000000000"
                    },
                    {
                        "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
                        "balance": "1034150000000000000"
                    }
                ],
                "roleHolders": [
                    {
                        "role": {
                            "roleName": "WITHDRAWER",
                            "roleHash": "0x779b9d7b1cefd23059ce3e2b194efb3183a6685dd830e8cbb723b0cbeb982b28"
                        },
                        "account": {
                            "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR",
                            "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                        },
                        "account": {
                            "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20SNAPSHOTTER",
                            "roleHash": "0x2c95f646d7033c5b1f0ff0b069bf367786555798c4a6d29fdd04e5009fe72543"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC1155TIERER",
                            "roleHash": "0x4050867f5f2e7b09df27b54fd9dd2dc48115dba018cf621a03355f7966666ae0"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CERTIFIER_ADMIN",
                            "roleHash": "0x4bbeb6fd3e5222e55f2f8b0c35bc228e0a06a25d0da772fdb02c3b92fa004f88"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "HANDLER_ADMIN",
                            "roleHash": "0x4cbb985fecd7e86ede589f695f46f07d40afe7cb60f6049028c0b9a6bfaf649e"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "WITHDRAWER",
                            "roleHash": "0x779b9d7b1cefd23059ce3e2b194efb3183a6685dd830e8cbb723b0cbeb982b28"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20TIERER",
                            "roleHash": "0x9f5e37ff3a64b04b72b5b1811abfcf4517dd143202c8aa61348ea257fa96a082"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR_ADMIN",
                            "roleHash": "0xc091f023e1c6780346fd5f1017395079a3ea0e07d94a4f9e7273a43e3fa2a7e8"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20TIERER_ADMIN",
                            "roleHash": "0xc1a04980ce16d8574a4108b9f0a95358068379059fe211b7eb60a9f805237e60"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CONFISCATOR_ADMIN",
                            "roleHash": "0xc23bede8eabca44a15d0193051ac5429f3d014a7e297a4e78f67d06657d14269"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC1155TIERER_ADMIN",
                            "roleHash": "0xd461edcf12d14f5a18f27560fb18cfcb7df6fedb1d46c3664b9634623e9a172d"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CERTIFIER",
                            "roleHash": "0xd646ae07eb0d0f77457502a65e7407930dff4cd4fd99abc6aac87a753f4c8a42"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20SNAPSHOTTER_ADMIN",
                            "roleHash": "0xda44ae5b31a7809c0f15e7306bdde44fffb60fdee235af40c70b73a6610de41e"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR",
                            "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "WITHDRAWER_ADMIN",
                            "roleHash": "0xf2491dcc230f29376998d72c6c3ea4cc17d3791c66e46b32ea439c19610d51db"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    }
                ],
                "receiptVaultInformations": []
            }
        cy.mount(SftTile, {props: {sft}});
        cy.get('.sft-name').each(($div) => {
            const sftName = $div.text().trim();
            // Check if "..." is displayed when sft name length is more than 20 characters
            cy.wrap($div).should('include.text', '...');
            cy.wrap($div).should('include.text', 'Tranche 1 - Highest Quality - Vietname Corporate RECs');

        });
    });
    it(`Should not display "..." when sft name length is less than 20 characters`, () => {
        let sft =
            {
                "deployer": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
                "name": "Tranche ",
                "address": "0x1125c842a51e89a1eb1f5077ce62e5612392634e",
                "symbol": "ntkn",
                "deployBlock": "32254470",
                "deployTimestamp": "1676970813",
                "totalShares": "1108770000000000000",
                "receiptContractAddress": "0x6fbf24d550c413911160d3801429323ba37fdd16",
                "tokenHolders": [
                    {
                        "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324",
                        "balance": "74620000000000000"
                    },
                    {
                        "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
                        "balance": "1034150000000000000"
                    }
                ],
                "roleHolders": [
                    {
                        "role": {
                            "roleName": "WITHDRAWER",
                            "roleHash": "0x779b9d7b1cefd23059ce3e2b194efb3183a6685dd830e8cbb723b0cbeb982b28"
                        },
                        "account": {
                            "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR",
                            "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                        },
                        "account": {
                            "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20SNAPSHOTTER",
                            "roleHash": "0x2c95f646d7033c5b1f0ff0b069bf367786555798c4a6d29fdd04e5009fe72543"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC1155TIERER",
                            "roleHash": "0x4050867f5f2e7b09df27b54fd9dd2dc48115dba018cf621a03355f7966666ae0"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CERTIFIER_ADMIN",
                            "roleHash": "0x4bbeb6fd3e5222e55f2f8b0c35bc228e0a06a25d0da772fdb02c3b92fa004f88"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "HANDLER_ADMIN",
                            "roleHash": "0x4cbb985fecd7e86ede589f695f46f07d40afe7cb60f6049028c0b9a6bfaf649e"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "WITHDRAWER",
                            "roleHash": "0x779b9d7b1cefd23059ce3e2b194efb3183a6685dd830e8cbb723b0cbeb982b28"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20TIERER",
                            "roleHash": "0x9f5e37ff3a64b04b72b5b1811abfcf4517dd143202c8aa61348ea257fa96a082"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR_ADMIN",
                            "roleHash": "0xc091f023e1c6780346fd5f1017395079a3ea0e07d94a4f9e7273a43e3fa2a7e8"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20TIERER_ADMIN",
                            "roleHash": "0xc1a04980ce16d8574a4108b9f0a95358068379059fe211b7eb60a9f805237e60"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CONFISCATOR_ADMIN",
                            "roleHash": "0xc23bede8eabca44a15d0193051ac5429f3d014a7e297a4e78f67d06657d14269"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC1155TIERER_ADMIN",
                            "roleHash": "0xd461edcf12d14f5a18f27560fb18cfcb7df6fedb1d46c3664b9634623e9a172d"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "CERTIFIER",
                            "roleHash": "0xd646ae07eb0d0f77457502a65e7407930dff4cd4fd99abc6aac87a753f4c8a42"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "ERC20SNAPSHOTTER_ADMIN",
                            "roleHash": "0xda44ae5b31a7809c0f15e7306bdde44fffb60fdee235af40c70b73a6610de41e"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "DEPOSITOR",
                            "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    },
                    {
                        "role": {
                            "roleName": "WITHDRAWER_ADMIN",
                            "roleHash": "0xf2491dcc230f29376998d72c6c3ea4cc17d3791c66e46b32ea439c19610d51db"
                        },
                        "account": {
                            "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                        }
                    }
                ],
                "receiptVaultInformations": []
            }
        cy.mount(SftTile, {props: {sft}});

        cy.get('.sft-name').each(($div) => {
            const sftName = $div.text().trim();
            // Check if "..." is displayed when sft name length is more than 20 characters
            cy.wrap($div).should('not.include.text', '...');
        });
    });

});