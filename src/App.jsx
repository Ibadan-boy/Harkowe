import { useState } from "react";
import MyEditor from "./components/MyEditor";
import Header from "./components/Header";

export default function App() {
  const [title, setTitle] = useState("");

  return (
    <>
      <Header title={title} setTitle={setTitle} />
      <MyEditor title={title} />
    </>
  );
}
