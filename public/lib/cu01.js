$(function () {
    $("button.creerCours").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        let idsCours = (document.getElementById("idCours").value).split(',');
        let maxId = (document.getElementById("maxId").value);
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            if(idsCours.includes(choisirCours)) {
                alert("Cours déjà existant");
            } else if(Number(choisirCours) > Number(maxId)){
                alert("Cours non disponible");
            }else {
                window.location.href = '/Groupe/Creer/ajouterCours/' + choisirCours;
            }
        } else {
            alert("Spécifier un Identifiant valide, SVP.");
        }
    });

    $("button.choisirCours").click(function () {
        let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
        if (choisirCours !== '' && !isNaN(choisirCours)) {
            window.location.href = '/Groupe/choisirCours/' + choisirCours;
        } else {
            alert("Spécifier un Identifiant valide, SVP.");
        }
    });

    $("button.supprimerCours").click(function () {
        let choisirCours = document.getElementById("idCours").innerHTML;
        if (choisirCours !== ''&& !isNaN(choisirCours)) {
            if(confirm("Voulez-vous supprimer le cours?")) {
                window.location.href = '/Groupe/supprimerCours/' + choisirCours;
            }
        } else {
            alert("Spécifier un Identifiant valide, SVP.");
        }
    });
});