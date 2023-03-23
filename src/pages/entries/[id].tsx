import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
	Card,
	capitalize,
	Grid,
	CardHeader,
	CardContent,
	TextField,
	Button,
	CardActions,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	IconButton
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utilities';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
	entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

	const { updateEntry } = useContext(EntriesContext);

	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);

	const router = useRouter();

	const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

	const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}

	const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value as EntryStatus);
	}

	const onSave = () => {

		if (inputValue.trim().length === 0) return;

		const updatedEntry: Entry = {
			...entry,
			status,
			description: inputValue
		}

		updateEntry(updatedEntry, true);
		router.push('/')

	}

	return (
		<Layout title={inputValue.substring(0, 20) + '...'} >
			<Grid
				container
				justifyContent="center"
				sx={{ marginTop: 2 }}
			>
				<Grid item xs={12} sm={8} md={6} >
					<Card>
						<CardHeader
							title={`Entrada`}
							subheader={`CREADA ${dateFunctions.getFormatDistanceToNow(entry.createAt)}`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="Nueva entrada"
								autoFocus
								multiline
								label="Nueva entrada"
								value={inputValue}
								onChange={onTextFieldChange}
								helperText={isNotValid && 'Ingrese un valor'}
								onBlur={() => setTouched(true)}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={onStatusChanged}
								>
									{
										validStatus.map(option => (
											<FormControlLabel
												key={option}
												value={option}
												control={<Radio />}
												label={capitalize(option)}

											/>
										))
									}


								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>

			</Grid>
			<IconButton sx={{
				position: 'fixed',
				bottom: 30,
				right: 30,
				backgroundColor: 'error.dark'
			}} >
				<DeleteForeverOutlinedIcon />
			</IconButton>
		</Layout>
	)
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}


	return {
		props: {
			entry
		}
	}
}

export default EntryPage;
