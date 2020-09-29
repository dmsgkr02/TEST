(function(){
	function HexagonShape(){
		mxActor.call(this)
	}
	mxUtils.extend(HexagonShape, mxHexagon)
	HexagonShape.prototype.size = 0.25
	HexagonShape.prototype.isRoundable = function(){
		return true
	}
	HexagonShape.prototype.redrawPath = function(c, x, y, w, h){
		var s =  w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
		this.addPoints(c, [new mxPoint(0, 0.25 * h), new mxPoint(0.5 * w, 0), new mxPoint(w, 0.25 * h), new mxPoint(w, 0.75 * h), new mxPoint(0.5 * w, h), new mxPoint(0, 0.75 * h)], this.isRounded, arcSize, true)
	}
	mxCellRenderer.registerShape('hexagon', HexagonShape)

	function ReplicationShape(){
		mxActor.call(this)
	}
	mxUtils.extend(ReplicationShape, mxHexagon)
	HexagonShape.prototype.size = 0.25
	HexagonShape.prototype.isRoundable = function(){
		return true
	}
	ReplicationShape.prototype.redrawPath = function(c, x, y, w, h){
		var s =  w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
		//1
		this.addPoints(c, [new mxPoint(0, 0.25 * h), new mxPoint(0.4 * w, 0.1*h), new mxPoint(0.5 * w, 0.15*h), new mxPoint(0.1*w, 0.3 * h),new mxPoint(0.1*w, 0.80 * h), new mxPoint(0, 0.73 * h)], this.isRounded, arcSize, true)
		//2
		this.addPoints(c, [new mxPoint(0.1*w, 0.3 * h), new mxPoint(0.5 * w, 0.15*h),  new mxPoint(0.6 * w, 0.2*h), new mxPoint(0.2*w, 0.35 * h),new mxPoint(0.2*w, 0.85 * h), new mxPoint(0.1*w, 0.80 * h)], this.isRounded, arcSize, true)
		//3
		this.addPoints(c, [new mxPoint(0.2*w, 0.35 * h), new mxPoint(0.6 * w, 0.2*h), new mxPoint(w, 0.35 * h), new mxPoint(w, 0.85 * h),new mxPoint(0.6 * w, h), new mxPoint(0.2*w, 0.85 * h)], this.isRounded, arcSize, true)
	}
	mxCellRenderer.registerShape('replication', ReplicationShape)

    function mxDoubleEllipse(bounds, fill, stroke, strokewidth){
        mxShape.call(this)
        this.bounds = bounds
        this.fill = fill
        this.stroke = stroke
        this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    }
    mxUtils.extend(mxDoubleEllipse, mxShape)
    mxDoubleEllipse.prototype.vmlScale = 10

    mxDoubleEllipse.prototype.paintBackground = function(c, x, y, w, h){
        c.ellipse(x, y, w, h)
        c.stroke()
    };

    mxDoubleEllipse.prototype.paintForeground = function(c, x, y, w, h){
        if (!this.outline){
            var margin = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(w / 5, h / 5)))
            margin = 12
            x += margin
            y += margin
            w -= 2 * margin
            h -= 2 * margin

            if (w > 0 && h > 0){
                c.ellipse(x, y, w, h)
            }
            c.fillAndStroke()
        }
    };


    mxDoubleEllipse.prototype.getLabelBounds = function(rect){
        var margin = (mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth,
                Math.min(rect.width / 5 / this.scale, rect.height / 5 / this.scale)))) * this.scale
        return new mxRectangle(rect.x + margin, rect.y + margin, rect.width - 2 * margin, rect.height - 2 * margin)
    };

    mxCellRenderer.registerShape('doubleEllipse', mxDoubleEllipse)

    function mxActor(bounds, fill, stroke, strokewidth){
        mxShape.call(this)
        this.bounds = bounds
        this.fill = fill
        this.stroke = stroke
        this.strokewidth = (strokewidth != null) ? strokewidth : 1
    }

    mxUtils.extend(mxActor, mxShape)

    mxActor.prototype.paintVertexShape = function(c, x, y, w, h){
        c.translate(x, y)
        c.begin()
        this.redrawPath(c, x, y, w, h)
        c.fillAndStroke()
    }

    mxActor.prototype.redrawPath = function(c, x, y, w, h){
        var width = w/3
        c.moveTo(0, h)
        c.curveTo(0, 3 * h / 5, 0, 2 * h / 5, w / 2, 2 * h / 5)
        c.curveTo(w / 2 - width, 2 * h / 5, w / 2 - width, 0, w / 2, 0)
        c.curveTo(w / 2 + width, 0, w / 2 + width, 2 * h / 5, w / 2, 2 * h / 5)
        c.curveTo(w, 2 * h / 5, w, 3 * h / 5, w, h)
        c.close()
    }
	mxCellRenderer.registerShape('ator', mxActor)

    function mxItem(bounds, fill, stroke, strokewidth){
        mxShape.call(this)
        this.bounds = bounds
        this.fill = fill
        this.stroke = stroke
        this.strokewidth = (strokewidth != null) ? strokewidth : 1
    }
    mxUtils.extend(mxItem, mxShape)
    mxItem.prototype.paintBackground = function(c, x, y, w, h,dx,dy){
        dx=25
        dy=25
        c.roundrect(x, y, w, h,dx,dy)
        c.fillAndStroke()
    }
    mxCellRenderer.registerShape('item', mxItem)


	function UmlActorShape(){
		mxShape.call(this)
	}
	mxUtils.extend(UmlActorShape, mxShape)
	UmlActorShape.prototype.paintBackground = function(c, x, y, w, h){
		c.translate(x, y)
		// Head
		c.ellipse(w / 4, 0, w / 2, h / 4)
		c.fillAndStroke()
		c.begin()
		c.moveTo(w / 2, h / 4)
		c.lineTo(w / 2, 2 * h / 3)
		// Arms
		c.moveTo(w / 2, h / 3)
		c.lineTo(0, h / 3)
		c.moveTo(w / 2, h / 3)
		c.lineTo(w, h / 3)
		// Legs
		c.moveTo(w / 2, 2 * h / 3)
		c.lineTo(0, h)
		c.moveTo(w / 2, 2 * h / 3)
		c.lineTo(w, h)
		c.end()
		
		c.stroke()
	}
	mxCellRenderer.registerShape('umlActor', UmlActorShape)
}
)();