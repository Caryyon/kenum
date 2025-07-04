import kenum from '../src/index';

console.log('🚀 Kenum Demo\n');

// Basic usage
console.log('📝 Basic enum creation:');
const userActions = kenum.USER`
  FETCH
  CREATE
  UPDATE
  DELETE
`;
console.log(userActions);
console.log();

// With interpolation
console.log('🔄 With variable interpolation:');
const entity = 'PRODUCT';
const action = 'SYNC';

const storeActions = kenum.STORE`
  ${entity}_CREATE
  ${entity}_UPDATE
  BATCH_${action}
  CLEAR_CACHE
`;
console.log(storeActions);
console.log();

// Value assignment
console.log('⚙️ With value assignment:');
const httpCodes = kenum.HTTP`
  SUCCESS = 200
  NOT_FOUND = 404
  SERVER_ERROR = 500
  TIMEOUT = 408
`;
console.log(httpCodes);
console.log();

// Mixed usage
console.log('🎯 Mixed usage (keys + assignments):');
const appConfig = kenum.CONFIG`
  API_URL = https://api.example.com/v1
  TIMEOUT = 5000
  RETRY_COUNT = 3
  DEBUG_MODE
  PRODUCTION_MODE
  LOG_LEVEL = info
`;
console.log(appConfig);
console.log();

// Redux-style action types
console.log('🔄 Redux-style action types:');
const authActions = kenum.AUTH`
  LOGIN_PENDING
  LOGIN_SUCCESS  
  LOGIN_FAILURE
  LOGOUT
  REFRESH_TOKEN
  CLEAR_SESSION
`;
console.log(authActions);
console.log();

console.log('✅ Demo complete! All examples show the power and flexibility of kenum.');