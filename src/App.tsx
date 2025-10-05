import { Label, TextInput, Button } from "flowbite-react";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4" style={{ width: "25rem" }}>
      <div>
        <div className="mb-2 block">
        <Label htmlFor="email">Your email</Label>
        </div>
        <TextInput id="email" type="email" placeholder="Email" />
      </div>
      <div>
        <div className="mb-2 block">
        <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="Password" />
      </div>
      <Button color="dark" type="submit">Submit</Button>
      </form>
    </div>
  );
}
