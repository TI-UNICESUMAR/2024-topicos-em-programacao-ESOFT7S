import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true})
export class User {
    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop()
    age: number

    @Prop({ required: true })
    email: string
}

export const UserSchema = SchemaFactory.createForClass(User)