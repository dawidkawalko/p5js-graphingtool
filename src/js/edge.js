class Edge
{
	constructor(a, b)
	{
		this.a = a;
		this.b = b;
	}

	draw(scale)
	{
		stroke(0);
		strokeWeight(2 * scale);
		noFill();
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}
