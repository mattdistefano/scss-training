# WSECU SCSS Lunch & Learn training

## What's in this repo?

SCSS training materials and code samples.

## What is SCSS?

SCSS is a toolset used to enhance CSS development by providing a CSS-like DSL that includes many more programming constructs than pure CSS supports, while still being able to compile down to pure CSS. SCSS incorporates some useful CSS-specific enhancements like selector nesting and inheritance, along with more traditional programming features like variables, loops, conditionals, and functions. 

Note that SCSS is *not* a runtime replacement for CSS, nor will it enable any runtime functionality not already supported by CSS. 

## Why would I want to use SCSS?

SCSS addresses many of the shortcomings of the CSS language. The developer experience of SCSS is typically more pleasant than working with pure CSS, and SCSS's enhanced language features promote good coding practices (DRY, modularity, etc) that can be difficult to achieve with pure CSS. And, because SCSS is an extension of CSS syntax developers are already familiar with, it's very easy to get started with.

## What does a SCSS workflow look like?

In a traditional CSS development model, the workflow looks something like this:

1. Developers author CSS files, using CSS language features only
2. CSS files are deployed to web server

Because SCSS requires a compilation step, the workflow is slightly more complicated:

1. Developers author SCSS files, using CSS and SCSS language features
2. SCSS files are compiled to pure CSS by build tools
3. Compiled CSS files are deployed to web server

(In a real production workflow, other post-processing steps would likely be present as well).

## What tools support SCSS?

SCSS support is strong within node-based build tools and task runners (gulp, grunt, etc) as well as within the Ruby/Rails ecosystem. A gulp-based example, using node-sass via gulp-sass, is included in this repository.

Many IDEs, including Visual Studio, have support for SCSS syntax highlighting and hinting. 

SCSS compilation can also be integrated into CI builds by invoking the SCSS compiler during build. In TFS 2015, using one of the existing gulp or grunt build tasks is recommended. (Note that, when using CI builds, the compiled CSS files should not be checked into source control).

## What are some of the key programming features SCSS provides?

### Variables

Variables are one of the easiest and most useful SCSS language features. Variables enable a DRY approach that makes code less error-prone and easier to maintain. Common uses for variables include colors, sizes, and font stacks. 

#### Declaration and use

Variables in SCSS always start with a `$`, and their assignment is very similar to CSS property assignment - variable name, followed by a colon, followed by the value, followed by a semi-colon;

For example, to assign the string "my value" to the variable $my-var: `$my-var: "my value";`

Variables may be placed inside a rule declaration, in which case they are scoped to that declaration (and any rules nested within it). Variables declared outside a rule declaration are effectively global.

To use a variable after it has been declared, simply insert it in place of a normal CSS value. 

Note that variables must be declared before they are used. It's recommended to place variables at the top of a SCSS file (or at the top of the rule declaration).

#### Example

SCSS:

```scss
$my-color: #000;
.my-class {
    color: $my-color;
}
```
    
Compiled CSS:

```css
.my-class {
    color: #000;
}
```

#### Interpolation

Variables may also be interpolated with the interpolation operator, `#{}`. Interpolation is not often required, but can be useful when using a variable to specify a CSS property. 

##### Example

SCSS:

```scss
$my-color: #000;
$my-side: "left";
.my-class {
    border-#{$my-side}-color: $my-color;
}
```
    
Compiled CSS:

```css
.my-class {
    border-left-color: #000;
}
```

#### Data types

SCSS supports a number of different data types - strings, colors, lists, numbers, booleans, etc - all of which can be assigned to variables.

### Nesting

Descendant selectors (i.e. `.my-class .my-other-class {}`) are common in CSS, but can be painful to write, since the full selector has to be repeated in each rule. SCSS simplifies this by allowing rules to be nested inside other rules. This again promotes a more DRY approach, and typically makes for more readable code.

#### Example

SCSS:

```scss
.my-class {
    color: #000;
    .my-other-class {
        color: #fff;
        a {
            color: #eee;
        }
    }
}
```
    
Compiled CSS:

```css
.my-class {
    color: #000;
}
.my-class .my-other-class {
    color: #fff;
}

.my-class .my-other-class a {
    color: #eee;
}
```

#### Parent selector

Nested rules may also extend their parent by using the `&` symbol. This is useful for creating modifier classes or styling pseudo elements/classes. 

##### Example

SCSS:

```scss
.my-class {
    color: #eee;
    
    &-modifier {
        color: #fff;
    }

    &:hover {
        color: #000;
    }

    &:before {
        color: #fff;
    }
}
```

Compiled CSS:

```css
.my-class {
    color: #eee;
}

.my-class-modifier {
    color: #fff;
}

.my-class:hover {
    color: #000;
}

.my-class:before {
    color: #fff;
}
```

Note that, when using the parent selector to produce a new selector, the compiled output does not generate the new selector as a descendant of the parent. This is a subtle difference between nesting and the parent selector. 

SCSS:

