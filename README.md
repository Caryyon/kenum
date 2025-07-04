# Kenum

**Key + Enum = kenum**

A TypeScript-first utility for creating enum-like objects with namespaced keys using template literals. Perfect for action types, constants, and configuration objects.

## Features

- 🚀 **Zero dependencies** - Pure TypeScript implementation
- 📝 **Type-safe** - Full TypeScript support with proper type definitions
- 🎯 **Template literals** - Clean, readable syntax using ES6 template strings
- 🔧 **Value assignment** - Support for custom values with `KEY = value` syntax
- 🌐 **Namespaced** - Automatic prefixing to avoid key collisions
- ✨ **Interpolation** - Full support for variable interpolation

## Installation

```bash
npm install kenum
# or
yarn add kenum
```

## Quick Start

```typescript
import kenum from 'kenum';

const actions = kenum.USER`
  FETCH
  CREATE
  UPDATE
  DELETE
`;

console.log(actions);
// Output:
// {
//   FETCH: 'USER/FETCH',
//   CREATE: 'USER/CREATE',
//   UPDATE: 'USER/UPDATE',
//   DELETE: 'USER/DELETE'
// }
```

## Usage Examples

### Basic Usage

```typescript
const apiEndpoints = kenum.API`
  USERS
  POSTS
  COMMENTS
`;
// Result: { USERS: 'API/USERS', POSTS: 'API/POSTS', COMMENTS: 'API/COMMENTS' }
```

### With Variable Interpolation

```typescript
const entity = 'PRODUCT';
const action = 'SYNC';

const constants = kenum.STORE`
  ${entity}_CREATE
  ${entity}_UPDATE
  BATCH_${action}
`;
// Result: {
//   PRODUCT_CREATE: 'STORE/PRODUCT_CREATE',
//   PRODUCT_UPDATE: 'STORE/PRODUCT_UPDATE',  
//   BATCH_SYNC: 'STORE/BATCH_SYNC'
// }
```

### Value Assignment

Assign custom values using the `=` syntax:

```typescript
const httpStatus = kenum.HTTP`
  SUCCESS = 200
  NOT_FOUND = 404
  SERVER_ERROR = 500
`;
// Result: {
//   SUCCESS: 'HTTP/SUCCESS:200',
//   NOT_FOUND: 'HTTP/NOT_FOUND:404',
//   SERVER_ERROR: 'HTTP/SERVER_ERROR:500'
// }
```

### Mixed Usage

```typescript
const config = kenum.APP`
  API_URL = https://api.example.com
  TIMEOUT = 5000
  DEBUG_MODE
  PRODUCTION_MODE
`;
// Result: {
//   API_URL: 'APP/API_URL:https://api.example.com',
//   TIMEOUT: 'APP/TIMEOUT:5000',
//   DEBUG_MODE: 'APP/DEBUG_MODE',
//   PRODUCTION_MODE: 'APP/PRODUCTION_MODE'
// }
```

### Redux Action Types

```typescript
const userActions = kenum.USER`
  FETCH_PENDING
  FETCH_SUCCESS
  FETCH_FAILURE
  CREATE_PENDING
  CREATE_SUCCESS
  CREATE_FAILURE
`;

// Perfect for Redux reducers:
// {
//   FETCH_PENDING: 'USER/FETCH_PENDING',
//   FETCH_SUCCESS: 'USER/FETCH_SUCCESS',
//   FETCH_FAILURE: 'USER/FETCH_FAILURE',
//   // ... etc
// }
```

## API Reference

### `kenum[namespace]`

Creates a kenum function for the specified namespace.

**Parameters:**
- `namespace` (string): The namespace prefix for all keys

**Returns:** A template literal function that creates the enum object

### Value Assignment Syntax

When using the `=` syntax, the resulting value follows the pattern:
```
'namespace/KEY:value'
```

For regular keys without assignment:
```
'namespace/KEY'
```

## TypeScript Support

Kenum is written in TypeScript and provides full type safety:

```typescript
import kenum, { KenumResult } from 'kenum';

const myEnum: KenumResult = kenum.NAMESPACE`
  KEY1
  KEY2 = customValue
`;

// myEnum is typed as { [key: string]: string }
```

## Why Kenum?

- **Prevents typos**: Centralized constant definitions
- **Namespace isolation**: Avoid key collisions across different modules  
- **Readable syntax**: Template literals are more readable than object literals
- **Consistent formatting**: Automatic namespace prefixing ensures consistency
- **IDE support**: Full IntelliSense and autocomplete support

## Comparison

**Before (traditional approach):**
```typescript
const USER_ACTIONS = {
  FETCH: 'USER/FETCH',
  CREATE: 'USER/CREATE', 
  UPDATE: 'USER/UPDATE',
  DELETE: 'USER/DELETE'
};
```

**After (with kenum):**
```typescript
const USER_ACTIONS = kenum.USER`
  FETCH
  CREATE
  UPDATE
  DELETE
`;
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for your changes
4. Ensure tests pass (`yarn test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

ISC License - see the [LICENSE](LICENSE) file for details.