$("button.choisirCoursVoir").click(function () {
    let choisirCours = document.getElementById("choisirCours").elements["sigleCours"].value;
    if (choisirCours !== '' && !isNaN(choisirCours)) {
        window.location.href = '/Devoir/Voir/choisirCours/' + choisirCours;
    } else {
        alert("Spécifier un identifiant valide, SVP.");
    }
});
$("button.correctionDevoir").click(function () {
    console.log('test');
    let input = document.getElementById("choisirDevoir").elements["idDevoir"].value;
    let idCours = document.getElementById("idCours").value;
    if (input !== '' && !isNaN(input)) {
        let paramGet;
        if (idCours !== '') {
            paramGet = '?idCours=' + idCours;
        }
        window.location.href = '/Devoir/Voir/correctionDevoir/' + input + paramGet;
    } else {
        alert("Spécifier un identifiant valide, SVP.");
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