## Card spec

#### CardClient

```swift
// API client that handles card network requests
public class CardClient: Client {

    // To be used when buyer submits their card info
    // This function will validate buyer's card, and if valid, the order will be paid with this card
    // Merchants will need to handle capturing/authorizing the order in their server.
    public func approveOrder(orderID: String, card: Card, completion: (Result<OrderData, ErrorData>) -> Void)
}
```

```kotlin
// API client that handles card network requests
class CardClient: Client {

    // To be used when buyer submits their card info
    // This function will validate buyer's card, and if valid, the order will be paid with this card
    // Merchants will need to handle capturing/authorizing the order in their server.
    fun approveOrder(orderID: String, card: Card, completion: (Result) -> Unit)
}
```

#### Models

```swift
public struct Card: PaymentSource {
    var cardNumber: String
    var cvv: String
    var expiry: String
}
```

```kotlin
data class Card(
    val cardNumber: String,
    val cvv: String,
    val expiry: String
)
```
