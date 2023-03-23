import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

	if (req.nextUrl.pathname.startsWith('/api/entries/')) {
		const id = req.nextUrl.pathname.replace('/api/entries/', '');
		const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

		if (!checkMongoIDRegExp.test(id)) {
			const url = req.nextUrl.clone();
			url.search = `?message=${id} no es un id válido`;
			url.pathname = '/api/bad-request';

			return NextResponse.rewrite(url);
		};
	};
	return NextResponse.next();
}

export const config = {
	// matcher: 'about/:path*',
	matcher: [
		'/api/entries/:path*'
	]
}