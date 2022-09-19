function initialize() {
    console.log('hello');
    let inputArg = document.getElementById("messageToMobileApp")
    let inputArgs = inputArg.value.split(",")
    let vpInitRequest = JSON.stringify({environment: inputArgs[0], appId: inputArgs[1]})

    try {
        if (typeof Android !== "undefined" && Android !== null) {
            Android.initialize(vpInitRequest);
        } else if(navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
            webkit.messageHandlers.initialize.postMessage(vpInitRequest)
        }
    } catch (ex) {
        updateMessageFromMobileApp(`Initialize fail with exception - ${ex.message}`)
    }
}

function initializationSuccess(vpInitResponse) {
    let initRsp = JSON.parse(vpInitResponse)
    let signedNonce = initRsp.signedNonce

    let updateMsg = `JSON InitializationSuccess response:${vpInitResponse}\n\nAfter parsing:\n signedNonce = ${signedNonce}`
    updateMessageFromMobileApp(updateMsg)
}

function getSupportedWallets() {
    let inputArg = document.getElementById("messageToMobileApp")
    let vpSupportedWalletRequest = JSON.stringify({encryptedPayload: inputArg.value})

    try {
        if (typeof Android !== "undefined" && Android !== null) {
            Android.getSupportedWallets(vpSupportedWalletRequest);
        } else if(navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
            webkit.messageHandlers.getSupportedWallets.postMessage(vpSupportedWalletRequest)
        }
    } catch (ex) {
        updateMessageFromMobileApp(`GetSupportedWallets fail with exception - ${ex.message}`)
    }
}

function supportedWalletSuccess(vpSupportedWalletResponse) {
    let supportedWalletRsp = JSON.parse(vpSupportedWalletResponse)
    let wallets = supportedWalletRsp.wallets

    let updateMsg = `JSON SupportedWalletSuccess response:${vpSupportedWalletResponse}\n\nAfter parsing:` +
                    `\n wallets: [\n[walletDescription = ${wallets[0].walletDescription},\n code = ${wallets[0].code},` +
                    `\n status = ${wallets[0].status},\n reason = ${wallets[0].reason}]\n]`
    updateMessageFromMobileApp(updateMsg)
}

function startCardProvisioning() {
    let inputArg = document.getElementById("messageToMobileApp")
    let vpCardProvisioningRequest = JSON.stringify({walletCode: inputArg.value})

    try {
        if (typeof Android !== "undefined" && Android !== null) {
            Android.startCardProvisioning(vpCardProvisioningRequest);
        } else if(navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
            webkit.messageHandlers.startCardProvisioning.postMessage(vpCardProvisioningRequest)
        }
    } catch (ex) {
        updateMessageFromMobileApp(`StartCardProvisioning fail with exception - ${ex.message}`)
    }
}

function cardProvisioningSuccess(vpCardProvisioningResponse) {
    let cardProvisioningRsp = JSON.parse(vpCardProvisioningResponse)
    let walletStatus = cardProvisioningRsp.walletStatus

    let updateMsg = `JSON CardProvisioningSuccess response:${vpCardProvisioningResponse}\n\nAfter parsing:` +
                    `\n walletStatus = ${walletStatus}`
    updateMessageFromMobileApp(updateMsg)
}

function processError(vpError) {
    let errorRsp = JSON.parse(vpError)
    console.log(errorRsp);
    let type = errorRsp.type
    let code = errorRsp.code
    let description = errorRsp.description
    let correlationID = errorRsp.correlationID

    let updateMsg = `JSON Error response:${vpError}\n\nAfter parsing:\n type = ${type}\n code = ${code}`
                    + `\n description = ${description}\n correlationID = ${correlationID}`
    updateMessageFromMobileApp(updateMsg)
}

function updateMessageFromMobileApp(message){
    let tbxMessageFromMobileApp = document.getElementById("messageFromMobileApp")
    tbxMessageFromMobileApp.value = message
}



