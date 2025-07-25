export const cleanSimpleText = (str) => {
    if (typeof str !== 'string') {
        return '';
    }
    
    let cleanedStr = str.replace(/<[^>]*>?/g, '');
    cleanedStr = cleanedStr.replace(/[^a-zA-Z0-9\s.,-àâäéèêëïîöôùûüÿçœæ]/gi, '');
    return cleanedStr.trim().toLowerCase();
};


export const ValidateDate = (dateEntree) => {
    const maintenant = new Date()
    const dateUtilisateur = new Date(dateEntree);

  if (isNaN(dateUtilisateur.getTime())) {
    return "";
  }
  dateUtilisateur.setHours(0, 0, 0, 0);
  maintenant.setHours(0, 0, 0, 0);

  if(dateUtilisateur < maintenant){
    return ""
  }
    
    return dateEntree;
};