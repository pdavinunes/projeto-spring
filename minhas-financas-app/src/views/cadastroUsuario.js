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

    validar() {
        const msgs = []
        
        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatório')
        }

        if(!this.state.email){
            msgs.push('O campo Email é obrigatório')
        }else if(!this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um email válido')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2 vezes')
        }else if(this.state.senha !== !this.state.senhaRepeticao){
            msgs.push('As senhas não batem')
        }
        
        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                msgErro(msg)
            })
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.prepareLogin} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)