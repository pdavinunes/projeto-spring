import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LocalStorageService from '../../app/service/localstoreService';
import LancamentoService from '../../app/service/lancamentoService';
import * as msgs from '../../components/toastr';

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService()
    }

    buscar = () => {

        if(!this.state.ano){
            msgs.msgErro('Campo "Ano" é obrigatório!')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const filtro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(filtro)
            .then(resp => {
                console.log(resp.data);

                this.setState({ lancamentos: resp.data })
            }).catch(e => {
                msgs.msgErro(e.data)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id)
            .then(resp => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                msgs.msgSucesso("Lançamento deletado com sucesso!")
            }).catch(e => {
                msgs.msgErro('Não foi possível deletar o lançamento')
            })

        
    }

    render() {

        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterTipos()

        return (
            <Card title="Buscar Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text" className="form-control"
                                    id="inputAno"
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" /></FormGroup>
                            <FormGroup label="Descricao:" htmlFor="inputdescricao">
                                <input type="text" className="form-control"
                                    id="inputdescricao"
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite uma Descrição" />
                            </FormGroup>


                            <FormGroup label="Mês:" htmlFor="inputMes">
                                <SelectMenu
                                    lista={meses}
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control" />
                            </FormGroup>
                            <FormGroup
                                label="Tipo:"
                                value={this.state.tipo}
                                onChange={e => this.setState({ tipo: e.target.value })}
                                htmlFor="inputTipo">
                                <SelectMenu lista={tipos} className="form-control" />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.deletar}
                                editAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)