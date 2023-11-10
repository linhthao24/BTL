const bcrypt = require('bcrypt')
const User = require("../models/UserModel")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")
const CreateUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Had in DB'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const CreatedUser = await User.create({
                name,
                email,
                BasePass: password,
                password: hash,
                phone,
                point: 0
            })
            if (CreatedUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: CreatedUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const LoginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'not email in DB'
                })
            }
            console.log(checkUser)
            console.log(email)
            console.log(password)
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            //console.log('access_token', access_token)
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            //console.log('refresh_token', refresh_token)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                data: checkUser,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const UpdateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            console.log(checkUser);
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                });
            }
            if (data.password) {
                data.BasePass = data.password;
                const hashedPassword = bcrypt.hashSync(data.password, 10);
                data.password = hashedPassword;
            }

            // Remove isAdmin field from the update data
            delete data.isAdmin;

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            if (data.point) {
                updatedUser.point = data.point;
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            });
        } catch (e) {
            reject(e);
        }
    });
};
const DeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const DeleteMany = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await User.DeleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete user success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const GetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const GetDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    CreateUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    GetAllUser,
    GetDetailsUser,
    //DeleteMany,
}