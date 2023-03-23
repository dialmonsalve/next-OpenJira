interface seeData {
	entries: SeedEntry[]
}

interface SeedEntry {
	description: string;
	status: string;
	createAt: number
}



export const seedData: seeData = {
	entries: [
		{
			description: 'Pendiente: Prprpew´rwp pwoeripowqe rpopik rqwepor qpsadf',
			status: 'pending',
			createAt: Date.now(),
		},
		{
			description: 'En-progreso: po fdf dfkl fdrwp pwoeripsadfowqe rpopik rqwepor qpsadf',
			status: 'in-progress',
			createAt: Date.now() - 1000000,
		},
		{
			description: 'finished: Prprpewsdafjsadf  opdsoas rwp pwoeripowqe rpopik',
			status: 'finished',
			createAt: Date.now() - 100000,
		},
	]

}