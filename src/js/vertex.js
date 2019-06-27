class Vertex
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.degree = 0;
	}

	draw(r, scale, selected)
	{
		stroke(255 * selected, 0, 0);
		strokeWeight(2 * scale);
		fill(255);
		ellipse(this.x, this.y, r * scale);

		noStroke();
		fill(0);
		textSize(16 * scale);
		textAlign(CENTER, CENTER);
		text(this.degree, this.x, this.y);
	}
}
