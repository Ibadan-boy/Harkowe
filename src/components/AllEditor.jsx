import { useState } from "react";
import MyEditor from "./MyEditor";
import Header from "./Header";

export default function AllEditor() {
  const [title, setTitle] = useState("");

  return (
    <>
      <Header title={title} setTitle={setTitle} />
      <MyEditor title={title} />
    </>
  );
}
