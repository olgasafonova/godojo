import type { Belt } from "./types";

export interface CodeExample {
  code: string;
  caption: string;
}

export interface LessonSection {
  title: string;
  body: string;
  examples: CodeExample[];
  insight?: string;
}

export interface Lesson {
  belt: Belt;
  title: string;
  intro: string;
  conceptImage: string;
  sections: LessonSection[];
  gotchas: string[];
  summary: string;
}

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════
  // WHITE BELT
  // ═══════════════════════════════════════
  {
    belt: "white",
    title: "Variables, Types & Basics",
    intro:
      "Go is a statically typed language, but it tries hard to stay out of your way. You declare variables, Go figures out the types. You write clean code, Go enforces it. This lesson covers the building blocks everything else rests on.",
    conceptImage: "/concepts/w01.png",
    sections: [
      {
        title: "Declaring variables",
        body: "Go gives you two ways to create variables. The long form with var works anywhere. The short form with := is more common inside functions and infers the type automatically.",
        examples: [
          {
            code: `var name string = "Gopher"   // explicit type
var age = 25                 // type inferred as int
count := 42                  // short declaration (functions only)`,
            caption: "Three ways to declare. := is what you'll use most.",
          },
          {
            code: `a, b := 3, 7                 // multiple assignment
x, y := swap(1, 2)          // from function returns`,
            caption:
              "Go loves multiple assignment. You'll see it everywhere with error handling.",
          },
        ],
        insight:
          "You cannot use := outside a function. At the package level, every statement must start with a keyword (var, func, type, const).",
      },
      {
        title: "Zero values",
        body: 'Every variable in Go has a zero value if you don\'t initialize it. There is no "undefined" or "null surprise." Numbers start at 0, strings at "", booleans at false, and pointers/slices/maps at nil.',
        examples: [
          {
            code: `var i int        // 0
var s string     // ""
var b bool       // false
var p *int       // nil`,
            caption:
              "Zero values are predictable. No uninitialized memory bugs.",
          },
        ],
        insight:
          "Zero values are a design choice. A struct with all zero-value fields should be usable. The standard library follows this convention (bytes.Buffer, sync.Mutex).",
      },
      {
        title: "Constants",
        body: "Constants are declared with const and must be known at compile time. They cannot use :=. Go constants are more powerful than you'd expect because they are untyped until used.",
        examples: [
          {
            code: `const pi = 3.14159
const greeting = "hello"
const (
    statusOK    = 200
    statusError = 500
)`,
            caption: "Constants can be grouped in blocks.",
          },
        ],
      },
      {
        title: "Basic types",
        body: "Go's type system is small and deliberate. No char type; use byte (uint8) for ASCII or rune (int32) for Unicode. No implicit conversions between types.",
        examples: [
          {
            code: `var x int       // platform-sized integer
var f float64   // double precision
var r rune      // Unicode code point (int32)
var b byte      // alias for uint8`,
            caption: "int, float64, string, bool cover 90% of what you need.",
          },
          {
            code: `// Type conversion is explicit
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)`,
            caption: "No implicit casting. You must convert explicitly.",
          },
        ],
        insight:
          "Go has no char type. When you iterate over a string with range, you get runes (Unicode code points), not bytes.",
      },
      {
        title: "Imports and unused things",
        body: "Go refuses to compile if you import a package and don't use it, or declare a variable and never read it. This feels strict at first but keeps codebases clean.",
        examples: [
          {
            code: `import "fmt"       // must use fmt somewhere
import _ "image/png" // blank import: side effects only

x := 10            // must read x somewhere`,
            caption:
              "The _ blank identifier is the escape hatch for intentionally unused imports.",
          },
        ],
      },
      {
        title: "Printing and formatting",
        body: "fmt is Go's formatting package. Println adds a newline. Printf uses format verbs like %s (string), %d (integer), %v (any value). You'll use fmt more than any other package while learning.",
        examples: [
          {
            code: `fmt.Println("Hello, world!")          // + newline
fmt.Printf("Name: %s, Age: %d\\n", name, age)
fmt.Sprintf("Score: %d%%", 95)       // returns string`,
            caption:
              "Println for quick output, Printf for formatted, Sprintf to build strings.",
          },
        ],
      },
    ],
    gotchas: [
      "Cannot redeclare a variable with := in the same scope. Use = for reassignment.",
      "Unused variables and imports are compile errors, not warnings.",
      'len() on a string counts bytes, not characters. "café" has 5 bytes but 4 runes.',
    ],
    summary:
      "Go variables are straightforward: declare with := inside functions, use var at package level. Everything has a zero value. The compiler keeps you honest about unused code.",
  },

  // ═══════════════════════════════════════
  // YELLOW BELT
  // ═══════════════════════════════════════
  {
    belt: "yellow",
    title: "Functions, Loops & Control Flow",
    intro:
      "Go simplifies control flow to the essentials. One loop construct. No parentheses around conditions. Opening braces on the same line, always. Functions that return multiple values. Once you internalize these, Go code reads fast.",
    conceptImage: "/concepts/y01.png",
    sections: [
      {
        title: "Functions",
        body: "Go functions can return multiple values. This is the foundation of Go's error handling: almost every function returns (result, error). Parameters of the same type can share a type declaration.",
        examples: [
          {
            code: `func add(a, b int) int {
    return a + b
}

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}`,
            caption: "Multiple returns make error handling explicit.",
          },
          {
            code: `// Functions are first-class values
double := func(x int) int { return x * 2 }
fmt.Println(double(5)) // 10`,
            caption:
              "You can assign functions to variables and pass them around.",
          },
        ],
        insight:
          "Named return values act as documentation and enable bare returns, but bare returns hurt readability in longer functions. Most Go developers avoid them.",
      },
      {
        title: "The for loop",
        body: "Go has exactly one loop: for. It covers every case. Classic three-part, while-style, infinite, and range-based. No while, no do-while, no foreach. Just for.",
        examples: [
          {
            code: `// Classic
for i := 0; i < 10; i++ { }

// While-style
for condition { }

// Infinite
for { }

// Range (foreach)
for i, v := range items { }`,
            caption: "Four flavors, one keyword.",
          },
        ],
      },
      {
        title: "If statements",
        body: "No parentheses around the condition. Opening brace must be on the same line (the compiler inserts semicolons). You can include a short statement before the condition, which is perfect for error checks.",
        examples: [
          {
            code: `if x > 10 {
    fmt.Println("big")
}

// With init statement
if err := doSomething(); err != nil {
    return err
}`,
            caption:
              "The init-statement form keeps err scoped to the if block.",
          },
        ],
        insight:
          'Putting the opening brace on the next line is a compile error in Go. The compiler inserts semicolons at line endings, so it reads the if line as "if x > 10;" which is incomplete.',
      },
      {
        title: "Switch",
        body: "Go switch is cleaner than C-style. No fall-through by default (no need for break). Cases can be expressions. A switch with no condition works like if-else chains.",
        examples: [
          {
            code: `switch day {
case "Monday":
    fmt.Println("start of week")
case "Friday":
    fmt.Println("almost weekend")
default:
    fmt.Println("regular day")
}

// Tagless switch (replaces if-else chains)
switch {
case score >= 90:
    grade = "A"
case score >= 80:
    grade = "B"
}`,
            caption:
              "No break needed. Use fallthrough keyword if you want it (rare).",
          },
        ],
      },
      {
        title: "Defer",
        body: "defer schedules a function call to run when the enclosing function returns. Deferred calls stack up in LIFO order. The most common use is cleanup: closing files, releasing locks, finishing timers.",
        examples: [
          {
            code: `func readFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close() // runs when readFile returns

    // ... use f ...
}`,
            caption:
              "defer f.Close() right after opening. The cleanup lives next to the setup.",
          },
        ],
        insight:
          "Deferred function arguments are evaluated immediately, not when the deferred call runs. defer fmt.Println(x) captures x's current value.",
      },
      {
        title: "The blank identifier",
        body: "The underscore _ discards a value. Since Go won't compile with unused variables, _ is how you intentionally ignore something: a loop index, a return value, an import's exports.",
        examples: [
          {
            code: `for _, name := range names {
    fmt.Println(name) // don't need the index
}

_, err := fmt.Println("hi") // ignore byte count`,
            caption: "_ says: I know this value exists, I don't need it.",
          },
        ],
      },
    ],
    gotchas: [
      "Opening brace { must be on the same line as if, for, func, etc.",
      "Deferred calls run in LIFO order (last defer runs first).",
      "A bare for {} is an infinite loop. Make sure you have a break or return inside.",
    ],
    summary:
      "One loop to learn, functions that return errors alongside results, and defer for cleanup. Go's control flow is minimal by design.",
  },

  // ═══════════════════════════════════════
  // GREEN BELT
  // ═══════════════════════════════════════
  {
    belt: "green",
    title: "Slices, Maps & Structs",
    intro:
      "These three data structures cover most of what you need. Slices are dynamic arrays. Maps are hash tables. Structs are your custom types. Go keeps them simple and composable.",
    conceptImage: "/concepts/g01.png",
    sections: [
      {
        title: "Arrays vs slices",
        body: "Arrays have a fixed size baked into the type: [5]int and [3]int are different types. Slices are what you actually use. They're views into arrays that can grow with append.",
        examples: [
          {
            code: `// Array (rare in practice)
var a [3]int = [3]int{1, 2, 3}

// Slice (use this)
s := []int{1, 2, 3}
s = append(s, 4, 5)    // grows automatically
fmt.Println(len(s))     // 5`,
            caption: "Slices grow with append(). Arrays don't. Use slices.",
          },
          {
            code: `// Slicing creates a view, not a copy
nums := []int{10, 20, 30, 40, 50}
sub := nums[1:3]  // [20, 30]
// sub shares memory with nums!`,
            caption:
              "Slice notation [low:high] includes low, excludes high. Like Python.",
          },
        ],
        insight:
          "Slices have length (elements in use) and capacity (elements allocated). append() only reallocates when len == cap. Pre-allocate with make([]T, 0, expectedSize) to avoid copies.",
      },
      {
        title: "Maps",
        body: 'Maps are Go\'s hash tables. Keys can be any comparable type. Looking up a missing key returns the zero value and false (the "comma-ok" idiom).',
        examples: [
          {
            code: `m := map[string]int{
    "alice": 95,
    "bob":   87,
}

score := m["alice"]        // 95
score = m["unknown"]       // 0 (zero value, no error)

// Comma-ok to distinguish "exists with zero" from "missing"
v, ok := m["unknown"]      // v=0, ok=false`,
            caption:
              "Always use comma-ok when zero value could be a valid entry.",
          },
          {
            code: `// Delete keys
delete(m, "bob")
delete(m, "nobody")  // no-op, no panic`,
            caption:
              "Deleting a non-existent key is safe. No need to check first.",
          },
        ],
        insight:
          "A nil map reads fine (returns zero values) but panics on write. Always initialize with make() or a literal before writing.",
      },
      {
        title: "Structs",
        body: "Structs group fields together. Go has no classes, but structs with methods are the equivalent. Fields start with uppercase to be exported (visible outside the package).",
        examples: [
          {
            code: `type User struct {
    Name  string  // exported
    Email string  // exported
    age   int     // unexported (lowercase)
}

u := User{Name: "Alice", Email: "alice@go.dev"}
fmt.Println(u.Name)   // Alice
fmt.Println(u.age)    // 0 (zero value, not set)`,
            caption:
              "Uppercase fields are public, lowercase are package-private.",
          },
        ],
      },
      {
        title: "make() and new()",
        body: "make() initializes slices, maps, and channels. It can pre-allocate capacity. new() allocates memory and returns a pointer, but it's rarely used; &Type{} is more idiomatic.",
        examples: [
          {
            code: `s := make([]int, 0, 100)      // len=0, cap=100
m := make(map[string]int)    // initialized, ready to write
ch := make(chan int, 10)      // buffered channel`,
            caption: "make() is for slices, maps, and channels. Nothing else.",
          },
        ],
      },
    ],
    gotchas: [
      "Slicing creates a shared view, not a copy. Modifying the slice modifies the original.",
      "Writing to a nil map panics. Always initialize maps before use.",
      "Map iteration order is randomized by design. Don't rely on it.",
    ],
    summary:
      "Slices for lists, maps for lookups, structs for custom types. These three plus functions cover most Go programs.",
  },

  // ═══════════════════════════════════════
  // BLUE BELT
  // ═══════════════════════════════════════
  {
    belt: "blue",
    title: "Interfaces, Methods & Errors",
    intro:
      "This is where Go's design philosophy clicks. Interfaces are implicit. Errors are values, not exceptions. Methods attach behavior to types. Together, they make Go code composable without inheritance.",
    conceptImage: "/concepts/b01.png",
    sections: [
      {
        title: "Methods",
        body: "Methods are functions with a receiver. The receiver binds the method to a type. Value receivers get a copy; pointer receivers can modify the original.",
        examples: [
          {
            code: `type Rect struct {
    Width, Height float64
}

// Value receiver: reads only
func (r Rect) Area() float64 {
    return r.Width * r.Height
}

// Pointer receiver: can modify
func (r *Rect) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}`,
            caption:
              "Use pointer receivers when you need to mutate, or for large structs to avoid copying.",
          },
        ],
        insight:
          "If any method has a pointer receiver, convention says all methods on that type should too. Consistency helps readers predict behavior.",
      },
      {
        title: "Interfaces",
        body: "An interface defines behavior: a set of method signatures. Any type that implements all those methods satisfies the interface automatically. No implements keyword. This is Go's implicit interface satisfaction.",
        examples: [
          {
            code: `type Writer interface {
    Write([]byte) (int, error)
}

// os.File satisfies Writer (has a Write method)
// bytes.Buffer satisfies Writer too
// Your custom type can satisfy Writer

func save(w Writer, data []byte) error {
    _, err := w.Write(data)
    return err
}`,
            caption:
              "save() works with files, buffers, network connections; anything with Write.",
          },
        ],
        insight:
          'The empty interface (interface{} or "any") accepts every type. It\'s Go\'s escape hatch for generic containers. Since Go 1.18, you can write "any" instead.',
      },
      {
        title: "Error handling",
        body: "Go uses error values instead of exceptions. Functions return errors as their last return value. The caller checks immediately with if err != nil. It's verbose but explicit: you always know where errors can happen.",
        examples: [
          {
            code: `result, err := doSomething()
if err != nil {
    return fmt.Errorf("doing something: %w", err)
}
// use result`,
            caption:
              "The if err != nil pattern is Go's most common idiom. %w wraps the error for unwrapping later.",
          },
          {
            code: `// The error interface is just one method:
type error interface {
    Error() string
}

// Create simple errors
err := errors.New("something went wrong")
err = fmt.Errorf("user %s not found", name)`,
            caption: "Any type with an Error() string method is an error.",
          },
        ],
      },
      {
        title: "Type assertions and type switches",
        body: "When you have an interface value, you can extract the concrete type with a type assertion. The comma-ok form prevents panics.",
        examples: [
          {
            code: `var i interface{} = "hello"

s := i.(string)            // panics if not a string
s, ok := i.(string)        // safe: ok is false if wrong type

// Type switch
switch v := i.(type) {
case string:
    fmt.Println("string:", v)
case int:
    fmt.Println("int:", v)
}`,
            caption:
              "Type switches are clean when you need to handle multiple types.",
          },
        ],
      },
    ],
    gotchas: [
      "Value receiver methods work on copies. Incrementing a counter on a value receiver does nothing to the original.",
      "Interface values can be nil if the underlying concrete value is nil, but the interface itself is not nil. This is Go's most confusing nil behavior.",
      "Always use the comma-ok form for type assertions unless you're certain of the type.",
    ],
    summary:
      "Interfaces decouple code without inheritance. Errors are values you check, not exceptions you catch. Methods turn structs into capable types.",
  },

  // ═══════════════════════════════════════
  // BROWN BELT
  // ═══════════════════════════════════════
  {
    belt: "brown",
    title: "Goroutines & Channels",
    intro:
      "Concurrency is Go's signature feature. Goroutines are lightweight threads. Channels are typed pipes that let goroutines communicate safely. The mantra: \"Don't communicate by sharing memory; share memory by communicating.\"",
    conceptImage: "/concepts/br01.png",
    sections: [
      {
        title: "Goroutines",
        body: "A goroutine is a function running concurrently. Start one with the go keyword. Goroutines are cheap (a few KB of stack), so you can launch thousands. They're multiplexed onto OS threads by Go's runtime scheduler.",
        examples: [
          {
            code: `go doWork()                  // fire and forget

go func() {                  // anonymous goroutine
    fmt.Println("running")
}()`,
            caption:
              "go starts a goroutine. The calling function continues immediately.",
          },
        ],
        insight:
          "When main() returns, all goroutines are killed. You need to coordinate with channels or sync.WaitGroup to wait for them.",
      },
      {
        title: "Channels",
        body: "Channels are typed conduits for sending values between goroutines. Unbuffered channels synchronize: the sender blocks until a receiver is ready, and vice versa.",
        examples: [
          {
            code: `ch := make(chan int)          // unbuffered

go func() {
    ch <- 42                 // send (blocks until received)
}()

v := <-ch                    // receive (blocks until sent)
fmt.Println(v)               // 42`,
            caption: "Unbuffered channels synchronize sender and receiver.",
          },
          {
            code: `// Buffered channels have capacity
ch := make(chan int, 3)
ch <- 1                      // doesn't block (buffer has room)
ch <- 2
ch <- 3
// ch <- 4 would block (buffer full)`,
            caption: "Buffered channels decouple send and receive timing.",
          },
        ],
      },
      {
        title: "Channel patterns",
        body: "Closing a channel signals that no more values will be sent. range over a channel receives until it's closed. These patterns form the building blocks of Go concurrency.",
        examples: [
          {
            code: `// Producer-consumer
go func() {
    for _, item := range work {
        ch <- process(item)
    }
    close(ch) // signal: no more values
}()

for result := range ch {
    fmt.Println(result)      // loops until ch is closed
}`,
            caption:
              "close() + range is the standard producer-consumer pattern.",
          },
        ],
      },
      {
        title: "Select",
        body: "select waits on multiple channel operations. Whichever channel is ready first wins. If multiple are ready, one is chosen randomly. Add a default case to make it non-blocking.",
        examples: [
          {
            code: `select {
case msg := <-chatCh:
    fmt.Println("chat:", msg)
case err := <-errCh:
    fmt.Println("error:", err)
case <-time.After(5 * time.Second):
    fmt.Println("timeout")
}`,
            caption:
              "select is like switch for channels. Great for timeouts and multiplexing.",
          },
        ],
      },
      {
        title: "sync.WaitGroup",
        body: "WaitGroup coordinates multiple goroutines. Add(1) before launching, Done() inside (usually deferred), Wait() to block until all finish.",
        examples: [
          {
            code: `var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        process(n)
    }(i)                     // pass i as argument!
}

wg.Wait()                    // blocks until all Done()`,
            caption:
              "Pass loop variables as function arguments to avoid closure capture bugs.",
          },
        ],
        insight:
          "Always pass loop variables to goroutine closures as function arguments. Otherwise all goroutines share the same variable and will likely all see the final value.",
      },
    ],
    gotchas: [
      "Sending on an unbuffered channel with no receiver causes a deadlock.",
      "Closing an already-closed channel panics. Only the sender should close.",
      "Loop variable capture in goroutines: always pass the variable as a function parameter.",
    ],
    summary:
      "Goroutines for concurrent work, channels for safe communication, WaitGroup for coordination. Start simple and add complexity only when needed.",
  },

  // ═══════════════════════════════════════
  // BLACK BELT
  // ═══════════════════════════════════════
  {
    belt: "black",
    title: "Patterns, Testing & Advanced Go",
    intro:
      "Black belt Go is about patterns that make large programs maintainable. Context for cancellation, generics for type-safe abstractions, testing conventions, and design patterns the community has settled on.",
    conceptImage: "/concepts/k01.png",
    sections: [
      {
        title: "Testing",
        body: "Test files live next to the code they test and end in _test.go. Test functions start with Test and take *testing.T. Run with go test ./... No framework needed.",
        examples: [
          {
            code: `// math.go
func Add(a, b int) int { return a + b }

// math_test.go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Errorf("Add(2, 3) = %d, want 5", got)
    }
}`,
            caption:
              "Tests are just Go code. No assertions library required (though many exist).",
          },
        ],
      },
      {
        title: "Context",
        body: "context.Context carries deadlines, cancellation signals, and request-scoped values through call chains. Any function doing I/O or long work should accept ctx as its first parameter.",
        examples: [
          {
            code: `func fetchData(ctx context.Context, url string) error {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return err
    }
    // request will be cancelled if ctx is done
    resp, err := http.DefaultClient.Do(req)
    // ...
}

// Usage: cancel after 5 seconds
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
fetchData(ctx, "https://api.example.com")`,
            caption:
              "Always defer cancel() to free resources, even if the operation finishes early.",
          },
        ],
        insight:
          "Context values should be request-scoped data (request IDs, auth tokens), not configuration or dependencies. Don't use context as a grab bag.",
      },
      {
        title: "Generics (Go 1.18+)",
        body: "Type parameters let functions and types work with multiple types without losing type safety. Constraints restrict which types are allowed.",
        examples: [
          {
            code: `func Map[T, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

// Usage
doubled := Map([]int{1, 2, 3}, func(x int) int {
    return x * 2
})`,
            caption:
              "Generic functions use [T constraint] syntax. any means no restriction.",
          },
        ],
      },
      {
        title: "The init() function",
        body: "Packages can have init() functions that run automatically before main(). They execute in dependency order. Common uses: registering database drivers, validating configuration, initializing package-level state.",
        examples: [
          {
            code: `func init() {
    // runs before main()
    // each package can have multiple init() functions
    log.Println("package initialized")
}`,
            caption:
              "init() is implicit and can make code harder to follow. Use sparingly.",
          },
        ],
      },
      {
        title: "Functional options pattern",
        body: "When a constructor needs many optional parameters, the functional options pattern provides a clean API that's extensible without breaking changes.",
        examples: [
          {
            code: `type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) {
        s.timeout = d
    }
}

func WithLogger(l *log.Logger) Option {
    return func(s *Server) {
        s.logger = l
    }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{addr: addr, timeout: 30 * time.Second}
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Clean call site:
srv := NewServer(":8080",
    WithTimeout(10*time.Second),
    WithLogger(myLogger),
)`,
            caption:
              "Each option is self-documenting. New options don't break existing callers.",
          },
        ],
      },
      {
        title: "go:embed",
        body: "The embed directive includes files in your compiled binary. Useful for templates, static assets, configuration files, and migration scripts.",
        examples: [
          {
            code: `import "embed"

//go:embed config.json
var configData []byte

//go:embed templates/*
var templateFS embed.FS`,
            caption:
              "Files are baked in at compile time. No external file dependencies at runtime.",
          },
        ],
      },
    ],
    gotchas: [
      "Closure capture in goroutine loops: all goroutines may see the last value. Pass variables as function arguments.",
      "Deferred calls run in LIFO order. The last defer runs first.",
      "Don't overuse init(). It makes package startup order implicit and testing harder.",
    ],
    summary:
      "Testing is built in. Context manages cancellation. Generics add type-safe abstractions. The functional options pattern scales configuration. These patterns are the vocabulary of production Go.",
  },
];

export function getLessonByBelt(belt: Belt): Lesson {
  return lessons.find((l) => l.belt === belt)!;
}
