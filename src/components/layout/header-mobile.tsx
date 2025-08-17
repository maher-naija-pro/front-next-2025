'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarItems } from '@/constants/data'
import { SidebarItem } from '@/lib/model'
import { Icons } from '@/components/icons'
import { motion, useCycle, Variants } from 'framer-motion'
import useDimensions from '@/hooks/useDimensions'
import type { SVGMotionProps } from 'framer-motion'

type SidebarVariants = {
  open: (height: number) => {
    clipPath: string
    transition: {
      type: string
      stiffness: number
      restDelta?: number
      damping?: number
    }
  }
  closed: {
    clipPath: string
    transition: {
      type: string
      stiffness: number
      damping: number
    }
  }
}

const sidebar: SidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const menuItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
}

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
}

export default function HeaderMobile() {
  const pathname = usePathname()
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar as Variants}
      />

      <motion.ul
        variants={listVariants}
        className="absolute grid w-full gap-3 px-10 py-20 max-h-screen overflow-y-auto"
      >
        {SidebarItems.map((item: SidebarItem, idx: number) => {
          const IconComponent = Icons[item.icon]
          return (
            <motion.li
              key={idx}
              variants={menuItemVariants}
              className="flex items-center space-x-3"
            >
              {IconComponent && (
                <span className="w-6 h-6 text-gray-600">
                  <IconComponent />
                </span>
              )}
              <Link
                href={item.url}
                onClick={() => toggleOpen()}
                className={`text-2xl w-full ${
                  pathname === item.url ? 'font-bold' : ''
                }`}
              >
                {item.title}
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>

      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-16 z-50"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
)
const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)
