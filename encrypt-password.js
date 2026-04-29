import bcryptjs from "bcryptjs";

const passwords = ["!G4l3n0!", "Usuario1!", "Usuario2!"];

passwords.forEach((password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    console.log("password original:", password);
    console.log("password encriptada:", hash);
    console.log("-----------------------------------------");
});

