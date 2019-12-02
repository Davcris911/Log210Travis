$(function () {

    // Creer

    $("button.choisirCoursCreer").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Questionnaire/Creer/choisirCours/' + choisirCours;
        } else {
            alert("Spécifier un identifiant, SVP.");
        }
    });
    $("button.creerQuestionnaire").click(function () {
        let description = document.getElementById("creerQuestionnaire").elements["description"].value;
        let etat = document.getElementById("creerQuestionnaire").elements["etat"].value;
        let idCours = document.getElementById("idCours").value;
        if (description !== '' && etat !== '') {
            let paramGet;
            if (idCours !== '') {
                paramGet = idCours;
            }
            window.location.href = '/Questionnaire/Creer/choisircategorie/' + description + '/' + etat + '/' + paramGet;
        } else {
            alert("Spécifier un identifiant, SVP.");
        }
    });

    $("button.modifierDescrQuestionnaire").click(function () {
        let description = document.getElementById("creerQuestionnaire").elements["description"].value;
        let etat = document.getElementById("creerQuestionnaire").elements["etat"].value;
        //let idCours = document.getElementById("idCours").value;
        if (description !== '' && etat !== '') {
            let paramGet;
           // if (idCours !== '') {
            //    paramGet = idCours;
           // }
            if (confirm('Are you sure you want to save this thing into the database?')) {
                window.location.href = '/Questionnaire/Modifier/choisircategorie/' + description + '/' + etat ;//+ '/' + paramGet;
            } else {
                // Do nothing!
            }

        } else {
            alert("Spécifier un identifiant, SVP.");
        }
    });
    $("button.modifier").click(function () {
    //    let description = document.getElementById("creerQuestionnaire").elements["description"].value;
    //    let etat = document.getElementById("creerQuestionnaire").elements["etat"].value;
        let idQuestionnaire = document.getElementById("idQuestion").innerHTML;
 //       if (description !== '' && etat !== '') {
    //        let paramGet;
   //         if (idCours !== '') {
     //           paramGet = idCours;
     //       }
            window.location.href = '/Questionnaire/Modifier/listeQuestionnaire/'+ idQuestionnaire;// + '/' + etat + '/' + paramGet;
     //   } else {
    //        alert("Spécifier un identifiant, SVP.");
       // }
    });
    $("button.creerCategorie").click(function () {
        let categorie = document.getElementById("creerCategorie").elements["categorie"].value;
        let idQuestionnaire = document.getElementById("idQuestionnaire").value;
        if (categorie !== '' && idQuestionnaire !== '') {
            window.location.href = '/Questionnaire/Creer/choisirQuestion/' + categorie + '/' + idQuestionnaire;
        } else {
            alert("Spécifier un identifiant, SVP.");
        }
    });
    $("button.creerAjoutQuestion").click(function () {
        let idQuestionnaire = document.getElementById("idQuestionnaire").value;
        let questions = document.forms['creerAjouterQuestions'].elements['question'];
        let questionChecked = [];
        for(var i=0,cbLen2=questions.length;i<cbLen2;i++){
            if(questions[i].checked){
                questionChecked.push(questions[i].value);
            }
        }
        if (idQuestionnaire !== '' && !isNaN(idQuestionnaire)) {
            window.location.href = '/Questionnaire/Creer/ajouterQuestions/' + idQuestionnaire + '/' + questionChecked;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    $("button.modifierAjoutQuestion").click(function () {
        let idQuestionnaire = document.getElementById("idQuestionnaire").value;
        let questions = document.forms['creerAjouterQuestions'].elements['question'];
        let questionChecked = [];
        for(var i=0,cbLen2=questions.length;i<cbLen2;i++){
            if(questions[i].checked){
                questionChecked.push(questions[i].value);
            }
        }
        if (idQuestionnaire !== ''  && !isNaN(idQuestionnaire)) {
            window.location.href = '/Questionnaire/Modifier/ajouterQuestions/' + idQuestionnaire + '/' + questionChecked;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    // Afficher

    $("button.choisirCoursVoir").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Questionnaire/Voir/choisirCours/' + choisirCours;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });
    $("button.choisirQuestionnaire").click(function () {
        let input = document.getElementById("choisirQuestionnaire").elements["idQuestionnaire"].value;
        let idCours = document.getElementById("idCours").value;
        if (input !== '') {
            let paramGet;
            if (idCours !== '') {
                paramGet = '?idCours=' + idCours;
            }
            window.location.href = '/Questionnaire/Voir/choisirQuestionnaire/' + input + paramGet;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    $("button.continueCours").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        if(idCours == null){
            idCours = document.getElementById('idCours').value;
        }
        window.location.href = '/Questionnaire/Voir/choisirCours/' + idCours;
    });
    $("button.continueRecup").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        window.location.href = '/Questionnaire/Voir/demarrer';
    });

    $("button.supprimerQuestionnaire").click(function () {
        let input = document.getElementById("choisirQuestionnaire").elements["idQuestionnaire"].value;
        let idCours = document.getElementById("idCours").value;
        if (input !== '') {
            let paramGet;
            if (idCours !== '') {
                paramGet = '?idCours=' + idCours;
            }
            window.location.href = '/Questionnaire/Voir/suppressionQuestionnaire/' + input + paramGet;
        } else {
            alert("Specifier un identifiant valide, SVP.");
        }
    });

    $("button.supprimer").click(function () {
        let choisirQuestionnaire = document.getElementById("idQuestionnaire").value;
        if (choisirQuestionnaire !== '') {
            window.location.href = '/Questionnaire/Voir/supprimerQuestionnaire/' + choisirQuestionnaire;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

});