"use strict";

/**
 * Classe slate
 * Cette classe permet de gérer le canvas principal et les interactions qui vont y être associées
 */

// Constructeur de la classe Slate :
var Slate = function() {
  // Fait à la création de l'objet :
  // on met l'ardoise dans la propriété "canvas" de l'objet créé
  this.canvas = document.querySelector('#ardoise');
  this.context = this.canvas.getContext('2d');
  this.isDrawing = false; // la propriété isDrawing nous permettra de savoir si on dessine ou pas. Par défaut, on ne dessine pas.
  this.currentPosition = null; // La propriété currentPosition nous permet de connaitre où est positionnée la souris de l'utilisateur sur le canvas
  this.color = "#000"; // par défaut la couleur du trait sera noire
  this.thickness = 2;

  // on branche les gestionnaires d'évennements
  this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
  // IMPORTANT : concernant le .bind(toto)
  // Dans une classe, le this, représente la Classe
  // Dans une fonction appelés par une évènement, le this correspond à l'élément html d'où provient d'événement.
  // Donc dans la méthode de la classe onMouseDown : this représente l'élément html canvas, et non pas la Classe Slate.
  // Pour contrecarrer ça, on utilise .bind() : ce qui est passé en paramètre deviendra le this dans la méthode. Donc si on lui passe le this, du coup le this de la méthode est égal au this de la classe : l'objet !
  // autre explication + courte : A cet endroit du code le mot-clé this représente la classe Slate. Quand on fait onMouseDown.bind(this), on dit que dans la méthode onMouseDown le mot-clé this représentera donc la classe et non pas l'élément HTML comme c'est le cas naturellement
  this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

  // Evénements sur les boutons de couleurs + ereaser (jQuery pour pas s'embeter !)
  $('.btn-color-js').on('click', this.onColorButtonClicked.bind(this));

  // Evenement sur le bouton RESET
  $('#reset').on('click', this.onResetButtonClicked.bind(this));

  // Evennement sur la palette
  $('#colorPalette').on('click', this.onColorPaletteClicked.bind(this));

  // Evennement sur les boutons d'épaisseur
  $('.btn-thickness-js').on('click', this.onThicknessButtonClicked.bind(this));

};


// Création du prototype de Slate
Slate.prototype = {
  /*
   * Méthode qui récupère et renvoie la position de la souris par rapport au canvas
   */
  getMousePosition: function(event) {
    var canvasPosition = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasPosition.left,
      y: event.clientY - canvasPosition.top
    }
  },

  /*
   * Méthode appelée lorsque l'événement mousedown est détecté sur le canvas
   */
  onMouseDown: function(event) {
    this.currentPosition = this.getMousePosition(event); // position souris
    this.isDrawing = true; // on passe en mode dessin
  },

  /*
   * Méthode appelée lorsque l'événement mousemove est détecté sur le canvas
   */
  onMouseMove: function(event) {
    if(this.isDrawing) {  // Si on est en mode dessin
      var location = this.getMousePosition(event); // NEW position souris

      this.context.strokeStyle = this.color;  // Couleur du tracé
      this.context.lineWidth = this.thickness; // épaisseur
      this.context.lineJoin = "round"; // Arrondir les angles
      this.context.lineCap = "round"; // Arrondir les angles

      this.context.beginPath(); //on commence le tracé
      this.context.moveTo(this.currentPosition.x, this.currentPosition.y); // point de départ (this.currentPosition)
      this.context.lineTo(location.x, location.y); // point d'arrivée (location)
      this.context.closePath(); // tracé fermé
      this.context.stroke(); // on trace
      this.currentPosition = location; // point d'arrivée devient la position courante
    }
  },

  /*
   * Méthode appelée lorsque l'événement mouseup est détecté sur le canvas
   */
  onMouseUp: function() {
    this.isDrawing = false; // on arrête le mode dessin
  },

  /*
   * Méthode appelée lorsqu'on clique sur un bouton de couleur
   */
  onColorButtonClicked: function(event) {
    // Pour récupérer l'attribut data en javascript, utiliser "dataset" :
    this.color = event.currentTarget.dataset.color;
  },

  /*
   * Méthode appelée lorsqu'on clique sur la palette de couleur
   */
  onColorPaletteClicked: function(event) {
    var canvas = event.currentTarget; // sélection du canvas Color Picker
    var ctx = canvas.getContext('2d'); // contexte
    // position de la souris dans le canvas colorPicker
    var canvasPosition = canvas.getBoundingClientRect();
    var mousePosition = {
      x: event.clientX - canvasPosition.left,
      y: event.clientY - canvasPosition.top
    };
    // on récupère les data du point qui a été cliqué = les valeurs R, G, B, A
    var data = ctx.getImageData(mousePosition.x, mousePosition.y, 1, 1).data;
    // Seulement R, G, B nous intéressent, on les mets dans le paralètre de l'objet
    this.color = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2]+ ')';
    // on fait disparaitre la Palette
    $('#colorPalette').fadeToggle(500);
  },

  /*
   * Méthode appelée lorsqu'on clique sur le bouton de reset
   */
  onResetButtonClicked: function() {
    this.context.clearRect(0, 0, 600, 500);
  },

  onThicknessButtonClicked: function(event) {
    this.thickness = event.currentTarget.dataset.thickness;
  }

};