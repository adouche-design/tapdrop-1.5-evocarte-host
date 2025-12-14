// Fichier : api/vcard.js

// 1. Importer les données JSON
const usersData = require('../users.json');

module.exports = async (req, res) => {
    // 2. Récupérer l'ID de la carte depuis l'URL
    const cardId = req.query.id;

    if (!cardId) {
        res.status(400).send("❌ Erreur: ID de carte manquant. Contactez le Bureau Général.");
        return;
    }

    // --- 3. Chercher l'utilisateur dans le fichier JSON ---
    const userData = usersData[cardId];

    if (!userData) {
        // Si l'ID n'est pas reconnu dans le fichier JSON
        res.status(404).send(`🚫 Carte ID ${cardId} non trouvée. Contactez le Bureau Général.`);
        return;
    }

    // --- 4. Générer le Contenu VCard (en utilisant userData) ---
    const vCardContent = `BEGIN:VCARD
VERSION:4.0
FN:${userData.name}
N:${userData.lastName};${userData.firstName};;;
TEL;TYPE=CELL,VOICE:${userData.tel}
EMAIL;TYPE=PREF,INTERNET:${userData.email}
BDAY:${userData.bday}
ADR;TYPE=HOME:;;${userData.address};${userData.city};;${userData.zip};${userData.country}
END:VCARD`;

    // --- 5. Configurer les En-têtes pour forcer le Téléchargement ---
    res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="contact_${cardId}.vcf"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 

    // --- 6. Envoyer la VCard ---
    res.status(200).send(vCardContent);
};