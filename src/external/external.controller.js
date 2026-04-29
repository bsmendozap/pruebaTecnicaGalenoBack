import { loginExternalApi, getExternalProducts } from "../../services/externalApi.service.js";

export const testExternalLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                msg: "username y password son obligatorios"
            });
        }

        const data = await loginExternalApi(username, password);

        return res.status(200).json({
            msg: "conexion con login externo correcta",
            data,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Conexion con productos externos correcta",
            error: error.message,
        });
    }
};

export const testExternalProducts = async (req, res) => {
    try {
        const data = await getExternalProducts();

        return res.status(200).json({
            msg: "Conexion con productos externos correcta",
            data,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al conectar con productos externos",
            error: error.message,
        });
    }
};