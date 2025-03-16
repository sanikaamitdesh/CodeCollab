"use client"; // Ensure client-side rendering

import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import { io } from "socket.io-client";

export default function Editor({ roomId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const loadCodeMirror = async () => {
      const CodeMirror = (await import("codemirror")).default;
      await import("codemirror/mode/javascript/javascript");
      await import("codemirror/addon/edit/closetag");
      await import("codemirror/addon/edit/closebrackets");

      // Connect to WebSocket
      socketRef.current = io("http://localhost:4000");

      socketRef.current.emit("joinRoom", roomId);
      console.log(`🔗 Connected to Room: ${roomId}`);

      const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
        mode: "javascript",
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editorRef.current = editor;

      socketRef.current.on("loadCode", (existingCode) => {
        if (existingCode) {
          editor.setValue(existingCode);
        }
      });

      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();

        if (origin !== "setValue") {
          socketRef.current.emit("codeChange", { roomId, code });
        }
      });

      socketRef.current.on("updateCode", (code) => {
        if (code !== null && editorRef.current.getValue() !== code) {
          editorRef.current.setValue(code);
        }
      });

      socketRef.current.on("disconnect", () => {
        console.warn("🔌 WebSocket Disconnected! Retrying in 3s...");
        setTimeout(() => {
          socketRef.current.connect();
        }, 3000);
      });
    };

    loadCodeMirror();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}
