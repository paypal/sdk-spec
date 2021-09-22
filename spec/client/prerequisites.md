# Prerequisites

Before integrating with the PayPal Android, iOS, or Web SDKs, you will first need to set up authorization. 

## PayPal Developer Account

Create a free PayPal Developer Account by selecting `Log in to Dashboard` on the [PayPal Developer site](https://developer.paypal.com/home/).

## Get API Credentials

Your API credentials are a `client ID`, which authenticate API requests from your account. To get the credentials:
- Log in to the Developer Dashboard with the account created above.
- Under the `DASHBOARD` menu, select `My Apps & Credentials`.
- Make sure you're on the Sandbox tab to get API credentials for PayPal's development environment. After you test and verify your app's integration, switch to the Live tab to get credentials for production. 
- In the `REST API apps` section in the `App Name` column, select `Default Application`, which PayPal creates with a new Developer Dashboard account. If `Default Application` does not exist, select `Create App` to create a new test application.
- The application details page displays your API credentials, including your `client ID` and `secret`.

Use this `client ID` when initializing the SDK.

## Unbranded Cards

To accept unbranded card payments in your application, a few additional setup steps are required.

### Enable Advanced Card Payment Processing

Follow the instructions [here](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/#1-enable-your-account) to request advanced debit and credit card processing for your account. This request will be automatically approved for the Sandbox environment.

### Sandbox Test Application

Create a new Sandbox application within your PayPal Developer Account by selecting `Create App` in the `REST API apps` section. 
To process unbranded card payments, set the application type to `Platform`.

## Getting Started Specs
- [Android Getting Started](./android/GETTING_STARTED.md)
- [iOS Getting Started](./ios/GETTING_STARTED.md)
- [Web Getting Started](./javascript/GETTING_STARTED.md)