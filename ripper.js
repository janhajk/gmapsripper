// get gmap-Canvas (this contains the rendered map)
(function() {

var gCanvas = (document.getElementsByTagName("canvas"))[1],
bigmapw = 5000,
bigmaph = 5000,
record  = false,

xx = bigmapw/2-gCanvas.width/2,
yy = bigmaph/2-gCanvas.height/2,
x  = 0,
y  = 0,
svgtag = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">',

bigmap = document.createElement('canvas'),

// bigmap drawing area
bigmapctx = bigmap.getContext('2d'),

// run this function to output image
outputrip = function() {
  var w = window.open();
  w.document.write('<img src="'+bigmap.toDataURL("image/png")+'" />');
  w.focus();
};

// create new canvas for our bigmap
bigmap.id           = 'bigmap';
bigmap.width        = bigmapw;
bigmap.height       = bigmaph;
bigmap.style.width  = bigmapw;
bigmap.style.height = bigmaph;

gCanvas.addEventListener ('mousedown', function (e) {x=e.pageX;y=e.pageY;}, false);
gCanvas.addEventListener ('mouseup',   function (e) {
  if (record) {
    x  = x-e.pageX;
    y  = y-e.pageY;
    xx = xx+x;
    yy = yy+y;
    bigmapctx.drawImage(gCanvas,xx,yy);
    bm.update(xx,yy,gCanvas.width,gCanvas.height);
  }
}, false),

outputButton = document.createElement('input'),

divWerbung = function() {
  var w = document.createElement('div');
  w.style.width        = '50%';
  w.style.height       = '30px';
  w.style.top          = '100px';
  w.style.left         = '13px';
  w.style.position     = 'absolute';
  w.style.boxShadow    = '0px 1px 4px rgba(0,0,0,0.3)';
  w.style.borderRadius = '2px';
  w.style.background   = '#AAA';
  w.style.border       = '2px solid white';
  w.style.color        = 'white';
  w.style.textAlign    = 'left';
  w.style.paddingLeft  = '5px';
  w.style.paddingTop   = '10px';
  w.style.fontFamily   = 'Roboto,Arial,sans-serif';
  w.innerHTML          = 'Script written by: Jan Sch&auml;r; visit my blog at <a href="http://tech.janschaer.ch">tech.janschaer.ch</a>';
  return w;
},

btnOpen = function() {
  var o = document.createElement('div');
  o.id = 'btnOpen';
  o.style.width    = '30px';
  o.style.height   = '30px';
  o.style.position = 'absolute';
  o.style.cursor   = 'pointer';
  o.style.bottom   = '0px';
  o.style.right    = '10px';
  o.title          = 'open map';
  o.innerHTML      = svgtag+'<defs><linearGradient id="lg" x2="50%" x1="50%" ><stop style="stop-color:#fcf702" offset="0" /><stop style="stop-color:#ee8f00" offset="1" /></linearGradient><linearGradient xlink:href="#lg" y2="100%" id="lg1" /><linearGradient xlink:href="#lg" y1="100%" id="lg2" /></defs><path style="fill:url(#lg2);stroke:#A70;stroke-linejoin:round" d="m 2,1.5 4.5,0 0,-1 7,0 0,1 c 2.5,0 6,0 9,0 0.5,0 1,0.5 1.5,1.5 l 2,15.5 c 0,0.5 -0.5,1.5 -1.5,1.5 l -20.5,0 c -0.5,0 -1,-0.5 -1.5,-1.5 L 0.5,3 C 0.5,2 1,1.5 2,1.5 z" /><path style="fill:url(#lg1);stroke:#A70;stroke-linejoin:round" d="m 7.5,3 7,0 0,1.5 c 4.5,0 9,0 14,0 0.5,0 1.5,0.5 1.5,1.5 l -3,13.5 c 0,0.5 -0.5,1.5 -1.5,1.5 l -20.5,0 c -0.5,0 -1.5,-0.5 -1.5,-1.5 l 3,-14.5 c 0,-0.5 0.5,-1.5 1.5,-1.5 z" /></svg>';
  o.addEventListener ('click', function(){outputrip();}, false);
  return o;
},

btnRecord = function() {
  var o = document.createElement('div');
  o.id = 'btnRecord';
  o.style.width    = '30px';
  o.style.height   = '30px';
  o.style.position = 'absolute';
  o.style.cursor   = 'pointer';
  o.style.bottom   = '10px';
  o.style.left     = '10px';
  o.title          = 'start recording';
  o.innerHTML      = svgtag+'<defs><linearGradient id="lg3" x1="50%" y1="50%" x2="70%" y2="80%"><stop style="stop-color:#f83717" offset="0" /><stop style="stop-color:#fdbaaf" offset="1" /></linearGradient><linearGradient id="lg4" y1="50%" x2="50%" ><stop style="stop-color:#fb6654" offset="0" /><stop style="stop-color:#fd9385" offset="1" /></linearGradient></defs><path style="fill:url(#lg3)" d="m 208,166 a 71,71 0 1 1 -142,0 71,71 0 1 1 142,0 z" transform="matrix(0.209,0,0,0.209,-13.59,-19.68)" /><path style="fill:url(#lg4)" d="M 15,0 C 7,0 0,6.5 0,15 c 0,2.5 0.5,4.5 1.5,6.5 6.5,-7 15.5,-11 26,-11 0.5,0 1,0 1.5,0 C 27.5,4.5 21.5,0 15,0 z" /></svg>';
  o.addEventListener ('click', function(){record = true;}, false);
  return o;
},

bmOverview = function() {
  this.wd  = document.createElement('canvas');
  this.ctx = this.wd.getContext('2d');
  this.w   = 250;
  this.h   = this.w*bigmaph/bigmapw;
};

bmOverview.prototype.create = function() {
  this.wd.id                 = 'mbOverview';
  this.wd.width              = this.w;
  this.wd.height             = this.h;
  this.wd.style.width        = this.w + 'px';
  this.wd.style.height       = this.h + 'px';
  this.wd.style.position     = 'relative';
  this.wd.style.background   = 'white';

  var bmGroup = document.createElement('div');
  bmGroup.id = 'bmGroup';
  bmGroup.width              = this.w;
  bmGroup.height             = this.h;
  bmGroup.style.width        = this.w + 'px';
  bmGroup.style.height       = this.h + 'px';
  bmGroup.style.bottom       = '200px';
  bmGroup.style.left         = '13px';
  bmGroup.style.position     = 'absolute';
  bmGroup.style.boxShadow    = '0px 1px 4px rgba(0,0,0,0.3)';
  bmGroup.style.borderRadius = '2px';
  bmGroup.style.border       = '2px solid white';
  document.getElementsByTagName('body')[0].appendChild(bmGroup);
  document.getElementById('bmGroup').appendChild(this.wd);
  document.getElementById('bmGroup').appendChild(btnOpen());
  document.getElementById('bmGroup').appendChild(btnRecord());
};
bmOverview.prototype.update = function(x,y,w,h) {
  x = Math.round(x/bigmapw*this.w);
  y = Math.round(y/bigmaph*this.h);
  w = Math.round(w/bigmapw*this.w);
  h = Math.round(h/bigmaph*this.h);
  this.ctx.fillRect(x,y,w,h);
  this.ctx.strokeStyle = '#F00';
  this.ctx.strokeRect(x,y,w,h);
};

document.getElementsByTagName('body')[0].appendChild(divWerbung());
var bm = new bmOverview();
bm.create();


}());
