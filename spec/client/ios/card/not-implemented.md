## Not implemented

#### Create + approve + capture card order in one step (data handler)

```swift
public class CardClient: Client {
    public func completeOrder(_ order: Order, card: Card, completion: (Result<OrderData, ErrorData>) -> Void)
}
```

#### CardFields (UI component)

```swift
// Card fields UI component
public class CardFields: PaymentUIComponent {

    public enum Type {
        // single or multiple card fields
        case single
        case multi
    }

    var config: CoreConfig

    var cardNumberField: UITextField
    var cvvField: UITextField
    var expiryField: UITextField
    var submitButton: UIButton?

    var type: Type = .single

    public init(config: CoreConfig, type: Type = .single, submitButton: UIButton?)

    func submit(card: Card)
}
```
