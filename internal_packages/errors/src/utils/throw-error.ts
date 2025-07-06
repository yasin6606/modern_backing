import {ERRORS, ErrorCode} from '../constants/errors';

const throwError = (code: ErrorCode, details?: any): never => {
    const {status, message} = ERRORS[code];
    const err = new Error(message) as any;

    err.status = status;
    err.code = code;
    err.details = details;

    throw err;
}

export default throwError;
