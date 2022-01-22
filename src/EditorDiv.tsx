import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AiOutlineBold } from "react-icons/ai";
import styled from "styled-components";

const EditorBox = styled.div`
  display: flex;
  height: 1000px;
`;

const Editor = styled.textarea`
  width: 50%;
  resize: none;
  padding: 10px;
  height: 100%;
`;

const EditorViewer = styled.div`
  padding: 10px;
  width: 50%;
  height: 100%;
`;

function EditorDiv() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState<string>("");
  const handleText = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target?.value);
    },
    []
  );

  const innerHtmlText = useMemo<string>(() => {
    const splitedText = text.replace(/\n{2,}/g, "<br/>\n").split("\n");
    console.log(splitedText);
    const viewText = splitedText.map((text) => {
      return (
        text
          // h1
          .replace(
            /^(#{1,6}) (.+)/g,
            (str, p1, p2) => `<h${p1.length}>${p2}</h${p1.length}>`
          )
          // 수평선
          .replace(/\*\*\*/g, `<hr/>`)
          // bold
          .replace(/\*\*(.+)\*\*/g, `<span style='font-weight:bold'>$1</span>`)
          // Italic
          .replace(/\*(.+)\*/g, "<span style='font-style:italic'>$1</span>")
          .replace(/_(.+)_/g, "<span style='font-style:italic'>$1</span>")
          // 취소선
          .replace(
            /~~(.+)~~/g,
            "<span style='text-decoration:line-through'>$1</span>"
          )
          // 링크
          .replace(
            /\[(.+)\]\((.+)\)/,
            (str, p1, p2) => `<a href="${p2}">${p1}</a>`
          )
        // .replace(//g)
      );
    });
    return viewText.join("");
  }, [text]);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = innerHtmlText;
    }
  }, [innerHtmlText]);

  useEffect(() => {
    console.log(text);
    console.log(
      "html text : \n",
      text
        // h1
        .replace(/^# (.+)/g, `<h1>$1</h1>`)
        .replace(/^## (.+)/g, `<h2>$1</h2>`)
        .replace(/^### (.+)/g, `<h3>$1</h3>`)
        .replace(/^#### (.+)/g, `<h4>$1</h4>`)
        .replace(/^##### (.+)/g, `<h5>$1</h5>`)
        .replace(/^###### (.+)/g, `<h6>$1</h6>`)
        // .replace(
        //   /^(#{1,6}) (.+)/g,
        //   (str, p1, p2) => `<h${p1.length}>${p2}</h${p1.length}>`
        // )
        // 수평선
        .replace(/\*\*\*/g, "<hr/>")
        // bold
        .replace(/\*\*(.+)\*\*/g, "<span style='font-weight:bold'>$1</span>")
        // Italic
        .replace(/\*(.+)\*/g, "<span style='font-style:italic'>$1</span>")
        .replace(/_(.+)_/g, "<span style='font-style:italic'>$1</span>")
        // 취소선
        .replace(
          /~~(.+)~~/g,
          "<span style='text-decoration:line-through'>$1</span>"
        )
    );
  }, [text]);

  return (
    <>
      <div>
        <AiOutlineBold />
      </div>
      <EditorBox>
        <Editor onChange={handleText} />
        <EditorViewer ref={ref} />
      </EditorBox>
    </>
  );
}

export default EditorDiv;
