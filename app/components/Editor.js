// // "use client";

// // import React, { useEffect, useRef, useState } from "react";
// // import dynamic from "next/dynamic";
// // import { io } from "socket.io-client";

// // // Dynamically import CodeMirror to avoid SSR errors
// // const CodeMirror = dynamic(() => import("codemirror"), { ssr: false });

// // import "codemirror/lib/codemirror.css";
// // import "codemirror/theme/dracula.css";

// // // Import Linting Support
// // import "codemirror/addon/lint/lint.css";
// // import "codemirror/addon/lint/lint";
// // import "codemirror/addon/lint/javascript-lint";
// // import "codemirror/addon/lint/json-lint";

// // // Import Supported Language Modes
// // import "codemirror/mode/javascript/javascript";
// // import "codemirror/mode/python/python";
// // import "codemirror/mode/clike/clike"; // For C, C++, Java

// // export default function Editor({ roomId }) {
// //   const editorRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const [language, setLanguage] = useState("javascript");
// //   const [mounted, setMounted] = useState(false);

// //   // Prevents hydration mismatch by ensuring the component only mounts on the client
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     if (!mounted) return; // Only run when mounted
// //     if (typeof window === "undefined") return; // Ensure it's client-side

// //     const loadCodeMirror = async () => {
// //       const { default: CodeMirror } = await import("codemirror");

// //       // Connect to WebSocket
// //       socketRef.current = io("http://localhost:4000");
// //       socketRef.current.emit("joinRoom", roomId);
// //       console.log(`🔗 Connected to Room: ${roomId}`);

// //       const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
// //         mode: language,
// //         theme: "dracula",
// //         autoCloseTags: true,
// //         autoCloseBrackets: true,
// //         lineNumbers: true,
// //         gutters: ["CodeMirror-lint-markers"],
// //       });

// //       editorRef.current = editor;

// //       socketRef.current.on("loadCode", (existingCode) => {
// //         if (existingCode) {
// //           editor.setValue(existingCode);
// //         }
// //       });

// //       editor.on("change", (instance, changes) => {
// //         const { origin } = changes;
// //         const code = instance.getValue();

// //         if (origin !== "setValue") {
// //           socketRef.current.emit("codeChange", { roomId, code, language });
// //         }
// //       });

// //       socketRef.current.on("updateCode", (code) => {
// //         if (code !== null && editorRef.current.getValue() !== code) {
// //           editorRef.current.setValue(code);
// //         }
// //       });

// //       socketRef.current.on("disconnect", () => {
// //         console.warn("🔌 WebSocket Disconnected! Retrying in 3s...");
// //         setTimeout(() => {
// //           socketRef.current.connect();
// //         }, 3000);
// //       });
// //     };

// //     loadCodeMirror();

// //     return () => {
// //       socketRef.current?.disconnect();
// //     };
// //   }, [roomId, language, mounted]);

// //   // Prevent rendering until mounted (fixes hydration error)
// //   if (!mounted) return null;

// //   return (
// //     <div className="flex flex-col items-center">
// //       {/* Language Selection Dropdown */}
// //       <select
// //         value={language}
// //         onChange={(e) => setLanguage(e.target.value)}
// //         className="mb-2 p-2 rounded bg-gray-700 text-white"
// //       >
// //         <option value="javascript">JavaScript</option>
// //         <option value="python">Python</option>
// //         <option value="java">Java</option>
// //         <option value="c">C</option>
// //         <option value="cpp">C++</option>
// //       </select>

// //       {/* Code Editor */}
// //       <div style={{ height: "600px", width: "100%" }}>
// //         <textarea id="realtimeEditor"></textarea>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import { io } from "socket.io-client";

// // Dynamically import CodeMirror to avoid SSR errors
// const CodeMirror = dynamic(() => import("codemirror"), { ssr: false });

// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";

// // Import Linting Support
// import "codemirror/addon/lint/lint.css";
// import "codemirror/addon/lint/lint";
// import "codemirror/addon/lint/javascript-lint";
// import "codemirror/addon/lint/json-lint";

// // Import Supported Language Modes
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/python/python";
// import "codemirror/mode/clike/clike"; // For C, C++, Java