```scss
.my-other-class {
    color: #eee;
    &-modifier {
        color: #fff;
    }
    .my-other-class-other-modifier {
        color: #000;
    }
}
```

Compiled CSS:

```css
.my-other-class {
    color: #eee;
}

.my-other-class-modifier {
    color: #fff;
}

.my-other-class .my-other-class-other-modifier {
    color: #000;
}
```

#### Nested media queries

While CSS requires rules to be contained within media queries, SCSS inverts this by allowing media queries to be nested within rules. This structure is again more DRY than pure CSS and easier to read. 

##### Example

SCSS:

```scss
.my-class {
    color: #eee;
    @media screen and (max-width: 600px) {
        color: #fff;
    }
}
```

Compiled CSS:

```css
.my-class {
    color: #eee;
}

@media screen and (max-width: 600px) {
    .my-class {
        color: #fff;
    }
}
```
    
#### A word of caution

Use nesting responsibly! Think carefully about the boundaries of your components, naming conventions, and specificity. Avoid monstrously-deep nesting, or creating new levels just to mimic the structure of HTML. 

### Arithmetic operators

SCSS supports various arithmetic operators that make it easy to perform calculations on numeric values. 

#### Examples

 SCSS:
 
 ```scss
.ten-plus-five {
    width: 10px + 5px;
}

.ten-minus-five {
    width: 10px - 5px;
}

.ten-times-five {
    width: 10px * 5;
}

.one-third {
    width: (100%/3);
}

.one-third-ten-times-five {
    width: (10px * 5/3);
}
```

Compiled CSS:
 
 ```css
.ten-plus-five {
    width: 15px;
}

.ten-minus-five {
    width: 5px;
}

.ten-times-five {
    width: 50px;
}

.one-third {
    width: 33.33333%;
}

.one-third-ten-times-five {
    width: 16.66667px;
}
```

Note that division operations will often need to be wrapped in parenthesis to distinguish the slash from its other CSS usage.

### @import and partials

SCSS allows code to be split across multiple files and imported using the `@import` directive. Unlike the CSS `@import` directive, which typically initiates a new browser request for the specified file, the SCSS `@import` directive inserts the contents of the specified file at compile time. 

Files to be `@import`ed are typically referred to a partials and should always start with an underscore (the underscore instructs the SCSS compiler not to generate a css file for the partial). 

Partials and `@import` allow code to be organized in an easy-to-use manner on the file system, while still compiling out to a single file and thus avoiding the overhead of the pure CSS `@import`.

#### Examples

Partial 1 (SCSS):

```scss
$partial-1-color: #000;

.partial-1-class {
    color: $partial-1-color;
}
```

Partial 2 (SCSS):

```scss
$partial-2-color: #000;

.partial-2-class {
    color: $partial-2-color;
}
```

Importer (SCSS):

```scss
@import "partial-1";
@import "partial-2";
```

Compiled CSS:

```css
.partial-1-class {
    color: #000;
}

.partial-2-class {
    color: #000;
}
```

#### Gotchas

When splitting code across multiple files, it's often necessary to import the same partial into multiple other partials to enable IDE hinting features. From an IDE perspective, `@import` can feel like importing (or using) a namespace, but this can be deceptive - and dangerous. Remember that `@import` simply places the contents of the specified file at that point in the output. It does not know or care whether that file has already been included in the output. Consequently, multiple `@import`s can produce duplicate output. It's recommended to use a helper like https://github.com/wilsonpage/sass-import-once

### Inheritance/extension and placeholders

In many applications, similar styling will need to be applied to multiple elements with different selectors. With pure CSS, this can be addressed in a couple ways, neither ideal: the common properties can be factored out into a single rule with many selectors (difficult to read and maintain), or the properties can be repeated within each rule (breaks DRY). SCSS simplifies this by allowing rules to extend, or inherit from, other rules. 

To extend a rule, use the `@extend` directive.

#### Examples

SCSS:

```scss
.my-class {
    color: #fff;
}

.my-other-class {
    background-color: #000;
    @extend .my-class;
}
```

Compiled CSS:

```css
.my-class, .my-other-class {
    color: #fff;
}

.my-other-class {
    background-color: #000;
}
```

#### Placeholders

Sometimes, you may have a set of rules that will be reused, but which don't actually need their own class. In this scenario, placeholders can be used. Placeholders are basically named rules that don't emit a class. To declare a placeholder, prefix an identifier with `%`. The syntax for using a placeholder is identical to inheritance.

##### Examples

```scss
%my-placeholder {
    color: #fff;
}

.my-class {
    background-color: #000;
    @extend %my-placeholder;
}

.my-other-class {
    background-color: #eee;
    @extend %my-placeholder;
}
```

Compiled CSS:

```css
.my-class, .my-other-class {
    color: #fff;
}

.my-class {
    background-color: #000;
}

.my-other-class {
    background-color: #eee;
}
```

#### Gotchas

