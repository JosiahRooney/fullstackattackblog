---
path: '/css-modules-with-multiple-classes'
title: CSS Modules with Multiple Classes
date: '2019-03-05T19:35:50.715Z'
tags: ['css','javascript', 'css modules', 'instruction']
published: true
---

## CSS Modules

I've been struggling to think of topics to write about on my blog, and today had an ah-hah moment*. I can write about the technology I use at work and especially the problems I run into and how to solve them. That way I have nearly endless material to write about! 

<small>note: an ah-hah moment is when you finally discover the answer to a problem and you say "ah hah!", also known as a eureka moment.</small>

This week I have been working to implement [CSS Modules](https://css-tricks.com/css-modules-part-1-need/) in my React app at work. I wanted a more declarative approach to CSS that also had the benefit of not loading CSS that I am not using. CSS Modules allow you to access CSS via object dot notation and scope the CSS locally by default. Here is an example of CSS Modules:

#### Example.less

```less
.container {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

.cards {
  display: flex;
  justify-content: space-around;
}

.card {
  width: 25%;
}

.card__title {
  font-weight: bold;
}

.card__body {
  text-align: center;
}
```

#### Example.js

```javascript
// pretend there's a React component up here

return (
  <div className={styles.container}>
    <div className={styles.cards}>
      <div className={styles.card}>
        <h1 className={styles.card__title}>Lorem Ipsum</h1>
        <p className={styles.card__body}>Lorem ipsum doler sit amet</p>
      </div>
    </div>
  </div>
)
```

This renders as something like:

#### Example.html

```html
<div class="_styles__container_30103242">
  <div class="_styles__cards_30103242">
    <div class="_styles__card_30103242">
      <h1 class="_styles__card__title_30103242">Lorem Ipsum</h1>
      <p class="_styles__card__body_30103242">Lorem ipsum doler sit amet</p>
    </div>
  </div>
</div>
```

#### Example.css

```css
._styles__container_30103242 {...}
._styles__cards_30103242 {...}
._styles__card_30103242 {...}
._styles__card__title_30103242 {...}
._styles__card__body_30103242 {...}
```

The CSS is now scoped only to the component and is much easier to work with. Never again should you run into unforeseen changes due to global CSS!


## Hyphens and Multiple Class Names

One of the first problems I ran into immediately was writing elements with multiple class names. Say I have a button component with the classes of `btn btn-info disabled`. This wouldn't work:

```javascript
return (
  <button className={styles.btn styles.btn-info styles.disabled}>
    {props.btnText}
  </button>
)
```

I would get an error because className expects a single string, or something that renders into a string. This is where the [classnames utility](https://www.npmjs.com/package/classnames) comes in handy. It allows us to write classnames programmatically without a lot of overhead.

Install with:

`npm install classnames --save`

or

`yarn add classnames`

Now we can solve the problem of multiple classnames. We can also solve the problem of using hyphens with bracket notation. Instead of `style.btn-info` we would write `style['btn-info]`. It can be clunky to write a lot of code that way, but there are other alternatives available. Here is a button component example similar to what I would use at work including CSS modules, multiple classnames, and hyphenated classnames:

#### Button.less

```less
.btn {...}
.btn-info {...}
.btn-default {...}
.btn-warning {...}
.btn-danger {...}
```

#### Button.js

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Button.less'

const Button = (props) => {

  return (
    <button 
      className={cx(
        // first class
        styles.btn,

        // second class with hyphen
        styles[`btn-${props.type}`],
        
        // third class with conditional rendering. If props.disabled is 
        // false, it will not add the class to the component
        {
          [styles.disabled]: props.disabled
        }
      )}

      onClick={(e) => {
        props.onClick(e)
      }}>
      {props.btnText}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'info',
    'default',
    'warning',
    'danger'
  ]).isRequired,
  disabled: PropTypes.bool,
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
```
<br />

----

I hope this helped you get a feel for using multiple classes with CSS modules. There are probably better ways to accomplish this and I hope to learn them soon. If you have any tips for how to improve this approach or any other critique or feedback, feel free to leave a comment below or @ me on Twitter. Thanks for reading!