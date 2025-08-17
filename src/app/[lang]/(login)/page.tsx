import Login from '@/app/[lang]/(login)/components/Login'
import { getDictionary } from '@/app/[lang]/(login)/dictionaries/dictionaries'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <Login dict={dict} lang={lang} />
}
