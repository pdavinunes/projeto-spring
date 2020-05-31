import React from 'react';
import { Route, Switch, HashRouter} from 'react-router-dom';
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamento from '../views/lancamentos/cadastroLancamento';

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/home" component={Home} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas