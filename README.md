# Kenum

### Key + Enum = kenum

This is a helper to creating things like keys, actionTypes, or enum objects.

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

