# Checkout Shipping Change

Listen for changes in the buyer's preferred shipping address and/or shipping option, and update the shipping and tax totals for the transaction.

## Web - JavaScript

### Basic Callback

```javascript
paypal.Checkout({
    onShippingChange: function(data, actions) {
        console.log('The user changed shipping address!')
    }
}).render()
```

#### Data

- `orderID`: The orderID for the current transaction.
- `shipping_address`: The buyer's selected city, state, and postal code.
  - `city`: The buyer's city
  - `state`: The buyer's state
  - `postal_code`: The buyer's postal or zip code
  - `country_code`: The buyer's country code
- `selected_shipping_option`: Shipping option selected by the buyer.
  - `id`: The id of the shipping option

#### Actions

- `order`
  - `patch`: Patch the current transaction with new shipping and tax totals
- `reject`: Reject the shipping address and shipping option selected by the buyer

#### Return

- `?Promise`
  - Return a `Promise`, or `undefined`. The buyer's checkout page will update once the promise has resolved, if a promise is passed.

### Patch the transaction shipping/tax

- In `onShippingChange`, call [Order Patch](https://developer.paypal.com/docs/api/orders/v2/#orders_patch) api to update the shipping and tax totals for the transaction.
  - If using [v2/orders](https://developer.paypal.com/docs/api/orders/v2), call from either your client or your server
  - If using any other api, call from your server

#### From your client

```javascript
paypal.Checkout({
    onShippingChange: function(data, actions) {
        return actions.order.patch([
            {
                op: 'replace',
                path: '/purchase_units/@reference_id=="default"/amount',
                value: {
                    currency_code: 'USD',
                    value: '12.00',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '10.00'
                        },
                        shipping: {
                            currency_code: 'USD',
                            value: '2.00'
                        }
                    }
                }
            }
        ]);
    }
}).render()
```

#### From your server

```javascript
paypal.Checkout({
    onShippingChange: function(data, actions) {
        return fetch('https://my-server.com/api/paypal/update-shipping-totals', {
            body: JSON.stringify({
                orderID: data.orderID,
                address: data.shipping_address
            })
        });
    }
}).render()
```

### Reject buyer's shipping address

```javascript
paypal.Checkout({
    onShippingChange: function(data, actions) {
        if (data.shipping_address.country !== 'US') {
            return actions.reject();
        }
    }
}).render()
```