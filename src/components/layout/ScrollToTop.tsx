'use client'
import { ArrowUp } from 'lucide-react'
import useScroll from '@/hooks/use-scroll'
import { useIsMobile } from '@/hooks/use-mobile'

export function ScrollToTopButton() {
  const isScrolled = useScroll(0)
  const isMobile = useIsMobile()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex justify-end mt-8">
      {isScrolled && (
        <button
          onClick={handleClick}
          className={`bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition ${
            isMobile ? 'text-sm' : 'text-base'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
