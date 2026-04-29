export const validarAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            msg: "Usuario no autenticado",
        })
    }

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            msg: "No tienes permisos para realizar esta acción",
        })
    }

    next();
}