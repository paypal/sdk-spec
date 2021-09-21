## Core spec

#### CoreConfig

```swift
// Contains shared data that applies to every payment method
public struct CoreConfig {
    let clientID: String
    let environment: Environment
}
```

```kotlin
data class CoreConfig(
    val clientID: String,
    val environment: Environment
)
```

#### Models

```swift
public class Order {
    var intent: Intent
    var purchaseUnits: [PurchaseUnit]
}

public class OrderData {
    var orderID: String
    var status: OrderStatus
    var paymentSource: PaymentSource?
}

public class ErrorData {
    var error: SDKError
    var orderID: String?
    var sdkVersion: String
}

public enum SDKError: Error {
    case networkError(metaData: [String: Any], correlationID: String)
    case decodingError
    ...

    var errorCode: Int
    var errorUserInfo: [String: Any]
}
```

```kotlin
sealed class Result {
    class Success(
        val orderData: OrderData,
    ) : Result()

    class Failure(
        val errorData: ErrorData
    ) : Result()
}

data class OrderData(
    val orderID: String,
    val status: OrderStatus,
    val paymentSource: PaymentSource?
)

data class ErrorData(
    val error: SDKError,
    val orderID: String?,
    val sdkVersion: String
)

sealed class SdkError(
    val errorCode: Int,
    val errorUserInfo: Map<String, Any>
) {

    class NetworkError(
        errorCode: Int,
        errorUserInfo: Map<String, Any>,
        val metadata: Int,
        val correlationID: String
    ) : SdkError(errorCode, errorUserInfo)

    class DecodingError(
        errorCode: Int,
        errorUserInfo: Map<String, Any>,
    ) : SdkError(errorCode, errorUserInfo)

    ...
}
```
