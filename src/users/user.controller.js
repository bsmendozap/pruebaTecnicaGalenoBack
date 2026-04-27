import bcryptjs from "bcryptjs";
import { createUser, findUserByEmail, updateUserById, deleteUserById, findUserById } from "./user.model.js";

export const register = async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                msg: "El correo ya está registrado"
            });
        }

        const salt = bcryptjs.genSaltSync(10);
        const encryptPassword = bcryptjs.hashSync(password, salt);

        const user = await createUser({
            name,
            lastName,
            email,
            password: encryptPassword,
            role
        });

        return res.status(201).json({
            msg: "User has been added to database",
            userDetails: {
                id: user.id,
                fullName: `${user.name} ${user.lastName}`,
                email: user.email,
                role: user.role
            }
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            msg: "Failed to register user"
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            lastName,
            email,
            role,
            canAdd = false,
            canView = false,
            canDelete = false,
            canUpdate = false
        } = req.body;

        const userExists = await findUserById(id);

        if (!userExists) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }

        const updatedUser = await updateUserById(id, {
            name,
            lastName,
            email,
            role,
            canAdd,
            canView,
            canDelete,
            canUpdate
        });

        return res.status(200).json({
            msg: "Usuario actualizado correctamente",
            userDetails: updatedUser
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            msg: "Error al actualizar usuario"
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userExists = await findUserById(id);

        if (!userExists) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }

        const deletedUser = await deleteUserById(id);

        return res.status(200).json({
            msg: "Usuario eliminado correctamente",
            userDetails: deletedUser
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            msg: "Error al eliminar usuario"
        });
    }
};