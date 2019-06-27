class Graph
{
	constructor()
	{
		this.vertices = [];
		this.edges = [];
		this.selectedVertex = null;

		this.vertexRadius = 0;
		this.scale = 1;
	}

	draw()
	{
		for (let edge of this.edges)
		{
			edge.draw(this.scale);
		}

		for (let vertex of this.vertices)
		{
			vertex.draw(this.vertexRadius, this.scale,
						vertex === this.selectedVertex);
		}
	}

	addVertex(x, y)
	{
		this.vertices.push(new Vertex(x, y));
	}

	addEdge(a, b)
	{
		a.degree++;
		b.degree++;
		this.edges.push(new Edge(a, b));
	}

	containsEdge(a, b)
	{
		for (let edge of this.edges)
		{
			if ((edge.a === a && edge.b === b) || 
				(edge.a === b && edge.b === a))
			{
				return true;
			}
		}

		return false;
	}

	removeVertexAt(x, y)
	{
		let vertex = this.getVertexAt(x, y);
		this.removeVertex(vertex);
	}

	removeVertex(vertex)
	{
		for (let i = this.edges.length - 1; i >= 0; --i)
		{
			let edge = this.edges[i];
			if (edge.a === vertex || edge.b === vertex)
			{
				edge.a.degree--;
				edge.b.degree--;
				this.edges.splice(i, 1);
			}
		}

		for (let i = this.vertices.length - 1; i >= 0; --i)
		{
			let v = this.vertices[i];
			if (v === vertex)
			{
				this.vertices.splice(i, 1);
			}
		}

		this.selectedVertex = null;
	}

	selectVertex(x, y)
	{
		this.selectedVertex = this.getVertexAt(x, y);
		return this.selectedVertex;
	}

	getVertexAt(x, y)
	{
		for (let vertex of this.vertices)
		{
			let d = dist(x, y, vertex.x, vertex.y);
			if (d < this.vertexRadius * this.scale)
			{
				return vertex;
			}
		}

		return null;
	}

	clear()
	{
		this.vertices = [];
		this.edges = [];
		this.selectedVertex = null;
	}
}
