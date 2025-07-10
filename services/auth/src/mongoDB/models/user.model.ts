import {Document, Schema, model, SchemaOptions, ResolveSchemaOptions, DefaultSchemaOptions, FlatRecord} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    gender: "male" | "female";
    age: number;
}

const schemaOpt: ResolveSchemaOptions<DefaultSchemaOptions> | SchemaOptions<FlatRecord<IUser>> = {
    _id: true,
    timestamps: true
};

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9_]+$/, 'Only alphanumeric usernames allowed']
    },
    email: {
        type: String, required: true, unique: true, index: true, trim: true, match: [/.+\@.+\..+/, 'Email is invalid']
    },
    password: {type: String, required: true, trim: true, select: false},
    gender: {type: String, required: true, enum: ["male", "female"], trim: true, lowercase: true},
    age: {type: Number, min: 18, max: 120, default: 18},
}, schemaOpt);

export const User = model<IUser>("User", userSchema);
