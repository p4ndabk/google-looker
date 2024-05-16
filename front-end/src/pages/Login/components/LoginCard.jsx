import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuthenticate from "./LoginCard/hooks/useAuthenticate";
import { useLoginForm } from "./LoginCard/hooks/useLoginForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

export function LoginCard() {
  const { toast } = useToast();
  const { login } = useAuthenticate();
  const { form } = useLoginForm();

  function onSubmit(data) {
    login(data)
      .then(() => {
        toast({
          title: "Login Successful",
          description: "You have been logged in",
        });
      })
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: err.message,
        });
      });
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log in</CardTitle>
        <CardDescription>Enter your email and password to login</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <span htmlFor="email">Email</span>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        error={form?.formState?.errors?.email}
                        placeholder="email@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <span htmlFor="password">Password</span>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        error={form?.formState?.errors?.password}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
