# Prerequesites

Before integrating with the PayPal Android or iOS SDKs, you will first need to set up authorization. 

### PayPal Developer Account

Create a free PayPal Developer Account by selecting `Log in to Dashboard` on the [PayPal Developer site](https://developer.paypal.com/home/)

### Sandbox Test Application

Create a new sandbox application within your PayPal Developer Account by selecting `Create App`. 

### Authentication Credentials

In order to generate an access token for use in the SDK, you will need to provide the `client ID` and `secret` associated with your test app. These can be found by clicking on the sandbox application created in your PayPal Developer Account. 

### Generate Access Token

Send a POST request for an access token to `v1/oauth2/token` with your app's `client ID` and `secret` to generate an access token used to initiate the SDK.

### Unbranded Cards

In order to accept unbranded card payments in your application, a few additional setup steps are needed.

#### Enable Advanced Card Payment Processing

Follow the instructions [here](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/#1-enable-your-account) to request advanced debit and credit card processing for your account. This request will be automatically approved for sandbox.

#### Sandbox Test Application

In order to process unbranded card payments, the application type for your sandbox application must be `Platform`.

