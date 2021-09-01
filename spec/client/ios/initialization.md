## Initializing the iOS SDK


### Import the PayPal SDK submodule in your file

The functionality of the SDK is split between a number of merchant facing modules that can each be separately imported into a merchant's app. The modules associated with the payment methods you wish to use should be imported at the top of your file. Internally, the submodules will share a dependency on some core module, which is where shared objects and capabilities will live.

### Initialize the Configuration Object

The first step in initializing any module of the SDK would be to create an instance of a `PaymentsConfiguration`.

```swift
struct PaymentsConfiguration {
    let clientId: String
    let merchantId: String? = nil
    let environment: Environment = .sandbox

    // Other required properties?
}

let config = PaymentsConfiguration(clientId: "ABCD1234")
```

```kotlin
data class PaymentsConfiguration(
    val clientId: String,
    val merchantId: String? = null,
    val environment: Environment = Environment.SANDBOX
)

val configuration = PaymentsConfiguration(clientId = "ABCD1234")
```

This configuration object is shared across all the modules of the PayPal iOS SDK. It contains the information that is needed across the modules to execute a transaction (except for the order information). The information  passed into a configuration object should be known to the merchant at the beginning of their app lifecycle and would be static across transaction sessions

### Initialize the Module Client

The PayPal SDK uses root client objects to facilitate communication between the integrating application and the SDK. Whichever payment method you wish to use, you can create an instance of the root client object using the shared configuration object

```swift
import PayPalCard

// Configuration object to whole
let config = PaymentsConfiguration(clientId: "ABCD1234")
let cardClient = CardClient(config: config)

let card = Card(number: 4111, cvv: ...)
let cardRequest = CardRequest(card: card)

// Function name might be subject to change here
cardClient.checkout(withRequest: cardRequest, orderID: orderID) { result in
    switch result {
    case .success(let orderId):
        // merchant is able to authorize / capture the order ID here
    case .failure(let error):
        // process the error here
    }
}
```

```kotlin
val config = PaymentsConfiguraton(clientId = "ABCD1234")
val cardClient = CardClient(config = config)

val card = Card(number = 4111, cvv = ...)
val cardRequest = CardRequest(card = card)

cardClient.checkout(cardRequest, orderID) { result ->
    when (result.status) {
        SUCCESS -> {
            // merchant is able to authorize / capture the order ID here
            val orderId = result.orderId
        }
        FAILURE -> {
            // process the error here
            val error = result.error
        }
    }
}
```

Once the client object is created, it is the window through which merchants can make requests and interact with the SDK.
