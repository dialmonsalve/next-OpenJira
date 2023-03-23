import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';

import styles from './EntryList.module.css';

interface Props {
	status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endDragging } = useContext(UIContext)

	const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

	const allowDrop = (e: DragEvent) => {
		e.preventDefault();

	}

	const onDropEntry = (e: DragEvent) => {

		const id = e.dataTransfer.getData('text')

		const entry = entries.find(ent => ent._id === id)!;
		entry.status = status
		updateEntry(entry)
		endDragging()
	}

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ''}
		>
			<Paper sx={{
				height: "calc(100vh - 180px)",
				overflowY: "scroll",
				"&::-webkit-scrollbar": {
					width: "3px",
					bgcolor: "#454545",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "#4a148c",
					border: "7px none #fffff",
					borderRadius: "10px",
				},
			}}>
				{/* todo */}
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }} >

					{
						entriesByStatus.map(entry => (

							<EntryCard key={entry._id} entry={entry} />
						))
					}

				</List>
			</Paper>
		</div>
	)
}
