$(function(){
    carregarPag('home.html');
})

function carregarPag (pagina){
    $.get(pagina,function(conteudo){
        $('#content').html(conteudo);
    });
}