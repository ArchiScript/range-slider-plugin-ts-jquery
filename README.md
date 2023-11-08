
# Range-slider-plugin 

*... makes choosing smoothing*


![GitHub repo size](https://img.shields.io/github/repo-size/ArchiScript/range-slider-plugin-ts-jquery?logo=github)&nbsp;![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ArchiScript/range-slider-plugin-ts-jquery?logo=github)&nbsp;![GitHub language count](https://img.shields.io/github/languages/count/ArchiScript/range-slider-plugin-ts-jquery?logo=github)&nbsp;![Static Badge](https://img.shields.io/badge/pattern-MVP-blue)




&emsp;The Range Slider Plugin is a flexible and customizable slider  component for web applications. It allows users to select a range of values or a single value within a specified range.
&emsp; The project is written in typescript for JQuery and uses an MVP pattern with passive view.(see [Diagram](#structure-details))
&#10;
&#10;
## Features

- **Range Selection:** Users can select a range of values by dragging the slider thumbs.
- **Customization:** The plugin is highly customizable, allowing you to adjust the appearance and behavior to fit your needs.
  
- **Tooltip Support:** You can enable tooltips, and tooltip form to display the selected values.
- **Tick Marks:** Add tick marks to indicate specific values along the slider. The Ruler is adjustible to max and min values with an option to set the actual tick step.
- **Orientation:** Choose between horizontal and vertical orientations.

- **Reversed order:** On demand a reversed order option is available.
- **String values** Set your own string representation of values. The option also sets the actual data-value as string.
  

## References


- **[Watch Range Slider on GitHub Pages][gh-pages]**
 - **[Skomarohov Arthur - GitHub source code][repo]**

&#13;
&#13;

## Build details

**Node version:** `v18.12.1`

**Webpack version:** `^5.75.0`


**Development dependencies:**

```
"@babel/plugin-transform-typescript": "^7.22.5",
    "@babel/preset-env": "^7.22.5",
    "@babel/preset-typescript": "^7.21.5",
    "@types/chai": "^4.3.5",
    "@types/jquery": "^3.5.16",
    "@types/jsdom": "^21.1.1",
    "@types/lodash": "^4.14.198",
    "@types/mocha": "^10.0.1",
    "@types/sinon": "^10.0.20",
    "@typescript-eslint/eslint-plugin": "^5.59.11",
    "babel-loader": "^9.1.2",
    "chai": "^4.3.7",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^8.43.0",
    "eslint-config-standard-with-typescript": "^35.0.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-n": "^15.7.0",
    "eslint-plugin-promise": "^6.1.1",
    "html-loader": "^4.2.0",
    "html-webpack-plugin": "^5.5.3",
    "jquery": "^3.7.0",
    "jsdom": "^22.1.0",
    "mini-css-extract-plugin": "^2.7.6",
    "mocha": "^10.2.0",
    "playwright": "^1.36.2",
    "postcss": "^8.4.24",
    "postcss-loader": "^7.3.3",
    "postcss-preset-env": "^8.5.0",
    "puppeteer": "^20.9.0",
    "sass": "^1.63.4",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3",
    "webpack": "^5.87.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
```

## Installation

```
npm install
 ```
**Server start:**
```
npm run start
```
**Project build:**
```
npm run build
```
**Publish:**
```
npm run deploy
```

**Test:**
```
npm run test
```
&#13;
&#13;

## Use  !!!! NOT FINISHED)



On downloading the source files import the plugin jquery wrapper

```
import "rangeSlider/plugin-wrapper/plugin-wrapper";  (!!!! NOT FINISHED)
```
```JavaScript
$(".container-1").rangeSlider({
      max: 800,
      value: [100, 250],
      min: 50,
      step: 20,
      doublePoint: true,
      stringValues: ["small", "medium", "large", "giant"],
      orientation: "vertical",
      reversedOrder: true
    });


$(".container-2").rangeSlider({
      max: 1200,
      value: [320, 950],
      tickStep: 200,
      doublePoint: true,
      thumbSize: 15,
      trackHeight: 6,
      tooltipColor: "#51B7A9FF",
      fillColor: "#51B7A9FF",
      thumbColor: "#51B7A9FF",
      tickBar: false
    });    
```
![rs-vertical](src/assets/images/rs-vertical-readme.png)![rs-vertical](src/assets/images/rs-horizontal-readme.png)




## Options 


**value** ```number | number[]``` 

Setting value makes plugin to initiate with the predefined value

```JS 
value: 200
```

In case of range values, when user wants to choose between start and end values, an array of values should be provided

```JS
value: [100,450]
```
Making range values also requires to set a **doublePoint** option to ```true```
&#13;
&#13;

**doublePoint** ```boolean``` 

```JS
doublePoint: true
```
&#13;
&#13;

**orientation:** ```"horizontal" | "vertical"```

The orientation option sets the vertical or horizontal position of the plugin

```JS
orientation: "horizontal"
```
&#13;
&#13;



## Structure details
<details>
  <summary><b>Project folder structure</b></summary>
  <pre>
  src
    ├───assets
    │   ├───favicons
    │   ├───fonts
    │   ├───images
    │   └───styles
    ├───components
    ├───ConfigService
    ├───models
    ├───plugin-wrapper
    ├───presenters
    ├───test
    ├───types
    │   ├───IConfigurationService
    │   ├───IModels
    │   ├───IPresenters
    │   └───IViews
    └───views
  </pre>
</details>


<details>
  <summary><b>Project class diagram</b></summary>
  
 ![UML](src/assets/images/UML2.svg)
  
</details>



[repo]: https://github.com/ArchiScript/range-slider-plugin-ts-jquery.git
[gh-pages]: https://archiscript.github.io/range-slider-plugin-ts-jquery/
