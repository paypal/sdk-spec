# Getting Started - PayPal iOS SDK

Welcome to [PayPal's iOS SDK](https://github.com/paypal/ios-sdk). This library will help you accept card, PayPal, Venmo, and alternative payment methods in your iOS app.

## Support

The PayPal iOS SDK supports a minimum deployment target of iOS 13+ and requires Xcode 13+. See our [Client Deprecation policy](https://developer.paypal.com/braintree/docs/guides/client-sdk/deprecation-policy/ios/v5) to plan for updates.

### Package Managers
Include the PayPal SDK in your app via:

* [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html)
* [Swift Package Manager](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app)

### Languages

This SDK supports Swift 5.1+. This SDK is written in Swift.

### UI Frameworks
This SDK supports:

* UIKit
* SwiftUI

## Modularity

The PayPal iOS SDK is comprised of various submodules:
* `Card`
* `PayPal`
* ...

To accept a certain payment method in your app, you only need to include that payment-specific submodule.

## Sample Code

<!-- TODO: - link to each component spec docs, once complete (spec/client/ios/components/) -->
