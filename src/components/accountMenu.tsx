import { Building, ChevronDown, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          <ChevronDown className="size-4" />
          Pizza shop
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Jhon Cruz</span>
          <span className="text-xs font-normal text-muted-foreground">
            jhonwcruznoc@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building className="mr-2 size-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            'text-rose-500 focus:text-destructive dark:text-rose-400',
          )}
        >
          <LogOut className="mr-2 size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
