export const ERRORS = {
    AUTH_INVALID: {
        code: 'AUTH_INVALID',
        message: 'Invalid credentials',
        status: 401,
    },
    AUTH_FORBIDDEN: {
        code: 'AUTH_FORBIDDEN',
        message: 'Access forbidden',
        status: 403,
    },
    AUTH_UNAUTHORIZED: {
        code: 'AUTH_UNAUTHORIZED',
        message: 'Unauthorized access',
        status: 401,
    },
    USER_EXISTS: {
        code: 'USER_EXISTS',
        message: 'User already exists',
        status: 400,
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        status: 404,
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        message: 'Resource not found',
        status: 404,
    },
    VALIDATION_FAIL: {
        code: 'VALIDATION_FAIL',
        message: 'Validation failed',
        status: 422,
    },
    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        message: 'Bad request',
        status: 400,
    },
    CONFLICT: {
        code: 'CONFLICT',
        message: 'Conflict occurred',
        status: 409,
    },
    RATE_LIMIT: {
        code: 'RATE_LIMIT',
        message: 'Too many requests',
        status: 429,
    },
    TIMEOUT: {
        code: 'TIMEOUT',
        message: 'Request timeout',
        status: 408,
    },
    INTERNAL: {
        code: 'INTERNAL',
        message: 'Internal server error',
        status: 500,
    },
    SERVICE_UNAVAILABLE: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Service unavailable',
        status: 503,
    },
} as const;

export type ErrorCode = keyof typeof ERRORS;
