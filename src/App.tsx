import { typograph } from "./components/styles/typograph";
import Form from "./components/ui/Form";

export function App() {
  return (
    <section className="h-screen w-screen flex justify-center">
      <main className="w-screen h-screen mx-24 px-16 py-10 flex flex-col gap-4">
        <h1 className={typograph({ size: "title" })}>Checkout Address</h1>
        <span className={typograph({ size: "detail", color: "detail" })}>
          Add BR/US/UK validation, inline errors, and order summary with submit
          guard.
        </span>
        <Form />
      </main>
    </section>
  );
}
