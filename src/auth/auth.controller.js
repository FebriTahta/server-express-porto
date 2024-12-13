const authService = require('./auth.service')
const {errorDataFormatter} = require('../utils')

class AuthController {
    async registerController(req, res) {
       
        try {
            const requestBody = req.body;
            const data = await authService.registerService(requestBody);
            res.status(data.code).json(data);
        } catch (error) {
            res.status(500).json({
                message: error.message,
                error: errorDataFormatter(error.message),
            });
        }
        
    }

    async loginController(req, res) {
        

        try {
            const requestBody = req.body;
            // Call service function
            const data = await authService.loginService(requestBody);

            // Send success response
            res.status(data.code).json(data);
        } catch (error) {
            // Send error response
            res.status(500).json({
                message: error.message,
                error: errorDataFormatter(error.message),
            });
        }
    }
}
module.exports = new AuthController();