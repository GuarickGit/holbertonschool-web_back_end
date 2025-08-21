export default class Building {
  constructor(sqft) {
    this._sqft = sqft;

    // new.target est la classe réellement instanciée (Building ou une sous-classe)
    // - Si on instancie Building directement, on NE fait PAS le contrôle.
    // - Si on instancie une sous-classe, on DOIT vérifier que la méthode
    //   evacuationWarningMessage a été redéfinie.
    if (new.target !== Building &&
        // Si la méthode présente sur l'instance est exactement la même
        // que celle définie sur le prototype de Building, alors l'enfant
        // ne l'a pas surchargée -> on lève l'erreur demandée.
        this.evacuationWarningMessage === Building.prototype.evacuationWarningMessage) {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
  }

  get sqft() {
    return this._sqft;
  }
  // Méthode "abstraite": on la déclare ici pour imposer la signature,
  // mais elle ne doit jamais être utilisée telle quelle.
  // Les classes enfants DOIVENT la redéfinir (override).
  evacuationWarningMessage() {
    throw new Error('evacuationWarningMessage must be implemented');
  }
}
