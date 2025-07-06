import {ERRORS, ErrorCode} from '../constants/errors';
import {Response} from "express";

export const sendError = (code: ErrorCode, res: Response, details?: any): void => {
    res.status(ERRORS[code].status).send({code, details});
}

export const throwError = (code: ErrorCode, details?: any): never => {
    const {status, message} = ERRORS[code];
    const err = new Error(message) as any;

    err.status = status;
    err.code = code;
    err.details = details;

    throw err;
}
