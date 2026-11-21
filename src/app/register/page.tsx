"use client";

import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schema/register.schema";
import { toast } from "@/components/ui/toast";
import { User, Mail, Lock, Phone, Eye, EyeOff, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function handleRegister(values: FieldValues) {
    setIsLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({
          title: "Account created successfully! 🎉",
          type: "success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        toast.add({
          title: data.message || "Failed to create account",
          type: "error",
        });
      }
    } catch (err: any) {
      toast.add({
        title: err.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 via-emerald-100/40 to-teal-100/60 p-4 py-10 overflow-hidden">
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-green-400/20 blur-3xl pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-lg rounded-3xl border border-white/80 bg-white/80 p-8 shadow-[0_20px_50px_rgba(16,185,129,0.12)] backdrop-blur-xl md:p-10"
      >
        
        <div className="mb-6 text-center flex flex-col items-center">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100"
          >
            <ShoppingBag className="h-7 w-7" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950">
            Create <span className="text-emerald-600">Account</span>
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Join FreshCart for fresh groceries delivered to your door
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1">
                <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                  Full Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="John Doe"
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

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1">
                <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                  Phone Number
                </FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="tel"
                    {...field}
                    id={field.name}
                    placeholder="01012345678"
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

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1">
                <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                  Password
                </FieldLabel>
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
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

          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1">
                <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type={showRePassword ? "text" : "password"}
                    {...field}
                    id={field.name}
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    className="pl-11 pr-11 h-12 rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRePassword(!showRePassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showRePassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs text-rose-500 mt-1" />
                )}
              </Field>
            )}
          />

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-4 cursor-pointer rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:shadow-emerald-600/35 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  Register Now
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          Already have an account?{" "}
          <a href="/login" className="font-bold text-emerald-600 hover:underline">
            Sign In
          </a>
        </div>

      </motion.div>
    </div>
  );
}

// "use client";
// import { Controller, FieldValues, useForm } from "react-hook-form";
// import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { registerSchema } from "@/schema/register.schema";
// import { toast } from "@/components/ui/toast";

// export default function Register() {
//   const router = useRouter();

//   const { register, handleSubmit, control } = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     resolver: zodResolver(registerSchema),
//     mode: "onChange",
//   });

//   function handleRegister(values: FieldValues) {
//     fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
//       method: "post",
//       body: JSON.stringify(values),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           toast.add({
//             title: " Account is created successfully",
//             type: "success",
//           });
//           router.push("/login");
//         }
//         throw new Error("Something occurs");
//       })
//       .catch((err) => {
//         toast.add({
//           title: err.message,
//           type: "error",
//         });
//       });
//   }

//   return (
//     <>
//       <h2 className="  text-3xl text-center text-green-800">Register Now !</h2>
//       <form onSubmit={handleSubmit(handleRegister)} className=" w-3/4  mx-auto">
//         <Controller
//           name="name"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Name</FieldLabel>
//               <Input
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="email"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//               <Input
//                 type="email"
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="password"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//               <Input
//                 type="password"
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="rePassword"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>
//                 Password Confirmation
//               </FieldLabel>
//               <Input
//                 type="password"
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="phone"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
//               <Input
//                 type="number"
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Button
//           type="submit"
//           className="  block ml-auto px-4 cursor-pointer my-2"
//           size={"lg"}
//         >
//           Submit
//         </Button>
//       </form>
//     </>
//   );
// }


