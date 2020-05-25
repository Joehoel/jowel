/**
 * Clamp a number to be between 0 and 1
 * @param n Number to clamp between 0 and 1
 * @returns The clamped value of n
 */
export function clamp(n: number): number;

/**
 * Clamp a number to be between the given min and max
 * @param n Number to clamp
 * @param min Minimum value of the clamp
 * @param max Maximum value of the clamp
 * @returns The clamped value of n
 */
export function clamp(n: number, min: number, max: number): number;

export function clamp(n: number, min?: number, max?: number) {
	min = min == undefined ? 0 : min;
	max = max == undefined ? 1 : max;
	return Math.min(Math.max(n, min), max);
}

/**
 * Get all integer factors of n
 * @param n Integer to get the factors from
 * @returns Array of all factors
 * @throws {Error} when n is not an integer
 * @throws {Error} when n is smaller or equal to 0
 */
export function factors(n: number) {
	if (!Number.isInteger(n)) throw new Error("Expected integer");
	if (n <= 0) throw new Error(`Expected n to be at least 1, but got ${n}`);

	return [...Array(n + 1).keys()].filter(i => n % i === 0);
}

/**
 * Get all sets of the given size with combinations of the entries of the given array
 *
 * @example getArrayCombinations([1, 2, 3, 4], 2) // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 * @example getArrayCombinations([1, 2, 3, 4], 3) // [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
 * @param entries
 * @param groupSize
 * @returns An array of unique combinations
 */
export function getArrayCombinations<T>(entries: T[], groupSize: number): T[][] {
	function helper(index: number, depth: number, results: T[][], current: T[]) {
		for (let i = index; i < entries.length; i++) {
			current.push(entries[i]);

			if (current.length < groupSize) {
				helper(i + 1, depth + 1, results, current);
			} else {
				results.push([...current]);
				current.pop();
			}
		}

		current.pop();
		return results;
	}

	return helper(0, 0, [], []);
}

/**
 * Get all unique combinations of every property in the object and their possible values
 *
 * @example getObjectCombinations({ foo: [1, 2], bar: [4, 8] }) // [{ foo: 1, bar: 4 }, { foo: 1, bar: 8 }, { foo: 2, bar: 4 }, { foo: 2, bar: 8 }]
 * @param obj Object to get the combinations of
 * @returns Array of objects, where each entry is a combination
 */
export function getObjectCombinations<O extends { [key in keyof O]: any[] }>(
	obj: O
): { [key in keyof O]: O[key][number] }[] {
	const allKeys = getObjectKeys(obj);

	function helper(
		optionIndex: number,
		results: { [key in keyof O]: O[key][number] }[],
		current: { [key in keyof O]?: O[keyof O] }
	) {
		const optionKey = allKeys[optionIndex];
		const vals = obj[optionKey];

		for (let i = 0; i < vals.length; i++) {
			current[optionKey] = vals[i];

			if (optionIndex + 1 < allKeys.length) {
				helper(optionIndex + 1, results, current);
			} else {
				results.push(JSON.parse(JSON.stringify(current)));
			}
		}

		return results;
	}

	return helper(0, [], {});
}

/**
 * TypeScript substitute of Object.keys() to get a typed array of the object keys
 * @param obj Object to get the keys from
 * @returns Keys of the object
 */
export function getObjectKeys<O extends {}>(obj: O) {
	return <Array<keyof O>>Object.keys(obj);
}

/**
 * Map n to a number between 0 and 1
 * @param n Number to map
 * @param min Minimum value of the old range
 * @param max Maximum value of the old range
 * @returns Value after mapping n
 */
export function map(n: number, min: number, max: number): number;

/**
 * Map n from a number in the old range, to a number in the new range
 * @param n Number to map
 * @param min Minimum value of the old range
 * @param max Maximum value of the old range
 * @param newMin Minimum value of the new range
 * @param newMax Maximum value of the new range
 * @returns Value after mapping n
 */
export function map(n: number, min: number, max: number, newMin: number, newMax: number): number;

export function map(n: number, min: number, max: number, newMin?: number, newMax?: number) {
	newMin = newMin == undefined ? 0 : newMin;
	newMax = newMax == undefined ? 1 : newMax;
	return ((n - min) * (newMax - newMin)) / (max - min) + newMin;
}

/**
 * Get a random number between min and max (inclusive)
 * @param min Minimum value of the random number
 * @param max Maximum value of the random number
 * @param float Whether to return a float instead of an integer
 * @returns Random number between min and max
 */
export function random(min: number, max: number, float?: true): number;

/**
 * Get a random entry from an array
 * @param array Array to get a random entry from
 * @returns Random entry from array
 */
export function random<T>(array: T[]): T;

/**
 * Get a number of random items from an array
 * @param array Array to get random entries from
 * @param count Number of random entries to get
 * @returns A random slice from the input array
 */
export function random<T>(array: T[], count: number): T[];

export function random<T>(
	arrOrMin: number | T[],
	countOrMax?: number,
	float?: true
): T[] | T | number {
	if (Array.isArray(arrOrMin)) {
		if (countOrMax == undefined) return arrOrMin[Math.floor(Math.random() * arrOrMin.length)];

		const copy = arrOrMin.slice(0, arrOrMin.length);

		const selected: T[] = [];
		for (let i = 0; i < countOrMax; i++) {
			selected.push(copy.splice(random(0, copy.length - 1), 1)[0]);
		}
		return selected;
	} else {
		const x = Math.random() * (countOrMax! - arrOrMin);
		return float ? arrOrMin + x : arrOrMin + Math.round(x);
	}
}

/**
 * Allow to use a promise-based delay
 * @param millis Number of milliseconds to wait
 * @returns Promise that resolves after the given number of milliseconds
 */
export function waitForMillis(millis: number): Promise<void> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, millis);
	});
}
export function line(
	ctx: CanvasRenderingContext2D,
	width: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number
) {
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
export function radians(deg: number): number {
	return (deg * Math.PI) / 180;
}

export function constrain(n: number, low: number, high: number): number {
	return Math.max(Math.min(n, high), low);
}
export function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.stroke();
}
