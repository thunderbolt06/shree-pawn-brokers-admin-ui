
async function addLogs(productValue, quantityValue, sendRequest,op, old, cross ) {
    try {
        console.log("added logs");
        const event = new Date(Date.now());
        var time = event.toLocaleString('en-GB', { timeZone: 'IST' });

        // console.log(time.substring(0, time.length - 1));
        // console.log(productValue);
        // console.log(quantityValue);

        const res1 = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/changelog/add`,
            "POST",
            JSON.stringify({
                time: time.substring(0, time.length - 1),
                product: productValue,
                operation: op,
                changeValue: quantityValue,
                oldValue: old,
                crosschecked: cross
            }),
            {
                "Content-Type": "application/json"
            }
        );
        console.log("added these logs");
        console.log(res1.body);
    } catch (error) {
        console.log(error);
    }
}

async function getLogsByProduct(product, sendRequest) {
    try {
        // console.log("getting logs By product name");
        // const event = new Date(Date.now());
        // var time = event.toLocaleString('en-GB', { timeZone: 'IST' });

        // console.log(time.substring(0, time.length - 1));
        // console.log(productValue);
        // console.log(quantityValue);

        const res1 = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/changelog/getLogsByProduct`,
            "POST",
            JSON.stringify({
                product: product,
            }),
            {
                "Content-Type": "application/json"
            }
        );
        // console.log("got these logs");
        // console.log(res1.body);
        return res1;
    } catch (error) {
        console.log(error);
    }
}


async function toggleCross(time, sendRequest) {
    try {
        // console.log("toggling crosses");
        // const event = new Date(Date.now());
        // var time = event.toLocaleString('en-GB', { timeZone: 'IST' });

        // console.log(time.substring(0, time.length - 1));
        // console.log(productValue);
        // console.log(quantityValue);

        const res1 = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/changelog/toggle`,
            "POST",
            JSON.stringify({
                time: time
            }),
            {
                "Content-Type": "application/json"
            }
        );
        // console.log("toggled cross for these logs");
        // console.log(res1.body);
    } catch (error) {
        console.log(error);
    }
}

// const _addLogs = addLogs;
export { addLogs as addLogs };
export {toggleCross as toggleCross};

