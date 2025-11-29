// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validation basique
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Construire le message pour mailto
    const mailtoLink = `mailto:bensalahnermin250@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
    
    // Ouvrir le client de messagerie
    window.location.href = mailtoLink;
    
    // Afficher un message de confirmation
    alert('Votre message sera envoyé via votre client de messagerie. Merci de votre contact !');
    
    // Optionnel : réinitialiser le formulaire après un délai
    setTimeout(function() {
        document.getElementById('contact-form').reset();
    }, 1000);
});

