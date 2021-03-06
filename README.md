# React Docs UI

A new UI for the React docs site. This is just a static build, using a _very_ simple toolchain.

- `npm i`
- `npm start`

## Design principles

- It follows design techniques inspired by AREA 17 – https://guides.area17.com/design-techniques/
- Everything sits on a `5px` baseline
- Stick to the major breakpoints as much as possible. Tweak-points can be created on a case-by-case basis.

## Dev notes

- Favour pixels over other units, so we can translate the design style, and utilise the baseline.
- Fonts sometimes have their baseline adjusted (`@include baseline`) using negative margins on ::pseudos
- `@include breakpoint("breakpoint-alias")` uses the aliases defined in `_variables.scss`, but directional versions of them, e.g. if there were three breakpoints, small, medium and large, there would be the following aliases available: `small`, `medium-`, `medium+`, `large`, `small-to-medium`, `medium-to-large`.
- Each breakpoint is actually a pixel _range_.
- Avoid "resetting" any values; often isolate with a media query
- Avoid `align-items: center` (or any kind of vertical centering) unless dictated by the design (where text needs to be of a dynamic height.) Otherwise, just use `padding-top`. This allows us to retain the baseline.

## TODO

- [ ] Subtle baseline fixes, nips and tucks
- [ ] Add current links to GitHub and v15.5.4
- [ ] Add a fast consistent transition to hovers
- [ ] Responsive article layout
- [ ] Sticky article side nav
- [ ] Homepage tabs
- [ ] Scroll-positioned current nav
- [ ] Follow nav for tutorial page
- [ ] Typography styles for tutorial
- [ ] Test design for other article instances
- [ ] Choose a free icon set / create icons from scratch
- [ ] SVG sprite
- [ ] Better alignment techniques for icons
- [ ] Add stylelint and either stylefmt or prettier?
- [ ] Browser testing (+ autoprefixer)
- [ ] Move over to Gatsby setup
