# Apple background mode specification

## Scope

Add an opt-in third color mode without changing the structure or layout of the
existing UI.

## Exact reference treatment

- Page ground: #000000
- Hero background: linear-gradient(#3c435e -50%, #000000 100%)
- Gradient band: clamp(330px, 28.75vw, 368px) with no repeat
- Gradient starts underneath the 88px header without moving hero content
- Header: translucent dark glass with 24px blur and 180% saturation
- Dark color scheme
- Existing warm blob/grid background layers are hidden in this mode so they do
  not alter the reference gradient.

## Interaction

The existing theme button cycles through the three modes. No new control is
added to the navigation and no existing mode behavior changes.
