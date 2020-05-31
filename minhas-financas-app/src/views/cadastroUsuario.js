import React from 'react';
import Card from "../components/card"
import FormGroup from "../components/form-group"
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import {msgSucesso, msgErro} from '../components/toastr';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        senha: '',
        email: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        
        const {nome, email, senha, senhaRepeticao} = this.state
        const usuario = {nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => msgErro(msg))
            return false;
        }
        
        this.service.salvar(usuario).then(resp => {
            msgSucesso('Usuário cadastrado com sucesso!')
            this.prepareLogin()
        }).catch(e => {
            msgErro(e.response.data)
        })
    }

    prepareLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repetir Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputRepitaSenha"
                                    className="form-control"
                                    name="senha"
                                    value={this.state.senhaRepeticao}
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                            <i className="pi pi-save"></i> Salvar</button>
                            <button onClick={this.prepareLogin} type="button" className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)