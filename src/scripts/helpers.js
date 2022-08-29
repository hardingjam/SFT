import {ethers} from "ethers";
import {SUBGRAPH_URL} from "./consts.js";

export async function getEventArgs(tx, eventName, contract) {
    return contract.interface.decodeEventLog(eventName, (
            await getEvent(tx, eventName, contract)
        ).data
    );
}

export async function getEvent(tx, eventName, contract) {
    const events = (await tx.wait()).events || [];
    const filter = (contract.filters[eventName]().topics || [])[0];
    const eventObj = events.find(
        (x) => x.topics[0] === filter && x.address === contract.address
    );

    if (!eventObj) {
        throw new Error(`Could not find event with name ${eventName}`);
    }

    return eventObj;
}

export async function getContract(network, address, abi, signerOrProvider) {
    let contract;
    if (network) {
        if (address) {
            contract = new ethers.Contract(
                address,
                abi,
                signerOrProvider
            );
        }
    }
    return contract
}

export function toSentenceCase(text) {
    text = text.toLowerCase()
    let txtArr = text.split(/[,._\s]/)
    let firstWord = txtArr[0]
    let firstLetter = firstWord.charAt(0).toUpperCase()
    firstWord = firstLetter + firstWord.slice(1)
    txtArr = txtArr.slice(1)
    txtArr.unshift(firstWord)
    return (txtArr.join(' '))
}

export async function getSubgraphData(activeNetwork, offchainAssetVault) {
    let id = offchainAssetVault
    let query = `
          query($id: ID!) {
            offchainAssetVault(id: $id) {
                id
                address,
                deployer,
                admin,
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
         `;
    if (activeNetwork) {
        let req = await fetch(SUBGRAPH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: {id}
            })
        });

        let data = await req.json()
        //sg needs some time to be updated, so if it does not give response immediately
        //after creating vault, we need to repeat the action
        if (!data.data.offchainAssetVault) {
            setTimeout(async function () {
                await getSubgraphData(activeNetwork, offchainAssetVault)
            }, 2000)

        }
        return data.data

    }

}