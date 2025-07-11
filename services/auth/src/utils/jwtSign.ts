import {sign, Algorithm, SignOptions} from "jsonwebtoken";
import {StringValue} from "../types/StringValue";

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
const JWT_ALGORITHM: Algorithm = (process.env.JWT_ALGORITHM as Algorithm) || "HS512";

const signOpt: SignOptions = {
    algorithm: JWT_ALGORITHM,
    issuer: "Auth service",
    subject: "authentication user",
    expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || "15m"
};

const signFunc = (payload: string | object): string => {
    if (!JWT_SECRET_KEY) throw Error("JWT_SECRET_KEY");
    return sign(payload, JWT_SECRET_KEY, signOpt);
}

export default signFunc;
