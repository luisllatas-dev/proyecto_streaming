const verifyApikey = (req, res, next) => {
    const userApikey = req.headers['x-api-key'];

    if (!userApikey || userApikey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado: API Key inválida'
        });
    }
    next();
};

export default verifyApikey;