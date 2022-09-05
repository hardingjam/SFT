import {ethers} from "ethers";
import {ONE} from "./consts.js";

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

export async function fetchSubgraphData(activeNetwork, variables, query) {
    if (activeNetwork) {
        let req = await fetch(activeNetwork.subgraph_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        return await req.json()
    }

}

export function getSubgraphData(activeNetwork, variables, query, param) {
    return new Promise(async (resolve, reject) => {
        async function showTime (){ return await fetchSubgraphData(activeNetwork, variables, query)}
        let interval = setInterval(showTime, 2000)
        let data = await showTime()
        if (data.data[param]) {
            clearInterval(interval)
            return resolve(data)
        }
    })
}

export function fixedPointMul(a, b) {
    return a.mul(b).div(ONE);
}

export function fixedPointDiv(a, b) {
    return a.mul(ONE).div(b);
}

export function filterArray(arr1, arr2) {
    return arr1.filter(a => {
        return arr2.indexOf(a.account.address) === -1
    })
}