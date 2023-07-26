export const QUERY = `
          query($id: ID!) {
            offchainAssetReceiptVault(id: $id) {
                id
                totalShares
                address
                deployer
                admin
                name
                symbol
                deployTimestamp
                receiptContractAddress
                shareHolders{
                    address
                }
                tokenHolders {
                    address
                    balance
                }
                roles(orderBy: roleName){
                    roleName
                    roleHolders{
                      account{
                        address
                      }
                    }
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
                },
                receiptVaultInformations(orderBy: timestamp, orderDirection: desc) {
                 information
                 id
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
            receiptContractAddress
            certifications(orderBy: timestamp, orderDirection: desc)
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
                id,
                receiptId,
                  receiptInformations(orderDirection: desc, orderBy: timestamp){
                    information
                    id
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
              receiptId,
              receiptInformations(orderDirection: desc, orderBy: timestamp){
                information
                id
                transaction {
                  blockNumber
                  id
                }
              }
              deposits{
                 amount
                 timestamp
                 id
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
              receiptContractAddress
               receiptVaultInformations(orderBy: timestamp, orderDirection: desc) {
                 information
                 id
                 timestamp
                 transaction{
                   blockNumber
                 }
               }
            }
          }
         `;

export const VAULTS_QUERY = `
        query {
          offchainAssetReceiptVaults(orderBy:deployTimestamp orderDirection:desc){
            deployer
            name
            address
            symbol
            deployBlock
            deployTimestamp
            totalShares
            receiptContractAddress
            tokenHolders {
                address
                balance
            }
            roleHolders {
              role {
                roleName
                roleHash
              }
              account {
                address
              }
            }
            receiptVaultInformations(orderBy: timestamp, orderDirection: desc) {
              information
              id
              timestamp
            }
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
                  receiptInformations(orderDirection: desc, orderBy: timestamp){
                    id
                    schema
                  }
                }
              }
            }
          }
         `;
