$.ajax({
    url: url_cliente + '/api/api_cliente.php',
    type: 'POST',
    data:{classe: "usuario", metodo: "obterTodosTime"},
    success: function(result){
        var chart = new OrgChart(document.getElementById("tree"), {
            template: "luba",
            enableDragDrop: true,
            nodeBinding: {
                field_0: "nome",
                field_1: "contato",
                field_2: "email",
                field_3: "funcao",
                img_0: "foto"
            },
            nodes: [
                result.data[0],
                result.data[1],
            ]
        });
        
    }
});