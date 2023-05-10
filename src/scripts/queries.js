export const QUERY = `
          query($id: ID!) {
            offchainAssetReceiptVault(id: $id) {
                id,
                totalShares,
                address,
                deployer,
                admin,
                name,
                roles{
                    roleName,
                    roleHolders{
                      account{
                        address
                      }
                    },
                    roleHash
                },
                roleRevokes{
                    role{
                        roleName
                    }
                    roleHolder{
                        account{
                          address
                        }
                    }
                }
            }
          }
         `;

export const AUDIT_HISTORY_DATA_QUERY = `
        query($id: ID!) {
          offchainAssetReceiptVault(id: $id) {
            id,
            address,
            totalShares,
            certifications(orderBy: timestamp)
            {
              timestamp,
              certifier
              {
                address
              },
              certifiedUntil,
              totalShares
                transaction {
                  blockNumber
                }
            },
            deposits(orderBy: timestamp orderDirection:desc) 
            {
              receipt
              {
                receiptId,
                  receiptInformations{
                    information
                  }
                  deposits{
                     amount
                     timestamp
                     id
                  }
              },
              timestamp,
              amount
            }
          }
        }
    `;


export const RECEIPTS_QUERY = `
          query($id: ID!) {
              account(id: $id) {
                address
                id
                receiptBalances {
                    receipt {
                        id
                        receiptId
                        balances {
                          valueExact
                          value
                        }
                        deposits{
                            timestamp
                        }
                    }
                }
              }
          }
         `;
export const DEPLOYER_QUERY = `
          query($id: ID!) {
            offchainAssetReceiptVault(id: $id) {
                deployer,
                totalShares
            }
          }
         `;
export const RECEIPT_INFORMATION_QUERY = `
          query($id: ID!) {
            receipt(id: $id) {
                id,
                  receiptInformations{
                    information
                  }
            }
          }
         `;
export const RECEIPT_VAULT_INFORMATION_QUERY = `
          query {
             receiptVaultInformations(orderBy: timestamp, orderDirection: desc) {
               transaction {
                 blockNumber
               }
            }
          }
         `;
export const VAULT_INFORMATION_QUERY = `
          query($id: ID!) {
            offchainAssetReceiptVault(id: $id) {
                id,
                 receiptVaultInformations(orderBy: timestamp, orderDirection: desc) {
                    information
                    id
                    timestamp
                 }
            }
          }
         `;

export const VAULTS_QUERY = `
        query {
          offchainAssetReceiptVaults(orderBy:deployTimestamp orderDirection:desc){
            deployer,
            name,
            address,
            symbol,
            deployBlock,
            deployTimestamp
          }
        }`;

export const DEPOSITS_QUERY = `
          query($id: ID!) {
            offchainAssetReceiptVault(id: $id) {
              deposits(orderBy: timestamp, orderDirection: desc) {
                amount
                transaction {
                 blockNumber
                }
                receipt {
                  receiptInformations {
                    schema
                  }
                }
              }
            }
          }
         `;
