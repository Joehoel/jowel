export default class Grid {
	static scale = 40;
	static size = 600;

	static get rows() {
		return this.size / this.scale;
	}
	static get columns() {
		return this.size / this.scale;
	}
}
