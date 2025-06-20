


















































"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import io from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NewFileModal } from "@/components/newFilemodal";



const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});


const languageBoilerplates = {
  javascript: "console.log('Hello, World!');",
  python: "print('Hello, World!')",
  c: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
  cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}",
  java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
};

const langMap = {
  cpp: 54,
  c: 50,
  java: 62,
  python: 71,
  javascript: 63,
};


const Editor = ({ roomId }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(0);
  const [inputText, setInputText] = useState("");

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const [username, setUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BACKEND_URL = "https://codecollab-2-u456.onrender.com";
  // const [username, setUsername] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setUsername(storedUsername);
    }
    const newSocket = io(BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    
    setSocket(newSocket);
    socketRef.current = newSocket;

    newSocket.emit("joinRoom", roomId);

    newSocket.on("filesUpdate", (updatedFiles) => {
      setFiles(updatedFiles);
    });

    newSocket.on("codeChange", ({ fileName, code }) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.name === fileName ? { ...file, content: code } : file
        )
      );
    });

    newSocket.on("outputUpdate", ({ output, error }) => {
      setOutput(output);
      setError(error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);
  const saveAllFiles = async () => {
    if (!username) {
      alert("❌ Please login to save your code.");
      return;
    }
  
    try {
      // Save to server
      const response = await axios.post("/api/saveCode", {
        roomId,
        files,
      });
      alert("✅ All files saved successfully!");
  
      // Also download each file
      files.forEach(file => {
        const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  
    } catch (error) {
      console.error("❌ Error saving files:", error);
      alert("❌ Failed to save files!");
    }
  };
  
  
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    router.push("/");
  };
  const handleEditorChange = (value) => {
    const updatedFiles = [...files];
    updatedFiles[activeFile].content = value;
    setFiles(updatedFiles);

    if (socket) {
      socket.emit("codeChange", {
        roomId,
        fileName: files[activeFile].name,
        code: value
        // username: username
      });
    }
  };

  // const addNewFile = () => {
  //   const fileName = prompt("Enter file name (e.g., script.js):");
  //   if (!fileName) return;

  //   const language = prompt("Enter language (javascript, python, c, cpp, java):");
  //   if (!languageBoilerplates[language]) {
  //     alert("Unsupported language!");
  //     return;
  //   }

  //   const newFile = {
  //     name: fileName,
  //     language: language,
  //     content: languageBoilerplates[language],
  //   };

  //   const updatedFiles = [...files, newFile];
  //   setFiles(updatedFiles);
  //   setActiveFile(updatedFiles.length - 1);

  //   if (socket) {
  //     socket.emit("filesUpdate", { roomId, files: updatedFiles });
  //   }
  // };


  const handleCreateFile = ({ name, language }) => {
    if (!languageBoilerplates[language]) {
      alert("Unsupported language!");
      return;
    }
  
    const newFile = {
      name,
      language,
      content: languageBoilerplates[language],
    };
  
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    setActiveFile(updatedFiles.length - 1);
  
    if (socket) {
      socket.emit("filesUpdate", { roomId, files: updatedFiles });
    }
  };
  

  const handleRunCode = async () => {
    const language = files[activeFile].language;
    const code = files[activeFile].content;
    const languageId = langMap[language];

    try {
      const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "26f45464demshef25e91783e3b2fp11c74cjsnfd2811b43d34",
          "X-RapidAPI-Host": "judge029.p.rapidapi.com"
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin:inputText,
        })
      });

      const data = await response.json();

      if (data.stderr) {
        const errorText = data.stderr;
        setError(errorText);
        setOutput("");
        socketRef.current.emit("outputUpdate", { roomId, output: "", error: errorText });
      } else {
        const outputText = data.stdout || data.message || "✅ No output";
        setOutput(outputText);
        setError("");
        socketRef.current.emit("outputUpdate", { roomId, output: outputText, error: "" });
      }

    } catch (error) {
      console.error("Execution Error:", error);
      setError(error.message);
      setOutput("");
      socketRef.current.emit("outputUpdate", { roomId, output: "", error: error.message });
    }
  };

  // return (
  //   <div>
  //     <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
  //       {files.map((file, index) => (
  //         <button
  //           key={index}
  //           onClick={() => setActiveFile(index)}
  //           style={{
  //             margin: "5px",
  //             padding: "5px",
  //             background: activeFile === index ? "#ddd" : "#fff",
  //           }}
  //         >
  //           {file.name}
  //         </button>
  //       ))}
  //       <button onClick={addNewFile} style={{ margin: "5px" }}>+ New File</button>
  //       <button onClick={handleRunCode} style={{ margin: "5px", background: "#4CAF50", color: "white" }}>Run Code</button>
  //     </div>
  //     {files.length > 0 && (
  //       <>
  //         <MonacoEditor
  //           height="60vh"
  //           language={files[activeFile].language}
  //           value={files[activeFile].content}
  //           onChange={handleEditorChange}
  //           theme="vs-dark"
  //         />
  //         <div style={{ marginTop: "10px", background: "#333", color: "white", padding: "10px", borderRadius: "5px" }}>
  //           <h3>Output:</h3>
  //           <pre>{output}</pre>
  //           {error && (
  //             <>
  //               <h3 style={{ color: "red" }}>Error:</h3>
  //               <pre>{error}</pre>
  //             </>
  //           )}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#282c34] text-white p-4 flex flex-col gap-3 border-r-2 border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Files</h3>
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => setActiveFile(index)}
            className={`text-left px-3 py-2 rounded text-sm ${activeFile === index ? "bg-gray-600" : "bg-gray-700"}`}
          >
            {file.name}
          </button>
        ))}
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 py-2 rounded text-white">+ New File</button>
        <NewFileModal open={isModalOpen} onOpenChange={setIsModalOpen} onCreate={handleCreateFile} />
        <button onClick={handleRunCode} className="bg-green-600 py-2 rounded text-white">Run Code</button>
        <button onClick={saveAllFiles} className="bg-yellow-600 py-2 rounded text-white">Save and Download Files</button>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-[#1e1e1e] text-white p-4 overflow-y-auto">
        {files.length > 0 && (
          <>
            <MonacoEditor
              height="60vh"
              language={files[activeFile].language}
              value={files[activeFile].content}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{ fontSize: 16, fontFamily: "Consolas, 'Courier New', monospace" }}
            />
            <div className="mt-4">
              <label className="text-sm block mb-1">Input:</label>
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter input here..."
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              ></textarea>
            </div>
            <div className="mt-4 bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold">Output:</h3>
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>
              {error && (
                <>
                  <h3 className="text-red-500 mt-2">Error:</h3>
                  <pre className="text-red-300 whitespace-pre-wrap text-sm">{error}</pre>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default Editor;
