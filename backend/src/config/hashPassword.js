import bcrypt from 'bcrypt';

export const validatePassword = async (hashedPassword, password)=>{
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
}

export const hashUpdatedPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}