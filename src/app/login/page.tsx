"use client";

import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { logInSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";


const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function FreshCartLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(logInSchema),
    mode: "onChange",
  });

  async function handleLogin(values: FieldValues) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        toast.add({
          title: res?.error || "Invalid email or password",
          type: "error",
        });
      } else {
        toast.add({
          title: "Welcome back to FreshCart! 🛒",
          type: "success",
        });
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      }
    } catch (error) {
      toast.add({
        title: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 via-emerald-100/40 to-teal-100/60 p-4 overflow-hidden">
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-green-400/20 blur-3xl pointer-events-none"
      />

     
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-8 shadow-[0_20px_50px_rgba(16,185,129,0.12)] backdrop-blur-xl md:p-10"
      >
        
      
        <motion.div variants={itemVariants} className="mb-8 text-center flex flex-col items-center">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100"
          >
            <ShoppingBag className="h-7 w-7" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950">
            Fresh<span className="text-emerald-600">Cart</span>
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Sign in to access your fresh groceries & daily needs
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          
          <motion.div variants={itemVariants}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="email"
                      {...field}
                      id={field.name}
                      placeholder="name@example.com"
                      aria-invalid={fieldState.invalid}
                      className="pl-11 h-12 rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-rose-500 mt-1" />
                  )}
                </Field>
              )}
            />
          </motion.div>

          
          <motion.div variants={itemVariants}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                      Password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      id={field.name}
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      className="pl-11 pr-11 h-12 rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-rose-500 mt-1" />
                  )}
                </Field>
              )}
            />
          </motion.div>

      
          <motion.div variants={itemVariants}>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-2 cursor-pointer rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:shadow-emerald-600/35 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>

       
        <motion.div variants={itemVariants} className="mt-8 text-center text-xs text-slate-500 border-t border-slate-100 pt-5">
          Don't have an account?{" "}
          <a href="/register" className="font-bold text-emerald-600 hover:underline">
            Create an account
          </a>
        </motion.div>

      </motion.div>
    </div>
  );
}
