import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao';
class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }
    
    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    validar(usuario){
        const erros = []
        
        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório')
        }else if(!usuario.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um email válido')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2 vezes')
        }else if(usuario.senha !== !usuario.senhaRepeticao){
            erros.push('As senhas não batem')
        }
        
        if(erros && erros.length > 0 ){
            throw new ErroValidacao(erros)
        }
    }

    salvar(usuario){
        return this.post('/', usuario);
    }
}

export default UsuarioService