
function carregarCategoria() {
    $('.categoria').empty();
    $.ajax({
        type: "GET",
        url: "php/getCategorias.php",
        dataType: "json",
        success: function (dados) {
            if (dados != null) {
                $('.categoria').append($('<option>', {
                    value: 0,
                    text: "Selecione a categoria"
                }));
                for (var i = 0; i < dados.length; i++) {
                    $('.categoria').append($('<option>', {
                        value: dados[i].nm_categoria,
                        text: dados[i].nm_categoria
                    }));
                }
            }
            else {
                alert("Nenhum registro encontrado");
            }
        }
    });
}

function carregarLivro() {
    var pesquisar = document.getElementById('pesquisa').value;
    $('#list-livro').empty();
    $.ajax({
        type: "POST",
        data: { buscar: pesquisar },
        url: "php/getLivros.php",
        dataType: "json",
        success: function (retorno) {
            if (retorno != null) {
                for (var i = 0; i < retorno.length; i++) {
                    $('#list-livro').append('<a class="list-group-item list-group-item-action list-group-item-light" id="' + retorno[i].idlivro + '" data-toggle="list" href="#list-livros-' + retorno[i].idlivro + '" role="tab" aria-controls="' + retorno[i].idlivro + '" onclick="carregarDetalhes(' + retorno[i].idlivro + ')"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Livro: ' + retorno[i].titulo + '</h5></div><p class="mb-1">Categoria: ' + retorno[i].nm_categoria + '</p><small class="text-black">Autor: ' + retorno[i].autor + '</small></a>');
                }
            }
            else {
                alert("Nenhum registro encontrado");
            }
        }
    });
}

function carregarDetalhes(cod_livro) {
    $.ajax({
        type: "POST",
        data: { buscar: cod_livro },
        url: "php/getDetalheLivro.php",
        dataType: "json",
        success: function (dados) {
            if (dados != null) {
                $('#inputTitulo').val(dados[0].titulo);
                $('#inputAutor').val(dados[0].autor);
                $('#inputIdioma').val(dados[0].idioma);
                $('#inputEditora').val(dados[0].editora);
                $('#inputEdicao').val(dados[0].edicao);
                $('#inputSinopse').val(dados[0].sinopse);
                $('#inputPags').val(dados[0].pags);
                $('#inputCateg').val(dados[0].nm_categoria);
            }
            else {
                alert("Nenhum registro encontrado");
            }
        }
    });
}

function cadastrarLivro() {
    var titulo = document.getElementById('inputTitulo').value;
    var autor = document.getElementById('inputAutor').value;
    var editora = document.getElementById('inputEditora').value;
    var edicao = document.getElementById('inputEdicao').value;
    var pags = document.getElementById('inputPags').value;
    var sinopse = document.getElementById('inputSinopse').value;
    var idioma = document.getElementById('inputIdioma').value;
    var categoria = document.getElementById('inputCateg').value;

    var livro = {
        titulo_l: titulo,
        autor_l: autor,
        editora_l: editora,
        edicao_l: edicao,
        pags_l: pags,
        sinopse_l: sinopse,
        idioma_l: idioma,
        categoria_l: categoria
    };

    if (titulo == "" || titulo == null) {
        notifyMe("Atenção", "Qual o título do livro que quer cadastrar?");
    }
    else if (autor == "" || autor == null) {
        notifyMe("Atenção", "Qual é o autor(a) do livro que está cadastrando?");
    }
    else if (editora == "" || editora == null) {
        notifyMe("Atenção", "Informe o nome da editora do livro que está cadastrando!");
    }
    else if (edicao == "" || edicao == null) {
        notifyMe("Atenção", "Qual a edição do livro que está cadastrando?");
    }
    else if (pags == "" || pags == null) {
        notifyMe("Atenção", "Qual a quantidade de páginas do livro que está cadastrando?");
    }
    else if (idioma == "" || idioma == null) {
        notifyMe("Atenção", "Informe o idioma do livro que está cadastrando por favor?");
    }
    else if (categoria == 'Selecione a categoria' || categoria == "" || categoria == null) {
        notifyMe("Atenção", "Seleciona a categoria do livro que está cadastrando!");
    }
    else {
        $.ajax({
            type: "POST",
            data: livro,
            url: "php/newLivro.php",
            dataType: "json",
            success: function (retorno) {
                if (retorno === 'erro') {
                    alert("Livro não foi cadastrado!");
                }
                else if (retorno === 'existe') {
                    alert("Livro já existe!");
                }
                else {
                    alert("Livro cadastrado com sucesso!");
                    limparCampos();
                    carregarLivro();
                }
            }
        });
    }
}

