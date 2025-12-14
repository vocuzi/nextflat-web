"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white hover:bg-slate-800",
        light: "bg-white text-slate-900 border border-slate-300 hover:bg-slate-100",
        native: "bg-green-300 text-slate-900 border-2 border-slate-800 hover:bg-slate-100",
        outline:
          "bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white",
        ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
      },
      size: {
        default: "h-11 px-5 text-base",
        sm: "h-10 md:h-9 px-4 text-sm",
        lg: "h-11 px-6 text-lg",
        md: "h-10 px-4 text-md",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "default",
    },
  }
);

export interface NfBtnProps
  extends HTMLMotionProps<"button">,
  VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}

export const NfBtn = forwardRef<HTMLButtonElement | HTMLAnchorElement, NfBtnProps>(
  ({ className, variant, size, icon, children, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className, "cursor-pointer");

    if (href) {
      return (
        <motion.div whileTap={{ scale: 0.98 }} className="inline-block">
          <Link
            href={href}
            className={classes}
            ref={ref as any}
          >
            {icon && <span className="flex items-center">{icon}</span>}
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        {...props}
        className={classes}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

NfBtn.displayName = "NfBtn";
