"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { login } from '@/utils/api'; // Import the API service
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.reset();
      router.push("/login-verification");
      console.log(values);
    }, 2000);
  }
  return (
    <div className="w-full lg:grid grid-cols-2   h-screen">
      <div className="flex items-center justify-center py-12 h-full">
        <Card className="mx-auto max-w-sm lg:bg-transparent shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription className="text-black/80">
              Sign in with your username/email and password.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email / Username</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm flex flex-col gap-2">
              <span>
                Don't have an account?{" "}
                <Link href="/register" className="underline">
                  Sign Up
                </Link>
              </span>
              <Link href="#" className="hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center p-3 bg-accent text-white">
        <h1 className="text-8xl text-center">Welcome Back!</h1>

        <h1 className="text-4xl leading-relaxed text-center mt-10 text-balance">
          Ready to dive back into productivity?
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
