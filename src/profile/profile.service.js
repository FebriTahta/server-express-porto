const profileRepositories = require("./profile.repository");
const {deleteOldImage} = require('../utils')

class ProfileServices {

    async findProfileByNickname(nickName) {
        const find = await profileRepositories.findProfileByNickname(nickName);
        if (!find) {
            return {
                status: 'error',
                message: 'Nickname not found',
                data: null,
                res: false,
                code: 404
            }
        }
        return {
            status: 'success',
            message: 'Nickname found',
            data: find,
            res: true,
            code: 200,
        }
    }

    async findProfileById(id) {
        const find = await profileRepositories.findProfileById(id);
        if (!find) {
            return {
                status: 'error',
                message: 'Nickname not found',
                data: null,
                res: false,
                code: 404
            }
        }
        return {
            status: 'success',
            message: 'Nickname found',
            data: find,
            res: true,
            code: 200,
        }
    }

    async getFirstProfile() {
        const find = await profileRepositories.getFirstProfile();
        if (!find) {
            return {
                status: 'error',
                message: 'Profile not found',
                data: null,
                res: false,
                code: 404
            }
        }

        return {
            status: 'success',
            message: 'Profile was found',
            data: find,
            res: true,
            code: 200
        }
    }

    async createOrUpdateByNick(requestBody, photoPath) {
        const nickName = requestBody.nickname;
        const exist = await this.findProfileByNickname(nickName);
        // nick not found
        if (exist.res == false) {
            // create new data while profile not found
            const newData = await profileRepositories.createProfile(requestBody, photoPath);
            return {
                status: 'success',
                message: 'Create Profile Success',
                data: newData,
                res: true,
                code: 201,
            };
        }
      
        // update data when nick found
        const updateData = await profileRepositories.updateProfileByNick(requestBody, photoPath);
        return {
            status: 'success',
            message: 'Update Profile Success',
            data: updateData,
            res: false,
            code: 200, // 200 OK untuk pembaruan
        };
    }

    async createOrUpdateById(requestBody, photoPath) {
        const id = requestBody.id;
        const exist = await this.findProfileById(id);
        
        // nick not found
        if (exist.res == false) {
            // create new data while profile not found
            const newData = await profileRepositories.createProfile(requestBody, photoPath);
            return {
                status: 'success',
                message: 'Create Profile Success',
                data: newData,
                res: true,
                code: 201,
            };
        }

        // delete old image jika ada gambar baru.
        // gambar lama akan dihapus jika ada
        if (photoPath) {
            deleteOldImage(exist.data.photo);
        }
        
        // update data when nick found
        const updateData = await profileRepositories.updateProfileById(requestBody, photoPath);
        return {
            status: 'success',
            message: 'Update Profile Success',
            data: updateData,
            res: false,
            code: 200, // 200 OK untuk pembaruan
        };
    }
}

module.exports = new ProfileServices();