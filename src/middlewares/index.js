const jwt = require("jsonwebtoken")

const VerifyToken = (allowedRoles) => {
    return (req, res, next) => {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1]; // [1] adalah nilai token

            if (!token) {
                return res.status(401).json({
                    status: 'error', 
                    message: 'Authorization denied',
                    data: null,
                    status: 'error'
                });
            }

            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                
                // Periksa apakah token telah kedaluwarsa (exp)
                const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik
                if (decodedToken.exp < currentTime) {
                    return res.status(401).json({
                        status: 'error', 
                        message: "Token has expired",
                        data: null,
                        status: 'error'
                    });
                }

                // Opsional: Periksa usia token berdasarkan iat jika diperlukan
                const tokenAge = currentTime - decodedToken.iat;
                const maxAge = 60 * 60 * 24; // Contoh: Maksimal usia token adalah 24 jam
                if (tokenAge > maxAge) {
                    return res.status(401).json({
                        status: 'error', 
                        message: "Token is too old",
                        data: null,
                        status: 'error'
                    });
                }

                // Periksa role sesuai dengan allowedRoles params or not
                const userRoles = decodedToken.roles || [];
                const hasRole = allowedRoles.some(role => userRoles.includes(role));

                if (!hasRole) {
                    return res.status(403).json({
                        status: 'error', 
                        message: "Access denied: You do not have the required role",
                        data: null,
                        status: 'error'
                    });
                }

                console.log("The decoded token is:", decodedToken);
                next();
                
            } catch (error) {
                return res.status(400).json({
                    status: 'error', 
                    message: "Token is not valid",
                    data: null,
                    status: 'error', 
                });
            }
        } else {
            return res.status(400).json({
                status: 'error', 
                message: "Token is missing",
                data: null,
                status: 'error', 
            });
        }
    };
};

module.exports = VerifyToken;