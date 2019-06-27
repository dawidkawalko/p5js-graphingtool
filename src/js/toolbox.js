const Tools = {
	VERTEX: 'Vertex',
	EDGE: 'Edge',
	PATH: 'Path',
	STAR: 'Star'
}

class Toolbox
{
	constructor(radio)
	{
		this.radio = radio;
		this.radio.option(Tools.VERTEX);
		this.radio.option(Tools.EDGE);
		this.radio.option(Tools.PATH);
		this.radio.option(Tools.STAR);

		this.selectTool(Tools.VERTEX);
	}

	selectTool(tool)
	{
		this.tool = tool;
		this.radio.value(this.tool);
	}
}
