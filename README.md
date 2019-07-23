# Monis
Service for API mock

## Install
```bash
npm install -g monis
```

## Usage
```bash
monis [command] [options]
```

### Serve
```bash
monis serve -c monis.json -p 3001
```
#### port
- You can specify the server listening port by `-p, --port`.
- Monis will use `3001` as default port.

#### config
- Monis only support `json` formated configuration for api mock. 
- You can specify config file by `-c, --config`.
- It will use `monis.json` in current working directory as default.

### Basic Example
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

**Full Example:**
```json
// moni.json
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
monis will handle the below routes:
```
GET /fruit
POST /fruit
GET /meat
```



