import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Button } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string().min(5, "You must enter more than 5 characters for password")
})

type FormFields = z.infer<typeof schema>;

export default function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormFields>({
    // The default values was just used to check the capabilities
    // defaultValues: {
    //   email: "test@email.com"
    // },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      // The below error was required to tigger an error at the root level
      // throw new Error("Dummy error");
    } catch (error) {
      setError("root", {
        message: "This email is already taken"
      });
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4" style={{ width: "25rem" }} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <div className="mb-2 block">
        <Label htmlFor="email">Your email</Label>
        </div>
        <TextInput 
          id="email" 
          type="email" 
          placeholder="Email" 
          // This commented code would have been required if we didn't use Zod for type checking
          // {...register("email", {
          // required: "Email is required",
          // validate: (value) => {
          //   if (!value.includes("@")) {
          //     return "Email must include @"
          //   }
          //   return true;
          // }
          // })} 
          {...register("email")}
        />
      </div>
      {errors.email && <div className="text-red-500">{errors.email.message}</div>}
      <div>
        <div className="mb-2 block">
        <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput 
          id="password" 
          type="password" 
          placeholder="Password" 
          // This commented code would have been required if we didn't use Zod for type checking
          // {...register("password", {
          //   required: "Password is required",
          //   minLength: {
          //     value: 5,
          //     message: "Password must have 5 characters"
          //   }
          // })} 
          {...register("password")}
        />
      </div>
      {errors.password && <div className="text-red-500">{errors.password.message}</div>}
      <Button disabled={isSubmitting} color="dark" type="submit">{isSubmitting ? "Loading..." : "Submit"}</Button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
}
