gulp-typson
===========

A simple and minimal wrapper around [typson](https://github.com/lbovet/typson) schema for gulp.

**Note:** This plugin generates one JSON file per typescript file read unless specified otherwise.

## Usage
~~~bash
npm install gulp-typson --save-dev
~~~

In your `gulpfile.js`

~~~js
const gulp = require('gulp');
const typson = require('gulp-typson);

gulp.task('typson', function () {
	return gulp.src('demo/*.ts')
		.pipe(typson({ pretty: true }))
		.pipe(gulp.dest('docs/'));
});
~~~

Want to merge all JSON files into one?

~~~js
const gulp = require('gulp');
const concat = require('gulp-concat-json');
const typson = require('gulp-typson);

gulp.task('default', function () {
	return gulp.src('demo/*.ts')
		.pipe(typson({ pretty: true }))
		.pipe(concat('docs.json'))
		.pipe(gulp.dest('docs/'));
});
~~~

## Options
* `pretty: boolean` set `true` to pretty print the JSON source.

~~~typescript
/**
* Thing that we sell.
*/
interface Product {
    /**
     * Uniquely defines the _product_
     * This must be unique, then
     */
    name: string;

    category: Category; // Classification

    /** Used for indexing */
    tags?: Tag[];

    /** Where it comes from */
    origin?: Object;

    /** Additional info */
    props: { [k:string]: string; };
}

interface Ordered {
    /** Position for sorting @type integer */
    order?: number;
}

interface Category extends Ordered {
    /** Uniquely identifies the category @pattern [A-Z][a-z][0-9]*/
    name: string;

    /** Classification level @minimum 1 @maximum 5 */
    level: number;
}

interface Tag extends Ordered {
    name: string;
}
~~~

Yields:

~~~json
{
    "Product": {
        "id": "Product",
        "type": "object",
        "description": "Thing that we sell.",
        "properties": {
            "name": {
                "description": "Uniquely defines the _product_\nThis must be unique, then",
                "type": "string"
            },
            "category": {
                "description": "Classification",
                "$ref": "#/definitions/Category"
            },
            "tags": {
                "description": "Used for indexing",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Tag"
                }
            },
            "origin": {
                "description": "Where it comes from",
                "$ref": "#/definitions/Object"
            },
            "props": {
                "description": "Additional info",
                "type": "object",
                "additionalProperties": {
                    "type": "string"
                }
            }
        },
        "required": [
            "name",
            "category",
            "props"
        ],
        "additionalProperties": false
    },
    "Ordered": {
        "id": "Ordered",
        "type": "object",
        "properties": {
            "order": {
                "description": "Position for sorting",
                "type": "integer"
            }
        },
        "additionalProperties": false
    },
    "Category": {
        "id": "Category",
        "type": "object",
        "properties": {
            "order": {
                "description": "Position for sorting",
                "type": "integer"
            },
            "name": {
                "description": "Uniquely identifies the category",
                "pattern": "[A-Z][a-z][0-9]",
                "type": "string"
            },
            "level": {
                "description": "Classification level",
                "minimum": 1,
                "maximum": 5,
                "type": "number"
            }
        },
        "required": [
            "name",
            "level"
        ],
        "additionalProperties": false
    },
    "Tag": {
        "id": "Tag",
        "type": "object",
        "properties": {
            "order": {
                "description": "Position for sorting",
                "type": "integer"
            },
            "name": {
                "type": "string"
            }
        },
        "required": [
            "name"
        ],
        "additionalProperties": false
    }
}
~~~

### Changelog

#### 1.0.0
* Initial release
