import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;

export async function hashPassword(password: string) {
    try {
        // Generate hash
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed Password: ${hashedPassword}`);
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

