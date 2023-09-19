import Form from "../components/contact/Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Connect | John Rod Dondoyano",
};
export default function Connect() {
  return (
    <>
      <header className="text-center">
        <h1 className="text-primary font-black text-xl ">
          Feel free to message me.
        </h1>
        <p>I'll respond as soon as I can.</p>
      </header>
      <Form />
    </>
  );
}
