# Kenum

### Key + Enum = kenum

This is a helper to creating things like keys, actionTypes, or enum objects.

### Installing

`npm install kenum`

### Usage

```javascript
import kenum from 'kenum'

const actionType = kenum.appName`
  REQ
  RES
  ERR
`
```

output:
```
actionType = {
  REQ: 'appName/REQ',
  RES: 'appName/RES',
  ERR: 'appname/ERR'
}
```

### With variables

```javascript
import kenum from 'kenum'

const FOO = 'FOO'
const BAR = 'BAR'

const actionType = kenum.appName`
  REQ
  ${FOO}
  RES
  ${BAR}
  ERR
`
```

output:
```
actionType = {
  REQ: 'appName/REQ',
  RES: 'appName/RES',
  ERR: 'appName/ERR',
  FOO: 'appName/FOO',
  BAR: 'appName/BAR'
}
```