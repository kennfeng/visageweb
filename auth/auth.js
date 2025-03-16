import bcrypt from 'bcrypt';

// Hash a password
const saltRounds = 10;

export async function hashPassword(password) {
    console.log('password hashing...');
    return await bcrypt.hash(password, saltRounds);
}

// Compare a password with the hash
export async function checkMatch(password, hash) {
    return await bcrypt.compare(password, hash);
}

