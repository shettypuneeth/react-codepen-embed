# react-codepen-embed

React component for embedding pens from [`Codepen.io`](https://codepen.io)

## Installation

```bash
#using npm cli
npm install --save react-codepen-embed

#using yarn
yarn add react-codepen-embed
```

## Usage

```javascript
import React from "react";
import Codepen from "react-codepen-embed";

const CodepenEmbedded = () => {
  return <Codepen hash="JyxeVP" user="shettypuneeth" />;
};
```

## Component Props

| Property   | Type      | Required | Default      | Description                                                    |
| ---------- | --------- | -------- | ------------ | -------------------------------------------------------------- |
| hash       | `string`  | `true`   |              | Id of the pen to embed                                         |
| user       | `string`  | `true`   |              | Codepen username                                               |
| height     | `number`  | `false`  | `300`        | Height of the pen                                              |
| loader     | `element` | `false`  |              | Loader to render while the pen is being embedded or errors out |
| defaultTab | `string`  | `false`  | `css,result` | Default tab to display                                         |
| themeId    | `string`  | `false`  | `dark`       | Theme for the pen                                              |
| preview    | `boolean` | `false`  | `true`       | Make the preview "Click-to-Load"                               |
| editable   | `boolean` | `false`  | `true`       | Can edit code                                                  |
| title      | `string`  | `false`  |              | Title of the pen                                               |

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

If the embed fails then the loader component will receive an error prop

```js
const Loading = props => {
  if (props.error) {
    return <div>Error</div>;
  }
  return <div>Loading...</div>;
};
```
