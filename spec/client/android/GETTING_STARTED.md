## Getting Started - PayPal Android SDK

Welcome to [PayPal's Android SDK](https://github.com/paypal/android-sdk). This library will help you accept card, PayPal, Venmo, and alternative payment methods in your Android app.

## Support
The PayPal Android SDK is available for Android SDK 21+. See our [Client Deprecation policy](https://developer.paypal.com/braintree/docs/guides/client-sdk/deprecation-policy/android/v4) to plan for updates.

## Languages
This SDK is written in Kotlin and supports both Kotlin and Java integrations. See the [Java Demo App](<!-- TODO: link Java Demo app when created -->) and [Kotlin Demo App](https://github.com/paypal/Android-SDK/tree/main/Demo) for sample integrations. 

## Prerequisites
To use the PayPal Android SDK, you'll first need to [set up a PayPal Developer Account](../prerequisites.md#paypal-developer-account) and [obtain a `client ID`](../prerequisites.md#get-api-credentials).

## Including the SDK
You can support a specific payment method by adding its corresponding feature module as a dependency in your app's `build.gradle` file.
For example, to support both Card and PayPal payments in your app include the following:

```groovy
dependencies {
  implementation 'com.paypal.android:card:1.0.0'
  implementation 'com.paypal.android:paypal:1.0.0'
}
```

## Sample Code

<!-- TODO: - link to each component spec docs, once complete (spec/client/android/components/) -->