function atualizarLivro() {
    var titulo = document.getElementById('inputTitulo').value;
    var autor = document.getElementById('inputAutor').value;
    var editora = document.getElementById('inputEditora').value;
    var edicao = document.getElementById('inputEdicao').value;
    var pags = document.getElementById('inputPags').value;
    var sinopse = document.getElementById('inputSinopse').value;
    var idioma = document.getElementById('inputIdioma').value;
    var categoria = document.getElementById('inputCateg').value;

    var livro = {
        titulo_l: titulo,
        autor_l: autor,
        editora_l: editora,
        edicao_l: edicao,
        pags_l: pags,
        sinopse_l: sinopse,
        idioma_l: idioma,
        categoria_l: categoria
    };

    if (titulo == "" || titulo == null) {
        notifyMe("Atenção", "Qual o título do livro que quer alterar?");
    }
    else if (autor == "" || autor == null) {
        notifyMe("Atenção", "Qual é o autor(a) do livro que quer alterar?");
    }
    else {
        $.ajax({
            type: "POST",
            data: livro,
            url: "php/updateLivro.php",
            dataType: "json",
            success: function (retorno) {
                if (retorno === 'erro') {
                    alert("Erro ao atualizar informações do livro");
                }
                else if (retorno === 'inexistente') {
                    alert("Livro não foi cadastrado!");
                }
                else {
                    alert("Livro alterado com sucesso!");
                    limparCampos();
                    carregarLivro();
                }
            }
        });
    }
}

function removerLivro() {
    var titulo = document.getElementById('inputTitulo').value;
    var autor = document.getElementById('inputAutor').value;

    var livro = {
        titulo_l: titulo,
        autor_l: autor
    };

    if (titulo == "" || titulo == null) {
        notifyMe("Atenção", "Qual o título do livro que quer cadastrar?");
    }
    else if (autor == "" || autor == null) {
        notifyMe("Atenção", "Qual é o autor(a) do livro que está cadastrando?");
    }
    else {
        $.ajax({
            type: "POST",
            data: livro,
            url: "php/deleteLivro.php",
            dataType: "json",
            success: function (retorno) {
                if (retorno === 'erro') {
                    alert("Erro ao remover o livro");
                }
                else if (retorno === 'inexistente') {
                    alert("Livro não está cadastrado!");
                }
                else {
                    alert("Livro excluido com sucesso!");
                    limparCampos();
                    carregarLivro();
                }
            }
        });
    }
}

function limparCampos() {
    $('#inputTitulo').val("");
    $('#inputAutor').val("");
    $('#inputIdioma').val("Selecione o idioma");
    $('#inputEditora').val("");
    $('#inputEdicao').val("");
    $('#inputSinopse').val("");
    $('#inputPags').val("");
    $('#inputCateg').val(0);
}

function cadastrarCategoria() {
    var nm_categoria = document.getElementById('inputCategoria').value;

    var categoria = {
        categoria_l: nm_categoria
    };

    if (nm_categoria == 'Selecione a categoria' || nm_categoria == "" || nm_categoria == null) {
        notifyMe("Atenção", "Informe o nome da categoria que deseja cadastrar!");
    }
    else {
        $.ajax({
            type: "POST",
            data: categoria,
            url: "php/newCategoria.php",
            dataType: "json",
            success: function (retorno) {
                if (retorno === 'erro') {
                    alert("Categoria não foi cadastrado!");
                }
                else if (retorno === 'existe') {
                    alert("Categoria já existe!");
                }
                else {
                    alert("Categoria cadastrado com sucesso!");
                    $('#inputCategoria').val("");
                    $('#selectCateg').val(0);
                    carregarCategoria();
                }
            }
        });
    }
}

function removerCategoria() {
    var nm_categoria = document.getElementById('selectCateg').value;

    var categoria = {
        categoria_l: nm_categoria
    };
    if (nm_categoria == 'Selecione a categoria' || nm_categoria == "" || nm_categoria == null) {
        notifyMe("Atenção", "Seleciona a categoria do livro que está excluindo!");
    }
    else{
        $.ajax({
            type: "POST",
            data: categoria,
            url: "php/deleteCategoria.php",
            dataType: "json",
            success: function (retorno) {
                if (retorno === 'erro') {
                    alert("Erro ao remover a categoria");
                }
                else if (retorno === 'inexistente') {
                    alert("Categoria não está cadastrada!");
                }
                else {
                    alert("Categoria removida com sucesso!");
                    $('#inputCategoria').val("");
                    $('#selectCateg').val(0);
                    carregarCategoria();
                }
            }
        });
    }
}