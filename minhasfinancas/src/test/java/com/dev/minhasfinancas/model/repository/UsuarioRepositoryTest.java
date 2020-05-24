package com.dev.minhasfinancas.model.repository;

import com.dev.minhasfinancas.model.entity.Usuario;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class UsuarioRepositoryTest {

    @Autowired
    UsuarioRepository repository;

    @Test
    public void deveVerificarAExistenciaDeUmEmail(){
        //cenario
        Usuario usuario = Usuario.builder()
                    .nome("usuario")
                    .email("usuario@email.com").build();

        repository.save(usuario);

        //ação/ execução
        boolean result = repository.existsByEmail("usuario@email.com");

        //verificação
        Assertions.assertTrue(result);
    }

    @Test
    public void deveRetornarFalsoQuandoNaoHouverUsuarioCadastradoComOEmail() {

        //cenário
        repository.deleteAll();

        //acao
        boolean result = repository.existsByEmail("usuario@gmail.com");

        //verificação
        Assertions.assertFalse(result);

    }

}
