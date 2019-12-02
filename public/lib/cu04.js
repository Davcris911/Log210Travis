$(function () {

    //Créer
    $("button.choisirCoursCreer").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Devoir/creer/choisirCours/' + choisirCours;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });
    $("button.creerDevoir").click(function () {
            let description = document.getElementById("description").value;
            let noteMax = document.getElementById("noteMax").value;
            let date_debut = document.getElementById("date_debut").value;
            let date_fin = document.getElementById("date_fin").value;
            let etat_visible = document.getElementById("etat_visible").value;
            let idCours = document.getElementById("idCours").value;
            let d_debut = date_debut.split('-');
            let d_fin = date_fin.split('-');
        if (confirm("Voulez vous ajouter un devoir?")){
            let flag = true;
            if(Number(d_fin[0]) <= Number(d_debut[0])){
                if(Number(d_fin[1]) <= Number(d_debut[1])){
                    if(Number(d_fin[2]) <= Number(d_debut[2])){
                        flag = false;
                        alert("La date de fin doit être plus grande que la date de début");
                    }
                }
            }
            if (flag && description !== '' && noteMax !== '' && !isNaN(noteMax) && date_debut !== '' && date_fin !== '') {
                window.location.href = '/Devoir/Creer/creerDevoir/' + description + '/' + noteMax + '/' + date_debut + '/' + date_fin + '/' + etat_visible + '/' + idCours;
            } else {
                if(flag){
                    alert("Spécifier un identifiant, SVP.");
                }
            }
        }
    });
    // Afficher

    $("button.choisirCoursVoir").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Devoir/Voir/choisirCours/' + choisirCours;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });
    $("button.choisirDevoir").click(function () {
        let input = document.getElementById("choisirDevoir").elements["idDevoir"].value;
        let idCours = document.getElementById("idCours").value;
        if (input !== '' && !isNaN(input)) {
            let paramGet;
            if (idCours !== '') {
                paramGet = '?idCours=' + idCours;
            }
            window.location.href = '/Devoir/Voir/choisirDevoir/' + input + paramGet;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });
    $("button.ajouterDevoir").click(function () {
        let input = document.getElementById("choisirDevoir").elements["idDevoir"].value;
        let idCours = document.getElementById("idCours").value;
        if (input !== '' && !isNaN(input)) {
            let paramGet;
            if (idCours !== '') {
                paramGet = '?idCours=' + idCours;
            }
            window.location.href = '/Devoir/Voir/ajouterDevoir/' + input + paramGet;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    $("button.ajouterCoursVoir").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Devoir/Voir/ajouterDhoisirCours/' + choisirCours;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    $("button.supprimerDevoir").click(function () {
        let input = document.getElementById("choisirDevoir").elements["idDevoir"].value;
        let idCours = document.getElementById("idCours").value;
        if (input !== '' && !isNaN(input)) {
            let paramGet;
            if (idCours !== '') {
                paramGet = '?idCours=' + idCours;
            }
            window.location.href = '/Devoir/Voir/suppressionDevoir/' + input + paramGet;
        } else {
            alert("Spécifier un identifiant valide, SVP.");
        }
    });

    $("button.supprimer").click(function () {
            let choisirDevoir = document.getElementById("idDevoir").value;
            if(choisirDevoir !== ''){
                if (confirm("Voulez vous supprimer un devoir?")){
                    window.location.href = '/Devoir/Voir/supprimerDevoir/' + choisirDevoir;
                }
            } else {
                alert("Spécifiez un ID valide, s.v.p");
            }
    });

    $("button.sortNom").click(function () {
        let adresse = (window.location.href);
        if(adresse.includes('&trie')){
            adresse = adresse.substring(0, adresse.indexOf('&trie'));
        }
        window.location.href = adresse  + '&trie=1';
    });
    $("button.sortNote").click(function () {
        let adresse = (window.location.href);
        if(adresse.includes('&trie')){
            adresse = adresse.substring(0, adresse.indexOf('&trie'));
        }
        window.location.href = adresse  + '&trie=2';
    });
    $("button.continueCours").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        if(idCours == null){
            idCours = document.getElementById('idCours').value;
        }
        window.location.href = '/Devoir/Voir/choisirCours/' + idCours;
    });
    $("button.continueRecup").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        window.location.href = '/Devoir/Voir/demarrer';
    });

    $("button.modifier").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        let idDevoirs = document.getElementById("idDevoir").innerHTML;
        window.location.href = '/Devoir/modifier/'+idCours+'/'+idDevoirs;
    });

    $("button.modifierDevoir").click(function () {
        let idCours = document.getElementsByName("idCours").value;
        let idDevoirs = document.getElementById("idDevoir").innerHTML;
        let idVisible = document.getElementById("visible").value;
        let idDescription = document.getElementById("description").value;
        let idDateDebut = document.getElementById("dateDebut").value;
        let idDateFin = document.getElementById("dateFin").value;
        let idNoteMax = document.getElementById("noteMax").value;
        let d_debut = idDateDebut.split('-');
        let d_fin = idDateFin.split('-');
        if(idVisible.isUndefined||idDescription.isUndefined || idDescription===""||idDateDebut.isUndefined||idDateFin.isUndefined||idNoteMax.isUndefined||idNoteMax==="")
        {
            alert("Tout les champs sont obligatoire");
        }
        else
        {

        }
        let flag= true;
        if(Number(d_fin[0]) <= Number(d_debut[0])) {
            if (Number(d_fin[1]) <= Number(d_debut[1])) {
                if (Number(d_fin[2]) <= Number(d_debut[2])) {
                    flag = false;
                    alert("La date de fin doit être plus grande que la date de début");
                }
            }
        }
        if(idNoteMax.isNaN)
        {
            alert("La note max doit être un nombre.");
        }
        else {
            if(flag){
                window.location.href = '/Devoir/modifier/' + idCours + '/' + idDevoirs + '/' + idVisible + '/' + idDescription + '/' + idDateDebut + '/' + idDateFin + '/' + idNoteMax;
            }
        }



    });

});