import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const View = styled.div`
  padding: 10px;
  width: 33%;
  height: 100%;
`;

const Editor = styled.textarea`
  width: 50%;
  resize: none;
  padding: 10px;
  height: 100%;
`;

function EditorPresenter() {
  return <Editor />;
}

export default EditorPresenter;
