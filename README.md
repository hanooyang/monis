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
monis will handle the below routes:
```
GET /projects
POST /projects
GET /project/wave/monitors
```



