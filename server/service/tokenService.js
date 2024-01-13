import jwt from "jsonwebtoken";

class TokenService {
    static async generateToken(id, roles) {
        const payload = {id, roles};

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30min'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '3d'});

        return {
            accessToken,
            refreshToken
        }
    }

    static async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            return userData;
        }

        catch(error) {
            return null;
        }
    }

    static async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
            return userData;
        }

        catch(error) {
            return null;
        }
    }
}

export default TokenService;