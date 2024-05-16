import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
    required_error: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters long",
    required_error: "Password is required",
  }),
});

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  return { form };
};
