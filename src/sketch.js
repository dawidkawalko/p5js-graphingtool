let graph = null;
let scaleDiv = null;

function setupUI()
{
	createDiv('Simple graphing tool.');
	createDiv('Numbers in circles represent vertex degrees.')

	createP();
	createDiv('Use mouse wheel to scale the view.');
	scaleDiv = createDiv();

	createP();
	createDiv('Press [delete] to remove the selected vertex');
	createDiv('Press the [middle mouse button] to remove ' +
				'a vertex under the cursor.');
	createDiv('Press [escape] to deselect a vertex.');
	createDiv('Press [r] to clear the canvas.')

	createP();
	createDiv('Choose the tool [or use keys 1-4]:');
}

function setup()
{
	ellipseMode(RADIUS);
	createCanvas(1000, 600);

	setupUI();

	graph = new Graph();
	graph.vertexRadius = 20;

	toolbox = new Toolbox(createRadio());
}

function draw()
{
	background(240);

	toolbox.tool = toolbox.radio.value();

	scaleDiv.html('Current scale: x' + graph.scale);
	graph.draw();

	textSize(25);
	textAlign(LEFT, TOP);
	text('Current tool: ' + toolbox.tool, 5, 5);
}

function mousePressed()
{
	const previous = graph.selectedVertex;
	let selected = graph.selectVertex(mouseX, mouseY);

	if (mouseX > width || mouseY > height) return;
	
	if (mouseButton === CENTER)
	{
		graph.removeVertexAt(mouseX, mouseY);
	}
	else if (mouseButton === LEFT)
	{
		if (selected === null)
		{
			graph.addVertex(mouseX, mouseY);
			selected = graph.selectVertex(mouseX, mouseY);
		}

		if (toolbox.tool != Tools.VERTEX &&
			selected !== null && previous !== null)
		{
			if (selected !== previous &&
				!graph.containsEdge(selected, previous))
			{
				graph.addEdge(selected, previous);

				if (toolbox.tool == Tools.EDGE)
				{
					graph.selectedVertex = null;
				}

				if (toolbox.tool == Tools.STAR)
				{
					graph.selectedVertex = previous;
				}
			}
		}
	}
}

function mouseDragged()
{
	if (mouseX > width || mouseY > height) return;

	if (mouseButton === LEFT && toolbox.tool == Tools.VERTEX)
	{
		let selected = graph.selectedVertex;
		if (selected !== null)
		{
			selected.x = mouseX;
			selected.y = mouseY;
		}
	}
}

function keyPressed()
{
	switch (key)
	{
		case 'Delete':
			if (graph.selectedVertex !== null)
			{
				graph.removeVertex(graph.selectedVertex);
			}
			break;

		case 'Escape':
			graph.selectedVertex = null;
			break;

		case 'r':
		case 'R': 
			graph.clear();
			break;

		case '1':
			toolbox.selectTool(Tools.VERTEX);
			graph.selectedVertex = null;
			break;

		case '2':
			toolbox.selectTool(Tools.EDGE);
			graph.selectedVertex = null;
			break;

		case '3':
			toolbox.selectTool(Tools.PATH);
			graph.selectedVertex = null;
			break;

		case '4':
			toolbox.selectTool(Tools.STAR);
			graph.selectedVertex = null;
			break;
	}
}

function mouseWheel(event)
{
	graph.scale -= Math.sign(event.delta) * 0.1;
	graph.scale = constrain(Math.round(graph.scale * 100) / 100, 0.5, 3);
}
