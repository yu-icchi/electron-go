package main

import (
	"fmt"
	"flag"
)

func main() {
	var (
		boolFlag bool
		intFlag int
		stringFlag string
	)
	flag.BoolVar(&boolFlag, "bool", false, "bool flag")
	flag.IntVar(&intFlag, "int", 0, "int flag")
	flag.StringVar(&stringFlag, "string", "blank", "string flag")
	flag.Parse()
	fmt.Println("bool flag =", boolFlag)
	fmt.Println("int flag =", intFlag)
	fmt.Println("string flag =", stringFlag)
}
