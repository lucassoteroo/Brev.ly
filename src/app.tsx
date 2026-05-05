import { CreateLink } from "./components/create-link";
import { LogoApp } from "./components/logo-app";
import { MyLink } from "./components/my-link";

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10">
      <LogoApp></LogoApp>
      <CreateLink></CreateLink>
      <MyLink></MyLink>
    </main>
  )
}
