export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  // Méthode cloneCar :
  // Crée une nouvelle instance de la classe courante (Car ou une sous-classe, ex: TestCar)
  // Les attributs ne sont pas recopiés → donc undefined par défaut
  cloneCar() {
    return new this.constructor[Symbol.species]();
  }

  // Symbol.species :
  // Permet de définir quelle classe doit être utilisée
  // quand on instancie un "clone" via cloneCar()
  // Ici on retourne "this", donc la classe appelante (Car ou TestCar)
  static get [Symbol.species]() {
    return this;
  }
}
