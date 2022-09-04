import {ethers} from "ethers";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const TEST_CONTRACT_ADDRESS = "0xad68ac25a5c36a7fcc70e4f2521c74c386540443";

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