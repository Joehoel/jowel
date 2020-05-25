export enum Mode {
	Development,
	Production,
}

const CONFIG: { PORT: number; MODE: Mode } = {
	MODE: process.env.NODE_ENV === "development" ? Mode.Development : Mode.Production,
	PORT: 8080,
};

export default CONFIG;
