## Not implemented

#### Client-side create order (data handler)

```swift
public class Client {
    public func createOrder(_ order: Order, completion: (Result<OrderData, ErrorData>) -> Void)
}
```

#### Callbacks (for UI component)

```swift
public struct CoreConfig {
    weak var delegate: PaymentDelegate?
}

// createOrder/onApprove/onError callbacks for our UI components
public protocol PaymentDelegate {
    func createOrder(_ sender: PaymentUIComponent, action: CreateOrderAction)
    func onApprove(_ sender: PaymentUIComponent, data: OrderData, action: ApprovalAction)
    func onError(_ sender: PaymentUIComponent, data: ErrorData)
}
```

#### Order actions

```swift
public class CreateOrderAction {
    public func create(order: Order, completion: (String?) -> Void)
    public func completion(orderID: String?)
}

public class ApprovalAction {
    public func authorize(orderId: String, completion: (Result<OrderData, ErrorData>) -> Void) {}
    public func capture(orderId: String, completion: (Result<OrderData, ErrorData>) -> Void) {}
}
```
