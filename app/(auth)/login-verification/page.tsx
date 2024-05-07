"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
const LoginVerificationPage = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.reset();
    }, 2000);
  }
  return (
    <div className="w-full lg:grid grid-cols-2   h-screen">
      <div className="flex items-center justify-center py-12 h-full ">
        <Card className="mx-auto max-w-sm lg:bg-transparent shadow-none border-none w-full">
          <CardHeader>
            <CardTitle className="text-xl">Verify Account</CardTitle>
            <CardDescription className="text-black/80">
              Enter the 6 digit code sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <InputOTP maxLength={6} {...field} className="">
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} className="flex-1" />
                            <InputOTPSlot index={1} className="flex-1" />
                            <InputOTPSlot index={2} className="flex-1" />
                            <InputOTPSlot index={3} className="flex-1" />
                            <InputOTPSlot index={4} className="flex-1" />
                            <InputOTPSlot index={5} className="flex-1" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage className="" />
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
              <p>Didn't receive the code? </p>
              <Button
                onClick={() =>
                  toast({
                    title: "An OTP has been resent to your email.",
                  })
                }
                variant={"link"}
                size={"sm"}
                className="p-0"
              >
                Resend OTP
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

export default LoginVerificationPage;
