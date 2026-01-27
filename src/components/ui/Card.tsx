'use client'

import { cn } from '@/lib/cn'
import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated'
  hover?: boolean
  animate3d?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hover = false,
      animate3d = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300'

    const variants = {
      default: 'bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-800',
      glass: 'glass',
      bordered: 'border-2 border-light-accent-primary dark:border-dark-accent-primary',
      elevated: 'bg-white dark:bg-dark-bg-secondary shadow-xl',
    }

    const hoverStyles = hover ? 'card-lift cursor-pointer' : ''

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        initial={animate3d ? { rotateX: 0, rotateY: 0 } : undefined}
        whileHover={
          animate3d
            ? {
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-bold tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400 mt-2', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0 flex items-center gap-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export default Card
