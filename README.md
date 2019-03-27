# ts-react-codepen-embed

[![NPM](https://img.shields.io/npm/v/ts-react-codepen-embed.svg)](https://www.npmjs.com/package/ts-react-codepen-embed)

React component for embedding pens from [`Codepen.io`](https://codepen.io), with responsive height and ability to embed multiple pens in the same page this time

## TL;DR

This is a fork of [shettypuneeth/react-codepen-embed](https://github.com/shettypuneeth/react-codepen-embed), which is a great library to embed our Codepen project as a Component in our React app.

However, I need the following few features as well so I had decided to work on top of the above:
- [ ] Responsive Height for the embedded pens 
    - So that the height is proportional to the window width and, in my humble opinion, looks better
- [x] Allowing the embedding of multiple pens without firing the Codepen scripts multiple times
    - Otherwise some of the scripts would fail and refuse to render
- [x] Migrate the source to [TypeScript](https://www.typescriptlang.org/) 
    - Personal preference but I think TypeScript rules :-)
- [ ] Added automated tests coverage
    - [Let me Google that for you: automated tests importance](http://lmgtfy.com/?q=automated+tests+importance)
- [ ] [Reinventing the wheel](https://en.wikipedia.org/wiki/Reinventing_the_wheel)

## Installation

```bash
#using npm cli
npm install --save ts-react-codepen-embed

#using yarn
yarn add ts-react-codepen-embed
```

## Usage

```javascript
import React from "react";
import Codepen from "ts-react-codepen-embed";

const CodepenEmbedded = () => {
  return <Codepen hash="JyxeVP" user="shettypuneeth" />;
};
```

## Component Props

| Property         | Type      | Required | Default      | Description                                                    |
| ---------------- | --------- | -------- | ------------ | -------------------------------------------------------------- |
| hash             | `string`  | `true`   |              | Id of the pen to embed                                         |
| user             | `string`  | `true`   |              | Codepen username                                               |
| height           | `number`  | `false`  | `300`        | Height of the pen                                              |
| loader           | `element` | `false`  |              | Loader to render while the pen is being embedded or errors out |
| defaultTab       | `string`  | `false`  | `css,result` | Default tab to display                                         |
| themeId          | `string`  | `false`  | `dark`       | Theme for the pen                                              |
| preview          | `boolean` | `false`  | `true`       | Make the preview "Click-to-Load"                               |
| title            | `string`  | `false`  |              | Title of the pen                                               |
| shouldLoadScript | `boolean` | `false`  | `true`       | To load the codepen embed script or not                        |
| overrideAsLoaded | `boolean` | `false`  |              | To override the `loaded` state                                 |

## API

#### `Props.loader`

Compenent to render when the pen is being embedded or when it errors.

```js
<Codepen
  hash="JyxeVP"
  user="shettypuneeth"
  loader={() => <div>Loading...</div>}
/>
```

The loader component will receive a ```isLoading``` prop when it is, obviously, loading

```js
const Loading = props => {
  if (props.isLoading) {
    return <div>Loading...</div>;
  } 
};
```

If the embed fails then the loader component will receive an ```error``` prop

```js
const Loading = props => {
  if (props.error) {
    return <div>Error</div>;
  }
  return <div>Loading...</div>;
};
```

## Acknowledgement

This repository is forked from [shettypuneeth/react-codepen-embed](https://github.com/shettypuneeth/react-codepen-embed) so kudos to [shettypuneeth](https://github.com/shettypuneeth). :) 
