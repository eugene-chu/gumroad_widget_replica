# Gumroad Overlay Widget Replica

This is an attempt to recreate the Gumroad Overlay Widget.

## Overview and Functionality

The original Gumroad widget scans the entire page for all valid Gumroad links, and attempts to link them to the valid product, if available. Afterwards, it creates a single inline popup that displays the item so that the user does not have the leave the current website to browse and purchase the product. The inline popup is an `iframe`, soruced to the Gumroad product page. This allows sellers to sell their Gumroad product on their own website, without redirecting potential customers away.

And this is my attempt at mimicking this functionality

## Implementation and Process

I also used `iframe` to pull up the product page, because I recognize the critical functionality Gumroad is offering for their sellers. The ability to sell their products on their website. I created a basic nodejs server and React frontend with few hardcoded links. All except for one of the links leads to a valid Gumroad product. Then I created a React component called Widget. This is my attempt to condense all the logic needed into a single file. Widget is an `iframe` that when passed a valid productID, will generate the Gumroad product page, as an inline popup. Styled with styled-component, the incline popup looks very similar to the Gumroad Widget. Any non-Gumroad product links will behave like normal. Overall, I did take me roughly an hour to write out the code here. But it took me longer than 4 hours total, because I had never used `iframe` before. Even after I got the base code down, I continue to do look into way to make it look and feel exactly like a Gumroad Widget.

## Close, but not quite

The things I was not able to implement during my time working on this:
 - A custom CSS styled button for all Gumroad product links
 - The loading spinner that appears after you click on a link and after `iframe` loads.
 - A dynamic adjusting `iframe`, after a link is clicked.
 - Limiting the `iframe` to show only the div with the class`product-page__container`, as opposed to the full site
   - More specifically the `div` with the class `product-row`

I could not get to work on the custom CSS button is due to time constraint and priorities. The custom CSS was on my lowest priority, because I wanted to make sure the `iframe` looked and feel just like the original Widget. If I had a chance to redo this, I would complete the CSS after I got the basic `iframe` setup, I would then setup the custom CSS button. And finally going back and finishing up the look of `iframe`.

The loading spinner was in the same boat as the CSS button. Again, after I got the basic setup, I would instead add a basic spinner that goes off after an onclick event. And the spinner would hide after the `iframe` onload event triggers. I would use a basic spinner because I do not have direct access to Gumroad's assets.

I attempted to figure out the last two, and I think I am missing a few critial pieces to make it work. To my understanding, I needed to setup a `window.eventlistener` in my App.js file (which I attempted to do), and add a script to tell `iframe` to run `postMessage` (also attempted to do). The `iframe` element would be under something like `document.getElementById('iframeID').contentWindow`. Because I am using React and .jsx files, I try to add an `onLoad` event to the Widget component. The `onLoad` would trigger a function `iFrameLoaded`, that would take the event as a parameter. This event parameter would contain the `iframe` element itself. And inside the function, I would call `postMessage` directing the `targetOrigin` back to the parent window (my own address). Back in App.jsx, I would check the source I am receiving from, to make sure it is from my own address (because I am not working within the same origin). I did get the `window.eventlistener` to work, but I could not got `iFrameLoaded` to send a message back to the parent. 

### Example of how I would have set up postmessage
```
// App.js (setup in ComponentDidMount)
window.eventListener('message', event => {
  if(event.origin !== 'my-address'){
    return;
  }
  // do something with data receive in event.data
})

// --------------------------------------------------

// Widget (after iframe onload event triggers)
const iFrameLoaded = (event) => {
  let iframe = event.target.contentWindow;
  iframe.postMessage( //passing information back to the parent );
}
```

If I was able to get it to work, I would have try to grab the height of the container and pass that back to the parent, so I can dynamically adjust the height of the `iframe` as it loads. Also, I would pass the `product-page__container` back to try and display it in the `iframe`. This would have been my approach to this problem.

Even if I did get the communication working, I am not sure if it will work as I wanted to. My reasoning is that `iframe` is displaying from `src`, so if I want to change the inside, I would need to change the source. To do that, I think I would have need to communicate with Gumroad's server, instead of trying to communicate between `iframe` and App.jsx. So even if I had go it working, I am not sure if I could've implement it more like the Widget.

## Improvemnts I could make

After reviewing it, I think I could do better with the structure of the JSX files. I should move a lot of the logics out of the App.jsx and into the Widget component. By doing this, I would also wrap all the links inside of the Widget component. This would be more in line with the original widget, where the widget finds all links in the document and marks the one that are for Gumroad products. As opposed to doing that search in App.jsx. I would also move the opening and closing logic into the Widget component as well. This would lead to assigning `onClick` handler events inside the Widget component, instead of having it hardcoded in each links. So in the end, if the Widget component is removed, it would be like removing the cdn script line for the Gumroad Widget.

Another thing I should've done was to test for valid Gumroad product IDs. So that if it was not valid, I would have set up some other logic to handle that; it could be showing a 404 error page or not loading `iframe` at all. I would also have like to set up a quick submission form to add more links on the page, for testing purpose. If I had restructure the logic correctly (mentioned above), I think having this form would help greatly for testing for valid links. I can input and add links as I go, instead of having to manually adding them into the App.jsx file.