import { NextResponse, NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'fr']
const defaultLocale = 'fr'

function getLocale(request: NextRequest) {
  const negotiator = new Negotiator({
    headers: {
      'accept-language': request.headers.get('accept-language') || '',
    },
  })
  const languages = negotiator.languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|static|.*\\..*).*)'],
}
