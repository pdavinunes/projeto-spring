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
                            className="btn btn-primary"
                            onClick={e => props.editAction(row.id)}>
                                Editar
                    </button>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(row)}>
                                Deletar
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