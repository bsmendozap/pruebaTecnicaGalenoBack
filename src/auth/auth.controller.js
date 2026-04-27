import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generate-JWT.js";
import { findUserByEmail } from "../users/user.model.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Email y password son obligatorios"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                msg: "Credenciales incorrectas"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Credenciales incorrectas"
            });
        }

        const token = await generarJWT(user.id, user.email, user.role);

        return res.status(200).json({
            msg: "Login OK",
            userDetails: {
                id: user.id,
                fullName: `${user.name} ${user.lastName}`,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            msg: "Contact the administrator"
        });
    }
};