Because inheritance reorders your selectors, issues can arise when you have selectors of equal specificity and are relying on CSS's *last-in-wins* application of rules. Consider the following example:

```scss
.my-class {
    color: #fff;
}

.my-other-class {
    color: #000;
}

.my-other-class {
    @extend .my-class;
}
```

You might think `.my-other-class` would end up with a color of `#fff`, but the compiled CSS tells a different story:

```css
.my-class, .my-other-class {
    color: #fff;
}

.my-other-class {
    color: #000;
}
```

Also note that inheritance will include any child rules of the extended selector. In some cases, this may be exactly what you want - but in other cases, it can lead to unexpected code duplication or rules being overridden by the inherited rules.

SCSS:

```scss
.my-complex-class {
    color: #fafafa;
    .my-complex-class-child {
        color: #ddd;
        a {
            color: #ccc;
        }
    }
    &-modifier {
        color: #eee;
    }
}

.my-final-class {
    @extend .my-complex-class;
}```

CSS:

```css
.my-complex-class, .my-final-class {
  	  color: #fafafa;
}

.my-complex-class .my-complex-class-child, .my-final-class .my-complex-class-child {
    color: #ddd;
}

.my-complex-class .my-complex-class-child a, .my-final-class .my-complex-class-child a {
    color: #ccc;
}

.my-complex-class-modifier {
    color: #eee;
}
```

Note how `.my-final-class` picked up not only the immediate properties of `.my-complex-class` itself, but all of its descendants as well.

### Mixins

Mixins are essentially functions that return CSS. Mixins can be used with or without arguments. With arguments, mixins are typically used to abstract and parameterize complex code generation (for example, CSS shapes). Without arguments, mixins are used in a manner somewhat similar to placeholders; however, while placeholders will compile as a single declaration with multiple selectors, mixins will simply insert their content into the existing selector/declaration.

#### Example

SCSS:

```scss
@mixin circle($size) {
    width: $size;
    height: $size;
    border-radius: 50%;
}

.my-class {
    @include circle(10px);
}
```

Compiled CSS:

```css
.my-class {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
```

#### Mixins vs. Placeholders

SCSS:

```scss
@mixin black {
    color: #000;
}

%white-background {
    background-color: #fff;
}

.my-class {
    @include black;
    @extend %white-background;
}

.my-other-class {
    @include black;
    @extend %white-background;
}
```

Compiled CSS:

```css
.my-class, .my-other-class {
    background-color: #fff;
}

.my-class {
    color: #000;
}

.my-other-class {
    color: #000;
}
```

Note the difference in the compiled output.

### Loops and conditionals

SCSS supports both counter-based loops and iteration over list data types. Counter-based loops can be invoked with the `@for` directive, while `@each` can be used for lists. Both types of loops are typically used for code generation.

SCSS also provides two ways of implementing conditions: the `if()` function, and the `@if` directive. The `if()` function takes three arguments: the condition to be evaluated, the value to return when true, and the value to return when false. The `@if` directive inserts its content when its condition is truthy.

#### For loop

SCSS:

```scss
@for $i from 1 to 3 {
    .my-class-#{$i} {
        color: #fff;
    }
}
```

Compiled CSS:

```css
.my-class-1 {
    color: #fff;
}

.my-class-2 {
    color: #fff;
}
```

#### Each loop

SCSS:

```scss
@each $side in 'top', 'left', 'bottom', 'right' {
    .border-#{$side} {
        border-#{$side}: 1px solid #fff;
    }
}
```

Compiled CSS:

```css
.border-top {
    border-top: 1px solid #fff;
}

.border-left {
    border-left: 1px solid #fff;
}

.border-bottom {
    border-bottom: 1px solid #fff;
}

.border-right {
    border-right: 1px solid #fff;
}
```

Note the use of interpolation to build both the class and property name from a variable.

#### Conditionals

SCSS:

```scss
$is-black: true;

.my-class {
    color: if($is-black, #000, #fff);
}

.my-other-class {
    @if $is-black {
        color: #000;
    }
}
```

Compiled CSS:

```css
.my-class {
    color: #000;
}

.my-other-class {
    color: #000;
}
```

### Beyond SCSS: post-processors

Historically, a common use of SCSS mixins has been generating vendor-prefixed properties. A rule would include a mixin, which in turn would insert all the necessary vendor-prefixed properties and vendor-specific values. However, in recent years, this sort of functionality has migrated to post-processors like autoprefixer, which analyzes CSS code to identify properties that require vendor prefixes (using the caniuse.org database). The standard, non-prefixed CSS properties can therefore be used in the source files, and autoprefixer will add the vendor-prefixed versions when it is run in the build process.

#### Example

CSS:

```css
.my-class {
    transform: scale(1.5);
}
```

Post-processed with autoprefixer:

```css
.my-class {
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
}
```

Autoprefixer is included in the sample gulpfile.

## Further reading

http://sass-lang.com/documentation/file.SASS_REFERENCE.html
