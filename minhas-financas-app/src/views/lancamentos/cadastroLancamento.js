import React from 'react';
import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group';
import Card from '../../components/card';
import SelectMenu from '../../components/selectMenu';
import * as msgs from '../../components/toastr';
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstoreService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        ano: '',
        mes: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService()
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.service.obterPorId(params.id)
                .then(resp => {
                    this.setState({ ...resp.data, atualizando: true })
                })
                .catch(error => {
                    msgs.msgErro(error.response.data)
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }
        this.service
            .salvar(lancamento)
            .then(resp => {
                this.props.history.push("/consulta-lancamentos")
                msgs.msgSucesso("Lançamento cadastrado com sucesso")
            })
            .catch(erro => {
                msgs.msgErro(erro.response.data)
            })
    }

    update = () => {
        const { descricao, valor, mes, ano, tipo, id, usuario, status } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario, status }
        this.service
            .update(lancamento)
            .then(resp => {
                this.props.history.push("/consulta-lancamentos")
                msgs.msgSucesso("Lançamento atualizado com sucesso")
            })
            .catch(erro => {
                msgs.msgErro(erro.response.data)
            })
    }

    render() {

        const tipos = this.service.obterTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input type="Text" id="inputDescricao"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input type="Text" id="inputAno"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses}
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input type="Text" id="inputValor"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="Text" id="inputStatus"
                                className="form-control"
                                name="status"
                                value={this.state.status} disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button className="btn btn-success" onClick={this.update}>Atualizar</button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit}>Salvar</button>
                            )
                        }
                        <button onClick={e => this.props.history.push("/consulta-lancamentos")} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)