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

## What tools support SCSS

SCSS support is strong within node-based build tools and task runners (gulp, grunt, etc) as well as within the Ruby/Rails ecosystem. A gulp-based example, using node-sass via gulp-sass, is included in this repository.

Many IDEs, including Visual Studio, have support for SCSS syntax highlighting and hinting. 

SCSS compilation can also be integrated into CI builds by invoking the SCSS compiler during build. In TFS 2015, using one of the existing gulp or grunt build tasks is recommended. (Note that, when using CI builds, the compiled CSS files should not be checked into source control).

## What are some of the key programming features SCSS provides?

### Variables

Variables are one of the easiest and most useful SCSS language features. Variables enable a DRY approach makes for code that is less error-prone and easier to maintain. Common uses for variables include colors, sizes, and font stacks. 

#### Declaration and use

Variables in SCSS always start with a $, and their assignment is very similar to CSS property assignment - variable name, followed by a colon, followed by the value, followed by a semi-colon;

For example, to assign the string "my value" to the variable $my-var: `$my-var: "my value";`

Variables may be placed inside a selector, in which case they are scoped to that selector (and any selectors nested within it). Variables declared outside a selector are effectively global.

To use a variable after it has been declared, simply insert it in place of a normal CSS value. 

##### Example

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

### Selector nesting

Descendant selectors (i.e. `.my-class .my-other-class {}`) are common in CSS, but can be painful to write, since the full selector has to be repeated in each rule. SCSS simplifies this by allowing selectors to be nested within other selectors. This again promotes a more DRY approach, and typically makes for more readable code.

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

Nested selectors may also extend their parent by using the & symbol. This is useful for creating modifier classes or styling pseudo elements/classes. 

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

#### Nested media queries

While CSS requires selectors to be contained within media queries, SCSS inverts this by allowing media queries to be nested within selectors. This structure is again more DRY than pure CSS and easier to read. 

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

Use selector nesting responsibly! Think carefully about the boundaries of your components, naming conventions, and specificity. Avoid monstrously-deep nesting, or creating new levels just to mimic the structure of HTML. 

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

### @import and partials

SCSS allows code to be split across multiple files and imported using the @import directive. Unlike the CSS @import directive, which typically initiates a new browser request for the specified file, the SCSS @import directive inserts the contents of the specified file at compile time. 

Files to be @imported are typically referred to a partials and start with an underscore. 

Partials and @import allow code to be organized in an easy-to-use manner on the file system, while still compiling out to a single file and thus avoiding the overhead of the pure CSS @import.

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

When splitting code across multiple files, it's often necessary to import the same partial into multiple other partials to enable IDE hinting features. From an IDE perspective, @import can feel like importing (or using) a namespace, but this can be deceptive - and dangerous. Remember that @import simply places the contents of the specified file at that point in the output. It does not know or care whether that file has already been included in the output. Consequently, multiple @imports can produce duplicate output. It's recommended to use a helper like https://github.com/wilsonpage/sass-import-once

### Inheritance/extension and placeholders

In many applications, chunks of rules are often repeated across multiple selectors. With pure CSS, these rules must be written into each selector. SCSS simplifies this by allowing selectors to extend, or inherit from, other selectors. Again, this promotes a DRY approach to development. 

To extend a selector, use the `@extend` directive.

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

Sometimes, you may have a set of rules that will be reused, but which don't actually need their own class. In this scenario, placeholders can be used. Placeholders are basically named rules that don't emit a class. To declare a placeholder, prefix an identifier with %. The syntax for using a placeholder is identical to inheritance.

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

### Mixins

Mixins are essentially functions that return CSS. Mixins can be used with or without arguments. With arguments, mixins are typically used to abstract and parameterize complex code generation (for example, CSS shapes). Without arguments, mixins are used in a manner somewhat similar to placeholders; however, while placeholders combine selectors into a single rule, mixins will insert their content into each selector.

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
    color: #fff;
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
  color: #fff;
}

.my-class {
  color: #000;
}

.my-other-class {
  color: #000;
}
```

### Loops, conditionals, and more

TODO

### Beyond SCSS: post-processors

Historically, a common use of SCSS mixins has been generating vendor-prefixed properties. A rule would include a mixin, which in turn would insert all the necessary vendor-prefixed properties and vendor-specific values. However, in recent years, this sort of functionality has migrated to post-processors like autoprefixer, which analyzes CSS code to identify properties that require vendor prefixes (using the caniuse.org database). The standard, non-prefixed CSS properties can therefore be used in the source files, and autoprefixer will add the vendor-prefixed versions when it us run in the build process.

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

TODO