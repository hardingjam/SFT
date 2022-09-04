import {ethers} from "ethers";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const TEST_CONTRACT_ADDRESS = "0x00a203cb9582be0d04b7504fef1fb355e91b4ecd";

export const ONE = ethers.BigNumber.from("1000000000000000000");

export const QUERY = `
          query($id: ID!) {
            offchainAssetVault(id: $id) {
                id
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