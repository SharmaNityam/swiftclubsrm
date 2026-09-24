# Background mode behavior

## Apple mode

- The existing light and dark modes remain unchanged.
- The existing theme button cycles light → dark → apple → light.
- apple is stored in the existing theme local-storage key and is restored
  before first paint by the root layout script.
- The new mode sets the mobile browser theme color to #000000.
- Apple mode hides only the existing warm Blob and GridTexture background
  layers. Foreground content, cards, artwork, navigation, and spacing are not
  removed or rearranged.
- The Apple gradient is limited to a responsive 330–368px band, matching the
  live page's measured hero height instead of stretching across the club hero.
- The gradient begins behind the 88px site header; the header remains above it
  as glass while hero content keeps its existing position.
- The existing site header receives a translucent blur/saturation treatment in
  Apple mode.

## Reference values

The referenced Apple Developer page was inspected at
https://developer.apple.com/swift/whats-new/. Its visible dark page uses a
black body and this hero background:

    linear-gradient(rgb(60, 67, 94) -50%, rgb(0, 0, 0) 100%)
