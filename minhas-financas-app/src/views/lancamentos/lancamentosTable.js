import React from 'react';
import formatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map(row => {
        return (
            <tr key={row.id}>
                <td>{row.descricao}</td>
                <td>{formatter.format(row.valor, { locale: 'pt-BR' })}</td>
                <td>{row.tipo}</td>
                <td>{row.mes}</td>
                <td>{row.status}</td>
                <td>
                    <button type="button"
                        className="btn btn-success" title="Efetivar"
                        disabled={row.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(row, 'EFETIVADO')}>
                        <i className="pi pi-check"></i>
                    </button>
                    <button type="button"
                        className="btn btn-warning" title="Cancelar"
                        disabled={row.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(row, 'CANCELADO')}>
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button"
                        className="btn btn-primary" title="Editar"
                        onClick={e => props.editAction(row.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"
                        className="btn btn-danger" title="Excluir"
                        onClick={e => props.deleteAction(row)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr >
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}