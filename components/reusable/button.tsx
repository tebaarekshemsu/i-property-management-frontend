import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
}

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
  }

  return <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props} />
}

