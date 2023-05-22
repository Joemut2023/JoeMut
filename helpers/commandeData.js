const { TVA } = require("./utils_const");

class CommandeCalcul{
    commande;
    panier_details;
    panierDetailTTC;
    panierDetailHT;
    constructor(commande,panier_details){
        this.commande = commande;
        this.panier_details = panier_details;
    }
    calculPanierTTC(){
        let total_panier_detail_ttc = 0
        for (let index = 0; index < panierDetails.length; index++) {
            total_panier_detail_ttc +=panierDetails[index].pad_ttc * panierDetails[index].pad_qte;
        }
        this.panierDetailTTC = total_panier_detail_ttc;
        this.panierDetailTTC;
    }
    calculPanierHT(){
        let total_panier_detail_ht = 0;
        for (let index = 0; index < panierDetails.length; index++) {
            total_panier_detail_ht += panierDetails[index].pad_ht * panierDetails[index].pad_qte;
        }
        this.panierDetailHT = total_panier_detail_ht;
        return this.panierDetailHT;
    }
    calculPanierTotalWithTVA(){
        return this.panierDetailHT * TVA;
    } 
    calculTotalCommande(){
       return this.calculPanierHT + this.commande.com_frais + this.commande.Frais_port.frp_ttc
    }
    calculTotalCommandeTTC(){
        return this.panierDetailHT + this.commande.com_remise + this.commande.com_frais + this.calculPanierTotalWithTVA()
    }
    calculCommandeHT(){
        this.calculPanierHT() + this.calculCommandeLivraison() + this.commande.com_frais;
    }
    calculCommandeLivraison(){
        return this.commande.Frais_port.frp_ht ? this.commande.Frais_port.frp_ht : 0;
    }
}
module.exports = CommandeCalcul;