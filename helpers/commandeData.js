const { TVA } = require("./utils_const");

class CommandeCalcul{
    commande;
    panier_details;
    panierDetailTTC;
    panierDetailHT;
    /**
     * 
     * @param {Object} commande 
     * @param {Array} panier_details 
     */
    constructor(commande,panier_details){
        this.commande = commande;
        this.panier_details = panier_details;
    }
    /**
     * 
     * @returns {number}
     */
    calculPanierTTC(){
        let total_panier_detail_ttc = 0
        for (let index = 0; index < this.panier_details; index++) {
            total_panier_detail_ttc +=this.panier_details[index].pad_ttc * this.panier_details[index].pad_qte;
        }
        this.panierDetailTTC = total_panier_detail_ttc;
        return this.panierDetailTTC;
    }
    /**
     * 
     * @returns {number}
     */
    calculPanierHT(){
        let total_panier_detail_ht = 0;
        for (let index = 0; index < this.panier_details.length; index++) {
            total_panier_detail_ht += this.panier_details[index].pad_ht * this.panier_details[index].pad_qte;
        }
        this.panierDetailHT = total_panier_detail_ht;
        return this.panierDetailHT;
    }
    /**
     * 
     * @returns {number}
     */
    calculPanierTotalWithTVA(){
        return this.panierDetailHT * TVA;
    } 
    /**
     * 
     * @returns {number}
     */
    calculTotalCommande(){
       return this.calculPanierHT() + this.commande.com_frais + this.commande.Frais_port.frp_ttc
    }
    /**
     * 
     * @returns {number}
     */
    calculTotalCommandeTTC(){
        return this.panierDetailHT + this.commande.com_remise + this.commande.com_frais + this.calculPanierTotalWithTVA()
    }
    /**
     * 
     * @returns {number}
     */
    calculCommandeHT(){
       return this.calculPanierHT() + this.calculCommandeLivraison() + this.commande.com_frais;
    }
    /**
     * 
     * @returns {number}
     */
    calculCommandeLivraison(){
        return this.commande.Frais_port.frp_ht ? this.commande.Frais_port.frp_ht : 0;
    }
}
module.exports = CommandeCalcul;