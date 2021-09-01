# Checkout Rendering

Render the checkout experience as a global/modal experience in your app.

## Web - JavaScript

### Basic Render

```javascript
paypal.Checkout().render()
```

### Passing props

```javascript
paypal.Checkout({
    fundingSource: paypal.FUNDING.VENMO
}).render()
```
