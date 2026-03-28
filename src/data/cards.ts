import type { GoCard } from "./types";

export const cards: GoCard[] = [
  // ═══════════════════════════════════════
  // WHITE BELT: Variables, types, basics
  // ═══════════════════════════════════════
  {
    id: "w01",
    belt: "white",
    type: "concept",
    question: "What does := do in Go?",
    options: [
      "Declares and assigns a variable with inferred type",
      "Compares two values",
      "Assigns to an existing variable",
      "Creates a constant",
    ],
    correct: 0,
    explanation:
      "The := operator is short variable declaration. It declares a new variable and infers its type from the right side. You can only use it inside functions.",
    gopherMood: "thinking",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w02",
    belt: "white",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    x := 42
    fmt.Println(x)
}`,
    options: ["42", "x", "0", "Compile error"],
    correct: 0,
    explanation:
      "x is declared with := and assigned the value 42. fmt.Println prints the value, not the variable name.",
    gopherMood: "thinking",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w03",
    belt: "white",
    type: "concept",
    question: "What is the zero value of a string in Go?",
    options: ['An empty string ""', "nil", "undefined", "0"],
    correct: 0,
    explanation:
      "Every type in Go has a zero value. For strings it's \"\", for numbers it's 0, for booleans it's false, and for pointers/slices/maps it's nil.",
    gopherMood: "idle",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w04",
    belt: "white",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    var x int
    var s string
    fmt.Println(x, s, x == 0)
}`,
    options: ["0  true", '0 "" true', "nil nil true", "Compile error"],
    correct: 0,
    explanation:
      'Uninitialized int is 0, string is "" (empty, prints nothing visible). x == 0 is true. The output is: 0  true (with an empty string in between).',
    gopherMood: "thinking",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w05",
    belt: "white",
    type: "concept",
    question: "How do you declare a constant in Go?",
    options: [
      "const name = value",
      "let name = value",
      "final name = value",
      "var name = value",
    ],
    correct: 0,
    explanation:
      "Constants are declared with the const keyword. They must be set at compile time and cannot use :=.",
    gopherMood: "idle",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w06",
    belt: "white",
    type: "fix",
    question: "Which line causes a compile error?",
    code: `package main

import "fmt"

func main() {
    x := 10
    fmt.Println(x)
    x := 20
    fmt.Println(x)
}`,
    options: [
      "Line 8: x := 20 (x already declared)",
      "Line 6: x := 10",
      "Line 7: fmt.Println(x)",
      "No error",
    ],
    correct: 0,
    explanation:
      "You cannot use := to redeclare a variable in the same scope. Use = for reassignment: x = 20.",
    gopherMood: "encouraging",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w07",
    belt: "white",
    type: "concept",
    question: "What happens if you import a package but don't use it?",
    options: [
      "Compile error",
      "Warning only",
      "It gets ignored silently",
      "Runtime panic",
    ],
    correct: 0,
    explanation:
      'Go refuses to compile with unused imports. This keeps code clean. Use _ as a blank identifier if you need the side effect: import _ "pkg".',
    gopherMood: "encouraging",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w08",
    belt: "white",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    a, b := 3, 7
    fmt.Println(a + b)
}`,
    options: ["10", "37", "3 7", "Compile error"],
    correct: 0,
    explanation:
      "Go supports multiple assignment. a gets 3, b gets 7. Their sum is 10.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w09",
    belt: "white",
    type: "concept",
    question: "Which of these is NOT a basic Go type?",
    options: ["char", "int", "string", "bool"],
    correct: 0,
    explanation:
      "Go doesn't have a char type. It uses byte (alias for uint8) for ASCII and rune (alias for int32) for Unicode characters.",
    gopherMood: "thinking",
    conceptImage: "/concepts/variables.png",
  },
  {
    id: "w10",
    belt: "white",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    name := "Gopher"
    fmt.Printf("Hello, %s!\\n", name)
}`,
    options: ["Hello, Gopher!", "Hello, %s!", "Hello, name!", "Compile error"],
    correct: 0,
    explanation:
      "Printf uses format verbs. %s substitutes a string value. \\n adds a newline.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/variables.png",
  },

  // ═══════════════════════════════════════
  // YELLOW BELT: Functions, loops, control flow
  // ═══════════════════════════════════════
  {
    id: "y01",
    belt: "yellow",
    type: "concept",
    question: "What is special about Go functions compared to most languages?",
    options: [
      "They can return multiple values",
      "They cannot take parameters",
      "They must return exactly one value",
      "They are always async",
    ],
    correct: 0,
    explanation:
      "Go functions can return multiple values, commonly used for returning a result and an error: func divide(a, b int) (int, error).",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y02",
    belt: "yellow",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func swap(a, b int) (int, int) {
    return b, a
}

func main() {
    x, y := swap(1, 2)
    fmt.Println(x, y)
}`,
    options: ["2 1", "1 2", "Compile error", "2, 1"],
    correct: 0,
    explanation: "swap returns b first, then a. So x gets 2 and y gets 1.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y03",
    belt: "yellow",
    type: "concept",
    question: "Go has only one loop construct. What is it?",
    options: ["for", "while", "foreach", "loop"],
    correct: 0,
    explanation:
      "Go only has 'for'. It covers all cases: for i := 0; i < n; i++ (classic), for condition (while), for (infinite), for range (foreach).",
    gopherMood: "idle",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y04",
    belt: "yellow",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        fmt.Print(i, " ")
    }
}`,
    options: ["0 1 2 ", "1 2 3 ", "0 1 2 3 ", "Compile error"],
    correct: 0,
    explanation:
      "The loop starts at 0 and stops before 3. fmt.Print doesn't add a newline, so output is on one line.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y05",
    belt: "yellow",
    type: "fix",
    question: "What's wrong with this code?",
    code: `package main

import "fmt"

func main() {
    if x := 10; x > 5
    {
        fmt.Println("big")
    }
}`,
    options: [
      "Opening brace must be on the same line as if",
      "x := 10 is invalid in an if statement",
      "Missing parentheses around condition",
      "Nothing, it compiles fine",
    ],
    correct: 0,
    explanation:
      "Go requires the opening brace { on the same line as the statement. The compiler inserts semicolons at line ends, so a brace on the next line breaks the syntax.",
    gopherMood: "encouraging",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y06",
    belt: "yellow",
    type: "concept",
    question: "What does the blank identifier _ do?",
    options: [
      "Discards a value you don't need",
      "Creates a private variable",
      "Represents nil",
      "Marks a variable as unused",
    ],
    correct: 0,
    explanation:
      "The blank identifier _ lets you ignore values. Common with range: for _, v := range items. Go won't compile with unused variables, so _ is the escape hatch.",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y07",
    belt: "yellow",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    switch x := 3; {
    case x < 3:
        fmt.Println("small")
    case x == 3:
        fmt.Println("three")
    default:
        fmt.Println("big")
    }
}`,
    options: ["three", "small", "big", "Compile error"],
    correct: 0,
    explanation:
      "Switch with no condition after the semicolon acts like if-else. x is 3, so case x == 3 matches. Go switch doesn't fall through by default.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y08",
    belt: "yellow",
    type: "idiom",
    question: "What is the idiomatic way to loop forever in Go?",
    options: ["for { }", "while (true) { }", "for (;;) { }", "loop { }"],
    correct: 0,
    explanation:
      'A bare "for" with no condition is an infinite loop. It\'s clean, idiomatic, and reads as "loop forever."',
    gopherMood: "idle",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y09",
    belt: "yellow",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func double(x int) int {
    return x * 2
}

func main() {
    f := double
    fmt.Println(f(5))
}`,
    options: ["10", "5", "Compile error", "double(5)"],
    correct: 0,
    explanation:
      "Functions are first-class values in Go. f holds a reference to double, so f(5) calls double(5) which returns 10.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "y10",
    belt: "yellow",
    type: "concept",
    question: "What does defer do?",
    options: [
      "Schedules a function call to run when the enclosing function returns",
      "Runs a function in a separate goroutine",
      "Delays execution by one second",
      "Skips the function call entirely",
    ],
    correct: 0,
    explanation:
      "defer pushes a call onto a stack. When the surrounding function returns, deferred calls execute in LIFO order. Common for cleanup: defer file.Close().",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },

  // ═══════════════════════════════════════
  // GREEN BELT: Slices, maps, structs
  // ═══════════════════════════════════════
  {
    id: "g01",
    belt: "green",
    type: "concept",
    question: "What is the difference between an array and a slice in Go?",
    options: [
      "Arrays have fixed length; slices are dynamic",
      "Slices have fixed length; arrays are dynamic",
      "They are the same thing",
      "Arrays can hold any type; slices cannot",
    ],
    correct: 0,
    explanation:
      "Arrays [5]int have a fixed compile-time size. Slices []int are backed by arrays but can grow with append(). Slices are used far more often in practice.",
    gopherMood: "thinking",
    conceptImage: "/concepts/slices.png",
  },
  {
    id: "g02",
    belt: "green",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    s := []int{1, 2, 3}
    s = append(s, 4, 5)
    fmt.Println(len(s), cap(s) >= 5)
}`,
    options: ["5 true", "3 true", "5 false", "Compile error"],
    correct: 0,
    explanation:
      "append adds elements to a slice. The slice now has 5 elements. Capacity is always >= length, so cap(s) >= 5 is true.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/slices.png",
  },
  {
    id: "g03",
    belt: "green",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    m := map[string]int{
        "a": 1,
        "b": 2,
    }
    v, ok := m["c"]
    fmt.Println(v, ok)
}`,
    options: ["0 false", "nil false", "Compile error", "panic"],
    correct: 0,
    explanation:
      'Accessing a missing map key returns the zero value (0 for int) and false for the "comma ok" idiom. No panic, no nil.',
    gopherMood: "thinking",
    conceptImage: "/concepts/slices.png",
  },
  {
    id: "g04",
    belt: "green",
    type: "idiom",
    question: "What is the idiomatic way to check if a key exists in a map?",
    options: [
      "_, ok := m[key]; if ok { ... }",
      "if m.has(key) { ... }",
      "if m[key] != nil { ... }",
      "if m.contains(key) { ... }",
    ],
    correct: 0,
    explanation:
      'Go uses the "comma ok" idiom. The second return value from a map lookup is a boolean indicating whether the key exists.',
    gopherMood: "idle",
    conceptImage: "/concepts/slices.png",
  },
  {
    id: "g05",
    belt: "green",
    type: "concept",
    question: "How do you define a struct in Go?",
    options: [
      "type Point struct { X, Y int }",
      "struct Point { X, Y int }",
      "class Point { X, Y int }",
      "record Point(X int, Y int)",
    ],
    correct: 0,
    explanation:
      "Structs are defined with type Name struct { fields }. Go has no classes; structs with methods are the closest equivalent.",
    gopherMood: "thinking",
    conceptImage: "/concepts/structs.png",
  },
  {
    id: "g06",
    belt: "green",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

type Dog struct {
    Name string
    Age  int
}

func main() {
    d := Dog{Name: "Rex"}
    fmt.Println(d.Name, d.Age)
}`,
    options: ["Rex 0", "Rex nil", 'Rex ""', "Compile error"],
    correct: 0,
    explanation:
      "Age wasn't set, so it gets the zero value for int: 0. Struct fields always have their zero values unless explicitly initialized.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/structs.png",
  },
  {
    id: "g07",
    belt: "green",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30, 40, 50}
    sub := nums[1:3]
    fmt.Println(sub)
}`,
    options: ["[20 30]", "[10 20 30]", "[20 30 40]", "[10 20]"],
    correct: 0,
    explanation:
      "Slice notation [low:high] includes low, excludes high. nums[1:3] gives elements at index 1 and 2: 20 and 30.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/structs.png",
  },
  {
    id: "g08",
    belt: "green",
    type: "fix",
    question: "What's wrong with this code?",
    code: `package main

import "fmt"

func main() {
    var m map[string]int
    m["hello"] = 1
    fmt.Println(m)
}`,
    options: [
      "Map is nil; needs make() before use",
      "Missing type annotation",
      'Can\'t use "hello" as a key',
      "Nothing, it works fine",
    ],
    correct: 0,
    explanation:
      "var m map[string]int declares a nil map. Writing to a nil map panics. Use m := make(map[string]int) or m := map[string]int{} to initialize it.",
    gopherMood: "encouraging",
    conceptImage: "/concepts/structs.png",
  },
  {
    id: "g09",
    belt: "green",
    type: "concept",
    question: "What does make() do that a literal can't?",
    options: [
      "Pre-allocates capacity for slices, maps, and channels",
      "Creates a new type",
      "Makes a variable immutable",
      "Allocates memory on the stack instead of heap",
    ],
    correct: 0,
    explanation:
      "make() initializes slices, maps, and channels with optional capacity hints. make([]int, 0, 100) creates an empty slice that can hold 100 items before resizing.",
    gopherMood: "thinking",
    conceptImage: "/concepts/structs.png",
  },
  {
    id: "g10",
    belt: "green",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    s := "Hello"
    fmt.Println(len(s))
}`,
    options: ["5", "6", "4", "Compile error"],
    correct: 0,
    explanation:
      'len() on a string returns the number of bytes. "Hello" is 5 ASCII characters, each one byte, so len is 5. For Unicode strings, len counts bytes, not runes.',
    gopherMood: "celebrating",
    conceptImage: "/concepts/structs.png",
  },

  // ═══════════════════════════════════════
  // BLUE BELT: Interfaces, methods, errors
  // ═══════════════════════════════════════
  {
    id: "b01",
    belt: "blue",
    type: "concept",
    question: "How does a type implement an interface in Go?",
    options: [
      "By implementing all the interface's methods (no keyword needed)",
      "By using the implements keyword",
      "By extending the interface",
      "By registering with the runtime",
    ],
    correct: 0,
    explanation:
      "Go uses implicit interfaces. If a type has all the methods an interface requires, it satisfies that interface automatically. No declaration needed.",
    gopherMood: "thinking",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b02",
    belt: "blue",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

type Greeter interface {
    Greet() string
}

type English struct{}
func (e English) Greet() string { return "Hello" }

type Spanish struct{}
func (s Spanish) Greet() string { return "Hola" }

func sayHi(g Greeter) {
    fmt.Println(g.Greet())
}

func main() {
    sayHi(Spanish{})
}`,
    options: ["Hola", "Hello", "Compile error", "panic"],
    correct: 0,
    explanation:
      "Spanish implements the Greeter interface because it has a Greet() string method. sayHi accepts any Greeter, so Spanish{} works.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b03",
    belt: "blue",
    type: "idiom",
    question: "What is the idiomatic way to handle errors in Go?",
    options: [
      "if err != nil { return err }",
      "try { ... } catch (err) { ... }",
      "result.unwrap()",
      "throw new Error(msg)",
    ],
    correct: 0,
    explanation:
      "Go uses explicit error returns instead of exceptions. The pattern is: result, err := doThing(); if err != nil { return err }. Every error is handled where it occurs.",
    gopherMood: "idle",
    conceptImage: "/concepts/errors.png",
  },
  {
    id: "b04",
    belt: "blue",
    type: "concept",
    question:
      "What is the difference between a value receiver and a pointer receiver?",
    options: [
      "Value receiver gets a copy; pointer receiver can modify the original",
      "They are identical in behavior",
      "Value receivers are faster",
      "Pointer receivers can only be used with interfaces",
    ],
    correct: 0,
    explanation:
      "func (d Dog) Speak() gets a copy of Dog. func (d *Dog) Rename(n string) can modify the actual Dog. Use pointer receivers when you need to mutate or avoid copying large structs.",
    gopherMood: "thinking",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b05",
    belt: "blue",
    type: "output",
    question: "What does this print?",
    code: `package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(result)
}`,
    options: [
      "Error: division by zero",
      "0",
      "+Inf",
      "panic: division by zero",
    ],
    correct: 0,
    explanation:
      "divide returns an error when b is 0. The caller checks err != nil and prints the error message. No panic involved.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/errors.png",
  },
  {
    id: "b06",
    belt: "blue",
    type: "concept",
    question: "What does the empty interface interface{} (or any) accept?",
    options: [
      "Any type at all",
      "Only structs",
      "Only primitive types",
      "Nothing; it's a compile error",
    ],
    correct: 0,
    explanation:
      "The empty interface has zero methods, so every type satisfies it. Since Go 1.18, you can write 'any' as shorthand. fmt.Println uses it: func Println(a ...any).",
    gopherMood: "thinking",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b07",
    belt: "blue",
    type: "fix",
    question: "What's wrong with this code?",
    code: `package main

import "fmt"

type Counter struct {
    n int
}

func (c Counter) Increment() {
    c.n++
}

func main() {
    c := Counter{}
    c.Increment()
    c.Increment()
    fmt.Println(c.n)
}`,
    options: [
      "Value receiver; Increment modifies a copy, not the original",
      "n should be exported (capital N)",
      "Missing return statement",
      "Nothing, it prints 2",
    ],
    correct: 0,
    explanation:
      "Increment has a value receiver (c Counter), so c.n++ modifies a copy. The original c.n stays 0. Fix: use a pointer receiver (c *Counter).",
    gopherMood: "encouraging",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b08",
    belt: "blue",
    type: "type",
    question: "What type does this function return?",
    code: `func process(data []byte) (string, error) {
    // ...
}`,
    options: ["(string, error)", "string", "error", "([]byte, error)"],
    correct: 0,
    explanation:
      "Go functions explicitly declare their return types. This one returns two values: a string and an error. The parentheses group multiple returns.",
    gopherMood: "idle",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b09",
    belt: "blue",
    type: "concept",
    question: "What is a type assertion in Go?",
    options: [
      "Extracting the concrete type from an interface value",
      "Checking if a variable is nil",
      "Converting between numeric types",
      "Declaring a new type alias",
    ],
    correct: 0,
    explanation:
      "Type assertion extracts the underlying value: str := val.(string). Use the comma-ok form to avoid panics: str, ok := val.(string).",
    gopherMood: "thinking",
    conceptImage: "/concepts/interfaces.png",
  },
  {
    id: "b10",
    belt: "blue",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    defer fmt.Println("world")
    fmt.Println("hello")
}`,
    options: ["hello\\nworld", "world\\nhello", "hello", "world"],
    correct: 0,
    explanation:
      'defer pushes "world" to execute when main() returns. So "hello" prints first, then "world" runs on exit.',
    gopherMood: "celebrating",
    conceptImage: "/concepts/errors.png",
  },

  // ═══════════════════════════════════════
  // BROWN BELT: Goroutines, channels
  // ═══════════════════════════════════════
  {
    id: "br01",
    belt: "brown",
    type: "concept",
    question: "What is a goroutine?",
    options: [
      "A lightweight thread managed by the Go runtime",
      "A type of function that returns a channel",
      "Go's name for a callback",
      "A process that runs on a separate CPU core",
    ],
    correct: 0,
    explanation:
      "Goroutines are multiplexed onto OS threads by Go's scheduler. They start with just a few KB of stack and are cheap to create. Launch one with: go doSomething().",
    gopherMood: "thinking",
    conceptImage: "/concepts/goroutines.png",
  },
  {
    id: "br02",
    belt: "brown",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    ch := make(chan int)
    go func() {
        ch <- 42
    }()
    v := <-ch
    fmt.Println(v)
}`,
    options: ["42", "0", "Deadlock panic", "Nothing"],
    correct: 0,
    explanation:
      "A goroutine sends 42 into the channel. The main goroutine receives it with <-ch. Channels synchronize the two; no sleep needed.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/goroutines.png",
  },
  {
    id: "br03",
    belt: "brown",
    type: "concept",
    question:
      "What happens when you send to an unbuffered channel and no one is receiving?",
    options: [
      "The sender blocks until a receiver is ready",
      "The value is dropped",
      "It panics immediately",
      "The value is queued internally",
    ],
    correct: 0,
    explanation:
      "Unbuffered channels synchronize: the sender waits for a receiver and vice versa. This is how goroutines coordinate without shared memory.",
    gopherMood: "thinking",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br04",
    belt: "brown",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
    options: ["1\\n2", "2\\n1", "Deadlock", "Compile error"],
    correct: 0,
    explanation:
      "Buffered channel with capacity 2. Both sends succeed without blocking. Receives come out FIFO: first 1, then 2.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br05",
    belt: "brown",
    type: "concept",
    question: "What does select do with channels?",
    options: [
      "Waits on multiple channel operations, proceeds with the first ready one",
      "Selects which goroutine to run next",
      "Filters values from a channel",
      "Creates multiple channels at once",
    ],
    correct: 0,
    explanation:
      "select is like switch for channels. It blocks until one case can proceed. If multiple are ready, it picks one at random. Add a default case to make it non-blocking.",
    gopherMood: "thinking",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br06",
    belt: "brown",
    type: "fix",
    question: "What's wrong with this code?",
    code: `package main

import "fmt"

func main() {
    ch := make(chan int)
    ch <- 42
    fmt.Println(<-ch)
}`,
    options: [
      "Deadlock: send blocks forever (no goroutine to receive)",
      "Channel needs a type parameter",
      "Missing close(ch)",
      "Nothing, prints 42",
    ],
    correct: 0,
    explanation:
      "On an unbuffered channel, ch <- 42 blocks until someone receives. But the receive is on the next line, which never runs. Deadlock. Fix: send in a goroutine or use a buffered channel.",
    gopherMood: "encouraging",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br07",
    belt: "brown",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "ping"
        ch <- "pong"
        close(ch)
    }()
    for msg := range ch {
        fmt.Println(msg)
    }
}`,
    options: ["ping\\npong", "ping", "Deadlock", "pong\\nping"],
    correct: 0,
    explanation:
      "range over a channel receives values until the channel is closed. The goroutine sends ping, then pong, then closes. Both values print in order.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br08",
    belt: "brown",
    type: "idiom",
    question:
      "What is the idiomatic way to wait for multiple goroutines to finish?",
    options: [
      "sync.WaitGroup",
      "time.Sleep(5 * time.Second)",
      "runtime.Goexit()",
      "channel of booleans",
    ],
    correct: 0,
    explanation:
      "sync.WaitGroup tracks goroutines: wg.Add(1) before launch, wg.Done() inside (often deferred), wg.Wait() to block until all finish. Clean and race-free.",
    gopherMood: "idle",
    conceptImage: "/concepts/channels.png",
  },
  {
    id: "br09",
    belt: "brown",
    type: "concept",
    question: "What does close(ch) do to a channel?",
    options: [
      "Signals no more values will be sent; receivers get zero values after draining",
      "Deletes the channel from memory",
      "Sends a nil value",
      "Blocks until all values are received",
    ],
    correct: 0,
    explanation:
      "Closing a channel tells receivers there's nothing more coming. range loops exit. Receiving from a closed, empty channel returns the zero value and false.",
    gopherMood: "thinking",
    conceptImage: "/concepts/goroutines.png",
  },
  {
    id: "br10",
    belt: "brown",
    type: "output",
    question: "What does this print?",
    code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Print(n)
        }(i)
    }
    wg.Wait()
}`,
    options: [
      "0, 1, and 2 in some order",
      "Always 0 1 2",
      "Always 2 2 2",
      "Compile error",
    ],
    correct: 0,
    explanation:
      "Each goroutine captures its own copy of i via the function parameter n. All three values print, but goroutine scheduling is non-deterministic, so the order varies.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/goroutines.png",
  },

  // ═══════════════════════════════════════
  // BLACK BELT: Patterns, testing, advanced
  // ═══════════════════════════════════════
  {
    id: "k01",
    belt: "black",
    type: "concept",
    question: "What is the purpose of init() functions in Go?",
    options: [
      "They run automatically before main(), used for package initialization",
      "They replace constructors",
      "They are called when a struct is created",
      "They initialize all global variables to zero",
    ],
    correct: 0,
    explanation:
      "Each package can have multiple init() functions. They run once, in dependency order, before main(). Used for registering drivers, setting defaults, and validation.",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k02",
    belt: "black",
    type: "idiom",
    question: "What is the Go testing convention for test files?",
    options: [
      "name_test.go in the same package",
      "test_name.go in a tests/ directory",
      "name.test.go anywhere",
      "spec_name.go in a spec/ directory",
    ],
    correct: 0,
    explanation:
      "Test files end in _test.go and live alongside the code they test. Test functions start with Test: func TestAdd(t *testing.T). Run with: go test ./...",
    gopherMood: "idle",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k03",
    belt: "black",
    type: "concept",
    question: "What does go:embed do?",
    options: [
      "Embeds files into the Go binary at compile time",
      "Imports C code into Go",
      "Embeds HTML templates at runtime",
      "Creates inline assembly",
    ],
    correct: 0,
    explanation:
      "The //go:embed directive lets you include file contents in your binary. Works with strings, []byte, and embed.FS. Example: //go:embed config.json \\n var config string",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k04",
    belt: "black",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    defer fmt.Println("first")
    defer fmt.Println("second")
    defer fmt.Println("third")
}`,
    options: [
      "third\\nsecond\\nfirst",
      "first\\nsecond\\nthird",
      "first",
      "third",
    ],
    correct: 0,
    explanation:
      "Deferred calls execute in LIFO (last-in, first-out) order. Think of it as a stack: last defer in, first to run on exit.",
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k05",
    belt: "black",
    type: "concept",
    question: "What is a context.Context used for?",
    options: [
      "Carrying deadlines, cancellation signals, and request-scoped values",
      "Storing global configuration",
      "Managing database connections",
      "Logging function calls",
    ],
    correct: 0,
    explanation:
      "Context flows through function calls to control cancellation and timeouts. APIs that do I/O should accept ctx as their first parameter. Always respect ctx.Done().",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k06",
    belt: "black",
    type: "type",
    question: "What is the type of the built-in error interface?",
    code: `// What does the error interface look like?`,
    options: [
      "interface { Error() string }",
      "interface { String() string }",
      "interface { Message() string }",
      "interface { Err() string }",
    ],
    correct: 0,
    explanation:
      "The error interface has one method: Error() string. Any type with this method is an error. This simplicity is by design.",
    gopherMood: "idle",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k07",
    belt: "black",
    type: "concept",
    question: "What are generics in Go (since 1.18)?",
    options: [
      "Type parameters that let functions and types work with multiple types",
      "Automatic type conversion between compatible types",
      "A way to generate code at build time",
      "Runtime type checking similar to reflection",
    ],
    correct: 0,
    explanation:
      "Generics use type parameters: func Map[T, U any](s []T, f func(T) U) []U. Constraints like comparable or custom interfaces restrict which types are allowed.",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k08",
    belt: "black",
    type: "fix",
    question: "What's the subtle bug here?",
    code: `package main

import "fmt"

func main() {
    s := []int{1, 2, 3}
    for _, v := range s {
        go func() {
            fmt.Println(v)
        }()
    }
}`,
    options: [
      "Closure captures v by reference; all goroutines likely print 3",
      "Missing sync.WaitGroup; goroutines may not run",
      "Both: closure capture and missing WaitGroup",
      "Nothing wrong, prints 1 2 3",
    ],
    correct: 2,
    explanation:
      "Two bugs: (1) All goroutines share the same v variable, which ends at 3. Fix: pass v as parameter. (2) main() exits before goroutines run. Fix: use sync.WaitGroup.",
    gopherMood: "encouraging",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k09",
    belt: "black",
    type: "idiom",
    question: "What is the functional options pattern in Go?",
    options: [
      "Using variadic functions with option functions to configure a struct",
      "Using a map of string options",
      "Passing a config struct with all fields",
      "Using environment variables for configuration",
    ],
    correct: 0,
    explanation:
      "Functional options use closures: func WithTimeout(d time.Duration) Option. The constructor applies them: New(WithTimeout(5*time.Second)). Clean API, extensible, no breaking changes.",
    gopherMood: "thinking",
    conceptImage: "/concepts/defer.png",
  },
  {
    id: "k10",
    belt: "black",
    type: "output",
    question: "What does this print?",
    code: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1, "b": 2}
    delete(m, "a")
    delete(m, "c") // key doesn't exist
    fmt.Println(len(m))
}`,
    options: ["1", "2", "0", "panic"],
    correct: 0,
    explanation:
      'delete(m, "a") removes key "a". delete(m, "c") is a no-op (deleting a missing key doesn\'t panic). One key remains: "b".',
    gopherMood: "celebrating",
    conceptImage: "/concepts/defer.png",
  },
];

export function getCardsByBelt(belt: string): GoCard[] {
  return cards.filter((c) => c.belt === belt);
}

export function getCardById(id: string): GoCard | undefined {
  return cards.find((c) => c.id === id);
}
