# Mocko
Service for API mock

## Install
```bash
npm install -g moko
```

## Usage
```bash
moko [command] [options]
```

### Serve
```bash
moko serve -c moko.json -p 3001
```
#### port
- You can specify the server listening port by `-p, --port`.
- Moko will use `3001` as default port.

#### config
- Moko only support `json` formated configuration for api mock. 
- You can specify config file by `-c, --config`.
- It will use `moko.json` in current working directory as default.

### Basic Example
Moko configuration is like below:
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
// moko.json
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
Moko will handle the below routes:
```
GET /projects
POST /projects
GET /project/wave/monitors
```



