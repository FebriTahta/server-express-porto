// handling business logic
const authRepository = require('./auth.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// class
class AuthService {
    // function
    async findUsernameService(username) {
        const findData = await authRepository.findUsername(username);
        if (!findData) {
            return { 
                status: 'error', 
                message: 'Data not found', 
                data: null, 
                res: false,
                code: 400,
            };
        }
        return { 
            status: 'success', 
            message: 'Data found', 
            data: findData, 
            res: true,
            code: 200
        };
    }

    // function
    async registerService(requestBody) {
        const findDuplicateUsername = await this.findUsernameService(requestBody.username);

        if (findDuplicateUsername.res === true) {
            // find exist / duplicate username found / true findDuplicateUsername.res
            return { 
                status: 'error', 
                message:'Please use another username', 
                data: findDuplicateUsername.data, 
                res: false,
                code: 400
            };
        }

        // no duplicate username & create new user / false dari findDuplicateUsername.res
        const newData = await authRepository.register(requestBody);
        return { 
            status: 'success', 
            message: 'Register success', 
            data: newData, 
            res: true,
            code: 201
        };
    }

    async loginService(requestBody) {
        const { username, password } = requestBody;

        // Validate input
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        // Check if user exists
        const userData = await authRepository.login({ username });
        if (!userData) {
            throw new Error('Username not found');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Extract roles
        const roles = userData.userRoles?.map((roleData) => roleData.role?.name) || [];
        if (roles.length === 0) {
            throw new Error('User has no roles assigned');
        }

        // Log the data to debug
        console.log('Creating JWT with:', { id: userData.id, roles });

        // Generate JWT token
        if (!userData.id || !Array.isArray(roles)) {
            throw new Error('Invalid data for token generation');
        }

        const token = jwt.sign(
            { data: userData.username, roles}, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration
        );

        return {
            status: 'success',
            message: 'Login success',
            data: token,
            res: true,
            code: 200,
        };
    }
}

module.exports = new AuthService();