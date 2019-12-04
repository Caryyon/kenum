# better-keys

`npm install`

`npm run dev` will just run and console.log() the outcome.


I have 2 test cases setup inside of index.js

the idea is that i want the returned object o have a KEY and VALUE of the same string


so that you can simply do something like:
```
const actionTypes = keys`
  ONE
  TWO
  THREE
  ${FOUR}
`
```

and it will just return an object like:
```
{
  ONE: 'ONE',
  TWO: 'TWO'
}
```

