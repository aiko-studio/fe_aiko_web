export default {
  // --- DATA TRANSFER ---
  "MOV": "**Move**: Menyalin nilai dari *source* ke *destination*.\n\n`MOV dest, src`",
  "PUSH": "**Push**: Menambahkan nilai ke bagian atas *stack*.",
  "POP": "**Pop**: Mengambil nilai dari bagian atas *stack* dan menyimpannya ke register.",
  "XCHG": "**Exchange**: Menukar nilai antara dua register, atau antara register dan memori.",
  "LEA": "**Load Effective Address**: Menghitung alamat memori operand kedua dan menyimpannya ke pertama.",

  // --- ARITHMETIC ---
  "ADD": "**Add**: Menjumlahkan dua operand dan menyimpan hasilnya ke operand pertama.",
  "SUB": "**Subtract**: Mengurangkan operand kedua dari operand pertama.",
  "INC": "**Increment**: Menambahkan nilai 1 pada operand (lebih cepat dari `ADD operand, 1`).",
  "DEC": "**Decrement**: Mengurangkan nilai 1 dari operand.",
  "MUL": "**Unsigned Multiply**: Perkalian bilangan bulat tanpa tanda. Hasilnya biasanya disimpan di kombinasi register `EDX:EAX`.",
  "IMUL": "**Signed Multiply**: Perkalian bilangan bulat bertanda.",
  "DIV": "**Unsigned Divide**: Pembagian bilangan bulat tanpa tanda. Membagi nilai di `EDX:EAX` dengan operand, hasil bagi di `EAX`, sisa di `EDX`.",
  "IDIV": "**Signed Divide**: Pembagian bilangan bulat bertanda.",
  "NEG": "**Negate**: Mengubah tanda bilangan (positif menjadi negatif, atau sebaliknya) menggunakan *Two's Complement*.",

  // --- LOGICAL & BITWISE ---
  "AND": "**Logical AND**: Melakukan operasi *bitwise* AND antara dua operand.",
  "OR": "**Logical OR**: Melakukan operasi *bitwise* OR antara dua operand.",
  "XOR": "**Exclusive OR**: Sering digunakan `XOR eax, eax` untuk mengosongkan register (set ke 0) dengan cepat.",
  "NOT": "**Logical NOT**: Membalikkan semua bit pada operand (*One's Complement*).",
  "SHL": "**Shift Left**: Menggeser bit operand ke kiri. Biasanya digunakan untuk perkalian cepat dengan pangkat 2.",
  "SHR": "**Shift Right**: Menggeser bit operand ke kanan. Biasanya digunakan untuk pembagian cepat dengan pangkat 2 tanpa tanda.",

  // --- CONTROL FLOW & JUMPS ---
  "CMP": "**Compare**: Membandingkan dua nilai dengan cara pengurangan. Mengubah status *flag* (seperti Zero Flag atau Sign Flag) tanpa mengubah operand.",
  "TEST": "**Test**: Melakukan *bitwise* AND secara internal untuk mengubah *flag*, tanpa menyimpan hasilnya. Sering dipakai untuk mengecek apakah register bernilai 0 (`TEST eax, eax`).",
  "JMP": "**Jump**: Melompat ke alamat instruksi atau label tertentu tanpa syarat.",
  "JE": "**Jump if Equal**: Melompat jika hasil perbandingan sebelumnya menunjukkan kedua nilai sama (Zero Flag = 1). Sama dengan `JZ` (*Jump if Zero*).",
  "JNE": "**Jump if Not Equal**: Melompat jika kedua nilai tidak sama (Zero Flag = 0). Sama dengan `JNZ`.",
  "JG": "**Jump if Greater**: Melompat jika operand pertama lebih besar dari operand kedua (untuk bilangan bertanda).",
  "JGE": "**Jump if Greater or Equal**: Melompat jika operand pertama lebih besar atau sama dengan operand kedua.",
  "JL": "**Jump if Less**: Melompat jika operand pertama lebih kecil dari operand kedua (untuk bilangan bertanda).",
  "JLE": "**Jump if Less or Equal**: Melompat jika operand pertama lebih kecil atau sama dengan operand kedua.",

  // --- PROCEDURES & SYSTEM ---
  "CALL": "**Call**: Memanggil prosedur/fungsi (menyimpan alamat balik ke *stack* sebelum melompat).",
  "RET": "**Return**: Kembali dari prosedur (mengambil alamat balik dari *stack* ke dalam *Instruction Pointer*).",
  "INT": "**Interrupt**: Memicu interupsi *software* (biasanya untuk *syscall* ke sistem operasi).",
  "NOP": "**No Operation**: Instruksi kosong. CPU tidak melakukan apa-apa selain melangkah ke instruksi berikutnya (memakan 1 *clock cycle*)."
};