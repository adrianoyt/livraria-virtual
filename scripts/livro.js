function buscarLivro() {
    var pesquisar = document.getElementById('pesquisa').value;
    $.ajax({
        type: "POST",
        data: {buscar: pesquisar},
        url: "php/getLivros.php",
        dataType: "json",
        success: function (retorno) {
            $('#list-livro').empty();
            $('#detail-livro').empty();
            if(retorno != null || retorno != 0){
                for (var i = 0; i < retorno.length; i++) {
                    
                    $('#list-livro').append('<a class="list-group-item list-group-item-action list-group-item-light" id="'+retorno[i].idlivro+'" data-toggle="list" href="#list-livros-'+retorno[i].idlivro+'" role="tab" aria-controls="'+retorno[i].idlivro+'"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Livro: '+retorno[i].titulo+'</h5></div><p class="mb-1">Categoria: '+retorno[i].nm_categoria+'</p><small class="text-black">Autor: '+retorno[i].autor+'</small></a>');

                    $('#detail-livro').append('<div class="tab-pane fade show" id="list-livros-'+retorno[i].idlivro+'" role="tabpanel" aria-labelledby="'+retorno[i].idlivro+'"><h5 class="mb-1">Sinopse</h5><p class="mb-1">'+retorno[i].sinopse+'</p><small class="text-black-50">Editora: '+retorno[i].editora+'</small><br><small class="text-black-50">Edição: '+retorno[i].edicao+'</small><br><small class="text-black-50">Páginas: '+retorno[i].pags+'</small></div>');

                }

                $('#pesquisa').val("");
            }
            else{
                alert("Nenhum registro encontrado");
            }
        }
    });
}