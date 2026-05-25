import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

import data from '@/data/information.json'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleOpenDrawer() {
    setIsDrawerOpen(true)
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 bg-accent-bg transition-all duration-200',
          isScrolled && 'border-b border-line-divider'
        )}
      >
        <div className="container-x flex items-center justify-between py-5 md:py-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/images/logo.webp"
              alt=""
              aria-hidden="true"
              className="block flex-shrink-0 h-7 w-auto bg-[#F0F4F1] mix-blend-multiply"
            />
            <span className="text-body-sm font-medium tracking-[0.12em] uppercase text-ink-primary">
              TXYbio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {data.navigation.main.map(item => (
              <NavLink
                key={item.id}
                to={item.url}
                className={({ isActive }) =>
                  clsx(
                    'text-body-sm transition-colors duration-200',
                    isActive
                      ? 'text-ink-primary border-b border-accent-primary pb-0.5'
                      : 'text-ink-secondary hover:text-ink-primary'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-body-sm font-medium text-ink-primary" aria-label="Language: English">
              EN
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-body-sm font-medium text-white bg-accent-primary rounded-xs hover:bg-accent-hover transition-colors duration-200"
            >
              Request a quote
            </Link>
          </div>

          <button
            className="flex md:hidden items-center justify-center w-10 h-10 -mr-2 text-ink-primary"
            onClick={handleOpenDrawer}
            aria-label="Open navigation menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink-primary/10"
          onClick={handleCloseDrawer}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isDrawerOpen}
        className={clsx(
          'fixed top-0 right-0 z-50 flex flex-col h-full w-72 bg-surface-white transition-transform duration-400 ease-swiss',
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line-hair">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/logo.webp"
              alt=""
              aria-hidden="true"
              className="block flex-shrink-0 h-6 w-auto bg-[#F0F4F1] mix-blend-multiply"
            />
            <span className="text-body-sm font-medium tracking-[0.12em] uppercase text-ink-primary">
              TXYbio
            </span>
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 -mr-2 text-ink-primary"
            onClick={handleCloseDrawer}
            aria-label="Close navigation menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 p-6" aria-label="Mobile navigation">
          {data.navigation.main.map(item => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={handleCloseDrawer}
              className={({ isActive }) =>
                clsx(
                  'text-body transition-colors duration-200',
                  isActive ? 'text-ink-primary' : 'text-ink-secondary hover:text-ink-primary'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-4 p-6 mt-auto border-t border-line-hair">
          <div className="text-body-sm font-medium text-ink-primary" aria-label="Language: English">
            EN
          </div>
          <Link
            to="/contact"
            onClick={handleCloseDrawer}
            className="flex items-center justify-center px-5 py-3 text-body-sm font-medium text-white bg-accent-primary rounded-xs hover:bg-accent-hover transition-colors duration-200"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </>
  )
}
