import {ethers} from "ethers";
import {ONE, ROLES} from "./consts.js";

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
        (x) => x.topics[0] === filter && x.address.toLowerCase() === contract.address.toLowerCase())

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
        try {
            let req = await fetch(activeNetwork.subgraph_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            })
            return await req.json()

        } catch (e) {
            console.log(e.message)
            return null
        }
    }
}

export function getSubgraphData(activeNetwork, variables, query, param) {
    return new Promise(async (resolve, reject) => {
        async function fetchData() {
            return await fetchSubgraphData(activeNetwork, variables, query)
        }

        let interval = setInterval(fetchData, 2000)
        let data = await fetchData()
        if (!data || data.data[param] || (data && data.data && data.data[param] === null)) {
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

export function tierReport(report) {

    let parsedReport = [];
    const arrStatus = [0, 1, 2, 3, 4, 5, 6, 7]
        .map((i) =>
            BigInt(report)
                .toString(16)
                .padStart(64, "0")
                .slice(i * 8, i * 8 + 8)
        )
        .reverse();
    //arrStatus = arrStatus.reverse();

    for (const i in arrStatus) {
        parsedReport.push(parseInt("0x" + arrStatus[i]));
    }

    return parsedReport;
}

export function timeStampToDate(timeStamp) {
    let {year, month, day} = getDateValues(new Date(timeStamp * 1000))
    return [day, month, year].join('-');
}

export function formatDate(date) {
    let {year, month, day} = getDateValues(date)
    return [year, month, day].join('-');
}

function getDateValues(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return {day, month, year};
}

export function accessControlError(msg) {
    let hash = msg.slice(-66)
    let error = msg.slice(20, msg.length - 66)

    let role = ROLES.find(r => r.hash === hash)
    return error + " " + role?.name
}