import db from '../db/prismaClient';
import { hashPassword, comparePassword } from '../services/authServices'

const AuthController = {
    async register(
        options: {
            firstName: string,
            lastName: string,
            email: string,
            password: string,

        }) {
        const { firstName, lastName, email, password } = options;
        const hashedPassword = await hashPassword(password);
        try {
            await db.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword!
                }
            })
            return 'Succesfull registration'

        } catch (error) {
            if (error.code == 'P2002') {
                return 'User with this email already exists';
            }
            else {
                console.log(error);
            }
        };
    },

    async login(
        options: {
            email: string,
            password: string,

        }) {
        const { email, password } = options;
        const user = await db.user.findFirst({
            where: {
                email: email,
            }
        });
        if (!user) {
            return 'User with this email does not exist'

        }
        const isMatch = await comparePassword(password, user?.password)
        if (!isMatch) {
            return 'Incorrect password'
        }
        return "Successfull login"
    },

    async getUsers() {
        return await db.user.findMany();
    }
}
export default AuthController