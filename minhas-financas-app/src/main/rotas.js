import React from 'react';
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom';
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamento from '../views/lancamentos/cadastroLancamento';
import AuthService from '../app/service/authService'


function RotaAutenticada({ component: Component, ...props }){
    return (
        <Route {...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return(
                    <Redirect to={{pathname: '/login', state : {from: componentProps.location}}} />
                )
            } 
        }} />
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas