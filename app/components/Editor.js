


















































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
          language_id: languageId
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
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
       <div style={{
  position: "absolute",
  top: "10px",
  right: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  zIndex: 1000 // ensures it's not hidden behind other content
}}>
  {username ? (
    <>
      <span style={{ color: "white" }}>👤 {username}</span>
      <button
        onClick={() => router.push("/dashboard")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Dashboard
      </button>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => router.push("/login")}
        style={{
          backgroundColor: "#2196F3",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Login
      </button>
      <button
        onClick={() => router.push("/signup")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Signup
      </button>
    </>
  )}
</div>

      {/* Sidebar for Files */}
      <div style={{ 
        width: "250px", 
        background: "#282c34", 
        color: "white", 
        padding: "10px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "10px",
        borderRight: "2px solid #333"
      }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Files</h3>
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => setActiveFile(index)}
            style={{
              margin: "5px 5px",
              padding: "8px",
              background: activeFile === index ? "grey" : "#524949",
              color: "white",
              border: "none",
              borderRadius: "4px",
              textAlign: "left",
              fontSize: "0.9rem",
              cursor: "pointer"
            }}
          >
            {file.name}
          </button>
        ))}
        <button 
          // onClick={addNewFile} 
          onClick={() => setIsModalOpen(true)} 
          style={{ 
            margin: "5px 0",
            padding: "8px",
            background: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}
        >
          + New File
        </button>
        <NewFileModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onCreate={handleCreateFile}
        />
        <button 
          onClick={handleRunCode} 
          style={{ 
            margin: "5px 0",
            padding: "8px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}
        >
          Run Code
        </button>
       
  <button 
    onClick={saveAllFiles} 
    style={{ 
      margin: "5px 5px",
      padding: "8px",
      background: "#f9a825",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "0.9rem",
      cursor: "pointer"
    }}>
    Save and Download Files
  </button>


      </div>
  
      {/* Code Editor and Output */}
      <div style={{ flexGrow: 1, padding: "15px", background: "#1e1e1e", color: "white" }}>
        {files.length > 0 && (
          <>
            <MonacoEditor
              height="70vh"
              language={files[activeFile].language}
              value={files[activeFile].content}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 16,
                fontFamily: "Consolas, 'Courier New', monospace"
              }}
            />
            <div style={{ marginTop: "10px", background: "#333", color: "white", padding: "15px", borderRadius: "5px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Output:</h3>
              <pre style={{ fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>{output}</pre>
              {error && (
                <>
                  <h3 style={{ color: "red", marginTop: "10px" }}>Error:</h3>
                  <pre style={{ color: "lightcoral", whiteSpace: "pre-wrap" }}>{error}</pre>
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
