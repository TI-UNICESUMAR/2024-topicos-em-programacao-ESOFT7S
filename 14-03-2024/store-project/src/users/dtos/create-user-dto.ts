import { IsEmail, IsInt, IsNotEmpty, IsString, Max, MaxLength, MinLength } from 'class-validator'


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string

    @IsInt()
    @Max(100)
    age: number

    @IsEmail()
    email: string
}