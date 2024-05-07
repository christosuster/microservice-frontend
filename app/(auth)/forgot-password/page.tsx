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
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email(),
});

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.reset();
      console.log(values);
    }, 2000);
  }
  return (
    <div className="w-full lg:grid grid-cols-2   h-screen">
      <div className="flex items-center justify-center py-12 h-full">
        <Card className="mx-auto max-w-sm lg:bg-transparent shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-xl">
              Please enter your email address
            </CardTitle>
            <CardDescription className="text-black/80">
              Enter the email associated with this account and we'll send you a
              link to change your password.{" "}
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@gmail.com" {...field} />
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

            <div className="mt-4 text-center text-sm flex  gap-2 items-center justify-center">
              <Button
                onClick={() =>
                  toast({
                    title:
                      "A password change link has been sent to your email.",
                  })
                }
                variant={"link"}
                size={"sm"}
                className="p-0"
              >
                Resend Email
              </Button>
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

export default ForgotPasswordPage;
