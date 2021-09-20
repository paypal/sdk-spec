### iOS PayPal Integration

If a merchant wants to integrate with the PayPal module, these are the steps they would take.

1. Import `PayPalPayments` at the top of their file
2. Create a `PaymentsConfig` instance using their client Id and return Url
3. Create a `PayPalUI` instance using that configuration
4. Set the delegate of the `PayPalUI` to an object that should receive messages from the SDK, and handle the events (approval, cancellation, errors, and shipping updates)
5. Create an `orderId` by making a request to the orders API directly (SDK not involved in this step)
6. Start the checkout experience using an `orderId` (which would have been retrieved by the merchant outside the SDK)

### iOS PayPal Integration Sample Code

```swift
// 1
import PayPalPayments

class MerchantViewController: UIViewController, PayPalClientDelegate {
  // 2
  let config = PaymentsConfig(clientId: "abc", returnUrl: "abc://paypalpay")

  // 3
  lazy var paypal: PayPalUI = {
    let instance = PayPalUI(config: config)

    // 4
    instance.delegate = self
    return instance
  }()

  // Merchant Created UI
  @IBOutlet weak var paypalButton: UIButton!

  @IBAction
  func paypalButtonTapped(_ sender: Any) {
    // 5
    NetworkClient.createOrderId(details: <currentOrderDetails>) { result in
      guard result == .success(let orderId) else {
          return
      }

      self.startPayPalCheckout(orderId: orderId)
    }
  }

  func startPayPalCheckout(orderId: String) {
    // 6
    paypal.checkout(orderId: orderId)
  }

  // PayPalUIDelegate Conformance
  func paypal(_ paypal: PayPalUI, didApproveWith data: ApprovalData) {
    let orderId = data.orderId
    // Merchant can capture / authorize their order using the orders API
  }

  func paypal(_ paypal: PayPalUI, didReceiveError error: PayPalError) {
    // PayPalCheckout encountered an unrecoverable error
  }

  func paypal(_ paypal: PayPalUI, didChangeShippingAddress shippingAddress: ShippingAddress) {
    // End user is updating their shipping info within the checkout flow
  }

  func paypalDidCancel(_ paypal: PayPalUI) {
    // PayPal checkout flow was canceled
  }
}
```

### Android PayPal Integration

To use the PayPal module in a merchant application:

1. Add `com.paypal.android:paypal-payments:x.x.x` to the application's `build.gradle`
2. Create a `PaymentsConfig` instance using client Id and return url
3. Create a `PayPalUI` instance using `PaymentsConfig`
4. Set a `PayPalUIListener` to listen for SDK events (approval, cancellation, etc.)
5. Create an `orderId` via the orders API (SDK not involved in this step)
6. Start the checkout experience using the `orderId` (which would have been retrieved by the merchant outside the SDK)

### Android PayPal Integration Sample Code

```kotlin
class MerchantActivity: AppCompatActivity(), PayPalUIListener {

  // 2
  val config = PaymentsConfig(clientId = "abc", returnUrl = "abc://paypalpay")

  lateinit var paypal: PayPalUI

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_merchant)

    // 3
    paypal = PayPalUI(config = config)
    paypal.listener = this

    findViewById<Button>(R.id.paypal_button).setOnClickListener {
      onPayPalButtonClick()
    }
  }

  private fun onPayPalButtonClick() {
    NetworkClient.createOrderId(details: <currentOrderDetails>) { result ->
      result.orderId?.let { orderId ->
        paypal.checkout(orderId)
      }
    }
  }

  fun onPayPalApprove(data: ApprovalData) {
    val orderId = data.orderId
    // Merchant can capture / authorize their order using the orders API
  }

  fun onPayPalError(error: PayPalError) {
    // PayPalCheckout encountered an unrecoverable error
  }

  fun onPayPalCancel() {
    // PayPal checkout flow was canceled
  }

  fun onPayPalShippingAddressChange(shippingAddress: ShippingAddress) {
    // End user is updating their shipping info within the checkout flow
  }
}
```
