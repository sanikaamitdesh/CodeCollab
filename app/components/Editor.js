// // // "use client";

// // // import React, { useEffect, useRef, useState } from "react";
// // // import dynamic from "next/dynamic";
// // // import { io } from "socket.io-client";

// // // // Dynamically import CodeMirror to avoid SSR errors
// // // const CodeMirror = dynamic(() => import("codemirror"), { ssr: false });

// // // import "codemirror/lib/codemirror.css";
// // // import "codemirror/theme/dracula.css";

// // // // Import Linting Support
// // // import "codemirror/addon/lint/lint.css";
// // // import "codemirror/addon/lint/lint";
// // // import "codemirror/addon/lint/javascript-lint";
// // // import "codemirror/addon/lint/json-lint";

// // // // Import Supported Language Modes
// // // import "codemirror/mode/javascript/javascript";
// // // import "codemirror/mode/python/python";
// // // import "codemirror/mode/clike/clike"; // For C, C++, Java

// // // export default function Editor({ roomId }) {
// // //   const editorRef = useRef(null);
// // //   const socketRef = useRef(null);
// // //   const [language, setLanguage] = useState("javascript");
// // //   const [mounted, setMounted] = useState(false);

// // //   // Prevents hydration mismatch by ensuring the component only mounts on the client
// // //   useEffect(() => {
// // //     setMounted(true);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!mounted) return; // Only run when mounted
// // //     if (typeof window === "undefined") return; // Ensure it's client-side

// // //     const loadCodeMirror = async () => {
// // //       const { default: CodeMirror } = await import("codemirror");

// // //       // Connect to WebSocket
// // //       socketRef.current = io("http://localhost:4000");
// // //       socketRef.current.emit("joinRoom", roomId);
// // //       console.log(`🔗 Connected to Room: ${roomId}`);

// // //       const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
// // //         mode: language,
// // //         theme: "dracula",
// // //         autoCloseTags: true,
// // //         autoCloseBrackets: true,
// // //         lineNumbers: true,
// // //         gutters: ["CodeMirror-lint-markers"],
// // //       });

// // //       editorRef.current = editor;

// // //       socketRef.current.on("loadCode", (existingCode) => {
// // //         if (existingCode) {
// // //           editor.setValue(existingCode);
// // //         }
// // //       });

// // //       editor.on("change", (instance, changes) => {
// // //         const { origin } = changes;
// // //         const code = instance.getValue();

// // //         if (origin !== "setValue") {
// // //           socketRef.current.emit("codeChange", { roomId, code, language });
// // //         }
// // //       });

// // //       socketRef.current.on("updateCode", (code) => {
// // //         if (code !== null && editorRef.current.getValue() !== code) {
// // //           editorRef.current.setValue(code);
// // //         }
// // //       });

// // //       socketRef.current.on("disconnect", () => {
// // //         console.warn("🔌 WebSocket Disconnected! Retrying in 3s...");
// // //         setTimeout(() => {
// // //           socketRef.current.connect();
// // //         }, 3000);
// // //       });
// // //     };

// // //     loadCodeMirror();

// // //     return () => {
// // //       socketRef.current?.disconnect();
// // //     };
// // //   }, [roomId, language, mounted]);

// // //   // Prevent rendering until mounted (fixes hydration error)
// // //   if (!mounted) return null;

// // //   return (
// // //     <div className="flex flex-col items-center">
// // //       {/* Language Selection Dropdown */}
// // //       <select
// // //         value={language}
// // //         onChange={(e) => setLanguage(e.target.value)}
// // //         className="mb-2 p-2 rounded bg-gray-700 text-white"
// // //       >
// // //         <option value="javascript">JavaScript</option>
// // //         <option value="python">Python</option>
// // //         <option value="java">Java</option>
// // //         <option value="c">C</option>
// // //         <option value="cpp">C++</option>
// // //       </select>

// // //       {/* Code Editor */}
// // //       <div style={{ height: "600px", width: "100%" }}>
// // //         <textarea id="realtimeEditor"></textarea>
// // //       </div>
// // //     </div>
// // //   );
// // // }


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

// // // Boilerplate code for each language
// // const boilerplates = {
// //   javascript: "console.log('Hello, World!');",
// //   python: "print('Hello, World!')",
// //   java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}",
// //   c: "#include <stdio.h>\n\nint main() {\n  printf(\"Hello, World!\\n\");\n  return 0;\n}",
// //   cpp: "#include <iostream>\n\nint main() {\n  std::cout << \"Hello, World!\\n\";\n  return 0;\n}"
// // };

