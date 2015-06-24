// As of 2015, google put a copyprotection on their maps-canvas, which
// ends in always getting a black image
// SOlution has not yet been found


// get gmap-Canvas (this contains the rendered map)
(function() {

var gCanvas = (document.getElementsByTagName("canvas"))[0],
bigmapw = 1000,
bigmaph = 1000,
record  = false,

xx = bigmapw/2-gCanvas.width/2,
yy = bigmaph/2-gCanvas.height/2,
x  = 0,
y  = 0,
xmlns = 'http://www.w3.org/2000/svg',
xlinkns = 'http://www.w3.org/1999/xlink',

svgtag = function() {
    var svgElem = document.createElementNS (xmlns, 'svg');
    svgElem.setAttributeNS (null, 'width', 30);
    svgElem.setAttributeNS (null, 'height', 30);
    return svgElem;
},

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
    o.style.position = 'relative';
    o.style.cursor   = 'pointer';
    o.title          = 'open map';
    var svg = svgtag();
    var defs = document.createElementNS (xmlns, 'defs');

    var grad = document.createElementNS (xmlns, 'linearGradient');
    grad.setAttributeNS (null, 'id', 'lg');
    grad.setAttributeNS (null, 'x1', '50%');
    grad.setAttributeNS (null, 'x2', '50%');
    var stopTop = document.createElementNS (xmlns, 'stop');
    stopTop.setAttributeNS (null, 'offset', 0);
    stopTop.setAttributeNS (null, 'stop-color', '#fcf702');
    grad.appendChild (stopTop);
    var stopBottom = document.createElementNS (xmlns, 'stop');
    stopBottom.setAttributeNS (null, 'offset', 1);
    stopBottom.setAttributeNS (null, 'stop-color', '#ee8f00');
    grad.appendChild (stopBottom);
    defs.appendChild (grad);

    var grad = document.createElementNS (xmlns, 'linearGradient');
    grad.setAttributeNS(null, 'id', 'lg1');
    grad.setAttributeNS(null, 'y2', '100%');
    grad.setAttributeNS(xlinkns, 'xlink:href', '#lg');
    defs.appendChild(grad);

    var grad = document.createElementNS (xmlns, 'linearGradient');
    grad.setAttributeNS (null, 'id', 'lg2');
    grad.setAttributeNS (null, 'y1', '100%');
    grad.setAttributeNS(xlinkns, 'xlink:href', '#lg');
    defs.appendChild(grad);
    svg.appendChild(defs);

    var path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS (null, 'fill', 'url(#lg2)');
    path.setAttributeNS (null, 'stroke', '#A70');
    path.setAttributeNS (null, 'stroke-linejoin', 'round');
    path.setAttributeNS (null, 'd', 'm 2,1.5 4.5,0 0,-1 7,0 0,1 c 2.5,0 6,0 9,0 0.5,0 1,0.5 1.5,1.5 l 2,15.5 c 0,0.5 -0.5,1.5 -1.5,1.5 l -20.5,0 c -0.5,0 -1,-0.5 -1.5,-1.5 L 0.5,3 C 0.5,2 1,1.5 2,1.5 z');
    svg.appendChild(path);

    var path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS (null, 'fill', 'url(#lg1)');
    path.setAttributeNS (null, 'stroke', '#A70');
    path.setAttributeNS (null, 'stroke-linejoin', 'round');
    path.setAttributeNS (null, 'd', 'm 7.5,3 7,0 0,1.5 c 4.5,0 9,0 14,0 0.5,0 1.5,0.5 1.5,1.5 l -3,13.5 c 0,0.5 -0.5,1.5 -1.5,1.5 l -20.5,0 c -0.5,0 -1.5,-0.5 -1.5,-1.5 l 3,-14.5 c 0,-0.5 0.5,-1.5 1.5,-1.5 z');
    svg.appendChild(path);

    o.appendChild(svg);
    o.addEventListener ('click', function(){outputrip();}, false);
    return o;
},

    btnRecord = function() {
    var o = document.createElement('div');
    o.id = 'btnRecord';
    o.style.width    = '30px';
    o.style.height   = '30px';
    o.style.position = 'relative';
    o.style.cursor   = 'pointer';
    o.style.float    = 'right';
    o.title          = 'start recording';
    var svg = svgtag();
    var defs = document.createElementNS(xmlns, 'defs');

    var grad = document.createElementNS (xmlns, 'linearGradient');
    grad.setAttributeNS(null, 'id', 'lg3');
    grad.setAttributeNS(null, 'x1', '50%');
    grad.setAttributeNS(null, 'x2', '70%');
    grad.setAttributeNS(null, 'y1', '50%');
    grad.setAttributeNS(null, 'y2', '80%');
    var stopTop = document.createElementNS(xmlns, 'stop');
    stopTop.setAttributeNS(null, 'offset', 0);
    stopTop.setAttributeNS(null, 'stop-color', '#f83717');
    grad.appendChild(stopTop);
    var stopBottom = document.createElementNS(xmlns, 'stop');
    stopBottom.setAttributeNS(null, 'offset', 1);
    stopBottom.setAttributeNS(null, 'stop-color', '#fdbaaf');
    grad.appendChild(stopBottom);
    defs.appendChild(grad);

    var grad = document.createElementNS(xmlns, 'linearGradient');
    grad.setAttributeNS(null, 'id', 'lg4');
    grad.setAttributeNS(null, 'x2', '50%');
    grad.setAttributeNS(null, 'y1', '50%');
    var stopTop = document.createElementNS(xmlns, 'stop');
    stopTop.setAttributeNS(null, 'offset', 0);
    stopTop.setAttributeNS(null, 'stop-color', '#fb6654');
    grad.appendChild(stopTop);
    var stopBottom = document.createElementNS(xmlns, 'stop');
    stopBottom.setAttributeNS(null, 'offset', 1);
    stopBottom.setAttributeNS(null, 'stop-color', '#fd9385');
    grad.appendChild(stopBottom);
    defs.appendChild(grad);
    svg.appendChild(defs);

    var path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS(null, 'fill', 'url(#lg3)');
    path.setAttributeNS(null, 'd', 'm 208,166 a 71,71 0 1 1 -142,0 71,71 0 1 1 142,0 z');
    path.setAttributeNS(null, 'transform', 'matrix(0.209,0,0,0.209,-13.59,-19.68)');
    svg.appendChild(path);
    var path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS(null, 'fill', 'url(#lg4)');
    path.setAttributeNS(null, 'd', 'M 15,0 C 7,0 0,6.5 0,15 c 0,2.5 0.5,4.5 1.5,6.5 6.5,-7 15.5,-11 26,-11 0.5,0 1,0 1.5,0 C 27.5,4.5 21.5,0 15,0 z');
    svg.appendChild(path);
    o.appendChild(svg);

    o.addEventListener('click', function(){record = true;}, false);
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
  bmGroup.style.top          = '160px';
  bmGroup.style.left         = '13px';
  bmGroup.style.position     = 'absolute';
  bmGroup.style.boxShadow    = '0px 1px 4px rgba(0,0,0,0.3)';
  bmGroup.style.borderRadius = '2px';
  bmGroup.style.border       = '2px solid white';
  bmGroup.style.zIndex       = '10000';
  bmGroup.appendChild(this.wd);
  bmGroup.appendChild(btnOpen());
  bmGroup.appendChild(btnRecord());
  document.getElementsByTagName('body')[0].appendChild(bmGroup);
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
