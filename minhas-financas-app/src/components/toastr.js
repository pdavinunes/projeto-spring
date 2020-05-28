import toastr from 'toastr'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function mostrarMensagem(titulo, msg, tipo){
    toastr[tipo](msg, titulo)
}

export function msgErro(msg){
    mostrarMensagem('Erro', msg, 'error')
}

export function msgSucesso(msg){
    mostrarMensagem('Sucesso', msg, 'success')
}

export function msgAlert(msg){
    mostrarMensagem('Alerta', msg, 'warning')
}