PayPal Spec
---

#### Swift Interface
```swift
public protocol PayPalUIDelegate {

    // Invoked when a transaction is approved by the
    // user and ready for authorization or capture by
    // the merchant
    func paypal(_ paypal: PayPalUI, didApproveWith data: ApprovalData)

    // Invoked when the SDK encounters an unrecoverable error
    func paypal(_ paypal: PayPalUI, didReceiveError error: PayPalError)

    // Invoked when the user wants to change the shipping or
    // pickup information. Requires merchant response to
    // confirm the new selection
    func paypal(_ paypal: PayPalUI, didChangeShippingAddress shippingAddress: ShippingAddress)

    // Invoked when the checkout experience has been canceled
    func paypalDidCancel(_ paypal: PayPalUI)
}

public class PayPalUI {
    public weak var delegate: PayPalUIDelegate?

    public init(config: PaymentsConfig) {
        ...
    }

    public func checkout(orderId: String) {

    }
}

let config = PaymentsConfig(clientId: "", returnUrl: "")
let client = PayPalUI(config: config)

client.delegate = self
client.checkout(orderId)
```

#### Kotlin Interface
```kotlin
interface PayPalUIListener {
    /**
     * Invoked when a transaction is approved by the
     * user and ready for authorization or capture by
     * the merchant
     */
    fun onPayPalApprove(data: ApprovalData)

    /**
     *  Invoked when the checkout experience has been canceled
     */
    fun onPayPalCancel()

    /**
     * Invoked when the SDK encounters an unrecoverable error
     */
    fun onPayPalError(error: PayPalError)

    /**
     * Invoked when the user wants to change the shipping or
     * pickup information. Requires merchant response to
     * confirm the new selection
     */
    fun onPayPalShippingAddressChange(shippingAddress: ShippingAddress)
}

class PayPalUI(val config: PaymentsConfig) {

    var listener: PayPalUIListener? = null

    fun checkout(orderId: String) {

    }
}

val config = PaymentsConfig(clientId = "", returnUrl = "")
val client = PayPalUI(config = config)

```


### Improvements

- Fetch merchant configuration from a PayPal backend and infer `returnUrl` to reduce the number of parameters needed when constructing a `PayPalUI` instance.


----