// // Boilerplate code for each language
// const boilerplates = {
//   javascript: "console.log('Hello, World!');",
//   python: "print('Hello, World!')",
//   java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}",
//   c: "#include <stdio.h>\n\nint main() {\n  printf(\"Hello, World!\\n\");\n  return 0;\n}",
//   cpp: "#include <iostream>\n\nint main() {\n  std::cout << \"Hello, World!\\n\";\n  return 0;\n}"
// };

// export default function Editor({ roomId }) {
//   const editorRef = useRef(null);
//   const socketRef = useRef(null);
//   const [language, setLanguage] = useState("javascript");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;
//     if (typeof window === "undefined") return;

//     const loadCodeMirror = async () => {
//       const { default: CodeMirror } = await import("codemirror");
//       socketRef.current = io("http://localhost:4000");
//       socketRef.current.emit("joinRoom", roomId);

//       const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
//         mode: language,
//         theme: "dracula",
//         autoCloseTags: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//         gutters: ["CodeMirror-lint-markers"],
//       });

//       editorRef.current = editor;

//       socketRef.current.on("loadCode", (existingCode) => {
//         const code = existingCode !== null ? existingCode : boilerplates[language];
//         editor.setValue(code);
//       });

//       editor.on("change", (instance, changes) => {
//         const { origin } = changes;
//         const code = instance.getValue();
//         if (origin !== "setValue") {
//           socketRef.current.emit("codeChange", { roomId, code, language });
//         }
//       });

//       socketRef.current.on("updateCode", (code) => {
//         if (code !== null && editorRef.current.getValue() !== code) {
//           editorRef.current.setValue(code);
//         }
//       });
//     };

//     loadCodeMirror();
//     return () => socketRef.current?.disconnect();
//   }, [roomId, language, mounted]);

//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setLanguage(newLang);
//     if (editorRef.current) {
//       socketRef.current.emit("loadCode", { roomId, language: newLang });
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="flex flex-col items-center">
//       <select value={language} onChange={handleLanguageChange} className="mb-2 p-2 rounded bg-gray-700 text-white">
//         <option value="javascript">JavaScript</option>
//         <option value="python">Python</option>
//         <option value="java">Java</option>
//         <option value="c">C</option>
//         <option value="cpp">C++</option>
//       </select>
//       <div style={{ height: "600px", width: "100%" }}>
//         <textarea id="realtimeEditor"></textarea>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";

// Dynamically import CodeMirror to prevent SSR errors
const CodeMirror = dynamic(() => import("codemirror"), { ssr: false });

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

// Import Linting Support
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/json-lint";

// Import Supported Language Modes
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike"; // For C, C++, Java

const boilerplates = {
  javascript: "console.log('Hello, World!');",
  python: "print('Hello, World!')",
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  c: `#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}`
};

export default function Editor({ roomId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
  
    const loadCodeMirror = async () => {
      const { default: CodeMirror } = await import("codemirror");
      socketRef.current = io("http://localhost:4000");
  
      socketRef.current.emit("joinRoom", { roomId, username: "Anonymous" });
  
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
  
      const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
        mode: language,
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
      });
  
      editorRef.current = editor;
  
      // 🔹 Listen for the latest code from the server
      socketRef.current.on("loadCode", (existingCode) => {
        if (existingCode) {
          editor.setValue(existingCode);
        }
      });
  
      // 🔹 Listen for real-time code updates
      socketRef.current.on("updateCode", (newCode) => {
        if (newCode !== editorRef.current.getValue()) {
          editorRef.current.setValue(newCode);
        }
      });
  
      // 🔹 Send changes to the server
      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
  
        if (origin !== "setValue") {
          socketRef.current.emit("codeChange", { roomId, code, language });
        }
      });
    };
  
    loadCodeMirror();
    return () => socketRef.current?.disconnect();
  }, [roomId, language, mounted]);
  

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);

    if (editorRef.current) {
      const defaultCode = boilerplates[newLang] || "";
      editorRef.current.setValue(defaultCode); // Set new boilerplate
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center">
      <select value={language} onChange={handleLanguageChange} className="mb-2 p-2 rounded bg-gray-700 text-white">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
      </select>
      <div style={{ height: "600px", width: "100%" }}>
        <textarea id="realtimeEditor"></textarea>
      </div>
    </div>
  );
}
