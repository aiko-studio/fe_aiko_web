export default [
    { 
      name: "1. Print Basic", 
      code: '# Print berbagai tipe data\nprint("hello world");\nprint(10);\nprint(true);' 
    },
    { 
      name: "2. Arithmetic Operations", 
      code: '# Operasi matematika dasar\nprint(10 + 5);\nprint(10 - 2);\nprint(10 * 4);\nprint(10 / 2);\nprint(10 % 3);' 
    },
    { 
      name: "3. Logical Operators", 
      code: '# Operasi logika dan negasi\nprint(!false);      # true\nprint(!!!false);    # true\nprint(!!-8 * 3);    # 3' 
    },
    { 
      name: "4. Variable Declaration", 
      code: '# Deklarasi variabel awal\nvar x = 888;\nvar y = 9987;\nvar sum = x + y;\nprint(sum);' 
    },
    { 
      name: "5. Variable Assignment", 
      code: '# Mengubah nilai variabel (Re-assign)\nvar assign = "awal";\nprint(assign);\n\nassign = "ganti";\nprint(assign);' 
    },
    { 
      name: "6. Simple If Condition", 
      code: '# Kondisi IF sederhana\nvar x = 10;\nif (x > 5) {\n    print("x lebih besar dari 5");\n}' 
    },
    { 
      name: "7. If-Elif-Else Chain", 
      code: '# Kondisi bercabang lengkap\nvar nilai = 85;\nif nilai == 100 {\n    print("Sempurna");\n}\nelif nilai >= 80 {\n    print("Bagus");\n}\nelse {\n    print("Coba lagi");\n}' 
    },
    { 
      name: "8. For Loop (Standard)", 
      code: '# Perulangan rentang standar\nfor i = 1 .. 5 {\n    print(i);\n}' 
    },
    { 
      name: "9. For Loop (With Step)", 
      code: '# Perulangan dengan loncatan nilai\nfor i = 0 .. 10, 2 {\n    print(i); # 0, 2, 4, 6, 8\n}' 
    },
    { 
      name: "10. For Loop (Backward)", 
      code: '# Perulangan mundur\nfor i = 5 .. -1 {\n    print(i); # 5, 4, 3, 2, 1, 0\n}' 
    },
    { 
      name: "11. Break & Continue", 
      code: '# Kontrol perulangan\nfor i = 1 .. 10 {\n    if (i == 3) { continue; }\n    if (i == 6) { break; }\n    print(i);\n}' 
    },
    { 
      name: "12. Function (No Return)", 
      code: '# Fungsi tanpa nilai balik\nfun sayHello(name) {\n    print("Hello ");\n    print(name);\n}\n\nsayHello("Aiko");' 
    },
    { 
      name: "13. Function (With Return)", 
      code: '# Fungsi dengan nilai balik\nfun add(a, b) {\n    return a + b;\n}\n\nvar result = add(10, 20);\nprint(result);' 
    },
    { 
      name: "14. Typeof Check", 
      code: '# Mengecek tipe data variabel\nvar data = 10;\nprint(typeof(data)); # 0 (int)\n\ndata = "teks";\nprint(typeof(data)); # 1 (string)' 
    },
    { 
      name: "15. Input & Casting", 
      code: '# Mengambil input user dan casting\nvar angka = input("Masukkan angka: ") as int;\nprint(angka + 5);' 
    },
    { 
      name: "16. Array Basic", 
      code: '# Deklarasi dan akses array\nvar arr = [10, 20, 30, 40];\nprint(arr[1]); # 20' 
    },
    { 
      name: "17. Array Modification", 
      code: '# Mengubah isi array\nvar arr = [1, 2, 3];\narr[0] = 99;\nprint(arr[0]);' 
    },
    { 
      name: "18. For-In (Array)", 
      code: '# Iterasi array dengan for-in\nvar items = [11, 22, 33];\nfor x in items {\n    print(x);\n}' 
    },
    { 
      name: "19. For-In with Filter", 
      code: '# Iterasi array dengan filter (when)\nvar numbers = [10, 50, 20, 80];\nfor n in numbers when n > 30 {\n    print(n);\n}' 
    },
    { 
      name: "20. Recursion", 
      code: '# Fungsi rekursif (Factorial)\nfun rec(n) {\n    if(n == 1) { return 1; }\n    return n * rec(n - 1);\n}\n\nprint(rec(5));' 
    },
    { 
      name: "21. Nested Loops", 
      code: '# Perulangan bersarang\nfor i = 1 .. 3 {\n    for j = 1 .. 3 {\n        print(j);\n    }\n}' 
    },
];