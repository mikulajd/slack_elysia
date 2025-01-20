import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10,);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

export async function comparePassword(password, storedHash) {
    try {
        const isMatch = await bcrypt.compare(password, storedHash);
        return isMatch;
    } catch (error) {
        console.error('Error comparing password:', error);
    }
}
export type UserData = {
    userId: number;
    email: string;
};

export function userInfo(user) {
    const data: UserData =
    {
        userId: user.userId,
        email: user.email
    }
    return data;
}


