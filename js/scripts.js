function goBack() {
        window.history.back();
}

$(document).ready(function(){
        $('#nome').click(function(){
                $("#form_nome").toggle();
        });
});
$(document).ready(function(){
        $('#password').click(function(){
                $("#form_password").toggle();
        });
});
$(document).ready(function(){
        $('#foto').click(function(){
                $("#form_foto").toggle();
        });
})

setTimeout(function(){
        location.reload();
},302200);




