import { IconButton, Toolbar, Typography, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';

export const Navbar = () => {

	const { openSideMenu } = useContext(UIContext);
	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton
					size='large'
					edge='start'
					onClick={openSideMenu}
				>
					<MenuOutlinedIcon />
				</IconButton>
				<NextLink href="/" passHref legacyBehavior>
					<Link underline='none' color='white'>
						<Typography variant='h6'>OpenJira</Typography>
					</Link>
				</NextLink>
			</Toolbar>
		</AppBar>
	)
}
