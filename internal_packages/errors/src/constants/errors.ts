export const ERRORS = {
    AUTH_INVALID: {code: 'AUTH_INVALID', message: 'Invalid credentials', status: 401},
    USER_EXISTS: {code: 'USER_EXISTS', message: 'User already exists', status: 400},
    NOT_FOUND: {code: 'NOT_FOUND', message: 'Resource not found', status: 404},
    VALIDATION_FAIL: {code: 'VALIDATION_FAIL', message: 'Validation failed', status: 422},
    INTERNAL: {code: 'INTERNAL', message: 'Internal server error', status: 500}
} as const;

export type ErrorCode = keyof typeof ERRORS;
