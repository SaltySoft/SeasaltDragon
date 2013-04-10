var _top_parent = this;
(function ($, OpenSeadragon) {

    var Class = function () {
        var klass = function () {
            this.init.apply(this, arguments);
        };
        klass.fn = klass.prototype;
        klass.fn.parent = klass;

        klass.fn.init = function () {
        };

        klass.extend = function (obj) {
            var extended = obj.extended;
            for (var i in obj) {
                klass[i] = obj[i];
            }
            if (extended) {
                extended(klass);
            }
        };

        klass.include = function (obj) {
            var included = obj.included;
            for (var i in obj) {
                klass.fn[i] = obj[i];
            }
            if (included) {
                included(klass);
            }
        };

        return klass;
    };

    var SeasaltDragonAnnotation = new Class();
    SeasaltDragonAnnotation.include({
        posx: 0,
        posy: 0,
        posxx: 0,
        posyy: 0,
        init: function () {
            this.elements = [];
        },
        setPosition: function (x, y, xx, yy) {
            var base = this;
            base.posx = x;
            base.posy = y;
            base.posxx = xx;
            base.posyy = yy;
        },
        addElement: function (element, minZoom, maxZoom) {
            var base = this;
            var original_width = 0;
            base.elements.push({
                elt: element,
                minZ: minZoom,
                maxZ: maxZoom,
                original_width: original_width
            });
        }
    });

    /**
     *
     * @type {{}}
     */
    var SeasaltDragon = new Class();
    SeasaltDragon.extend({
        Annotation: SeasaltDragonAnnotation
    });
    SeasaltDragon.include({
        viewer: undefined,
        annotations: [],
        originzoom: 0,
        init: function (viewer) {
            var base = this;
            base.viewer = viewer;
            base.originzoom = viewer.viewport.getZoom();
            base.registerEvents();
        },
        insertAnnotation: function (annotation) {
            var base = this;
            var elt = document.createElement("div");
            $(elt).addClass("overlay_square");



            var placement = OpenSeadragon.OverlayPlacement.CENTER;

            console.log(annotation.elements);
            for (var k in annotation.elements) {
                var rect = new OpenSeadragon.Rect(annotation.posx, annotation.posy, annotation.posxx, annotation.posyy);
                console.log(rect);
                $(elt).append(annotation.elements[k].elt);
                base.viewer.drawer.addOverlay(annotation.elements[k].elt, rect, placement);
            }
            base.annotations.push(annotation);
            var current_zoom = base.viewer.viewport.getZoom();

            for (var a in base.annotations) {
                var annotation = base.annotations[a];
                for (var ek in annotation.elements){
                    var elt = annotation.elements[ek];
                    if (elt.minZ < current_zoom && elt.maxZ > current_zoom) {
                        console.log(elt.elt);
                        $(elt.elt).css("opacity", 1);
                    } else {
                        $(elt.elt).css("opacity", 0);
                    }
                }
            }
        },
        animated: false,
        intervalTimer: 0,
        registerEvents: function () {
            var base = this;
            var timer = 0;

            if (base.viewer !== undefined) {
                var timer = 0;
                var animated = false;

                base.viewer.addHandler("animationstart", function () {
                    if (!animated) {
                        timer = setInterval(function () {
                            $(document).trigger("seasalt_seadragon_animated");
                        }, 20);
                    }
                    animated = true;
                });
                base.viewer.addHandler("animationfinish", function () {
                    var base = this;
                    clearInterval(timer);
                    animated = false;
                });
                var i = 0;
                $(document).on("seasalt_seadragon_animated", function () {
                    var current_zoom = base.viewer.viewport.getZoom();

                    for (var a in base.annotations) {
                        var annotation = base.annotations[a];
                        for (var ek in annotation.elements){
                            var elt = annotation.elements[ek];
                            if (elt.minZ < current_zoom && elt.maxZ > current_zoom) {
                                console.log(elt.elt);
                                $(elt.elt).css("opacity", 1);
                            } else {
                                $(elt.elt).css("opacity", 0);
                            }
                        }
                    }
                });

            }
        }

    });


    _top_parent.SeasaltDragon = SeasaltDragon;
})(jQuery, OpenSeadragon);