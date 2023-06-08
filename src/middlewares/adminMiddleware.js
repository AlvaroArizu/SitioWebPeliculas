function adminMiddleware(req, res, next) {
  if (req.session.userLogged) {


    if (req.session.userLogged.id_rol === 1) {
      // Verifica si el usuario es administrador

      return next();
    } else {
      return res.redirect("/profile"); // Redirige al perfil si el usuario no es administrador
    }
  }

  console.log("Usuario NO está logueado");
  return res.redirect("/login"); // Redirige al inicio de sesión si el usuario no está logueado
}

module.exports = adminMiddleware;
