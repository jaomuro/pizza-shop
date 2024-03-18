import { Home, Pizza, UtensilsCrossedIcon } from 'lucide-react'

import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="size-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="size-4" /> Início
          </NavLink>
          <NavLink to="/">
            <UtensilsCrossedIcon className="size-4" /> Pedidos
          </NavLink>
          <NavLink to="/">
            <Home className="size-4" /> Início
          </NavLink>
          <NavLink to="/">
            <Home className="size-4" /> Início
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
