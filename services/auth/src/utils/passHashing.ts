import {genSalt, hash} from "bcryptjs";

const passHashing = async (password: string): Promise<string> => {
    const salt: string = await genSalt(12);
    const hashed = await hash(password, salt);

    return hashed;
}

export default passHashing;