// // export default function Editor({ roomId }) {
// //   const editorRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const [language, setLanguage] = useState("javascript");
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     if (!mounted) return;
// //     if (typeof window === "undefined") return;

// //     const loadCodeMirror = async () => {
// //       const { default: CodeMirror } = await import("codemirror");
// //       socketRef.current = io("http://localhost:4000");
// //       socketRef.current.emit("joinRoom", roomId);

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
// //         const code = existingCode !== null ? existingCode : boilerplates[language];
// //         editor.setValue(code);
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
// //     };

// //     loadCodeMirror();
// //     return () => socketRef.current?.disconnect();
// //   }, [roomId, language, mounted]);

// //   const handleLanguageChange = (e) => {
// //     const newLang = e.target.value;
// //     setLanguage(newLang);
// //     if (editorRef.current) {
// //       socketRef.current.emit("loadCode", { roomId, language: newLang });
// //     }
// //   };

// //   if (!mounted) return null;

// //   return (
// //     <div className="flex flex-col items-center">
// //       <select value={language} onChange={handleLanguageChange} className="mb-2 p-2 rounded bg-gray-700 text-white">
// //         <option value="javascript">JavaScript</option>
// //         <option value="python">Python</option>
// //         <option value="java">Java</option>
// //         <option value="c">C</option>
// //         <option value="cpp">C++</option>
// //       </select>
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
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // Dynamically import CodeMirror to prevent SSR errors
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

// const boilerplates = {
//   javascript: "console.log('Hello, World!');",
//   python: "print('Hello, World!')",
//   java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
//   c: `#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}`,
//   cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}`
// };

// export default function Editor({ roomId }) {
//   const editorRef = useRef(null);
//   const socketRef = useRef(null);
//   const [language, setLanguage] = useState("javascript");
//   const [mounted, setMounted] = useState(false);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//     const token = localStorage.getItem("token");
//     setUser(token ? true : false);
//   }, []);

//   useEffect(() => {
//     if (!mounted || typeof window === "undefined") return;
  
//     const loadCodeMirror = async () => {
//       const { default: CodeMirror } = await import("codemirror");
//       socketRef.current = io("http://localhost:4000");
  
//       socketRef.current.emit("joinRoom", { roomId, username: "Anonymous" });
  
//       if (editorRef.current) {
//         editorRef.current.toTextArea();
//       }
  
//       const editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
//         mode: language,
//         theme: "dracula",
//         autoCloseTags: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//         gutters: ["CodeMirror-lint-markers"],
//       });
  
//       editorRef.current = editor;
  
//       // 🔹 Listen for the latest code from the server
//       socketRef.current.on("loadCode", (existingCode) => {
//         if (existingCode) {
//           editor.setValue(existingCode);
//         }
//       });
  
//       // 🔹 Listen for real-time code updates
//       socketRef.current.on("updateCode", (newCode) => {
//         if (newCode !== editorRef.current.getValue()) {
//           editorRef.current.setValue(newCode);
//         }
//       });
  
//       // 🔹 Send changes to the server
//       editor.on("change", (instance, changes) => {
//         const { origin } = changes;
//         const code = instance.getValue();
  
//         if (origin !== "setValue") {
//           socketRef.current.emit("codeChange", { roomId, code, language });
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
//       const defaultCode = boilerplates[newLang] || "";
//       editorRef.current.setValue(defaultCode); // Set new boilerplate
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/");
//   };

//   if (!mounted) return null;

//   return (
//     <div className="flex flex-col items-center relative w-full">
//       {/* Top Right Login/Signup or Dashboard/Logout */}
//       <div className="absolute top-4 right-4 flex gap-4">
//         {user ? (
//           <>
//             <Link href="/dashboard" className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-800">
//               Dashboard
//             </Link>
//             <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link href="/login" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700">
//               Login
//             </Link>
//             <Link href="/signup" className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-700">
//               Signup
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Language Selection */}
//       <select value={language} onChange={handleLanguageChange} className="mb-2 p-2 rounded bg-gray-700 text-white">
//         <option value="javascript">JavaScript</option>
//         <option value="python">Python</option>
//         <option value="java">Java</option>
//         <option value="c">C</option>
//         <option value="cpp">C++</option>
//       </select>

