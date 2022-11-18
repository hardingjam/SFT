export const QUERY = `
          query($id: ID!) {
            offchainAssetVault(id: $id) {
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
                    }
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
         `

export const AUDIT_HISTORY_DATA_QUERY = `
        query($id: ID!) {
          offchainAssetVault(id: $id) {
            id,
            address,
            totalShares,
            certifications
            {
              timestamp,
              certifier
              {
                address
              },
              certifiedUntil
            },
            deposits 
            {
              receipt
              {
                receiptId
              },
              timestamp,
              amount
            }
          }
        }
    `

export const DEPOSITS_QUERY = `
          query($id: ID!) {
           account(id: $id)
           {
              id,
              offchainAssetVault
              {
                name
                deposits
                {
                  id,
                  timestamp,
                  amount,
                  receipt
                  {
                    id,
                    shares,
                    receiptId,
                    balances {
                      value,
                      valueExact
                    }
                  },
                }
              }
           }
        }
         `
export const DEPLOYER_QUERY = `
          query($id: ID!) {
            offchainAssetVault(id: $id) {
                deployer,
                totalShares
            }
          }
         `
export const RECEIPT_INFORMATION_QUERY = `
          query($id: ID!) {
            receipt(id: $id) {
                id,
                  receiptInformations{
                    information
                  }
            }
          }
         `