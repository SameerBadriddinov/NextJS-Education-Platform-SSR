import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  size?: 's' | 'm' | 'l'
  children: ReactNode
}