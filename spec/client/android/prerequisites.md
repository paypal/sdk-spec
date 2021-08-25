# Prerequisites

Before integrating with the PayPal Android SDK, you will first need to set up authorization. 

### PayPal Developer Account

Create a free PayPal Developer Account by selecting `Log in to Dashboard` on the [PayPal Developer site](https://developer.paypal.com/home/).

### Get API Credentials

Your API credentials are a `client ID` and `secret`, which authenticate API requests from your account. To get these credentials:
- Log in to the Developer Dashboard with the account created above.
- Under the `DASHBOARD` menu, select `My Apps & Credentials`.
- Make sure you're on the Sandbox tab to get the API credentials you'll use while you're developing code. After you test and before you go live, switch to the Live tab to get live credentials.
- In the `REST API apps` section in the `App Name` column, select `Default Application`, which PayPal creates with a new Developer Dashboard account. If `Default Application` does not exist, select `Create App` to create a new test application.
- The application details page displays your API credentials, including your `client ID` and `secret`.

### Generate Access Token

Exchange your app's `client ID` and `secret` for an access token used to initiate the SDK.

Modify the following code by changing `CLIENT_ID` to your client ID and `SECRET` to your secret:
```bash
curl -v POST https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "CLIENT_ID:SECRET" \
  -d "grant_type=client_credentials"
```

### Unbranded Cards

In order to accept unbranded card payments in your application, a few additional setup steps are needed.

#### Enable Advanced Card Payment Processing

Follow the instructions [here](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/#1-enable-your-account) to request advanced debit and credit card processing for your account. This request will be automatically approved for sandbox.

#### Sandbox Test Application

Create a new sandbox application within your PayPal Developer Account by selecting `Create App` in the `REST API apps` section. 
In order to process unbranded card payments, the application type for your sandbox application must be `Platform`.

