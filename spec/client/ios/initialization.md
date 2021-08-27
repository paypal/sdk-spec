## Initializing the iOS SDK


#### Assumptions:
- Each submodule of the SDK has a root object can be initialized in the same way - they are passed a shared configuration object, along with whatever parameters are necessary for that specific payment method. We're assuming the root object would be a `...Client`, and the configuration object would be a `PayPalConfiguration`

```swift=
let config = PayPalConfiguration( ... )

let cardClient = CardClient(config: config)

let applePayClient = ApplePayClient(config: config, appleMerchantId: String)
```

----

### Import the PayPal SDK submodule in your file

The functionality of the SDK is split between a number of merchant facing submodules. The modules associated with the payment methods you wish to use should be imported at the top of your file. Internally, the submodules will share a dependency on some core module, which is where shared objects and capabilities will live.

### Initialize the Configuration Object

The first step in initializing any module of the SDK would be to create an instance of a `PayPalConfiguration`.

```swift=
struct PayPalConfiguration {
    let clientId: String
    let merchantId: String? = nil
    let environment: Environment = .sandbox

    // Other required properties?
}

let config = PayPalConfiguration(clientId: "ABCD1234")
```

This configuration object is shared across all the submodules of the PayPal iOS SDK. It contains the information that is needed across the modules to execute a transaction (except for the order information). The information  passed into a configuration object should be known to the merchant at the beginning of their app lifecycle and would be static across transaction sessions

### Initialize the Module Client

The PayPal SDK uses root client objects to facilitate communication between the integrating application and the SDK. Whichever payment method you wish to use, you can create an instance of the root client object using the shared configuration object

```swift=
import PayPalCard

// Configuration object to whole
let config = PayPalConfiguration(clientId: "ABCD1234")
let cardClient = CardClient(config: config)

let card = Card(number: 4111, cvv: ...)
let cardRequest = CardRequest(card: card)

// TBD: See question #3 below
cardClient.checkout(withRequest: cardRequest, orderID: orderID) { result in
    switch result {
    case .success(let orderId):
        // merchant is able to authorize / capture the order ID here
    case .failure(let error):
        // process the error here
    }
}
```

Once the client object is created, it is the window through which merchants can make requests and interact with the SDK.


### Questions

1. Does there exist an endpoint in the orders API where we could get the merchant configuration information using an LSAT, or would we need the merchant to manually pass all of this information in?
    - Currently the BT SDK is able to retrieve the static merchant information asynchronously, which allows for adding features (that may require additional configuration parameters) without needing to increase the surface area of the SDK
2. Is the order api to validate/confirm card information compatible with tokens generated from legacy apis?
3. If we are only relying on low scoped access tokens (LSAT), what would be the possible outputs of the card client?
    - Validating the card (`/v2/checkout/orders/{id}/validate-payment-method`)
        - Currently `INTERNAL` per our [internal API reference](https://ppaas/api/3719176155270030#apiReference)
    - Confirming the card (`/v2/checkout/orders/{id}/confirm-payment-source`)
        - Currently `LIMITED-RELEASE` per our [internal API reference](https://ppaas/api/3719176155270030#apiReference)
    - Capture and Authorize require a scoped access token (would require end user authentication to get a token to upgrade the LSAT), so doesn't seem like these can be part of the card flow.
