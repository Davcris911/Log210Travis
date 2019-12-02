$(function () {
    $("button.ajoutercours").click(function () {
        window.location.href = '/Groupe/Creer/demarrer';
    });
    $("button.voircours").click(function () {
        window.location.href = '/Groupe/voirListeCours/';
    });
    $("button.voirquestion").click(function () {
        window.location.href = '/Question/voirListeQuestions/';
    });
    $("button.ajouterquestionnaire").click(function () {
        window.location.href = '/Questionnaire/Creer/demarrer/';
    });
    $("button.voirquestionnaire").click(function () {
        window.location.href = '/Questionnaire/Voir/demarrer/';
    });
    $("button.ajouterDevoir").click(function () {
        window.location.href = '/Devoir/Creer/demarrer/';
    });
    $("button.voirDevoir").click(function () {
        window.location.href = '/Devoir/Voir/demarrer/';
    });
    $("button.accueil").click(function () {
        window.location.href = '/';
    });
    $("button.corrigerDevoir").click(function () {
        window.location.href = '/Devoir/Voir/demarrer/';
    });


    $("button.test").click(function () { // https://stackoverflow.com/questions/34319709/how-to-send-an-http-request-with-a-header-parameter
        let token;
        $.get("http://localhost:3001/api/v1/login?email=teacher%2B3%40gmail.com&password=1234", function (data, status) {
            token = data;
        });
        console.log(token);
        console.log(JSON.stringify(token));
        $.ajax({
            type : "GET",
            url : "http://localhost:3001/api/v1//courses",
            beforeSend : function(head){head.setRequestHeader('token', '07e74791d927adb57bc6cd448aa7e34f');},
            success : function (resultat) {
                console.log(resultat);
            },
            error : function (resultat) {
            }
        });
    });

    console.log('ready!!'); // sanity check
});

$('.entry').on('click', function () {
    var entry = this;
    var post_id = $(this).find('h2').attr('id');
    $.ajax({
        type: 'GET',
        url: '/delete' + '/' + post_id,
        context: entry,
        success: function (result) {
            if (result.status === 1) {
                $(this).remove();
                console.log(result);
            }
        }
    });
});