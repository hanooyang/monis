# Monis
Simple service for API mock

## Quick Links
- [Install](#install)
- [Usage](#usage)
- [Getting Start](#getting-start)
- [Configuration](#configuration)
    - [JSON Configuration](#json-configuration)
    - [Javascript Configuration](#javascript-configuration)
        - [Basic Format](#basic-format)
        - [Mockjs Format](#mockjs-format)
        - [Return Code](#return-code)
        - [Route Parameter & URL Query](#route-parameter--url-query)


## Install
```bash
npm install -g monis
```
[⏫ go to top](#quick-links)

## Usage
```bash
monis [command] [options]
```
[⏫ go to top](#quick-links)

### Serve
```bash
monis serve -c monis.json -p 3001
```
#### port
- You can specify the server listening port by `-p, --port`.
- Monis will use `3001` as default port.

#### config
- Monis support `json` formated configuration & `javascript` which export a `json` configuration. 
- You can specify config file by `-c, --config`.
- It will use `monis.json` in current working directory as default.

#### hot
- You can enable hot reload mode by `--hot`.

[⏫ go to top](#quick-links)

### Getting Start:
1. Prepare an configuration file with `json` or `javascript`.
    ```json
    // monis.json
    {
        "/fruit": {
            "get": {
                "result": [
                    {
                        "name": "apple",
                        "price": 5.3
                    },
                    {
                        "name": "melon",
                        "price": 2.5
                    }
                ],
                "count": 2,
                "@code": 500
            },
            "post": "OK"
        },
        "/meat": {
            "get": "ref#meat.json"
        }
    }
    ```

    ```js
    // monis.js
    const template = {
        '/fruits': {
            'get': {
                'results|1-4': [
                    {
                        'name|1': [
                            'apple',
                            'melon',
                            'banaba',
                            'strawberry',
                            'cherry'
                        ],
                        'price|1-20.2': 1
                    }
                ],
                count: function () {
                    return this.results.length;
                },
                '@code': 400
            }
        },
        '/fruits/:fruit': {
            'get': function(params, query) {
                return {
                    name: params.fruit,
                    'price|1-20.2': 1,
                    '@code': 200
                }
            }
        },
        "/meat": {
            "get": "ref#meat.json"
        }
    };

    module.exports = template;
    ```
2. Change working directory to configuration folder
    ```bash
    $ cd /path/to/configuration/folder
    ```

3. Start Server
    ```bash
    $ monis serve
    ```
    monis will start automatically with router registered.
    If you try to visit `localhost:3001/fruits`, you can get the response:
    ```json
    {
        "results": [
            {
            "name": "banaba",
            "price": 8.66
            },
            {
            "name": "melon",
            "price": 7.18
            }
        ],
        "count": 2
    }
    ```
[⏫ go to top](#quick-links)

## Configuration
### JSON configuration
monis configuration is like below:
```json
{"path": { "method": response}}
```
There are three types of `response`:
1. `object`
    > `json` response is supported in configuration.
    you can also set the response of this request by using `@code`  in config json.
    ```json
    {
        "get": {
                "result": [
                    {
                        "name": "apple",
                        "price": 5.3
                    },
                    {
                        "name": "melon",
                        "price": 2.5
                    }
                ],
                "count": 2,
                "@code": 500
            }
    }
    ```
2. `string`
    ```json
    {
        "post": "OK"
    }
    ```
3. `reference`
    > you can set a json file as the response using `ref#` + `relative path`.
    ```json
    {
        "get": "ref#meat.json"
    }
    ```
[⏫ go to top](#quick-links)

### Javascript configuration
`Javascript configuration` can handle more complex case. And it support all the functions provided by `json configuration` as well. 

#### Basic Format
Each `javascript configuration` should `export` a `json` object
```typescript
module.exports = {
    '/fruits': {
        get: {
            result: [],
            count: 0,
        }
    }
}
```
#### Mockjs Format
`Monis` support mock function with [Mockjs](http://mockjs.com) formated config.
> To getting started with `Mockjs`, please refer to this [document](http://mockjs.com/examples.html).

Here is an example for `Mockjs` styled config:
```js
module.exports = {
    '/fruits': {
        'get': {
            'results|1-4': [
                {
                    'name|1': [
                        'apple',
                        'melon',
                        'banaba',
                        'strawberry',
                        'cherry'
                    ],
                    'price|1-20.2': 1
                }
            ],
            count: function () {
                return this.results.length;
            }
        }
    }
}
```

#### Return Code
`Return Code` is also supported in `javascript` configuration.
```js
module.exports = {
    '/fruits': {
        get: {
            result: [],
            count: 0,
            '@code': 404
        }
    }
}
```

#### Route Parameter & URL Query
```js
module.exports = {
    // Route Parameter
    '/fruits/:fruit': {
        'get': function(params, query) {
            return {
                name: params.fruit,
                // URL Query
                // /fruits/apple?price=2
                price: query.price || 1,
                '@code': 200
            }
        }
    }
}
```
[⏫ go to top](#quick-links)





