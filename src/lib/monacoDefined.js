export default function monacoDefined(container, code, lang = "aiko", isDark = true) {
    return new Promise(resolve => {
      const require = window.require
      require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.53.0/min/vs" } });
  
      require(["vs/editor/editor.main"], function () {
        monaco.languages.register({ id: "aiko" });
        monaco.languages.register({ id: "assembly" });
  
        monaco.languages.setMonarchTokensProvider("aiko", {
          tokenizer: {
            root: [
              [/#.*/, "comment"],
              [/\/\/.*/, "comment"],
              [/(\.\.)/, "operator.range"],
              [/\b(var|val|fun|if|elif|else|for|print|int|bool|str|input|typeof|len|array|view)\b/, "keyword"],

              [/\b(true|false|null)\b/, "constant.boolean"],
              [/"/, { token: "string.quote", next: "@interpolated_string" }],
              [/\d+(\.\d+)?/, "number"],

              [/[\+\-\*\/=<>!]+/, "operator"],
              [/[{}()\[\]]/, "delimiter"],
            ],
            interpolated_string: [
              [/\{[^}]*\}/, "string.interpolation"],
              [/"/, { token: "string.quote", next: "@pop" }],
              [/[^"{]+/, "string"],
            ]
          }
        });

        monaco.languages.setMonarchTokensProvider("assembly", {
          tokenizer: {
            root: [
              [/;.*/, "comment"],
              [/\b(mov|add|sub|mul|div|jmp|je|jne|cmp|call|ret|push|pop|xor|int)\b/i, "keyword.instruction"],
              [/\b(eax|ebx|ecx|edx|esi|edi|ebp|esp|al|ah|bl|bh|cl|ch|dl|dh)\b/i, "variable.register"],
              [/\b(dword|word|byte|ptr|section|global|extern)\b/i, "keyword.directive"],
              [/^[a-zA-Z_][a-zA-Z0-9_]*:/, "type.identifier"], // Labels
              [/\d+/, "number"],
              [/".*?"/, "string"],
              [/[\[\]\+\-\*,]/, "operator"],
            ]
          }
        });
  
        monaco.editor.defineTheme("aiko-white", {
          base: "vs",
          inherit: true,
          rules: [
            { token: "keyword", foreground: "#0000FF" },
            { token: "constant.boolean", foreground: "#AA00AA" },
            { token: "number", foreground: "#09885A" },
            { token: "string", foreground: "#B22222" },
            { token: "string.quote", foreground: "#B22222" },
            { token: "string.interpolation", foreground: "#FF6600", fontStyle: "bold" },
            { token: "comment", foreground: "#008000", fontStyle: "italic" },
            
            { token: "operator", foreground: "#FF8C00" },      
            { token: "operator.range", foreground: "#FF4500" },
            { token: "delimiter", foreground: "#5F6368" }     
          ],
          colors: {}
        });

        monaco.editor.defineTheme("aiko-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "keyword", foreground: "#818CF8", fontStyle: "bold" }, // Indigo 400
            { token: "constant.boolean", foreground: "#C084FC" }, 
            { token: "number", foreground: "#34D399" }, 
            { token: "string", foreground: "#F87171" },
            { token: "string.quote", foreground: "#F87171" },
            { token: "string.interpolation", foreground: "#FBBF24", fontStyle: "bold" },
            { token: "comment", foreground: "#9CA3AF", fontStyle: "italic" }, 
            { token: "operator", foreground: "#FB923C" }, 
            { token: "operator.range", foreground: "#FB923C", fontStyle: "bold" },
            { token: "delimiter", foreground: "#D4D4D8" }, 

            // Warna Assembly (Dark)
            { token: "keyword.instruction", foreground: "#60A5FA", fontStyle: "bold" }, 
            { token: "variable.register", foreground: "#FBBF24" }, 
            { token: "keyword.directive", foreground: "#A78BFA" }, 
            { token: "type.identifier", foreground: "#34D399", fontStyle: "bold" } 
          ],
          colors: {
            "editor.background": "#00000000" // Memaksa transparan
          }
        });

        const initialTheme = isDark ? "aiko-dark" : "aiko-white";
  
        const editor = monaco.editor.create(container, {
          value: code,
          language: lang,
          theme: initialTheme,
          automaticLayout: true,
          minimap: { enabled: false }
        });
  
        resolve(editor);
      
        monaco.languages.setLanguageConfiguration("aiko", {
          autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "(", close: ")" },
            { open: "[", close: "]" },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
          surroundingPairs: [
            { open: "{", close: "}" },
            { open: "(", close: ")" },
            { open: "[", close: "]" },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
        });
      })
    })
  }
  