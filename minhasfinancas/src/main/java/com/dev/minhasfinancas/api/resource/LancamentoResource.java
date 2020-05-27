package com.dev.minhasfinancas.api.resource;

import com.dev.minhasfinancas.api.dto.LancamentoDTO;
import com.dev.minhasfinancas.exception.RegraNegocioException;
import com.dev.minhasfinancas.model.entity.Lancamento;
import com.dev.minhasfinancas.model.entity.Usuario;
import com.dev.minhasfinancas.model.enums.StatusLancamento;
import com.dev.minhasfinancas.model.enums.TipoLancamento;
import com.dev.minhasfinancas.service.LancamentoService;
import com.dev.minhasfinancas.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lancementos")
@RequiredArgsConstructor
public class LancamentoResource {

    private final LancamentoService service;
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity salvar(@RequestBody LancamentoDTO dto){
        try {
            Lancamento lancamento = converter(dto);
            lancamento = service.salvar(lancamento);
            return new ResponseEntity(lancamento, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "mes", required = false) Integer mes,
            @RequestParam(value = "ano", required = false) Integer ano,
            @RequestParam("usuario") Long idUsuario) {
        Lancamento lancamentoFiltro = new Lancamento();
        lancamentoFiltro.setDescricao(descricao);
        lancamentoFiltro.setMes(mes);
        lancamentoFiltro.setAno(ano);

        Optional<Usuario> usuario = usuarioService.obterPorId(idUsuario);

        if(usuario.isPresent()){
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }else{
            lancamentoFiltro.setUsuario(usuario.get());
        }

        List<Lancamento> lancamentos = service.buscar(lancamentoFiltro);
        return ResponseEntity.ok(lancamentos);
    }

    @PutMapping("/{id}")
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody LancamentoDTO dto){
        return service.obterPorId(id).map( entity -> {
            try{
                Lancamento lancamento = converter(dto);
                lancamento.setId(entity.getId());
                service.atualizar(lancamento);
                return ResponseEntity.ok(lancamento);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }

        }).orElseGet(() -> new ResponseEntity("Lancamento não encontrado", HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletar(@PathVariable("id") Long id){
        return service.obterPorId(id).map( entity -> {
            service.deletar(entity);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }).orElseGet(() -> new ResponseEntity("Lancamento não encontrado", HttpStatus.BAD_REQUEST));
    }

    private Lancamento converter(LancamentoDTO dto) {
        Lancamento lancamento = new Lancamento();
        lancamento.setId(dto.getId());
        lancamento.setDescricao(dto.getDescricao());
        lancamento.setAno(dto.getAno());
        lancamento.setMes(dto.getMes());
        lancamento.setValor(dto.getValor());

        Usuario usuario = usuarioService.obterPorId(dto.getUsuario())
                .orElseThrow(() -> new RegraNegocioException("Usuario não encontrado"));

        lancamento.setUsuario(usuario);
        lancamento.setTipo(TipoLancamento.valueOf(dto.getTipo()));
        lancamento.setStatus(StatusLancamento.valueOf(dto.getStatus()));
        return lancamento;
    }
}
