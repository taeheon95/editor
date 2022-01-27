import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AiOutlineBold } from "react-icons/ai";
import styled from "styled-components";
import "./EditorViewer.css";

const EditorBox = styled.div`
  display: flex;
  height: 1000px;
  width: ${window.screen.availWidth};
`;

const Editor = styled.textarea`
  width: 33%;
  resize: none;
  padding: 10px;
  height: 100%;
`;

const EditorViewer = styled.div`
  padding: 10px;
  width: 33%;
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
    const firstReplacedText = text.replace(
      // h1~h6
      /(^|\n)(#{1,6})\s(.+)/g,
      (str, p1, p2, p3) => `<h${p2.length}>${p3}</h${p2.length}>\n\n`
    );
    const splitedText = firstReplacedText.split(/\n{2,}/g);
    // console.log(splitedText);
    const viewText = splitedText.map((text) => {
      return (
        text
          // 수평선
          .replace(/\*{3,}/g, `<hr/>`)
          // bold
          .replace(/\*\*(.+)\*\*/g, `<span style='font-weight:bold'>$1</span>`)
          // Italic
          .replace(/\*(.+)\*/g, `<span style='font-style:italic'>$1</span>`)
          .replace(/_(.+)_/g, "<span style='font-style:italic'>$1</span>")
          // 취소선
          .replace(
            /~~(.+)~~/g,
            "<span style='text-decoration:line-through'>$1</span>"
          )
          // 링크 to-> a tag
          .replace(/"(?!(http|https):\/\/(.*))/g, "<a href='$&'>$&</a>")
          // 링크 이름 변경
          .replace(
            /\[(.+)\]\((.*)\)/g,
            (str, p1, p2) => `<a href="${p2}">${p1}</a>`
          )
        // .replace(//g)
      );
    });
    return viewText.join("");
  }, [text]);

  const makeMarkDownText = useCallback((markDownText: string): string => {
    const hTagReplacedText = markDownText.replace(
      /(^|\n)(#{1,6})\s(.+)/g,
      (str, p1, p2, p3) => `<h${p2.length}>${p3}</h${p2.length}>\n\n`
    );
    const splitedText = hTagReplacedText.split(/\n{2,}/g);
    return splitedText
      .map((t) => {
        return (
          t
            // 수평선
            .replace(/\*\*\*/g, `<hr/>`)
            // bold
            .replace(
              /\*\*(.+)\*\*/g,
              `<span style='font-weight:bold'>$1</span>`
            )
            // Italic
            .replace(/\*(.+)\*/g, "<span style='font-style:italic'>$1</span>")
            .replace(/_(.+)_/g, "<span style='font-style:italic'>$1</span>")
            // 취소선
            .replace(
              /~~(.+)~~/g,
              "<span style='text-decoration:line-through'>$1</span>"
            )
            // 링크 to-> a tag
            .replace(/(http|https):\/\/(.*)/g, "<a href='$&'>$&</a>")
            // 링크 이름 변경
            .replace(
              /\[(.+)\]\((.*)\)/g,
              (str, p1, p2) => `<a href="${p2}">${p1}</a>`
            )
        );
      })
      .join();
  }, []);

  const getParagraph = useCallback((paragraphText: string) => {
    return `<p>${paragraphText.replace(/\n/g, "<br/>")}</p>`;
  }, []);

  const getFormattedSentence = useCallback((sentenceText: string) => {
    return (
      sentenceText
        // 사진
        .replace(/\!\[(.+)\]\((.*)\)/g, "<img src='$2' alt=\"$1\"/>")
        // 링크 이름 변경
        .replace(
          /\[(.+)\]\((.*)\)/g,
          (str, p1, p2) => `<a href="${p2}">${p1}</a>`
        )
        // bold
        .replace(/\*\*(.+)\*\*/g, `<span style='font-weight:bold'>$1</span>`)
        // Italic
        .replace(/\*(.+)\*/g, `<span style='font-style:italic'>$1</span>`)
        .replace(/_(.+)_/g, "<span style='font-style:italic'>$1</span>")
        // 취소선
        .replace(
          /~~(.+)~~/g,
          "<span style='text-decoration:line-through'>$1</span>"
        )
        // 링크 to-> a tag
        .replace(/(http|https):\/\/(.*)/g, "<a href='$&'>$&</a>")
    );
  }, []);

  const getTable = useCallback((tableText: string) => {
    const [header, arrangeData, ...rows] = tableText
      .split(/\n/g)
      .map((tableText: string): string[] =>
        tableText.split(/\|/g).slice(1, -1)
      );
    const tableArrage = arrangeData.map((data: string): string =>
      data
        .replace(/^:-*:$/g, "center")
        .replace(/^:-*/g, "left")
        .replace(/-*:$/g, "right")
        .replace(/-*/g, "")
    );
    const tableHeader = `<thead><tr>${header
      .map((headerText: string, index: number) => {
        return `<th style='text-align: ${tableArrage[index]}'>${headerText}</th>`;
      })
      .join("")}</tr></thead>`;
    const tableRows = rows
      .map((row: string[]) => {
        return `<tr>${row
          .map((tableData: string, index: number) => {
            return `<td style='text-align: ${tableArrage[index]}'>${tableData}</td>`;
          })
          .join("")}</tr>`;
      })
      .join("");
    const tableBody = `<tbody>${tableRows}</tbody>`;
    const table = `<table>${tableHeader}${tableBody}</table>`;
    return table;
  }, []);

  const viewText = useMemo(() => {
    const vText = text.split(/\n\n/g);
    console.log(vText);
  }, [text]);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = innerHtmlText;
    }
  }, [innerHtmlText]);

  return (
    <>
      <div>
        <AiOutlineBold size={30} />
      </div>
      <EditorBox>
        <Editor id="editor" onChange={handleText} />
        <EditorViewer ref={ref} />
        <pre style={{ width: "33%" }}>{innerHtmlText}</pre>
      </EditorBox>
    </>
  );
}

export default EditorDiv;