//       {/* Code Editor */}
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

// Dynamically import Monaco Editor to avoid SSR errors
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// Boilerplate code for each language
const boilerplates = {
  javascript: "console.log('Hello, World!');",
  python: "print('Hello, World!')",
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  c: `#include <stdio.h>\nint main() {\n  printf("Hello, World!");\n  return 0;\n}`,
  cpp: `#include <iostream>\nint main() {\n  std::cout << "Hello, World!";\n  return 0;\n}`,
};

// Syntax checker for C, C++, and Java
function checkSyntax(code, language) {
  if (typeof window !== "undefined" && window.monaco) {
    const diagnostics = [];
    const lines = code.split("\n");
    if (language === "python") {
      return;
    }
    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Skip lines that are empty or contain only braces/comments
      if (
        trimmed === "" ||
        /^[{}]/.test(trimmed) ||
        /^\s*\/\//.test(trimmed) ||  // Single-line comments
        /^\s*\/\*/.test(trimmed) ||  // Start of multi-line comments
        /^\s*\*/.test(trimmed) ||    // Continuation of multi-line comments
        /^\s*\#/.test(trimmed)       // Preprocessor directives (for C/C++)
      ) {
        return;
      }

      // Check if the line should end with a semicolon
      const shouldEndWithSemicolon =
        !trimmed.endsWith(";") &&
        !trimmed.endsWith("{") &&
        !trimmed.endsWith("}") &&
        !/^(if|for|while|switch|do)\b/.test(trimmed) &&  // Control statements
        !/^\s*else\b/.test(trimmed);                     // "else" without braces

      if (shouldEndWithSemicolon) {
        diagnostics.push({
          severity: window.monaco.MarkerSeverity.Error,
          message: "Missing semicolon.",
          startLineNumber: index + 1,
          startColumn: 1,
          endLineNumber: index + 1,
          endColumn: trimmed.length + 1,
        });
      }
    });

    // Set markers using Monaco's API
    const model = window.monaco.editor.getModels()[0];
    window.monaco.editor.setModelMarkers(model, "owner", diagnostics);
  }
}

export default function Editor({ roomId }) {
  const socketRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(boilerplates[language]);
  const [fontSize, setFontSize] = useState(14); // Default font size
  const [fontFamily, setFontFamily] = useState("Fira Code"); // Default font family
  const [codeStorage, setCodeStorage] = useState({});

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");
    socketRef.current.emit("joinRoom", roomId);

    // Load code when the room is joined
    socketRef.current.emit("loadCode", { roomId, language });
    socketRef.current.on("loadCode", (existingCode) => {
      if (existingCode) {
        setCodeStorage((prev) => ({ ...prev, [language]: existingCode }));
        setCode(existingCode);
      } else {
        setCodeStorage((prev) => ({ ...prev, [language]: boilerplates[language] }));
        setCode(boilerplates[language]);
      }
    });

    socketRef.current.on("updateCode", (newCode) => {
      setCode(newCode);
      setCodeStorage((prev) => ({ ...prev, [language]: newCode }));
      if (language === "cpp" || language === "java" || language === "c") {
        checkSyntax(newCode, language); // Check syntax on code update
      }
    });

    return () => socketRef.current?.disconnect();
  }, [roomId, language]);

  const handleEditorChange = (value) => {
    setCode(value);
    setCodeStorage((prev) => ({ ...prev, [language]: value }));
    checkSyntax(value, language); // Check syntax on change
    socketRef.current.emit("codeChange", { roomId, code: value, language });
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const existingCode = codeStorage[newLang] || boilerplates[newLang];
    setCode(existingCode);
    checkSyntax(existingCode, newLang); // Check syntax on language change
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  return (
    <div className="flex flex-col items-left bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
        <select
          value={fontFamily}
          onChange={handleFontFamilyChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="Fira Code">Fira Code</option>
          <option value="Courier New">Courier New</option>
          <option value="Consolas">Consolas</option>
        </select>
        <input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="p-2 rounded bg-gray-700 text-white w-20"
          min="10"
          max="30"
        />
      </div>

      <div style={{ height: "600px", width: "100%" }}>
        <MonacoEditor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          options={{
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            minimap: { enabled: true },
            fontSize: fontSize,
            fontFamily: fontFamily,
          }}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}

