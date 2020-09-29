function create_min_object_panel(editor){
	this.editor = editor
	this.graph = editor.graph
	this.graph.dropEnabled = true
	var second_div = document.getElementById('second')
	
	var min_object_panel =create_div ('min_object_panel',second_div)

	var min_toolbar_panel = create_div('min_toolbar_panel', min_object_panel)
	var toolbar = new mxDefaultToolbar(min_toolbar_panel, this.editor)
	toolbar.addItem(mxResources.get('convert'), 'ADWindow/image_32/copy.png', 'maxMInConvert')
	toolbar.addItem(mxResources.get('fit'), 'ADWindow/image_32/actor.png', 'fit')
	toolbar.addItem(mxResources.get('full'), 'ADWindow/image_32/addatt.png', 'full')
	toolbar.addItem('nodeSlectView', 'ADWindow/image_32/ungroup.png', 'nodeSlectView')
	toolbar.addItem('showHide', 'ADWindow/image_32/group.png', 'showHide')
	toolbar.addItem('selectPan', 'ADWindow/image_32/cut.png', 'selectPan')

	var addActionElement = function(div, value, image, w, h, style){
		var prototype = new mxCell(value, new mxGeometry(0, 0, w, h), style);
		prototype.setVertex(true);
		addActionVertex(editor,graph,div,prototype,image,w,h);
	}
	addActionElement(min_object_panel,'Action','ADWindow/image_32/action.png', 40, 40, 'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;');		
		
	function addActionVertex(editor,graph,div,prototype,image,w,h)
	{
		var funct = function(graph, evt, cell)
		{
			var pt = graph.getPointForEvent(evt);
			var vertex = graph.getModel().cloneCell(prototype);
			
			if(graph.isSplitTarget(cell, [vertex], evt))
			{
				graph.getModel().beginUpdate();
				try
				{
					vertex.geometry.x = pt.x;
			vertex.geometry.y = pt.y;
		
			graph.splitEdge(cell, [vertex], null , 0, 0);
			graph.addCell(vertex);
				}
				finally
				{
					graph.getModel().endUpdate();
				}
				graph.setSelectionCell(vertex);
			}
			else
			{
				mxUtils.alert( '선 내부에 도형이 위치해야 합니다.' );
			}
		}//funct
		
		
		var img = document.createElement('img');
		img.setAttribute('src', image);
		img.setAttribute('class','element_img');
		img.title = mxResources.get('drag')
		div.appendChild(img);
		
		var dragImg = document.createElement('img');
		dragImg.setAttribute('src',image);
		dragImg.style.width = w;
		dragImg.style.height = h;
		dragImg.style.left = 12;
		var ele = document.createElement('div');
		ele.appendChild(dragImg);
		
		var dragSource = mxUtils.makeDraggable(img, graph, funct, img, 0, 0, true, true,true);
		dragSource.setGuidesEnabled(true);
		
		dragSource.createPreviewElement = function(graph)
		{
			ele.style.width = w;
			ele.style.height = h;
			ele.style.left = 12;
			ele.style.border = 'dashed blue 2px';
			return ele;
		};
		
		
		
	}
}

function create_div (className,parent){
	var ele = document.createElement('div')
	ele.setAttribute('class',className)
	parent.appendChild(ele)
	return ele
}
