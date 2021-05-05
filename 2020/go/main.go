package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gdamore/tcell/v2"
	"github.com/gdamore/tcell/v2/encoding"
	"github.com/trymunx/aoc/day01/day01"
	"github.com/trymunx/aoc/day01/day02"
)

var r rune = 'X'

func main() {
	encoding.Register()
	screen, err := tcell.NewScreen()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
	if err = screen.Init(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}

	style := tcell.StyleDefault.Background(tcell.ColorBlack).Foreground(tcell.ColorWhite)
	screen.SetStyle(style)

	output, err := day01.Part1()
	if err != nil {
		log.Fatalf("Error in day 1 part 1: %v", err)
	}
	fmt.Println(output)
	output2, err := day01.Part2()
	if err != nil {
		log.Fatalf("Error in day 1 part 2: %v", err)
	}
	fmt.Println(output2)

	output3, err := day02.Part1()
	if err != nil {
		log.Fatalf("Day 2 part 1: %v", err)
	}
	fmt.Println(output3)

	output4, err := day02.Part2()
	if err != nil {
		log.Fatalf("Day 2 part 2: %v", err)
	}
	fmt.Println(output4)

	for {
		switch ev := screen.PollEvent().(type) {
		case *tcell.EventResize:
			screen.Sync()
			draw(screen)
		case *tcell.EventKey:
			if ev.Key() == tcell.KeyEscape {
				screen.Fini()
				os.Exit(0)
			}
			r = ev.Rune()
			draw(screen)
		}
	}
}

func draw(s tcell.Screen) {
	w, h := s.Size()
	s.Clear()
	s.SetContent(w/2, h/2, r, nil, tcell.StyleDefault)
	drawBorder(s)
	drawHelp(s)
	s.Show()
}

func drawHelp(s tcell.Screen) {
	helpStr := "Press Esc to exit."
	offset := 2
	w, _ := s.Size()
	for i, c := range helpStr {
		s.SetContent(w-len(helpStr)+i-offset, offset, c, nil, tcell.StyleDefault)
	}
}

func drawBorder(s tcell.Screen) {
	w, h := s.Size()
	s.SetContent(1, 1, tcell.RuneULCorner, nil, tcell.StyleDefault)
	s.SetContent(w-1, 1, tcell.RuneURCorner, nil, tcell.StyleDefault)
	s.SetContent(1, h-1, tcell.RuneLLCorner, nil, tcell.StyleDefault)
	s.SetContent(w-1, h-1, tcell.RuneLRCorner, nil, tcell.StyleDefault)
	for y := 1; y < h; y += (h - 2) {
		for x := 2; x < w-1; x++ {
			s.SetContent(x, y, tcell.RuneHLine, nil, tcell.StyleDefault)
		}
	}
	for x := 1; x < w; x += (w - 2) {
		for y := 2; y < h-1; y++ {
			s.SetContent(x, y, tcell.RuneVLine, nil, tcell.StyleDefault)
		}
	}
}
