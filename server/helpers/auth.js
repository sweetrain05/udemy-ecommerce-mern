import bcrypt from "bcrypt";

// 유저가 입력한 비번을 salt값과 합쳐서 hash한다.
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// 유저가 입력한 비번이 DB의 비번과 일치하는지 확인한다.
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed); // if matched, return true
};
