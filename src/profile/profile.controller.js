const profileServices = require("./profile.service")

class ProfileController {

    async createOrUpdateByNick (req, res) {
        try {
          const response = await profileServices.createOrUpdateByNick(req.body, req.file);
          res.status(response.code).json(response);
        } catch (error) {
            res.status(500).json({
                message: 'something error when fetching data',
                error: error.message,
            });
        }
    };

    async createOrUpdateById (req, res) {
        try {
          const response = await profileServices.createOrUpdateById(req.body, req.file);
          res.status(response.code).json(response);
        } catch (error) {
            res.status(500).json({
                message: 'something error when fetching data',
                error: error.message,
            });
        }
    };

    async getFirstProfile(req, res) {
        try {
            const response = await profileServices.getFirstProfile();
            res.status(response.code).json(response);
        } catch (error) {
            res.status(500).json({
                message: 'something error when fetching data',
                error: error.message,
            });
        }
    }
}

module.exports = new ProfileController();