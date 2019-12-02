$(function () {
    $("button.choisirQuestion").click(function () {
        let choisirQuestion = document.getElementById("choisirQuestion").elements["idQuestion"].value;
        if (choisirQuestion !== '' && !isNaN(choisirQuestion)) {
            window.location.href = '/Question/voirQuestion/' + choisirQuestion;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });
    $("button.continueRecup").click(function () {
        window.location.href = '/Question/voirListeQuestions/';
    });
    $("button.modifier").click(function () {
        let infoQuestion = document.getElementById("idQuestion").innerHTML;
        if (infoQuestion !== '' && !isNaN(infoQuestion)) {
            window.location.href = '/Question/modifierQuestion/'+ infoQuestion;

    } else {
        console.log("Spécifier un identifiant valide, SVP.");
    }


    });

    $("button.supprimer").click(function () {
        var c = confirm("Voulez-vous supprimer la question?");
        if (c === true) {
            status.innerHTML = "Vous avez confirmer, merci";
            let choisirQuestion = document.getElementById("idQuestion").innerHTML;
            if(choisirQuestion !== ''){
                window.location.href = '/Question/supprimerQuestion/' + choisirQuestion;
            } else {
                console.log("Spécifier un identifiant, SVP.");
            }
        } else {
            status.innerHTML = "Vous avez annuler la suppression";
        }
    });
});