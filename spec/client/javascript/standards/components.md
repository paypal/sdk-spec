# Components

## Types

- UX Components
  - Visual and interactive
  - e.g. Buttons, Card Fields, Marks
- Data Functions
  - Accept data, do something, return data
  - No associated UX
  - e.g. API wrapper functions
- Constants/Enums
  - Logical grouping of values
  - e.g. available payment types

## UX Components

- Accept props (all data types - strings, objects, functions, etc.)
- Accept container element
- Return promise for render
- Separate renderable for each composable piece of UX
- Each component wrappable in React, Vue, etc.
- Pass in styles
- Responsive sizing by default
- Iframes by default

### Examples

#### Basic

```javascript
paypal.Component({
    foo: 'bar'
}).render('#container');
```

#### Props

```javascript
paypal.Component({
    foo: 'bar',
    baz: {
        hello: 'world'
    },
    onSomething: () => {
        console.info('something')
    }
}).render('#container');
```

#### Styling

```javascript
paypal.Component({
    style: {
        color: 'red',
        height: '55px'
    },
    foo: 'bar'
}).render('#container');
```

#### Operations

```javascript
const component = paypal.Component({
    foo: 'bar'
});

// Render
component.render('#container');

// Close
component.close();

// Clone
component.clone().render('#different_container');

// Custom operation
component.doCustomThing();
```

#### Promise

```javascript
paypal.Component({
    foo: 'bar'
}).render('#container').then(component => {
    console.info('Component successfully rendered');
}).catch(err => {
    console.error('Component render errored:', err)
});
```

#### Async/await

```javascript
try {
    const component = await paypal.Component({
        foo: 'bar'
    }).render('#container');

    console.info('Component successfully rendered');
} catch (err) {
    console.error('Component render errored:', err)
}
```

#### React

```javascript
return (
    <paypal.Component foo={ bar } />
);
```

```javascript
const componentRef = useRef();

return (
    <paypal.Component ref={ componentRef } foo={ bar } />
);
```

#### Vue

```vue
<paypal-component foo='bar'></paypal-component>
```

#### Web Component

```html
<paypal-component foo='bar'></paypal-component>
```

### Multi-child components

- __TBD__
- https://github.com/paypal/paypal-sdk-spec/discussions/11

## Data Functions

- Re-usable functions
- Return value for synchronous operations
- Return promises for asynchronous operations

### Examples

#### Basic

```javascript
paypal.operation({
    token: 'xyz'
});
```

#### Synchronous

```javascript
try {
    const value = paypal.operation();
    console.info('Success:', value)
} catch (err) {
    console.error('Error:', err);
}
```

#### Promise

```javascript
paypal.operation().then(value => {
    console.info('Success:', value);
}).catch(err => {
    console.error('Error:', err);
});
```

#### Async/await

```javascript
try {
    const value = await paypal.operation();
    console.info('Success:', value)
} catch (err) {
    console.error('Error:', err);
}
```

## Constants/Enums

- Capitalized names
- Values are opaque to developer
- Can be used with either UX components or data functions

### Examples

#### Basic

```javascript
paypal.COUNTRY.US
```
