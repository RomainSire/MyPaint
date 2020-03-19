"use strict";

var Palette = function() {
  this.canvas = document.querySelector('#colorPalette');
  this.context = this.canvas.getContext('2d');


  this.drawPalette();

  // Evennement sur le bouton afficher/masquer la palette
  $('#colorPick').on('click', this.togglePalette.bind(this));
}

Palette.prototype = {
  /*
   * Méthode pour afficher la palette
   */
  drawPalette: function() {
    // Construire un dégradé de couleur
    var gradient;

    gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
    // Dégradé rouge -> vert -> bleu vertical.
    gradient.addColorStop(0,    'rgb(255,   0,   0)');
    gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
    gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
    gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
    gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
    gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
    gradient.addColorStop(1,    'rgb(255,   0,   0)');

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);

    // Dégradé blanc opaque -> transparent -> noir opaque horizontal.
    gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
    gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  },

  /*
   * Méthode pour afficher la palette
   */
  togglePalette: function() {
    $('#colorPalette').fadeToggle(500);
  },

}
