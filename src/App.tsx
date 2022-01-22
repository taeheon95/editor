import React from "react";
import EditorDiv from "./EditorDiv";

function App() {
  // const ref = useRef<HTMLIFrameElement | null>(null);

  // React.useEffect(() => {
  //   ref.current
  //     ? ref.current.contentDocument
  //       ? (ref.current.contentDocument.designMode = "on")
  //       : console.log()
  //     : console.log();
  // }, []);

  // const onClickButton = useCallback(() => {
  //   // ref.current.sele
  //   ref.current
  //     ? ref.current.contentDocument
  //       ? ref.current.contentDocument.execCommand("bold", false)
  //       : console.log()
  //     : console.log();
  // }, []);

  const onClick: React.MouseEventHandler = (e) => {
    console.log(e.target);
  };

  return (
    <>
      <EditorDiv />
    </>
  );
}

export default App;
