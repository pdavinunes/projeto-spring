package com.dev.minhasfinancas.service;

import com.dev.minhasfinancas.exception.ErroAutenticacao;
import com.dev.minhasfinancas.exception.RegraNegocioException;
import com.dev.minhasfinancas.model.entity.Usuario;
import com.dev.minhasfinancas.model.repository.UsuarioRepository;
import com.dev.minhasfinancas.service.impl.UsuarioServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class UsuarioServiceTest {

    @SpyBean
    UsuarioServiceImpl service;

    @MockBean
    UsuarioRepository repository;

    @Test
    public void deveSalvarUmUsuario(){
        Mockito.doNothing().when(service).validarEmail(Mockito.anyString());

        Usuario usuario = criarUsuario();

        Mockito.when(repository.save(Mockito.any(Usuario.class))).thenReturn(usuario);

        Usuario usuarioSalvo = service.salvarUsuario(new Usuario());

        Assertions.assertNotNull(usuarioSalvo);
        Assertions.assertEquals(usuarioSalvo.getId(), 1l);
    }

    @Test
    public void naoDeveSalvarUsuarioComEMailJaCadastrado(){

        String email = "email@email.com";
        Usuario usuario = Usuario.builder().email(email).build();
        Mockito.doThrow(RegraNegocioException.class).when(service).validarEmail(email);

        Assertions.assertThrows(RegraNegocioException.class,() -> service.salvarUsuario(usuario));

        Mockito.verify(repository, Mockito.never()).save(usuario);
    }

    @Test
    public void deveAutenticarUmUsuarioComSucesso() {
        String email = "email@email.com";
        String senha = "senha";

        Usuario usuario = Usuario.builder()
                                .email(email)
                                .senha(senha)
                                .id(1l).build();

        Mockito.when(repository.findByEmail(email)).thenReturn(Optional.of(usuario));

        Usuario result = service.autenticar(email,senha);

        Assertions.assertNotNull(result);
    }

    @Test
    public void deveLancarErrorQuandoNaoEncontrarUsuarioCadastradoComOEmailInformado() {

        Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

        String msg = Assertions.assertThrows(ErroAutenticacao.class,
                                () -> service.autenticar("email@email.com", "senha")).getMessage();

        Assertions.assertEquals(msg, "Usuário não encontrado para o email informado");
    }

    @Test
    public void deveLancarErrorQuandoSenhaEstiverIncorreta(){

        Usuario usuario = criarUsuario();

        Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(usuario));

        String msg = Assertions.assertThrows(ErroAutenticacao.class, () -> service.autenticar("email@email.com", "123")).getMessage();

        Assertions.assertEquals(msg, "Senha inválida");
    }

    @Test
    public void deveValidarEmail() {

        Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(false);

        service.validarEmail("email@email.com");
    }

    @Test
    public void deveLancarErroAoValidarEmailQuandoExistirEmailCadastrado() {
        Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(true);

        Assertions.assertThrows(RegraNegocioException.class,
                                () -> service.validarEmail("email@email.com"));

    }

    public static Usuario criarUsuario(){
        return Usuario.builder()
                .nome("usuario")
                .email("usuario@email.com")
                .id(1l)
                .senha("senha").build();
    }
}
