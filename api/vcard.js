// Fichier : api/vcard.js

module.exports = async (req, res) => {
    // 1. Récupérer l'ID de la carte depuis l'URL (ex: ?id=38520)
    const cardId = req.query.id;

    if (!cardId) {
        res.status(400).send("❌ Erreur: ID de carte manquant. Contactez le Bureau Général.");
        return;
    }

    // --- 2. Simuler la Base de Données ---
    let userData = {};

    // ATTENTION : L'ID est maintenant "38520"
    if (cardId === '38520') {
        userData = {
            name: "Adam Doléans",
            tel: "+33749698415",
            email: "adouche.adouche@icloud.com",
            bday: "20120826", // Format VCard: YYYYMMDD
            address: "12 impasse des Cigognes",
            zip: "72230",
            city: "Mulsanne",
            country: "France"
        };
    } else {
        // Si l'ID n'est pas reconnu
        res.status(404).send(`🚫 Carte ID ${cardId} non trouvée.`);
        return;
    }

    // --- 3. Générer le Contenu VCard (Template à jour) ---
    const vCardContent = `BEGIN:VCARD
VERSION:4.0
FN:${userData.name}
N:Doléans;Adam;;;
TEL;TYPE=CELL,VOICE:${userData.tel}
EMAIL;TYPE=PREF,INTERNET:${userData.email}
BDAY:${userData.bday}
ADR;TYPE=HOME:;;${userData.address};${userData.city};;${userData.zip};${userData.country}
END:VCARD`;

    // --- 4. Configurer les En-têtes pour forcer le Téléchargement ---
    res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="contact_${cardId}.vcf"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 

    // --- 5. Envoyer la VCard ---
    res.status(200).send(vCardContent);
};