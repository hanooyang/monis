# Moni
Service for API mock

## Install
```bash
npm install -g moni
```

## Usage
```bash
moni [command] [options]
```

### Serve
```bash
moni serve -c moni.json -p 3001
```
#### port
- You can specify the server listening port by `-p, --port`.
- Moni will use `3001` as default port.

#### config
- moni only support `json` formated configuration for api mock. 
- You can specify config file by `-c, --config`.
- It will use `moni.json` in current working directory as default.

### Basic Example
moni configuration is like below:
```json
{"path": { "method": response}}
```
There are three types of `response`:
1. `object`
```json
{
    "get": {
            "result": [
                {
                    "name": "wave",
                    "alias": "lts"
                },
                {
                    "name": "radar",
                    "alias": "pas"
                }
            ],
            "count": 2
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
```json
{
    "get": "ref#monitors.json"
}
```

**Full Example:**
```json
// moni.json
{
    "/projects": {
        "get": {
            "result": [
                {
                    "name": "wave",
                    "alias": "lts"
                },
                {
                    "name": "radar",
                    "alias": "pas"
                }
            ],
            "count": 2
        },
        "post": "OK"
    },
    "/project/wave/monitors": {
        "get": "ref#monitors.json"
    }
}
```
moni will handle the below routes:
```
GET /projects
POST /projects
GET /project/wave/monitors
```



