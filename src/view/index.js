import Different from './404.js';
import Login from './login.js';
import Comunidad from './comunidad.js';
import Perfil from './perfil.js';
import Register from './register.js';
import Recover from './recoverPassword.js';

const components = {
  login: Login,
  register: Register,
  perfil: Perfil,
  comunidad: Comunidad,
  different: Different,
  recover: Recover,
};
export { components };
