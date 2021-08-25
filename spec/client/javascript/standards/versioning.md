# Versioning

## Intro

PayPal's JS-SDK takes an "evergreen by default" approach to versioning. This means:

1. There is a single script tag you load to invoke the SDK
   - For example `<script src="https://www.paypal.com/sdk/js?client-id=xyz"></script>`
   - If you load the SDK via NPM, this script tag is dynamically loaded for you
2. If you have a blocking reason to lock to a specific version of the SDK, you may request approval to pin the version
   - For example `<script src="https://www.paypal.com/sdk/js?client-id=xyz&version=5.0.23"></script>`
   - If you load the SDK via NPM, you may pass `version: '5.0.23'` when initializing the SDK
3. If your objective is to retain maximum control, you are recommended to follow the API-only PayPal integration

## Rationale

Evergreen is intended to:

1. Give you the best possible integration experience. You will get the latest code at any given time, without needing to manually upgrade and deploy new versions of your site or web app.
2. Give your buyers the best possible experience, with the best possible performance, and the most streamlined user experience.
3. Allow bug fixes, security fixes, and legal/regulatory/compliance fixes to be automatically made and applied instantly

## Guarantees

Evergreen guarantees that:

1. No backwards incompatible changes will ever be made to the public interface of the SDK. Integrate once, with no requirement that you tweak your code in future to keep it working.
2. No changes will be made that will break or disrupt the user experience on your site. For example:
   - Inline components will take only the amount of space you decide to give to them
   - Modal or popup components will only display after a user chooses to interact with PayPal

Within the evergreen JS-SDK, different components give slightly different guarantees. For example:

- Branded components, e.g. the PayPal or Venmo buttons, may have tweaked branding in future. For example, if the PayPal logo changes, you may see an updated PayPal logo appearing in the button on your site.
- Certain components offer more control, others offer more dynamic behavior. You may choose which you want to use. For example:
   - Standalone buttons guarantee that only the buttons you choose to render, will be rendered
   - Smart buttons allow PayPal to decide on the optimal buttons to show your buyer
   - Hosted card fields will match the design, and look and feel of your site
   - Different components have different customization options, including color, shape, size, and so on.

## Performance

Along with bug fixes, security fixes, and so on, the evergreen JS-SDK offers a better performance guarantee than statically versioned SDKs. This is achieved by:

1. When the SDK is first loaded on your site, we identify your PayPal account, the sdk components you have requested, the details you have passed (for example currency code and locale) 
2. We use these details to generate an SDK that is specific to your site, and to the current buyer. For example:
   - A buyer browsing from the US may get an SDK with the code for PayPal and Venmo
   - A buyer browsing from Germany may get an SDK with the code for PayPal and SEPA (but not Venmo)
3. We send this SDK to your buyer's browser. The SDK size is smaller since only the code you and your buyer needs is loaded
4. We instantly render interactive components (for example, payment buttons). This means the buyer does not need to wait for additional resources to be loaded before they can use PayPal or other payment methods.
5. Anything that can be loaded lazily, without impacting the initial performance of getting the page rendered, will be loaded lazily.

This approach to performance is not possible with traditional statically versioned scripts.

## Static Version

There may still be reasons you want to pin the version of the SDK. For example: you have strict compliance requirements that all new code is vetted before it reaches your site.

PayPal offers an approach to pinning the version, either by passing the requested version to the SDK script tag, or passing the version when loading the SDK via NPM.

### What this achieves

- The JS-SDK, the surface layer of the PayPal integration, will be locked to a specific version
- No new code will run on your site until you choose to manually upgrade the SDK version parameter

### What this does not achieve

- Anything downstream of the JS-SDK will not be versioned. This includes:
  - Any APIs called by the SDK
  - Any iframes rendered by the SDK, and any user experience or code rendered inside those iframes
  - Any popup windows rendered by the SDK, and any user experience or code rendered inside those popup windows
- The rendering of the PayPal buttons is not controlled by the SDK version and may change
  - For example, branding changes may still automatically appear
- The post-click experience of the PayPal buttons is not controlled by the SDK version 
  - For example, users may be routed to different experiences, e.g. to the PayPal native app rather than the web checkout experience
  - Users will also be offered more features post-click, as they are built out and enabled by PayPal
- New features that are opt-in will still require you to opt-in and use the new feature. Upgrading a minor version will not automatically enable new features that you do not expect that may break your integration or your buyer experience.
- Version locking does not allow subresource integrity to be used with the script tag, as even versioned scripts are dynamically compiled so as to only ship the right code to the right buyers
- Version locking does not allow the script to be hosted outside of PayPal servers, given that it is dynamically compiled and bundled for each buyer.

In reality, this means that the JS-SDK is the "tip of the iceberg", with the bulk of the iceberg being unversioned behind the SDK. If your reasons for wanting to pin the version of the SDK are:

- To avoid any possible future changes to the buyer experience
- To avoid 100% of live issues
- To be guaranteed of an opportunity to opt-in to new features
- To be able to host the SDK yourself or run subresource integrity

-- in these cases, version locking may not be the correct solution for your site.

## Live issues

With the evergreen JS-SDK, any live issues are fixed across all merchants at once. Merchants integrated with the evergreen version typically have heightened priority for any live issues, since any such issue is likely to affect the largest number of buyers, and as such mitigation is the highest priority.

With the locked-version of the JS-SDK, high priority issues will be fixed according to a timeline dependent on the severity of the issue. Certain issues may require an upgrade to a newer version of the SDK.

A real world example of this could be:

- A browser vendor like Chrome, Safari or Firefox makes a change which prevents 1% of buyers from checking out on PayPal
- The evergreen version of the JS-SDK is rolled out at the highest possible priority to resolve the issue
- Locked versions of the JS-SDK with the issue are investigated, fixed if possible, and if not possible, merchants using the pinned version are asked to upgrade.
- Newer locked versions are prioritized over older locked versions for any automatic fixes.

In this kind of case, evergreen ends up guaranteeing additional stability and protection from live issues.

## API Integration

For merchants who have blocking concerns about running a javascript integration, PayPal continues to offer an API-only integration. This may be more appropriate for many merchants than locking the version.

In this model, you are responsible for rendering any of the user-experience on your site, including buttons, card fields, etc. You can then call the PayPal API to pass data, or to set up a transaction and redirect the user to PayPal.

This integration style provides the core PayPal functionality, but does not offer many of the additional features offered by the JS-SDK.

## Major Versions

At certain points, PayPal does a major version upgrade of SDKs. For example, changing `https://www.paypal.com/sdk/js` to `https://www.paypal.com/v2/sdk/js`.

- This is likely to be reasonably rare
- Existing major versions will continue to function and will never be turned off
- This will happen when large parts of functionality need to be deprecated and cleaned up, or when there is a major paradigm shift in terms of how the PayPal integration works, which APIs are invoked, and so on.
- Buyer-facing changes may still be made on old major versions even after a new major version has been released
- Merchant or developer-facing changes are likely to only be made on the latest major version of the SDK.

## Other layers

Different layers at PayPal offer static versioning, other layers do not, depending on the use-case. For example:

- JS-SDK:
  - Major version by default.
  - Evergreen minor versions.
  - Version locking available for minor versions, but not encouraged.
- Native-SDK:
  - Major/Minor versions by default
  - All version changes require a new app release
- API:
  - Major versions by default
  - Minor versions not available
- Buyer Experiences:
  - Unversioned
  - Latest code and latest experience only