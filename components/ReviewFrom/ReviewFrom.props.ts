import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewFromProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string
}