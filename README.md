# Kenum 

`npm install`

`npm run dev` will just run and console.log() the outcome.

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

